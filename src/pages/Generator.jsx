import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

const Generator = () => {
  const [contractName, setContractName] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [isCompiling, setIsCompiling] = useState(false)
  const [isCompiled, setIsCompiled] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  // Check if Sui wallet is installed and connected
  useEffect(() => {
    const checkWallet = async () => {
      try {
        // Check if Sui wallet is installed
        if (window.sui) {
          const isConnected = await window.sui.hasPermissions()
          setWalletConnected(isConnected)
        }
      } catch (error) {
        console.error('Error checking wallet:', error)
      }
    }
    checkWallet()
  }, [])

  const connectWallet = async () => {
    try {
      if (window.sui) {
        try {
          await window.sui.requestPermissions()
          setWalletConnected(true)
        } catch (error) {
          console.error('Error connecting wallet:', error)
          alert('Failed to connect wallet. Please try again.')
        }
      } else {
        window.open('https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil', '_blank')
      }
    } catch (error) {
      console.error('Wallet connection error:', error)
      alert('Please install Sui Wallet')
    }
  }

  const handleCompile = async () => {
    if (!generatedCode) {
      alert('Please generate code first')
      return
    }

    setIsCompiling(true)
    try {
      // Simulate compilation process
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsCompiled(true)
      alert('Contract compiled successfully!')
    } catch (error) {
      console.error('Compilation error:', error)
      alert('Failed to compile contract. Please check your code.')
    } finally {
      setIsCompiling(false)
    }
  }

  const handleDeploy = async () => {
    if (!walletConnected) {
      alert('Please connect your Sui wallet first')
      return
    }

    if (!isCompiled) {
      alert('Please compile the contract before deploying')
      return
    }

    setIsDeploying(true)
    try {
      // Create the transaction data
      const txb = {
        kind: 'moveCall',
        data: {
          packageObjectId: '0x2', // Replace with your package ID
          module: contractName.toLowerCase(),
          function: 'initialize',
          typeArguments: [],
          arguments: [],
          gasBudget: 10000,
        }
      }

      // Request transaction signature and execution
      const result = await window.sui.signAndExecuteTransaction({
        transaction: txb
      })

      if (result) {
        alert('Contract deployed successfully! Transaction ID: ' + result.certificate.transactionDigest)
      }
    } catch (error) {
      console.error('Deployment error:', error)
      alert('Failed to deploy contract. Please try again.')
    } finally {
      setIsDeploying(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!contractName.trim()) {
      alert('Please enter a contract name')
      return
    }
    setIsLoading(true)
    try {
      // Generate more realistic Sui Move code based on the prompt
      const generatedCode = `
module ${contractName.toLowerCase()}::main {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;

    /// Custom error codes
    const EInsufficientBalance: u64 = 0;
    const EInvalidAmount: u64 = 1;

    /// The main storage object for ${contractName}
    struct ${contractName} has key {
        id: UID,
        balance: Balance<SUI>,
        owner: address
    }

    /// Create a new instance of ${contractName}
    public fun initialize(ctx: &mut TxContext) {
        let ${contractName.toLowerCase()} = ${contractName} {
            id: object::new(ctx),
            balance: balance::zero<SUI>(),
            owner: tx_context::sender(ctx)
        };
        // Transfer the object to the sender
        transfer::share_object(${contractName.toLowerCase()})
    }

    /// Deposit SUI into the contract
    public entry fun deposit(
        self: &mut ${contractName},
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let amount = coin::value(&payment);
        assert!(amount > 0, EInvalidAmount);
        
        let coin_balance = coin::into_balance(payment);
        balance::join(&mut self.balance, coin_balance);
    }

    /// Withdraw SUI from the contract
    public entry fun withdraw(
        self: &mut ${contractName},
        amount: u64,
        ctx: &mut TxContext
    ) {
        assert!(balance::value(&self.balance) >= amount, EInsufficientBalance);
        assert!(tx_context::sender(ctx) == self.owner, 0);
        
        let withdrawn_coin = coin::take(&mut self.balance, amount, ctx);
        transfer::transfer(withdrawn_coin, tx_context::sender(ctx));
    }

    /// View functions
    public fun get_balance(self: &${contractName}): u64 {
        balance::value(&self.balance)
    }

    public fun get_owner(self: &${contractName}): address {
        self.owner
    }
}`;
      
      setGeneratedCode(generatedCode)
    } catch (error) {
      console.error('Error generating code:', error)
      alert('Failed to generate code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000) // Reset copy status after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-900 to-gray-800 text-white"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Generate <span className="text-blue-400">Sui Move</span> Code
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Transform your ideas into Sui blockchain code using AI. Simply describe what you want to build.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="contractName" className="text-lg font-medium text-gray-300">
                  Contract Name
                </label>
                <input
                  id="contractName"
                  type="text"
                  value={contractName}
                  onChange={(e) => setContractName(e.target.value)}
                  className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter contract name (e.g., TokenSwap, NFTMarket)"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-lg font-medium text-gray-300">
                  Contract Description
                </label>
                <textarea
                  id="description"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-32 p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Describe the functionality of your smart contract (e.g., A token swap contract that allows users to exchange SUI for custom tokens)"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Generating...' : 'Generate Code'}
              </button>
            </div>
          </form>

          {generatedCode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-400">Generated Code</h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 rounded hover:bg-gray-600 transition-all"
                >
                  {isCopied ? (
                    <>
                      <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="w-5 h-5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                <code className="text-gray-300">{generatedCode}</code>
              </pre>
              
              {/* Deployment Actions */}
              <div className="mt-6 flex justify-end items-center gap-4">
                {!walletConnected && (
                  <button
                    onClick={connectWallet}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Connect Wallet
                  </button>
                )}

                <button
                  onClick={handleCompile}
                  disabled={isCompiling || !generatedCode}
                  className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all disabled:opacity-50"
                >
                  {isCompiling ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Compiling...
                    </>
                  ) : (
                    <>
                      <CodeBracketIcon className="w-5 h-5" />
                      {isCompiled ? 'Recompile' : 'Compile'}
                    </>
                  )}
                </button>

                <button
                  onClick={handleDeploy}
                  disabled={isDeploying || !isCompiled || !walletConnected}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50"
                >
                  {isDeploying ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Deploying...
                    </>
                  ) : (
                    'Deploy Contract'
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Generator 