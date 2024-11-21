import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Build on <span className="text-blue-400">Sui</span> with AI
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Transform your blockchain ideas into production-ready Sui Move code using our advanced AI code generator.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/generator')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Try Generator
              </button>
              <a
                href="https://sui.io/learn"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-blue-400 text-blue-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all"
              >
                Learn More
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                <code className="text-gray-300">
{`module example::defi {
    use sui::coin::Coin;
    use sui::balance::Balance;
    use sui::tx_context::TxContext;

    struct LiquidityPool has key {
        id: UID,
        balance: Balance<SUI>
    }

    // Smart contract preview...
}`}
                </code>
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-400">Smart Contract Generation</h3>
            <p className="text-gray-300">Generate production-ready Sui Move smart contracts from natural language descriptions.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-400">Best Practices</h3>
            <p className="text-gray-300">AI-generated code follows Sui Move best practices and security patterns.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-400">Instant Deploy</h3>
            <p className="text-gray-300">Generate, review, and deploy your smart contracts in minutes, not hours.</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Landing 