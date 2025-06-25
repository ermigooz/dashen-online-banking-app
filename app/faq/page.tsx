"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, Mail, Phone, FileText, Search } from "lucide-react"

// Mock FAQ data
const faqData = [
  {
    category: "Investments",
    items: [
      {
        question: "How do I purchase additional shares?",
        answer:
          "To purchase additional shares, you can contact our investment department at investments@zemenbank.com or visit any of our branches with your identification and shareholder number.",
      },
      {
        question: "What is the minimum number of shares I can purchase?",
        answer:
          "The minimum number of shares for initial purchase is 10 shares. For additional purchases, there is no minimum requirement.",
      },
      {
        question: "How is the share value determined?",
        answer:
          "Share value is determined by the bank's board of directors based on the bank's financial performance, assets, and market conditions. The value is typically reviewed quarterly.",
      },
    ],
  },
  {
    category: "Dividends",
    items: [
      {
        question: "When are dividends distributed?",
        answer:
          "Dividends are typically distributed semi-annually, at the end of June and December, following approval by the board of directors.",
      },
      {
        question: "How are dividend amounts calculated?",
        answer:
          "Dividend amounts are calculated based on the bank's profit, the number of shares you own, and the dividend rate approved by the board of directors.",
      },
      {
        question: "Can I reinvest my dividends to purchase more shares?",
        answer:
          "Yes, we offer a Dividend Reinvestment Plan (DRIP) that allows you to automatically reinvest your dividends to purchase additional shares. You can enroll in this program through your online account or by contacting our shareholder services department.",
      },
    ],
  },
  {
    category: "Account Management",
    items: [
      {
        question: "How can I update my contact information?",
        answer:
          "You can update your contact information by logging into your account on the Diaspora Hub and navigating to the Profile Settings page.",
      },
      {
        question: "What should I do if I forget my password?",
        answer:
          "If you forget your password, click on the 'Forgot Password' link on the login page. You will receive instructions to reset your password via your registered email address.",
      },
      {
        question: "How can I transfer my shares to another person?",
        answer:
          "To transfer shares, you need to complete a Share Transfer Form, which can be downloaded from our website or obtained from any of our branches. Both the transferor and transferee must sign the form, and it must be submitted along with required identification documents.",
      },
    ],
  },
  {
    category: "Meetings",
    items: [
      {
        question: "How can I attend shareholder meetings if I live abroad?",
        answer:
          "Shareholder meetings are typically broadcast online via secure video conferencing. You will receive an invitation with login details prior to the meeting.",
      },
      {
        question: "How often are shareholder meetings held?",
        answer:
          "The Annual General Meeting (AGM) is held once a year, typically within six months after the end of the fiscal year. Extraordinary General Meetings (EGMs) may be called as needed throughout the year.",
      },
      {
        question: "Can I vote if I cannot attend a meeting?",
        answer:
          "Yes, you can vote by proxy. You will receive proxy forms before each meeting, which you can complete and return to designate someone to vote on your behalf.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter FAQs based on search query and active category
  const filteredFAQs = faqData.flatMap((category) => {
    return category.items
      .filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .map((item) => ({ ...item, category: category.category }))
  })

  const categoryFilteredFAQs =
    activeCategory === "all" ? filteredFAQs : filteredFAQs.filter((item) => item.category === activeCategory)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="container py-8 mt-16">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">FAQs & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about Zemen Bank shareholding, dividends, and more. If you need additional
          help, our support team is ready to assist you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search FAQs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <Tabs defaultValue="faqs" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="faqs">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-1">
              <div className="space-y-2">
                <Button
                  variant={activeCategory === "all" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveCategory("all")}
                >
                  All Categories
                </Button>
                {faqData.map((category) => (
                  <Button
                    key={category.category}
                    variant={activeCategory === category.category ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setActiveCategory(category.category)}
                  >
                    {category.category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="md:col-span-4">
              <motion.div variants={container} initial="hidden" animate="show">
                <Accordion type="single" collapsible className="space-y-4">
                  {categoryFilteredFAQs.length > 0 ? (
                    categoryFilteredFAQs.map((faq, index) => (
                      <motion.div key={index} variants={item}>
                        <AccordionItem value={`item-${index}`} className="border rounded-lg px-4">
                          <AccordionTrigger className="text-left">
                            <div className="flex items-start">
                              <HelpCircle className="h-5 w-5 mr-2 flex-shrink-0 text-zemen-blue" />
                              <span>{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pl-7">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No FAQs Found</h3>
                      <p className="text-muted-foreground mt-2">Try adjusting your search or category filter</p>
                    </div>
                  )}
                </Accordion>
              </motion.div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-zemen-blue" />
                  Email Support
                </CardTitle>
                <CardDescription>Send us an email and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email address" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="What is your inquiry about?" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Please describe your issue or question in detail"
                      ></textarea>
                    </div>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-zemen-blue" />
                    Phone Support
                  </CardTitle>
                  <CardDescription>Call our dedicated shareholder support line</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Phone className="h-5 w-5 text-zemen-blue" />
                      </div>
                      <div>
                        <p className="font-medium">International</p>
                        <p className="text-muted-foreground">+251 116 393 868</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Phone className="h-5 w-5 text-zemen-blue" />
                      </div>
                      <div>
                        <p className="font-medium">Ethiopia (Toll-Free)</p>
                        <p className="text-muted-foreground">8686</p>
                      </div>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <p className="text-sm text-muted-foreground">
                        Our support team is available Monday to Friday, 8:00 AM to 5:00 PM EAT (East Africa Time).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Downloadable Resources
                  </CardTitle>
                  <CardDescription>Access forms and guides for common shareholder needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Share Transfer Form
                      </Button>
                    </li>
                    <li>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Dividend Reinvestment Plan Form
                      </Button>
                    </li>
                    <li>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Shareholder Guide (PDF)
                      </Button>
                    </li>
                    <li>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Tax Information Guide
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="resources">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <Card>
              <CardHeader>
                <CardTitle>Shareholder Guide</CardTitle>
                <CardDescription>A comprehensive guide to being a Zemen Bank shareholder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  This guide covers everything from understanding your share certificate to participating in shareholder
                  meetings and voting.
                </p>
                <Button className="w-full">Download PDF</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dividend Information</CardTitle>
                <CardDescription>Learn about dividend policies, payment schedules, and taxation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Understand how dividends are calculated, when they are paid, and what tax implications you should be
                  aware of as a shareholder.
                </p>
                <Button className="w-full">Download PDF</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forms & Documents</CardTitle>
                <CardDescription>Access all necessary forms for shareholder transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Share Transfer Form</li>
                  <li>• Dividend Reinvestment Plan Form</li>
                  <li>• Change of Address Form</li>
                  <li>• Proxy Voting Form</li>
                </ul>
                <Button className="w-full">View All Forms</Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
