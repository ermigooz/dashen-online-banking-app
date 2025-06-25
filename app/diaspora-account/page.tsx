"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, DollarSign, PoundSterling, Euro, ArrowRight, CheckCircle2, FileText } from "lucide-react"
import DiasporaAccountForm from "@/components/diaspora-account/diaspora-account-form"

export default function DiasporaAccountPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-12 mt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-dashen-red/90 to-dashen-lightRed/90 z-10" />
        <div className="absolute inset-0 bg-[url('/images/world-map-dots.svg')] opacity-20 z-0" />

        <div className="relative z-20 px-8 py-16 md:py-24 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Diaspora Account</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-6">
              Banking solutions designed specifically for Ethiopians living abroad
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-dashen-red hover:bg-white/90"
                onClick={() => setActiveTab("apply")}
              >
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                onClick={() => setActiveTab("features")}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 md:w-[600px] mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features & Benefits</TabsTrigger>
          <TabsTrigger value="apply">Apply Now</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">What is a Diaspora Account?</h2>
              <div className="space-y-4 text-lg">
                <p>Diaspora accounts are special accounts offered to:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-dashen-red mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      Non-residential Ethiopian Nationals working and living outside of Ethiopia for more than one year
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-dashen-red mr-2 flex-shrink-0 mt-0.5" />
                    <span>Non-resident foreign nationals who had been Ethiopian National before</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-dashen-red mr-2 flex-shrink-0 mt-0.5" />
                    <span>Business entities owned by the above mentioned individuals</span>
                  </li>
                </ul>
                <p>
                  With a Diaspora Account at Dashen Bank, you can maintain your balances in foreign currency, operate
                  your account through cheques or electronic payment modes, and enjoy special privileges for fund
                  transfers and withdrawals.
                </p>
              </div>
              <Button className="mt-6 bg-dashen-red hover:bg-dashen-red/90" onClick={() => setActiveTab("apply")}>
                Open Your Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-dashen-red/10 rounded-full blur-xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-dashen-lightRed/10 rounded-full blur-xl" />

              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex justify-center mb-6">
                  <div className="bg-dashen-red/10 p-4 rounded-full">
                    <Globe className="h-12 w-12 text-dashen-red" />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 text-center">Available Currencies</h3>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                    <DollarSign className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="font-medium">USD</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                    <Euro className="h-8 w-8 text-green-600 mb-2" />
                    <span className="font-medium">EUR</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                    <PoundSterling className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="font-medium">GBP</span>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Initial deposit:</strong> $/€/₤ 100
                  </p>
                  <p className="text-sm text-amber-800 mt-2">
                    <strong>Interest earning:</strong> Available on fixed time deposits (minimum USD 5,000 for 3+
                    months)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="h-full border-t-4 border-t-dashen-red">
                <CardHeader>
                  <CardTitle>Account Features</CardTitle>
                  <CardDescription>Exclusive benefits for Diaspora Account holders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-dashen-red/10 p-2 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-5 w-5 text-dashen-red" />
                      </div>
                      <div>
                        <h4 className="font-medium">Foreign Currency Balance</h4>
                        <p className="text-muted-foreground">
                          Keep your balance in USD, EUR, or GBP without conversion to local currency
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-dashen-red/10 p-2 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-5 w-5 text-dashen-red" />
                      </div>
                      <div>
                        <h4 className="font-medium">Multiple Access Methods</h4>
                        <p className="text-muted-foreground">
                          Operate your account through cheques or electronic payment modes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-dashen-red/10 p-2 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-5 w-5 text-dashen-red" />
                      </div>
                      <div>
                        <h4 className="font-medium">Flexible Deposits</h4>
                        <p className="text-muted-foreground">
                          Additional funds can be deposited in foreign currency if declared by customs, returned from
                          travel expenses, or from other Diaspora Accounts
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-dashen-red/10 p-2 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-5 w-5 text-dashen-red" />
                      </div>
                      <div>
                        <h4 className="font-medium">Interest Earning</h4>
                        <p className="text-muted-foreground">
                          Earn competitive interest rates on fixed time deposits (minimum USD 5,000 for 3+ months)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="h-full border-t-4 border-t-dashen-lightRed">
                <CardHeader>
                  <CardTitle>Special Privileges</CardTitle>
                  <CardDescription>Exclusive benefits for diaspora customers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-dashen-lightRed/10 p-2 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-5 w-5 text-dashen-lightRed" />
                      </div>
                      <div>
                        <h4 className="font-medium">International Transfers</h4>
                        <p className="text-muted-foreground">
                          Transfer funds abroad for payments and settlements without pre-approval from Dashen Bank or NBE
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-dashen-lightRed/10 p-2 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-5 w-5 text-dashen-lightRed" />
                      </div>
                      <div>
                        <h4 className="font-medium">Online Banking</h4>
                        <p className="text-muted-foreground">
                          Access your account 24/7 through our secure online banking platform
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-dashen-lightRed/10 p-2 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-5 w-5 text-dashen-lightRed" />
                      </div>
                      <div>
                        <h4 className="font-medium">Mobile Banking</h4>
                        <p className="text-muted-foreground">
                          Manage your account on the go with our mobile banking app
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-dashen-lightRed/10 p-2 rounded-full mr-3 mt-1">
                        <CheckCircle2 className="h-5 w-5 text-dashen-lightRed" />
                      </div>
                      <div>
                        <h4 className="font-medium">Dedicated Support</h4>
                        <p className="text-muted-foreground">
                          Special customer service line for diaspora customers with extended hours
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-dashen-red/5 to-dashen-lightRed/5">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <p>
                    <strong>Documentation Required:</strong> Valid passport, residence permit, and proof of address in
                    your country of residence.
                  </p>
                  <p>
                    <strong>Account Maintenance:</strong> Minimum balance requirements and monthly maintenance fees may
                    apply.
                  </p>
                  <p>
                    <strong>Regulatory Compliance:</strong> All transactions are subject to Ethiopian banking regulations
                    and international compliance standards.
                  </p>
                  <p>
                    For more detailed information about our Diaspora Account services, please contact our customer service or visit your nearest Dashen Bank branch.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="apply">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DiasporaAccountForm />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
