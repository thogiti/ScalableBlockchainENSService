const main = async () => {
	// The first return is the deployer, the second is a random account
	// const [owner, randomPerson] = await hre.ethers.getSigners();
	const [owner, superCoder] = await hre.ethers.getSigners();
	const domainContractFactory = await hre.ethers.getContractFactory("Domains");
	// We pass in "ninja" to the constructor when deploying
	const domainContract = await domainContractFactory.deploy("tokio");
	await domainContract.deployed();
	console.log("Contract deployed to:", domainContract.address);

	console.log("Contract owner:", owner.address);

	// We're passing in a second variable - value. This is the money
	// Let's be extra generous with our payment (we're paying more than required)
	let txn = await domainContract.register("yahoo", {
		value: hre.ethers.utils.parseEther("1234"),
	});
	await txn.wait();

	const address = await domainContract.getAddress("Flame");
	console.log("Owner of domain Flame:", address);

	// How much money is in here?
	const balance = await hre.ethers.provider.getBalance(domainContract.address);
	console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

	// Quick! Grab the funds from the contract! (as superCoder)
	try {
		txn = await domainContract.connect(superCoder).withdraw();
		await txn.wait();
	} catch (error) {
		console.log("Could not rob contract ", error.message);
	}

	// Let's look in their wallet so we can compare later
	let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
	console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

	// Oops, looks like the owner is saving their money!
	txn = await domainContract.connect(owner).withdraw();
	await txn.wait();

	// Fetch balance of contract & owner
	const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
	ownerBalance = await hre.ethers.provider.getBalance(owner.address);

	console.log(
		"Contract balance after withdrawal:",
		hre.ethers.utils.formatEther(contractBalance)
	);
	console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

	// Trying to set a record that doesn't belong to me!
	/*   txn = await domainContract.connect(randomPerson).setRecord("doom", "my record now haha);
    await txn.wait();
*/
	/*  
   let txn2 = await domainContract.connect(randomPerson).register("doom");
    console.log("Owner of domain:", txn2.from);
*/
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();