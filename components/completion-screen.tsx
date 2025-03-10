"use client"

import { Shield, AlertTriangle, FileText, CheckCircle, Clock, ArrowRight } from "lucide-react"

interface CompletionScreenProps {
  onNavigate: (screen: "dashboard" | "settings" | "processing" | "completion") => void
}

export default function CompletionScreen({ onNavigate }: CompletionScreenProps) {
  const scanResults = {
    duration: "4m 32s",
    filesScanned: 1458,
    threatsFound: 2,
    timestamp: "Today, 11:24 AM",
    threats: [
      {
        name: "Trojan.Generic",
        path: "C:\\Users\\Admin\\Downloads\\setup.exe",
        severity: "high",
        action: "quarantined",
      },
      {
        name: "PUP.Optional.Adware",
        path: "C:\\Users\\Admin\\Downloads\\update_patch.exe",
        severity: "medium",
        action: "quarantined",
      },
    ],
  }

  return (
    <div className="h-full bg-[#1e1e1e] p-6 flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white mb-1">Scan Complete</h1>
        <p className="text-gray-400">Your system has been scanned successfully</p>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Summary card */}
        <div className="bg-[#252526] border border-[#333333] rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
              <CheckCircle className="text-green-500" size={32} />
            </div>
            <div>
              <div className="text-white text-xl font-medium">Scan Completed</div>
              <div className="text-gray-400">All threats have been quarantined</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#333333] rounded-md p-3">
              <div className="text-gray-400 text-sm mb-1">Time</div>
              <div className="text-white font-medium flex items-center">
                <Clock size={16} className="mr-2 text-[#0078d7]" />
                {scanResults.duration}
              </div>
            </div>

            <div className="bg-[#333333] rounded-md p-3">
              <div className="text-gray-400 text-sm mb-1">Files Scanned</div>
              <div className="text-white font-medium flex items-center">
                <FileText size={16} className="mr-2 text-[#0078d7]" />
                {scanResults.filesScanned}
              </div>
            </div>

            <div className="bg-[#333333] rounded-md p-3">
              <div className="text-gray-400 text-sm mb-1">Threats Found</div>
              <div className="text-white font-medium flex items-center">
                <AlertTriangle size={16} className="mr-2 text-yellow-500" />
                {scanResults.threatsFound}
              </div>
            </div>

            <div className="bg-[#333333] rounded-md p-3">
              <div className="text-gray-400 text-sm mb-1">Scan Time</div>
              <div className="text-white font-medium flex items-center">
                <Clock size={16} className="mr-2 text-[#0078d7]" />
                {scanResults.timestamp}
              </div>
            </div>
          </div>
        </div>

        {/* Threats details */}
        <div className="bg-[#252526] border border-[#333333] rounded-lg p-4 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-medium">Threat Details</h2>
            <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">All Resolved</div>
          </div>

          <div className="space-y-3">
            {scanResults.threats.map((threat, i) => (
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
                    <div className="mt-1 flex items-center">
                      <span className="text-xs text-gray-400 mr-2">Action taken:</span>
                      <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                        {threat.action}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#0078d7]/10 border border-[#0078d7]/30 rounded-md">
            <div className="flex items-start">
              <Shield size={20} className="text-[#0078d7] mr-3 mt-0.5" />
              <div>
                <div className="text-white font-medium mb-1">Your system is now protected</div>
                <div className="text-gray-400 text-sm">
                  All detected threats have been quarantined. We recommend running a full system scan weekly to ensure
                  your system remains secure.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => onNavigate("dashboard")}
          className="bg-[#333333] hover:bg-[#3c3c3c] text-gray-300 px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>

        <button
          onClick={() => onNavigate("processing")}
          className="bg-[#0078d7] hover:bg-[#0066b5] text-white px-4 py-2 rounded flex items-center gap-2"
        >
          Run Another Scan
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

