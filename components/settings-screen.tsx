"use client";

import { useState } from "react";
import {
  Shield,
  Bell,
  Clock,
  Lock,
  Eye,
  Database,
  Zap,
  Wifi,
  Monitor,
  HardDrive,
  X,
} from "lucide-react";

interface SettingsScreenProps {
  onNavigate: (
    screen: "dashboard" | "settings" | "processing" | "completion"
  ) => void;
}

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [activeTab, setActiveTab] = useState("security");

  return (
    <div className="h-full bg-[#1e1e1e] flex">
      {/* Settings sidebar */}
      <div className="w-56 bg-[#252526] border-r border-[#333333] p-4">
        <h2 className="text-white font-medium mb-4">Settings</h2>

        <div className="space-y-1">
          {[
            { id: "security", label: "Security", icon: Shield },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "scanning", label: "Scanning", icon: Clock },
            { id: "privacy", label: "Privacy", icon: Eye },
            { id: "firewall", label: "Firewall", icon: Lock },
            { id: "database", label: "Database", icon: Database },
            { id: "performance", label: "Performance", icon: Zap },
            { id: "network", label: "Network", icon: Wifi },
            { id: "display", label: "Display", icon: Monitor },
            { id: "storage", label: "Storage", icon: HardDrive },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                activeTab === tab.id
                  ? "bg-[#0078d7] text-white"
                  : "text-gray-300 hover:bg-[#2d2d2d]"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === "security" && (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">
              Security Settings
            </h1>
            <p className="text-gray-400 mb-6">
              Configure your security preferences
            </p>

            <div className="space-y-6">
              {/* Protection Level */}
              <div className="bg-[#252526] border border-[#333333] rounded-lg p-4">
                <h3 className="text-white font-medium mb-4">
                  Protection Level
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      id: "standard",
                      label: "Standard",
                      description: "Balanced protection for everyday use",
                    },
                    {
                      id: "high",
                      label: "High",
                      description:
                        "Enhanced protection with additional scanning",
                    },
                    {
                      id: "maximum",
                      label: "Maximum",
                      description: "Maximum security with performance impact",
                    },
                  ].map((level) => (
                    <div
                      key={level.id}
                      className={`border rounded-md p-4 cursor-pointer ${
                        level.id === "high"
                          ? "border-[#0078d7] bg-[#0078d7]/10"
                          : "border-[#333333] hover:border-[#444444]"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 border-2 ${
                            level.id === "high"
                              ? "border-[#0078d7] bg-[#0078d7]"
                              : "border-[#555555]"
                          }`}
                        >
                          {level.id === "high" && (
                            <div className="w-2 h-2 bg-[#1e1e1e] rounded-full m-0.5"></div>
                          )}
                        </div>
                        <span
                          className={`font-medium ${level.id === "high" ? "text-[#0078d7]" : "text-gray-300"}`}
                        >
                          {level.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {level.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Features */}

              <div className="space-y-4">
                {[
                  {
                    id: "realtime",
                    label: "Real-time Protection",
                    description: "Continuously monitor for threats",
                    enabled: true,
                  },
                  {
                    id: "behavior",
                    label: "Behavior Analysis",
                    description: "Detect threats based on behavior patterns",
                    enabled: true,
                  },
                  {
                    id: "ransomware",
                    label: "Ransomware Protection",
                    description: "Prevent ransomware file encryption",
                    enabled: true,
                  },
                  {
                    id: "ransomware-duplicate",
                    label: "Ransomware Protection",
                    description: "Prevent ransomware file encryption",
                    enabled: true,
                  },
                  {
                    id: "exploit",
                    label: "Exploit Protection",
                    description: "Block exploit attempts on applications",
                    enabled: false,
                  },
                  {
                    id: "webcam",
                    label: "Webcam Protection",
                    description: "Control access to your webcam",
                    enabled: false,
                  },
                ].map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="text-gray-200 text-sm font-medium">
                        {feature.label}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {feature.description}
                      </div>
                    </div>
                    <div
                      className={`w-12 h-6 rounded-full p-1 ${feature.enabled ? "bg-[#0078d7]" : "bg-[#333333]"}`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                          feature.enabled ? "translate-x-6" : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Exclusions */}
              <div className="bg-[#252526] border border-[#333333] rounded-lg p-4">
                <h3 className="text-white font-medium mb-4">Scan Exclusions</h3>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">
                    Excluded Files and Folders
                  </div>
                  <div className="space-y-2">
                    {[
                      "C:\\Program Files\\Development\\cache",
                      "D:\\Backups\\system_backup.img",
                    ].map((path, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-[#333333] p-2 rounded"
                      >
                        <span className="text-gray-300 text-sm font-mono">
                          {path}
                        </span>
                        <button className="text-gray-500 hover:text-red-400">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="text-sm bg-[#333333] hover:bg-[#3c3c3c] text-gray-300 px-3 py-1.5 rounded flex items-center gap-1">
                  <span>Add Exclusion</span>
                </button>
              </div>

              {/* Advanced Settings */}
              <div className="bg-[#252526] border border-[#333333] rounded-lg p-4">
                <h3 className="text-white font-medium mb-4">
                  Advanced Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">
                      Scan Archive Files
                    </div>
                    <select className="w-full bg-[#333333] border border-[#444444] rounded p-2 text-gray-300">
                      <option>Always</option>
                      <option>Only small archives</option>
                      <option>Never</option>
                    </select>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-2">
                      Threat Detection Level
                    </div>
                    <div className="w-full bg-[#333333] rounded-full h-2">
                      <div
                        className="bg-[#0078d7] h-2 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Standard</span>
                      <span>Moderate</span>
                      <span>Aggressive</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-200 text-sm font-medium">
                        Cloud-based Detection
                      </div>
                      <div className="text-gray-500 text-xs">
                        Use cloud services to improve detection
                      </div>
                    </div>
                    <div className="w-12 h-6 rounded-full p-1 bg-[#0078d7]">
                      <div className="w-4 h-4 rounded-full bg-white transform translate-x-6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "security" && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl text-gray-400 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                Settings
              </h2>
              <p className="text-gray-600">
                This settings panel is not implemented in the demo.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
