"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Upload, DollarSign, Euro, PoundSterling } from "lucide-react"

// Form schema
const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required." }),

  // Residency Information
  countryOfResidence: z.string().min(1, { message: "Country of residence is required." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(1, { message: "City is required." }),
  postalCode: z.string().optional(),

  // Account Details
  accountType: z.enum(["individual", "business"]),
  currency: z.enum(["usd", "eur", "gbp"]),

  // Identification
  idType: z.enum(["passport", "residencePermit", "nationalID"]),
  idNumber: z.string().min(5, { message: "ID number must be at least 5 characters." }),

  // Additional Information
  occupation: z.string().min(2, { message: "Occupation must be at least 2 characters." }),
  sourceOfFunds: z.string().min(5, { message: "Source of funds must be at least 5 characters." }),

  // Terms and Conditions
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
})

export default function DiasporaAccountForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState("")

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      countryOfResidence: "",
      address: "",
      city: "",
      postalCode: "",
      accountType: "individual",
      currency: "usd",
      idType: "passport",
      idNumber: "",
      occupation: "",
      sourceOfFunds: "",
      termsAccepted: false,
    },
  })

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", values)

    // Generate a random application ID
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase()
    setApplicationId(`ZB-DA-${randomId}`)

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  // Next step handler
  const goToNextStep = async () => {
    if (currentStep === 1) {
      const personalFields = ["firstName", "lastName", "email", "phone", "dateOfBirth"]
      const result = await form.trigger(personalFields as any)
      if (!result) return
    } else if (currentStep === 2) {
      const residencyFields = ["countryOfResidence", "address", "city"]
      const result = await form.trigger(residencyFields as any)
      if (!result) return
    } else if (currentStep === 3) {
      const accountFields = ["accountType", "currency", "idType", "idNumber"]
      const result = await form.trigger(accountFields as any)
      if (!result) return
    }

    setCurrentStep((prev) => prev + 1)
  }

  // Previous step handler
  const goToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  // If form is submitted, show success message
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Application Submitted Successfully</CardTitle>
            </div>
            <CardDescription className="text-green-700">
              Your Diaspora Account application has been received
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="font-medium text-green-800">Application Reference Number:</p>
                <p className="text-2xl font-bold text-green-700">{applicationId}</p>
                <p className="text-sm text-green-600 mt-2">Please save this reference number for future inquiries.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Next Steps:</h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-700 text-sm font-medium">1</span>
                    </div>
                    <p>Our team will review your application within 1-2 business days.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-700 text-sm font-medium">2</span>
                    </div>
                    <p>
                      You will receive an email with instructions to verify your identity and complete the KYC process.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-700 text-sm font-medium">3</span>
                    </div>
                    <p>
                      Once your application is approved, you will receive your account details and instructions for
                      making your initial deposit.
                    </p>
                  </li>
                </ol>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  For security reasons, we may contact you to verify some information. Please ensure your contact
                  details are correct.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <Button className="bg-dashen-red hover:bg-dashen-red/90">Return to Homepage</Button>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Diaspora Account Application</CardTitle>
              <CardDescription>Complete the form below to apply for a Diaspora Account</CardDescription>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-dashen-red text-white" : "bg-muted text-muted-foreground"}`}
              >
                1
              </span>
              <span className="h-px w-4 bg-muted"></span>
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-dashen-red text-white" : "bg-muted text-muted-foreground"}`}
              >
                2
              </span>
              <span className="h-px w-4 bg-muted"></span>
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-dashen-red text-white" : "bg-muted text-muted-foreground"}`}
              >
                3
              </span>
              <span className="h-px w-4 bg-muted"></span>
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 4 ? "bg-dashen-red text-white" : "bg-muted text-muted-foreground"}`}
              >
                4
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium text-blue-800 mb-2">Personal Information</h3>
                    <p className="text-sm text-blue-700">
                      Please provide your personal details as they appear on your official identification documents.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          We'll send important updates about your application to this email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="bg-purple-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium text-purple-800 mb-2">Residency Information</h3>
                    <p className="text-sm text-purple-700">
                      Please provide details about your current residence outside of Ethiopia.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="countryOfResidence"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country of Residence</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your country of residence" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal/ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your postal code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="bg-amber-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium text-amber-800 mb-2">Account Details</h3>
                    <p className="text-sm text-amber-700">Choose your preferred account type and currency.</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Account Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="individual" id="individual" />
                              <label
                                htmlFor="individual"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Individual Account
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="business" id="business" />
                              <label
                                htmlFor="business"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Business Account
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Currency</FormLabel>
                        <FormControl>
                          <Tabs defaultValue={field.value} onValueChange={field.onChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="usd" className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                <span>USD</span>
                              </TabsTrigger>
                              <TabsTrigger value="eur" className="flex items-center gap-2">
                                <Euro className="h-4 w-4" />
                                <span>EUR</span>
                              </TabsTrigger>
                              <TabsTrigger value="gbp" className="flex items-center gap-2">
                                <PoundSterling className="h-4 w-4" />
                                <span>GBP</span>
                              </TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="idType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select ID type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="passport">Passport</SelectItem>
                              <SelectItem value="residencePermit">Residence Permit</SelectItem>
                              <SelectItem value="nationalID">National ID</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="idNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your ID number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Upload className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        You will be asked to upload a copy of your ID document after submitting this application.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="bg-green-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium text-green-800 mb-2">Additional Information</h3>
                    <p className="text-sm text-green-700">
                      Please provide some additional information to complete your application.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your occupation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sourceOfFunds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source of Funds</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please describe the source of funds for this account (e.g., salary, business income, investments)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I accept the terms and conditions</FormLabel>
                          <FormDescription>
                            By checking this box, you agree to Dashen Bank's terms and conditions, privacy policy, and
                            consent to the processing of your personal data in accordance with Ethiopian banking
                            regulations.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              <div className="flex justify-between pt-4 border-t">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={goToPreviousStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentStep < 4 ? (
                  <Button type="button" onClick={goToNextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-dashen-red hover:bg-dashen-red/90" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
