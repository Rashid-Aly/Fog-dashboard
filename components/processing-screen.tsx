"use client"

import { useState, useEffect } from "react"
import { Shield, AlertTriangle, CheckCircle, X } from "lucide-react"

interface ProcessingScreenProps {
  onNavigate: (screen: "dashboard" | "settings" | "processing" | "completion") => void
}

export default function ProcessingScreen({ onNavigate }: ProcessingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentFile, setCurrentFile] = useState("")
  const [scannedFiles, setScannedFiles] = useState(0)
  const [threats, setThreats] = useState<{ name: string; path: string; severity: string }[]>([])
  const [isComplete, setIsComplete] = useState(false)

  // Files to "scan"
  const files = [
    "C:\\Windows\\System32\\kernel32.dll",
    "C:\\Windows\\System32\\ntdll.dll",
    "C:\\Program Files\\Common Files\\System\\ado\\msado15.dll",
    "C:\\Users\\Admin\\Documents\\report.docx",
    "C:\\Users\\Admin\\Downloads\\setup.exe",
    "C:\\Users\\Admin\\Downloads\\update_patch.exe",
    "C:\\Program Files\\Application\\resources\\app.asar",
    "C:\\Users\\Admin\\AppData\\Local\\Temp\\temp_file_3219.tmp",
    "C:\\Users\\Admin\\Pictures\\vacation.jpg",
    "C:\\Users\\Admin\\Documents\\financial_report.xlsx",
    "C:\\Program Files\\Application\\lib\\net45\\newtonsoft.json.dll",
    "C:\\Users\\Admin\\Downloads\\installer.msi",
  ]

  // Simulate scanning process
  useEffect(() => {
    if (isComplete) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Increment by random amount between 1-3%
        const increment = Math.random() * 2 + 1
        const newProgress = prev + increment

        if (newProgress >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setTimeout(() => onNavigate("completion"), 2000)
          return 100
        }

        // Update current file being scanned
        const fileIndex = Math.floor((newProgress / 100) * files.length)
        if (fileIndex < files.length) {
          setCurrentFile(files[fileIndex])
          setScannedFiles(fileIndex + 1)

          // Randomly detect threats (for demo purposes)
          if (fileIndex === 4 && threats.length === 0) {
            setThreats((prev) => [
              ...prev,
              {
                name: "Trojan.Generic",
                path: "C:\\Users\\Admin\\Downloads\\setup.exe",
                severity: "high",
              },
            ])
          }

          if (fileIndex === 5 && threats.length === 1) {
            setThreats((prev) => [
              ...prev,
              {
                name: "PUP.Optional.Adware",
                path: "C:\\Users\\Admin\\Downloads\\update_patch.exe",
                severity: "medium",
              },
            ])
          }
        }

        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [isComplete, files, threats, onNavigate])

  return (
    <div className="h-full bg-[#1e1e1e] p-6 flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white mb-1">System Scan</h1>
        <p className="text-gray-400">Scanning your system for threats...</p>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Progress indicator */}
        <div className="bg-[#252526] border border-[#333333] rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Shield className="text-[#0078d7] mr-3" size={24} />
              <div>
                <div className="text-white font-medium">Quick Scan</div>
                <div className="text-gray-400 text-sm">
                  {isComplete ? "Scan complete" : "Scanning system files and common locations"}
                </div>
              </div>
            </div>
            <div className="text-2xl font-semibold text-white">{Math.round(progress)}%</div>
          </div>

          <div className="h-2 bg-[#333333] rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-[#0078d7] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <div>Files scanned: {scannedFiles}</div>
            <div>Threats found: {threats.length}</div>
            <div>
              Time elapsed: {Math.floor(progress / 10)}m {Math.floor((progress % 10) * 6)}s
            </div>
          </div>

          {!isComplete && <div className="mt-4 text-sm text-gray-400 font-mono truncate">Scanning: {currentFile}</div>}

          {isComplete && (
            <div className="mt-4 flex items-center text-green-400">
              <CheckCircle size={16} className="mr-2" />
              <span>Scan completed successfully</span>
            </div>
          )}
        </div>

        {/* Threats found */}
        <div className="bg-[#252526] border border-[#333333] rounded-lg p-4 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-medium">Detected Threats</h2>
            {threats.length > 0 && (
              <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-medium">
                {threats.length} Threats Found
              </div>
            )}
          </div>

          {threats.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 py-8">
              <Shield size={48} className="mb-4 text-gray-600" />
              <p>No threats detected yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {threats.map((threat, i) => (
                <div key={i} className="bg-[#333333] rounded-md p-3 flex items-start justify-between">
                  <div className="flex items-start">
                    <div
                      className={`mt-0.5 mr-3 ${
                        threat.severity === "high"
                          ? "text-red-500"
                          : threat.severity === "medium"
                            ? "text-yellow-500"
                            : "text-blue-500"
                      }`}
                    >
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <div className="text-white font-medium">{threat.name}</div>
                      <div className="text-gray-400 text-sm font-mono">{threat.path}</div>
                      <div className="mt-1 flex gap-2">
                        <button className="bg-[#0078d7] hover:bg-[#0066b5] text-white text-xs px-3 py-1 rounded">
                          Quarantine
                        </button>
                        <button className="bg-[#444444] hover:bg-[#555555] text-gray-200 text-xs px-3 py-1 rounded">
                          Ignore
                        </button>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-gray-300">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => onNavigate("dashboard")}
          className="bg-[#333333] hover:bg-[#3c3c3c] text-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => onNavigate("completion")}
          className={`bg-[#0078d7] hover:bg-[#0066b5] text-white px-4 py-2 rounded ${
            isComplete ? "" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isComplete}
        >
          View Report
        </button>
      </div>
    </div>
  )
}

