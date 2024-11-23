import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'

const Audit = () => {
  const [code, setCode] = useState('')
  const [auditResults, setAuditResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const analyzeCode = (code) => {
    // Basic analysis of common Sui Move vulnerabilities
    const results = {
      vulnerabilities: [],
      score: 10,
      suggestions: []
    }

    // Check for basic security patterns
    if (!code.includes('public entry fun')) {
      results.vulnerabilities.push({
        severity: 'Low',
        title: 'Missing Entry Functions',
        description: 'No public entry functions found. Consider if the contract needs external interaction points.',
        location: 'Global',
        recommendation: 'Add public entry functions if the contract needs to be called externally.'
      })
      results.score -= 0.5
    }

    if (code.includes('assert!')) {
      results.suggestions.push('Consider using custom errors instead of assert! for better error handling')
    }

    // Check for access control
    if (!code.includes('transfer::transfer') && !code.includes('transfer::share_object')) {
      results.vulnerabilities.push({
        severity: 'High',
        title: 'Missing Object Transfer',
        description: 'No object transfer functions found. Objects might be stuck in the contract.',
        location: 'Global',
        recommendation: 'Implement proper object transfer mechanisms using transfer::transfer or transfer::share_object.'
      })
      results.score -= 2
    }

    // Check for initialization
    if (code.includes('struct') && !code.includes('new')) {
      results.vulnerabilities.push({
        severity: 'Medium',
        title: 'Missing Initialization',
        description: 'Struct defined but no initialization function found.',
        location: 'Struct definition',
        recommendation: 'Add initialization function using object::new().'
      })
      results.score -= 1.5
    }

    // Check for proper module structure
    if (!code.includes('module') || !code.includes('use sui::')) {
      results.vulnerabilities.push({
        severity: 'High',
        title: 'Invalid Module Structure',
        description: 'Module declaration or essential Sui imports missing.',
        location: 'Module declaration',
        recommendation: 'Ensure proper module declaration and import necessary Sui packages.'
      })
      results.score -= 2
    }

    // Check for proper type usage
    if (code.includes('vector') && !code.includes('vector::')) {
      results.suggestions.push('Consider using vector module functions for vector operations')
    }

    // Add general suggestions
    results.suggestions.push(
      'Consider adding events for important state changes',
      'Add comprehensive test coverage',
      'Document complex functions with comments'
    )

    // Check for potential integer overflow
    if (code.includes('+') || code.includes('*')) {
      results.vulnerabilities.push({
        severity: 'Medium',
        title: 'Potential Integer Overflow',
        description: 'Arithmetic operations detected without overflow checks.',
        location: 'Arithmetic operations',
        recommendation: 'Implement checks for arithmetic operations or use safe math operations.'
      })
      results.score -= 1
    }

    // Normalize score
    results.score = Math.max(0, Math.min(10, results.score))
    return results
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!code.trim()) {
      alert('Please enter code to audit')
      return
    }
    setIsLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const results = analyzeCode(code)
      setAuditResults(results)
      setIsLoading(false)
    }, 1500)
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