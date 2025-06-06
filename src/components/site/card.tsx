import React from 'react'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  number: string
  title: string
  subtitle: string
  className?: string
  borderColor?: string
  strokeColor?: string
}

const FeatureCard = ({ 
  number, 
  title, 
  subtitle, 
  className,
  borderColor = "border-purple-500",
  strokeColor = "#a855f7"
}: FeatureCardProps) => {
  return (
    <div className={cn(
      "rounded-2xl border-1 p-6 aspect-square flex flex-col justify-center",
      borderColor,
      "bg-transparent",
      className
    )}>
      <div className="flex flex-col space-y-3 text-center">
        <div 
          className="text-5xl font-bold"
          style={{
            WebkitTextStroke: `2px ${strokeColor}`,
            color: 'transparent'
          }}>
          {number}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>
          <p className="text-base text-white/90">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

const FeatureCards = () => {
  const features = [
    {
      number: "01",
      title: "Seamless",
      subtitle: "scaling",
      borderColor: "border-purple-500",
      strokeColor: "#a855f7"
    },
    {
      number: "02", 
      title: "Enterprise",
      subtitle: "security",
      borderColor: "border-purple-400",
      strokeColor: "#c084fc"
    },
    {
      number: "03",
      title: "Faster time",
      subtitle: "to market", 
      borderColor: "border-blue-500",
      strokeColor: "#3b82f6"
    },
    {
      number: "04",
      title: "Cloud or",
      subtitle: "on-premises",
      borderColor: "border-cyan-400",
      strokeColor: "#22d3ee"
    },
    {
      number: "05",
      title: "Extensive",
      subtitle: "support",
      borderColor: "border-teal-400",
      strokeColor: "#2dd4bf"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6  items-center mt-20">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          number={feature.number}
          title={feature.title}
          subtitle={feature.subtitle}
          borderColor={feature.borderColor}
          strokeColor={feature.strokeColor}
        />
      ))}
    </div>
  )
}

export { FeatureCard, FeatureCards }
export default FeatureCards
