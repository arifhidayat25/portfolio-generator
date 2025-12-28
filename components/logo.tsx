import { Briefcase } from "lucide-react"

export function Logo({ className = "h-10 w-10", iconClassName = "h-5 w-5" }: { className?: string, iconClassName?: string }) {
  return (
    <div className={`${className} bg-gradient-to-br from-[#5a7cfd] to-[#1a2350] rounded-xl flex items-center justify-center shadow-lg shadow-[#5a7cfd]/25`}>
      <Briefcase className={`${iconClassName} text-white`} />
    </div>
  )
}
