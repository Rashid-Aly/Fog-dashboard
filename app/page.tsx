"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import Dashboard from "@/components/dashboard"
import SettingsScreen from "@/components/settings-screen"
import ProcessingScreen from "@/components/processing-screen"
import CompletionScreen from "@/components/completion-screen"
import WindowFrame from "@/components/window-frame"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<
    "loading" | "dashboard" | "settings" | "processing" | "completion"
  >("loading")
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Simulate loading progress
  useEffect(() => {
    if (currentScreen === "loading") {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const newProgress = prev + Math.random() * 3 + 1
          if (newProgress >= 100) {
            clearInterval(interval)
            setTimeout(() => setCurrentScreen("dashboard"), 500)
            return 100
          }
          return newProgress
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [currentScreen])

  // Render content based on current screen
  const renderContent = () => {
    switch (currentScreen) {
      case "loading":
        return <LoadingScreen progress={loadingProgress} />
      case "dashboard":
        return <Dashboard onNavigate={setCurrentScreen} />
      case "settings":
        return <SettingsScreen onNavigate={setCurrentScreen} />
      case "processing":
        return <ProcessingScreen onNavigate={setCurrentScreen} />
      case "completion":
        return <CompletionScreen onNavigate={setCurrentScreen} />
    }
  }

  return (
    <div className="h-screen w-full  dark ">
      <WindowFrame title="FOG Security Suite" currentScreen={currentScreen} onNavigate={setCurrentScreen}>
        {renderContent()}
      </WindowFrame>
    </div>
  )
}

