import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CodeBracketIcon, CpuChipIcon, RocketLaunchIcon, ShieldCheckIcon, BeakerIcon, CommandLineIcon, CubeTransparentIcon } from '@heroicons/react/24/outline'
import SuiLogo from '../components/SuiLogo'

const Landing = () => {
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const circles = Array(8).fill(null).map((_, i) => ({
    size: Math.random() * 300 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }))

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

  // Floating animation for background elements
  const floatingAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  // Animated Sui Logos Background
  {[...Array(6)].map((_, index) => (
    <motion.div
      key={index}
      className="absolute opacity-[0.03] blur-sm"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        y: [-20, 20, -20],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <img 
        src="https://assets-global.website-files.com/6425f546844727ce5fb9e5ab/6425f69e6a625b9b46063663_sui-token.svg"
        alt="Sui Background"
        className="w-40 h-40"
      />
    </motion.div>
  ))}

  // Large Centered Sui Logo
  <motion.div
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] blur-sm"
    animate={{
      scale: [1, 1.5, 1],
      rotate: [0, -360],
    }}
    transition={{
      duration: 30,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <img 
      src="https://assets-global.website-files.com/6425f546844727ce5fb9e5ab/6425f69e6a625b9b46063663_sui-token.svg"
      alt="Sui Background Large"
      className="w-96 h-96"
    />
  </motion.div>

  // Alternative Sui Logo URL if the above doesn't work
  {/* Use this URL as fallback if needed:
    src="https://assets-global.website-files.com/6425f546844727ce5fb9e5ab/6425f69e6a625b9b46063663_sui-token.svg"
  */}

  // Keep the grid background for additional texture
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Circles */}
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-blue-500/5 blur-3xl"
          style={{
            width: circle.size,
            height: circle.size,
            left: `${circle.x}%`,
            top: `${circle.y}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            x: [-20, 20, -20],
            y: [-20, 20, -20]
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            {/* Decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -left-20 -top-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
            />
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative inline-block"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                  Build the
                </span>
                <div className="absolute -inset-1 bg-blue-500/20 filter blur-xl opacity-50"></div>
              </motion.div>
              <br />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative inline-block"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Future
                </span>
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-1 bg-blue-500/20 filter blur-xl"
                />
              </motion.div>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative inline-block"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white">
                  with
                </span>
                <motion.span
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500"
                />
              </motion.span>
              {' '}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 relative inline-block"
              >
                AI
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-xl"
                />
              </motion.span>
            </h1>

            <motion.p 
              className="text-xl text-gray-300 mb-12 leading-relaxed relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Transform your blockchain ideas into{" "}
              <span className="text-blue-400 font-semibold relative">
                production-ready
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-400/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                />
              </span>{" "}
              Sui Move code using our{" "}
              <span className="text-purple-400 font-semibold relative">
                advanced AI
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-purple-400/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.7, duration: 0.8 }}
                />
              </span>{" "}
              code generator.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex gap-6 flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/generator')}
                className="relative group px-8 py-4 rounded-lg text-lg font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-white flex items-center gap-2">
                  Try Generator
                  <RocketLaunchIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://sui.io/learn"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group px-8 py-4 rounded-lg text-lg font-semibold overflow-hidden border border-blue-400/50"
              >
                <div className="absolute inset-0 bg-blue-400/10 group-hover:bg-blue-400/20 transition-all duration-300" />
                <span className="relative text-blue-400 flex items-center gap-2">
                  Learn More
                  <CubeTransparentIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side with code preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block relative"
          >
            {/* Floating Sui Logo */}
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 z-10"
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
              <SuiLogo className="w-full h-full filter drop-shadow-lg" />
            </motion.div>

            {/* Code Preview Card */}
            <motion.div
              style={{ y: y1 }}
              className="relative bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-8 border border-gray-700/50 shadow-2xl backdrop-blur-sm group hover:border-blue-500/50 transition-all duration-500"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Code Editor Header */}
              <div className="flex items-center justify-between mb-4 relative">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-gray-400 font-code">smart_contract.move</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-code">Sui Move</span>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
              </div>

              {/* Code Content */}
              <div className="relative">
                <pre className="bg-gray-900/90 p-6 rounded-lg overflow-x-auto font-code text-sm leading-relaxed">
                  <code className="text-gray-300">
{`module example::defi {
    use sui::coin::Coin;
    use sui::balance::Balance;
    use sui::tx_context::TxContext;

    /// Smart contract for DeFi operations
    struct LiquidityPool has key {
        id: UID,
        balance: Balance<SUI>,
        total_supply: u64
    }

    /// Initialize new pool
    public fun initialize(ctx: &mut TxContext) {
        // Create new pool instance
        let pool = LiquidityPool {
            id: object::new(ctx),
            balance: balance::zero(),
            total_supply: 0
        };
        
        // Share the pool object
        transfer::share_object(pool)
    }`}
                  </code>
                </pre>

                {/* Line Numbers */}
                <div className="absolute left-4 top-6 flex flex-col gap-[0.3rem] text-gray-600 font-code text-sm select-none">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="text-right">{i + 1}</div>
                  ))}
                </div>

                {/* Typing Cursor */}
                <motion.div
                  className="absolute right-8 bottom-8 w-2 h-4 bg-blue-400/50"
                  animate={{
                    opacity: [1, 0, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "steps(2)"
                  }}
                />
              </div>

              {/* Code Tags */}
              <div className="flex gap-2 mt-4">
                <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium">
                  #sui-move
                </span>
                <span className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-medium">
                  #smart-contract
                </span>
                <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-medium">
                  #defi
                </span>
              </div>
            </motion.div>

            {/* Background Decorative Elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -right-20 -top-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -right-10 bottom-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
            />
          </motion.div>
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center relative"
        >
          <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-3xl transform -rotate-3" />
          {[
            { label: "Smart Contracts", value: "1000+", icon: <CodeBracketIcon className="w-8 h-8" /> },
            { label: "Security Score", value: "98%", icon: <ShieldCheckIcon className="w-8 h-8" /> },
            { label: "Active Users", value: "50K+", icon: <BeakerIcon className="w-8 h-8" /> },
            { label: "Code Generated", value: "1M+", icon: <CommandLineIcon className="w-8 h-8" /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="text-blue-400">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-3xl blur-3xl transform rotate-3" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {[
              {
                icon: <CodeBracketIcon className="w-16 h-16 text-blue-400 mb-6" />,
                title: "Smart Contract Generation",
                description: "Generate production-ready Sui Move smart contracts from natural language descriptions.",
                gradient: "from-blue-500/10 via-blue-400/10 to-blue-600/10",
                borderGlow: "group-hover:shadow-blue-500/50"
              },
              {
                icon: <ShieldCheckIcon className="w-16 h-16 text-blue-400 mb-6" />,
                title: "Security First",
                description: "AI-generated code follows Sui Move best practices and security patterns.",
                gradient: "from-blue-600/10 via-blue-500/10 to-blue-400/10",
                borderGlow: "group-hover:shadow-blue-400/50"
              },
              {
                icon: <RocketLaunchIcon className="w-16 h-16 text-blue-400 mb-6" />,
                title: "Instant Deploy",
                description: "Generate, review, and deploy your smart contracts in minutes, not hours.",
                gradient: "from-blue-400/10 via-blue-600/10 to-blue-500/10",
                borderGlow: "group-hover:shadow-blue-600/50"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group bg-gradient-to-br ${feature.gradient} p-10 rounded-2xl border border-blue-400/20 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl ${feature.borderGlow} backdrop-blur-sm`}
              >
                <div className="relative flex flex-col items-center text-center">
                  <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-blue-500/10 p-4 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    {feature.description}
                  </p>
                  <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Add a Call-to-Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-32 text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
          <div className="relative bg-gray-800/50 p-12 rounded-2xl backdrop-blur-sm border border-gray-700/50">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build on <span className="text-blue-400">Sui</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start building your next blockchain project with AI-powered smart contract generation.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/generator')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-blue-500/20"
            >
              Start Building Now
            </motion.button>
          </div>
        </motion.div>

        {/* Add floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array(20).fill(null).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              initial={{ y: Math.random() * window.innerHeight }}
              animate={{
                y: [-20, window.innerHeight + 20],
                x: Math.random() * 20 - 10
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
              style={{
                left: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Landing 