import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'

const Generator = () => {
  const [contractName, setContractName] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!contractName.trim()) {
      alert('Please enter a contract name')
      return
    }
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedCode(`// Generated Sui Move contract: ${contractName}\nmodule example::${contractName.toLowerCase()} {\n    use sui::object::{Self, UID};\n    use sui::transfer;\n    use sui::tx_context::{Self, TxContext};\n\n    struct ${contractName} has key {\n        id: UID,\n        value: u64\n    }\n\n    public fun create(ctx: &mut TxContext) {\n        let counter = ${contractName} {\n            id: object::new(ctx),\n            value: 0\n        };\n        transfer::share_object(counter)\n    }\n}`)
      setIsLoading(false)
    }, 1500)
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

  const handleDeploy = async () => {
    setIsDeploying(true)
    // Simulate deployment
    setTimeout(() => {
      alert('Deployment functionality will be implemented here')
      setIsDeploying(false)
    }, 2000)
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
              
              {/* Deploy Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleDeploy}
                  disabled={isDeploying}
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