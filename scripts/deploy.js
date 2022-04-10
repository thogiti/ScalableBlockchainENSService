const main = async () => {
	const domainContractFactory = await hre.ethers.getContractFactory("Domains");
	const domainContract = await domainContractFactory.deploy("Hashira");
	await domainContract.deployed();

	console.log("Contract deployed to:", domainContract.address);

	/* CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
      let txn = await domainContract.register("Flame",  {value: hre.ethers.utils.parseEther('0.1')});
      await txn.wait();
    console.log("Minted domain Flame.Hashira");
  
    txn = await domainContract.setRecord("Flame", "Am I a Flame Hashira");
    await txn.wait();
    console.log("Set record for Flame.Hashira");
  
    const address = await domainContract.getAddress("Flame");
    console.log("Owner of domain Flame:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
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