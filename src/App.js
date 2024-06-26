import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockDetails, setBlockDetails] = useState();
  const [TransactionDetails, setTransaction] = useState();
  const [TransactionReceipt, setTransactionReceipt] = useState();
  const [transactionHash, setTransactionHash] = useState('');
  const [IndividualTransactionReceipt, setIndividualTransactionReceipt] = useState();
  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      getBlockDetails(await alchemy.core.getBlockNumber());
      getBlockWithTransactions(await alchemy.core.getBlockNumber());
      getBlockTransactionReceipts(await alchemy.core.getBlockNumber());
    }
    async function getBlockDetails(blockNumber) {
      const block = await alchemy.core.getBlock(blockNumber);
      setBlockDetails(block);
    }
    async function getBlockWithTransactions(blockNumber) {
      setTransaction(await alchemy.core.getBlockWithTransactions(blockNumber));
    }
    async function getBlockTransactionReceipts(blockNo) {
      const par  = {
        blockNumber: blockNo.toString()
      }
      setTransactionReceipt(await alchemy.core.getTransactionReceipts(par));
    }
  getBlockNumber();
  
}, []);
async function getIndividualTransactionReceipt(Hash) {
  setIndividualTransactionReceipt(await alchemy.core.getTransactionReceipt(Hash));
}
  return (
  <div className='App-header'> 
    <div className="App">Block Number: #{blockNumber}</div>
    <hr />
    <div>Block Details:<hr /> {JSON.stringify(blockDetails)}</div>
    <hr />
    <div>Transaction Details:<hr />{JSON.stringify(TransactionDetails)}</div>
    <hr />
    <div>Transaction Receipts:<hr /> {JSON.stringify(TransactionReceipt)}</div>
    <hr />
    <input className= "big" placeholder='Enter Transaction Hash' type='text' value={transactionHash} 
    onChange={(e) => setTransactionHash(e.target.value)} />
   <div> <button className = "big button" onClick={() => getIndividualTransactionReceipt(transactionHash)}>Show Transaction Receipt</button></div>
    <hr />
    <div>Individual Transaction Receipt:<hr />{JSON.stringify(IndividualTransactionReceipt)}</div>
  </div>
  )
}

export default App;
