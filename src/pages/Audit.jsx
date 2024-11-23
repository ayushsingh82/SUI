import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'

const Audit = () => {
  const [code, setCode] = useState('')
  const [auditResults, setAuditResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!code.trim()) {
      alert('Please enter code to audit')
      return
    }
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setAuditResults({
        vulnerabilities: [
          {
            severity: 'High',
            title: 'Unauthorized Access',
            description: 'The contract lacks proper access controls for administrative functions.',
            location: 'Line 15-20',
            recommendation: 'Implement proper access control modifiers or checks.'
          },
          {
            severity: 'Medium',
            title: 'Integer Overflow',
            description: 'Potential integer overflow in arithmetic operations.',
            location: 'Line 25',
            recommendation: 'Use safe math operations or implement proper bounds checking.'
          }
        ],
        score: 7.5,
        suggestions: [
          'Consider implementing event emissions for important state changes',
          'Add input validation for critical parameters',
          'Consider adding emergency pause functionality'
        ]
      })
      setIsLoading(false)
    }, 2000)
  }

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'text-red-400'
      case 'medium':
        return 'text-yellow-400'
      case 'low':
        return 'text-green-400'
      default:
        return 'text-gray-400'
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
            Smart Contract <span className="text-blue-400">Security Audit</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Analyze your Sui Move smart contracts for potential vulnerabilities and security issues.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="code" className="text-lg font-medium text-gray-300">
                  Contract Code
                </label>
                <textarea
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 p-4 rounded-lg bg-gray-800 border border-gray-700 text-white font-mono focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Paste your Sui Move smart contract code here..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Contract'}
              </button>
            </div>
          </form>

          {auditResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-blue-400">Audit Results</h3>
                <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg">
                  <span className="text-gray-300">Security Score:</span>
                  <span className={`text-lg font-bold ${
                    auditResults.score >= 8 ? 'text-green-400' :
                    auditResults.score >= 6 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {auditResults.score}/10
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-300 mb-4">Vulnerabilities Found</h4>
                  <div className="space-y-4">
                    {auditResults.vulnerabilities.map((vuln, index) => (
                      <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-lg font-semibold flex items-center gap-2">
                            <ShieldExclamationIcon className="w-5 h-5" />
                            <span className={getSeverityColor(vuln.severity)}>
                              {vuln.severity}:
                            </span>
                            {vuln.title}
                          </h5>
                          <span className="text-sm text-gray-400">{vuln.location}</span>
                        </div>
                        <p className="text-gray-300 mb-2">{vuln.description}</p>
                        <p className="text-sm text-blue-400">💡 {vuln.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-300 mb-4">Suggestions</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {auditResults.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Audit 