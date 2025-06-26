"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  Building, 
  Landmark, 
  PiggyBank, 
  Target,
  Calendar,
  DollarSign,
  BarChart3,
  Shield,
  Users
} from "lucide-react"

export default function InvestmentOpportunitiesPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const investmentProducts = [
    {
      id: 1,
      title: "Dashen Bank Shares",
      type: "Equity",
      minInvestment: "ETB 1,000",
      expectedReturn: "12-15%",
      riskLevel: "Medium",
      duration: "Long-term",
      description: "Invest in Dashen Bank shares and become a shareholder in Ethiopia's leading private bank.",
      features: ["Dividend payments", "Capital appreciation", "Voting rights", "Annual reports"],
      icon: Building,
      color: "blue"
    },
    {
      id: 2,
      title: "Fixed Deposit Plus",
      type: "Fixed Income",
      minInvestment: "ETB 5,000",
      expectedReturn: "8-10%",
      riskLevel: "Low",
      duration: "6 months - 5 years",
      description: "Secure your savings with guaranteed returns through our enhanced fixed deposit program.",
      features: ["Guaranteed returns", "Flexible terms", "Early withdrawal option", "Compound interest"],
      icon: PiggyBank,
      color: "green"
    },
    {
      id: 3,
      title: "Treasury Bills",
      type: "Government Securities",
      minInvestment: "ETB 1,000",
      expectedReturn: "6-8%",
      riskLevel: "Very Low",
      duration: "91-364 days",
      description: "Invest in Ethiopian government treasury bills for secure, short-term returns.",
      features: ["Government backed", "Short-term", "High liquidity", "Tax advantages"],
      icon: Landmark,
      color: "purple"
    },
    {
      id: 4,
      title: "Mutual Fund Portfolio",
      type: "Diversified",
      minInvestment: "ETB 500",
      expectedReturn: "10-14%",
      riskLevel: "Medium",
      duration: "1-10 years",
      description: "Diversified investment portfolio managed by professional fund managers.",
      features: ["Professional management", "Diversification", "Regular monitoring", "Flexible investment"],
      icon: BarChart3,
      color: "orange"
    }
  ]

  const performanceData = [
    { year: "2020", return: "8.5%" },
    { year: "2021", return: "12.3%" },
    { year: "2022", return: "15.1%" },
    { year: "2023", return: "13.7%" },
    { year: "2024", return: "14.2%" }
  ]

  const investmentStats = [
    { label: "Total Investors", value: "25,000+", icon: Users },
    { label: "Assets Under Management", value: "ETB 2.5B", icon: DollarSign },
    { label: "Average Return", value: "12.8%", icon: TrendingUp },
    { label: "Investment Products", value: "15+", icon: Target }
  ]

  return (
    <div className="container py-8 mt-16">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Investment Opportunities</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Grow your wealth with our diverse range of investment products designed for the Ethiopian diaspora
        </p>
      </motion.div>

      {/* Investment Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {investmentStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-dashen-blue/10 p-3 rounded-full w-fit mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-dashen-blue" />
                </div>
                <div className="text-2xl font-bold text-dashen-blue">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 md:w-[800px] mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-dashen-blue" />
                  Why Invest with Dashen Bank?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Trusted Institution</h4>
                    <p className="text-sm text-muted-foreground">
                      25+ years of banking excellence with strong financial performance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Diversified Portfolio</h4>
                    <p className="text-sm text-muted-foreground">
                      Multiple investment options to match your risk appetite and goals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Expert Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Professional investment team with deep market knowledge
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Competitive Returns</h4>
                    <p className="text-sm text-muted-foreground">
                      Attractive returns that outperform traditional savings accounts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Process</CardTitle>
                <CardDescription>Simple steps to start your investment journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-dashen-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Choose Your Investment</h4>
                      <p className="text-sm text-muted-foreground">
                        Select from our range of investment products
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-dashen-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Complete Application</h4>
                      <p className="text-sm text-muted-foreground">
                        Fill out the investment application form
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-dashen-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Fund Your Investment</h4>
                      <p className="text-sm text-muted-foreground">
                        Transfer funds from your Dashen Bank account
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-dashen-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Track Performance</h4>
                      <p className="text-sm text-muted-foreground">
                        Monitor your investment through our platform
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <div className="grid gap-6 md:grid-cols-2">
            {investmentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`bg-${product.color}-100 p-2 rounded-lg`}>
                        <product.icon className={`h-6 w-6 text-${product.color}-600`} />
                      </div>
                      <Badge variant="outline">{product.type}</Badge>
                    </div>
                    <CardTitle className="text-xl">{product.title}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Min. Investment</p>
                        <p className="font-semibold">{product.minInvestment}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expected Return</p>
                        <p className="font-semibold text-green-600">{product.expectedReturn}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Risk Level</p>
                        <Badge 
                          variant={product.riskLevel === "Low" ? "default" : 
                                  product.riskLevel === "Medium" ? "secondary" : "destructive"}
                        >
                          {product.riskLevel}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">{product.duration}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Key Features:</p>
                      <ul className="text-sm space-y-1">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-dashen-blue rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full bg-dashen-blue hover:bg-dashen-darkBlue">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Historical Performance</CardTitle>
                <CardDescription>Average returns across all investment products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{data.year}</span>
                      <div className="flex items-center gap-3">
                        <Progress value={parseFloat(data.return)} className="w-24" />
                        <span className="font-bold text-green-600">{data.return}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk vs Return Analysis</CardTitle>
                <CardDescription>Compare risk levels and expected returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Treasury Bills</p>
                      <p className="text-sm text-muted-foreground">Very Low Risk</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">6-8%</p>
                      <p className="text-sm text-muted-foreground">Expected Return</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Fixed Deposits</p>
                      <p className="text-sm text-muted-foreground">Low Risk</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">8-10%</p>
                      <p className="text-sm text-muted-foreground">Expected Return</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium">Mutual Funds</p>
                      <p className="text-sm text-muted-foreground">Medium Risk</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">10-14%</p>
                      <p className="text-sm text-muted-foreground">Expected Return</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium">Bank Shares</p>
                      <p className="text-sm text-muted-foreground">Medium Risk</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">12-15%</p>
                      <p className="text-sm text-muted-foreground">Expected Return</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calculator">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Investment Calculator</CardTitle>
              <CardDescription>
                Calculate potential returns on your investment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Target className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Investment Calculator</h3>
                <p className="text-muted-foreground mb-6">
                  This feature will be available soon. Use our advanced investment calculator 
                  to project your potential returns based on different investment scenarios.
                </p>
                <Button className="bg-dashen-blue hover:bg-dashen-darkBlue">
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}