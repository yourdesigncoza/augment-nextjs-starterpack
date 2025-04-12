"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Pricing tiers and features
const tiers = [
  {
    name: "Starter",
    basePrice: { monthly: 29, yearly: 290 },
    description: "Perfect for small projects and individuals",
    features: ["5 projects", "Up to 10 users", "Basic analytics", "24-hour support"],
    notIncluded: ["Advanced security", "Custom domain", "API access", "Dedicated support"],
    pricePerUser: { monthly: 5, yearly: 50 },
    pricePerProject: { monthly: 10, yearly: 100 },
    pricePerStorage: { monthly: 2, yearly: 20 },
    highlight: false,
    buttonVariant: "outline" as const,
  },
  {
    name: "Professional",
    basePrice: { monthly: 59, yearly: 590 },
    description: "Ideal for growing teams and businesses",
    features: ["15 projects", "Up to 50 users", "Advanced analytics", "Priority support", "Advanced security"],
    notIncluded: ["Custom domain", "API access"],
    pricePerUser: { monthly: 4, yearly: 40 },
    pricePerProject: { monthly: 8, yearly: 80 },
    pricePerStorage: { monthly: 1.5, yearly: 15 },
    highlight: true,
    buttonVariant: "default" as const,
  },
  {
    name: "Enterprise",
    basePrice: { monthly: 99, yearly: 990 },
    description: "For large organizations with complex needs",
    features: ["Unlimited projects", "Unlimited users", "Premium analytics", "24/7 dedicated support", "Advanced security", "Custom domain", "API access"],
    notIncluded: [],
    pricePerUser: { monthly: 3, yearly: 30 },
    pricePerProject: { monthly: 6, yearly: 60 },
    pricePerStorage: { monthly: 1, yearly: 10 },
    highlight: false,
    buttonVariant: "outline" as const,
  },
]

export default function PricingCalculator() {
  // State for billing period
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")
  
  // State for usage sliders
  const [users, setUsers] = useState(5)
  const [projects, setProjects] = useState(3)
  const [storage, setStorage] = useState(10)
  
  // State for additional options
  const [addSupport, setAddSupport] = useState(false)
  
  // Calculate prices for each tier based on current selections
  const calculatePrice = (tier: typeof tiers[0]) => {
    const period = billingPeriod
    let price = tier.basePrice[period]
    
    // Add costs based on usage
    price += users * tier.pricePerUser[period]
    price += projects * tier.pricePerProject[period]
    price += storage * tier.pricePerStorage[period]
    
    // Add premium support if selected
    if (addSupport) {
      price += period === "monthly" ? 49 : 490
    }
    
    return price
  }

  // Calculate savings when paying yearly
  const calculateSavings = (tier: typeof tiers[0]) => {
    const monthlyTotal = calculatePrice({ ...tier, basePrice: tier.basePrice, pricePerUser: tier.pricePerUser, pricePerProject: tier.pricePerProject, pricePerStorage: tier.pricePerStorage })
    const yearlyTotal = calculatePrice({ ...tier, basePrice: { monthly: tier.basePrice.yearly / 12, yearly: tier.basePrice.yearly }, pricePerUser: { monthly: tier.pricePerUser.yearly / 12, yearly: tier.pricePerUser.yearly }, pricePerProject: { monthly: tier.pricePerProject.yearly / 12, yearly: tier.pricePerProject.yearly }, pricePerStorage: { monthly: tier.pricePerStorage.yearly / 12, yearly: tier.pricePerStorage.yearly } })
    
    return Math.round((monthlyTotal * 12 - yearlyTotal * 12) / (monthlyTotal * 12) * 100)
  }

  return (
    <div className="space-y-8">
      {/* Billing period selector */}
      <div className="flex justify-center">
        <Tabs defaultValue="monthly" className="w-full max-w-md" onValueChange={(value) => setBillingPeriod(value as "monthly" | "yearly")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly <Badge variant="outline" className="ml-2 bg-primary/20">Save 20%</Badge></TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Usage sliders */}
      <Card>
        <CardHeader>
          <CardTitle>Customize Your Plan</CardTitle>
          <CardDescription>Adjust these sliders to match your needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="users">Team Members: {users}</Label>
              <span className="text-muted-foreground text-sm">${billingPeriod === "monthly" ? "4" : "40"}/user</span>
            </div>
            <Slider id="users" min={1} max={100} step={1} value={[users]} onValueChange={(value) => setUsers(value[0])} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="projects">Projects: {projects}</Label>
              <span className="text-muted-foreground text-sm">${billingPeriod === "monthly" ? "8" : "80"}/project</span>
            </div>
            <Slider id="projects" min={1} max={50} step={1} value={[projects]} onValueChange={(value) => setProjects(value[0])} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="storage">Storage (GB): {storage}</Label>
              <span className="text-muted-foreground text-sm">${billingPeriod === "monthly" ? "1.5" : "15"}/GB</span>
            </div>
            <Slider id="storage" min={5} max={1000} step={5} value={[storage]} onValueChange={(value) => setStorage(value[0])} />
          </div>
          
          <div className="flex items-center space-x-2 pt-4">
            <Switch id="premium-support" checked={addSupport} onCheckedChange={setAddSupport} />
            <Label htmlFor="premium-support">Add Premium Support (${billingPeriod === "monthly" ? "49" : "490"})</Label>
          </div>
        </CardContent>
      </Card>

      {/* Pricing tiers */}
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => {
          const price = calculatePrice(tier)
          const savings = calculateSavings(tier)
          
          return (
            <Card key={tier.name} className={tier.highlight ? "border-primary shadow-lg" : ""}>
              {tier.highlight && (
                <Badge className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-primary text-primary-foreground">
                  Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${price}</span>
                  <span className="text-muted-foreground">/{billingPeriod === "monthly" ? "month" : "year"}</span>
                  
                  {billingPeriod === "yearly" && (
                    <Badge variant="outline" className="ml-2 bg-primary/20">Save {savings}%</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  
                  {tier.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-center text-muted-foreground">
                      <X className="mr-2 h-4 w-4" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant={tier.buttonVariant} className="w-full">
                  {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Feature comparison */}
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
          <CardDescription>See what's included in each plan</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Starter</TableHead>
                <TableHead>Professional</TableHead>
                <TableHead>Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Projects</TableCell>
                <TableCell>5</TableCell>
                <TableCell>15</TableCell>
                <TableCell>Unlimited</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Team Members</TableCell>
                <TableCell>Up to 10</TableCell>
                <TableCell>Up to 50</TableCell>
                <TableCell>Unlimited</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Storage</TableCell>
                <TableCell>10GB</TableCell>
                <TableCell>50GB</TableCell>
                <TableCell>Unlimited</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Analytics</TableCell>
                <TableCell>Basic</TableCell>
                <TableCell>Advanced</TableCell>
                <TableCell>Premium</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Support</TableCell>
                <TableCell>24-hour</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>24/7 Dedicated</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Advanced Security</TableCell>
                <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
                <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Custom Domain</TableCell>
                <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>API Access</TableCell>
                <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                <TableCell><Check className="h-4 w-4 text-primary" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
