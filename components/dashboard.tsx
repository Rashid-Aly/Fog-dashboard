"use client"

import { Shield, AlertTriangle, Clock, Activity, Lock, Server, Zap, ChevronRight, BarChart3, Play } from "lucide-react"

interface DashboardProps {
  onNavigate: (screen: "dashboard" | "settings" | "processing" | "completion") => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="h-full bg-[#1e1e1e] p-6 overflow-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Security Dashboard</h1>
          <p className="text-gray-400">System overview and security status</p>
        </div>
        <button
          onClick={() => onNavigate("processing")}
          className="bg-[#0078d7] hover:bg-[#0066b5] text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Play size={18} />
          <span>Run Quick Scan</span>
        </button>
      </div>

      {/* Security Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#252526] border border-[#333333] rounded-lg p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
            <Shield className="text-green-500" size={24} />
          </div>
          <div>
            <div className="text-gray-400 text-sm">Security Status</div>
            <div className="text-white font-medium">Protected</div>
          </div>
        </div>

        <div className="bg-[#252526] border border-[#333333] rounded-lg p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mr-4">
            <AlertTriangle className="text-yellow-500" size={24} />
          </div>
          <div>
            <div className="text-gray-400 text-sm">Threats Detected</div>
            <div className="text-white font-medium">
              2 <span className="text-xs text-gray-500">(Last 24h)</span>
            </div>
          </div>
        </div>

        <div className="bg-[#252526] border border-[#333333] rounded-lg p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
            <Clock className="text-blue-500" size={24} />
          </div>
          <div>
            <div className="text-gray-400 text-sm">Last Scan</div>
            <div className="text-white font-medium">2 hours ago</div>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Graph */}
          <div className="bg-[#252526] border border-[#333333] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-medium">Network Activity</h2>
              <div className="flex gap-2">
                <button className="text-xs bg-[#333333] hover:bg-[#3c3c3c] text-gray-300 px-2 py-1 rounded">24h</button>
                <button className="text-xs bg-[#0078d7] text-white px-2 py-1 rounded">7d</button>
                <button className="text-xs bg-[#333333] hover:bg-[#3c3c3c] text-gray-300 px-2 py-1 rounded">30d</button>
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-1 px-2">
              {[35, 28, 45, 65, 35, 50, 70, 45, 60, 75, 50, 40, 55, 70, 65, 80, 60, 45, 55, 70, 65, 50, 40, 30].map(
                (value, i) => (
                  <div
                    key={i}
                    className="bg-[#0078d7] hover:bg-[#0066b5] w-full rounded-t transition-all duration-300"
                    style={{ height: `${value}%` }}
                  ></div>
                ),
              )}
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </div>

          {/* Threat Log */}
          <div className="bg-[#252526] border border-[#333333] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-medium">Recent Threats</h2>
              <button className="text-xs text-[#0078d7] hover:text-[#0066b5] hover:underline flex items-center">
                View All <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-1">
              {[
                { time: "10:42", type: "Malware", source: "192.168.1.105", severity: "high", status: "blocked" },
                {
                  time: "08:27",
                  type: "Suspicious Login",
                  source: "admin@company.com",
                  severity: "medium",
                  status: "flagged",
                },
                { time: "Yesterday", type: "Port Scan", source: "45.33.102.67", severity: "low", status: "blocked" },
                {
                  time: "Mar 8",
                  type: "Phishing Attempt",
                  source: "mail.suspicious-domain.com",
                  severity: "high",
                  status: "quarantined",
                },
              ].map((threat, i) => (
                <div key={i} className="flex items-center text-sm p-2 hover:bg-[#2d2d2d] rounded-md">
                  <div
                    className={`w-2 h-2 rounded-full mr-3 ${
                      threat.severity === "high"
                        ? "bg-red-500"
                        : threat.severity === "medium"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="text-gray-400 w-20">{threat.time}</div>
                  <div className="text-white flex-1">{threat.type}</div>
                  <div className="text-gray-400 flex-1 truncate">{threat.source}</div>
                  <div
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      threat.status === "blocked"
                        ? "bg-green-500/20 text-green-400"
                        : threat.status === "quarantined"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {threat.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* System Status */}
          <div className="bg-[#252526] border border-[#333333] rounded-lg p-4">
            <h2 className="text-white font-medium mb-4">System Status</h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">CPU Usage</span>
                  <span className="text-gray-300">42%</span>
                </div>
                <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0078d7]" style={{ width: "42%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Memory</span>
                  <span className="text-gray-300">3.2/8 GB</span>
                </div>
                <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8a2be2]" style={{ width: "40%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Disk</span>
                  <span className="text-gray-300">156/512 GB</span>
                </div>
                <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3498db]" style={{ width: "30%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Network</span>
                  <span className="text-gray-300">5.2 Mbps</span>
                </div>
                <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2ecc71]" style={{ width: "65%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Protection Modules */}
          <div className="bg-[#252526] border border-[#333333] rounded-lg p-4">
            <h2 className="text-white font-medium mb-4">Protection Modules</h2>

            <div className="space-y-1">
              {[
                { name: "Firewall", icon: Lock, status: "active" },
                { name: "Malware Scanner", icon: Shield, status: "active" },
                { name: "Network Monitor", icon: Activity, status: "active" },
                { name: "Intrusion Detection", icon: AlertTriangle, status: "active" },
                { name: "Data Encryption", icon: Lock, status: "disabled" },
              ].map((module, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-[#2d2d2d] rounded-md">
                  <div className="flex items-center">
                    <module.icon size={16} className="text-[#0078d7] mr-3" />
                    <span className="text-gray-300 text-sm">{module.name}</span>
                  </div>
                  <div
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      module.status === "active" ? "bg-green-500/20 text-green-400" : "bg-[#333333] text-gray-400"
                    }`}
                  >
                    {module.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#252526] border border-[#333333] rounded-lg p-4">
            <h2 className="text-white font-medium mb-4">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onNavigate("processing")}
                className="bg-[#0078d7] hover:bg-[#0066b5] text-white rounded-md p-3 flex flex-col items-center justify-center"
              >
                <Shield size={20} className="mb-1" />
                <span className="text-xs">Quick Scan</span>
              </button>

              <button className="bg-[#333333] hover:bg-[#3c3c3c] text-gray-300 rounded-md p-3 flex flex-col items-center justify-center">
                <Server size={20} className="mb-1" />
                <span className="text-xs">Update</span>
              </button>

              <button className="bg-[#333333] hover:bg-[#3c3c3c] text-gray-300 rounded-md p-3 flex flex-col items-center justify-center">
                <BarChart3 size={20} className="mb-1" />
                <span className="text-xs">Reports</span>
              </button>

              <button className="bg-[#333333] hover:bg-[#3c3c3c] text-gray-300 rounded-md p-3 flex flex-col items-center justify-center">
                <Zap size={20} className="mb-1" />
                <span className="text-xs">Optimize</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

