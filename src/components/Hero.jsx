import React, { useState } from 'react'

const Hero = () => {
  const [prompt, setPrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedCode('// Example Sui Move code\nmodule example::counter {\n    use sui::object::{Self, UID};\n    use sui::transfer;\n    use sui::tx_context::{Self, TxContext};\n\n    struct Counter has key {\n        id: UID,\n        value: u64\n    }\n\n    public fun create(ctx: &mut TxContext) {\n        let counter = Counter {\n            id: object::new(ctx),\n            value: 0\n        };\n        transfer::share_object(counter)\n    }\n}')
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-900 to-gray-800 text-white">
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
            <div className="flex flex-col gap-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Describe the smart contract or functionality you want to create..."
              />
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
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-400">Generated Code</h3>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedCode)}
                  className="px-4 py-2 text-sm bg-gray-700 rounded hover:bg-gray-600 transition-all"
                >
                  Copy Code
                </button>
              </div>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                <code className="text-gray-300">{generatedCode}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero 