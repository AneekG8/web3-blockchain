const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

   const newPair = new Keypair();

   const publicKey = new PublicKey(newPair._keypair.publicKey).toString();

   const secretKey = newPair._keypair.secretKey

   
const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );
        console.log(typeof myWallet.publicKey._bn);
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`Wallet balance: ${walletBalance}`);

    } catch (err) {
        console.log(err);
    }

};

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

// const batchAirdrop = async ()=>{
//     for(let i=0;i<5;i++){
//         await airDropSol();
//         await getWalletBalance();
//     }
// }

//batchAirdrop();

const myFunc = async ()=>{
    await getWalletBalance();
    await airDropSol();
    //await airDropSol();
    await getWalletBalance();
}

myFunc()