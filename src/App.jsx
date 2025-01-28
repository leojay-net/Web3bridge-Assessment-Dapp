import { useState } from 'react'
import abi from "./abi.json"
import { ethers } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [useramount, setUserAmount] = useState('')
  const [balance, setbalance] = useState('')
  const contractAddress = "0xa4429033A0a38A764a42b494a11f980F622d91Df"


  async function requestAccounts() {
    await window.ethereum.request({method: "eth_requestAccounts"})
  }


  async function _Deposit() {
    requestAccounts()
    if (typeof window.ethereum !== "undefined") {
      await requestAccounts()
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    
    const contract = new ethers.Contract(contractAddress, abi, signer)
  try {
      const tx = await contract.deposit(useramount)
      toast.loading('Depositing...', { duration: 1000 })
      const receipt = tx.wait()
      toast.success('Deposit successful!')
      const _balance = await contract.getBalance()
      setbalance(_balance.toString())
      console.log("balance updated", receipt)

    } catch(err){
      toast.error('Deposit failed!')
      console.log("Failed Transaction", err)
    }
    
  }

  async function _Withdraw() {
    requestAccounts()
    if (typeof window.ethereum !== "undefined") {
      await requestAccounts()
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
  try {
      const tx = await contract.withdraw(useramount)
      toast.loading('Withdrawing...', { duration: 1000 })
      const receipt = tx.wait()
      toast.success('Withdrawal Succesful!')
      const _balance = await contract.getBalance()
      setbalance(_balance.toString())
      console.log("withdrawn", receipt)

    } catch(err){
      toast.error('Withdrawal failed!')
      console.log("Failed Transaction", err)
    }
    
  }

  async function _getBalance() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccounts()
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, abi, provider)

  try {
      toast.loading('Getting balance...', { duration: 1000 })
      const _balance = await contract.getBalance()
      setbalance(_balance.toString())
      toast.success('Balance updated!')
      console.log("retrieval successful", _balance)

    } catch(err){
      toast.error('Failed to get balance!')
      console.log("retrieval unsuccessful", err)
    }
    
  }

  return (
    <div style={{
      padding: '20px',
      maxWidth: '400px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Toaster position="top-right" />
      
      <h1 style={{
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px'
      }}>
        LEO's BANKING DAPP
      </h1>
      
      <input 
        type="number"
        placeholder="Enter amount"
        value={useramount}
        onChange={(e) => setUserAmount(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '15px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      
      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={_Deposit}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Deposit
        </button>
        
        <button 
          onClick={_Withdraw}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Withdraw
        </button>
        
        <button 
          onClick={_getBalance}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Refresh Balance
        </button>
      </div>
      
      <p style={{
        fontSize: '18px',
        textAlign: 'center',
        marginTop: '20px'
      }}>
        Balance: {balance}
      </p>
    </div>
  )
}

export default App
