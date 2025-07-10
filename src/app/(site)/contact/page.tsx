"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import ContactInfo from "@/components/contact/phone"
import Newsletter from "@/components/contact/newsletter"
import Message from "@/components/contact/message"
import SocialIcons from "@/components/contact/social"
import Faqs from "@/components/contact/faqs"

export default function ContactPage() {

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="max-w-xl mx-auto">
            Have a question or want some help? We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>
        <div className="flex flex-col gap-14">
          <SocialIcons />
          <Message />
          <ContactInfo />
          <Newsletter />
          <Faqs />
        </div>




      </div>
    </div>
  )
}
