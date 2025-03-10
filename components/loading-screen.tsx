interface LoadingScreenProps {
  progress: number
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <div className="h-full w-full bg-[#1e1e1e] flex flex-col items-center justify-center p-8">
      <div className="mb-12">
        <div className="text-[#0078d7] text-6xl font-bold tracking-tighter mb-2 text-center">FOG</div>
        <div className="text-gray-500 text-sm tracking-widest text-center">SECURITY SUITE</div>
      </div>

      <div className="w-full max-w-md">
        <div className="h-2 w-full bg-[#333333] rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-[#0078d7] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs">
          <div className="text-gray-500">Initializing system...</div>
          <div className="text-[#0078d7]">{Math.round(progress)}%</div>
        </div>
      </div>

      <div className="mt-16 max-w-md w-full">
        <div className="text-xs text-gray-500 font-mono">
          {progress > 10 && <div className="mb-1">Loading core modules...</div>}
          {progress > 30 && <div className="mb-1">Initializing security protocols...</div>}
          {progress > 50 && <div className="mb-1">Connecting to secure network...</div>}
          {progress > 70 && <div className="mb-1">Verifying system integrity...</div>}
          {progress > 90 && <div className="mb-1">Preparing dashboard...</div>}
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center text-gray-600 text-xs">
        © 2024 FOG Security Systems • All Rights Reserved
      </div>
    </div>
  )
}

