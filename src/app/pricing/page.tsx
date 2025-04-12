import { Metadata } from "next"
import PricingCalculator from "@/components/pricing-calculator"

export const metadata: Metadata = {
  title: "Pricing Calculator",
  description: "Calculate the perfect plan for your needs",
}

export default function PricingPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Pricing Calculator</h1>
        <p className="text-muted-foreground max-w-[700px]">
          Choose the perfect plan for your needs. Adjust the sliders to see how your usage affects pricing.
        </p>
      </div>
      <PricingCalculator />
    </div>
  )
}
