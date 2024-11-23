import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CodeBracketIcon, CpuChipIcon, RocketLaunchIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import SuiLogo from '../components/SuiLogo'

const Landing = () => {
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full opacity-10"
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl" />
        </motion.div>
        <motion.div
          animate={{
            rotate: -360,
            transition: { duration: 25, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full opacity-10"
        >
          <div className="w-full h-full bg-gradient-to-tr from-blue-400 to-purple-600 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              className="absolute -top-20 -left-20 w-32 h-32 opacity-20"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <SuiLogo className="w-full h-full" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                Build on{" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-blue-400 relative inline-block"
              >
                Sui
                <motion.div
                  className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-lg"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="inline-block"
              >
                {" "}with{" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400"
              >
                AI
              </motion.span>
            </h1>

            <motion.p 
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Transform your blockchain ideas into{" "}
              <span className="text-blue-400 font-semibold">production-ready</span> Sui Move code using our{" "}
              <span className="text-purple-400 font-semibold">advanced AI</span> code generator.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex gap-4 flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/generator')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-blue-500/20"
              >
                Try Generator
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://sui.io/learn"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-blue-400 text-blue-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all shadow-lg"
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block relative"
          >
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 360]
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <SuiLogo className="w-full h-full" />
            </motion.div>
            <motion.div
              style={{ y: y1 }}
              className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 border border-gray-700 shadow-xl backdrop-blur-sm"
            >
              <pre className="bg-gray-900/80 p-4 rounded-lg overflow-x-auto">
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
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center"
        >
          {[
            { label: "Smart Contracts", value: "1000+" },
            { label: "Security Score", value: "98%" },
            { label: "Active Users", value: "50K+" },
            { label: "Code Generated", value: "1M+" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm"
            >
              <h3 className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              icon: <CodeBracketIcon className="w-12 h-12 text-blue-400 mb-4" />,
              title: "Smart Contract Generation",
              description: "Generate production-ready Sui Move smart contracts from natural language descriptions."
            },
            {
              icon: <ShieldCheckIcon className="w-12 h-12 text-blue-400 mb-4" />,
              title: "Best Practices",
              description: "AI-generated code follows Sui Move best practices and security patterns."
            },
            {
              icon: <RocketLaunchIcon className="w-12 h-12 text-blue-400 mb-4" />,
              title: "Instant Deploy",
              description: "Generate, review, and deploy your smart contracts in minutes, not hours."
            },
            {
              icon: <CpuChipIcon className="w-12 h-12 text-blue-400 mb-4" />,
              title: "AI Powered",
              description: "Leverage advanced AI to write, optimize, and validate your Sui Move code."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-500/10"
            >
              {feature.icon}
              <h3 className="text-xl font-bold mb-4 text-blue-400">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Sui Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-32 text-center relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              transition: { duration: 5, repeat: Infinity }
            }}
            className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-3xl"
          />
          <h2 className="text-4xl md:text-5xl font-bold mb-8 relative">
            Why Build on <span className="text-blue-400">Sui</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "High Performance",
                description: "Experience parallel execution and horizontal scalability for maximum throughput."
              },
              {
                title: "Move Language",
                description: "Develop with a safe and expressive programming language designed for digital assets."
              },
              {
                title: "Rich Ecosystem",
                description: "Join a growing ecosystem of developers, tools, and applications."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300 shadow-lg backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-4 text-blue-400">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Landing 