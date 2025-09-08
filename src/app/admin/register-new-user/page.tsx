'use client'

import { useState } from "react"
import { ArrowLeft, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
// import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog"

interface FormData {
  fullName: string
  email: string
  contact: string
  role: string
  position: string
}

export default function RegisterNewUser() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    contact: '',
    role: '',
    position: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false)
  const [newUserData, setNewUserData] = useState<FormData | null>(null)
  const { toast } = useToast()
  // const router = useRouter()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.contact || !formData.role || !formData.position) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      })
      return
    }

    // Contact number validation (basic)
    const contactNumber = parseInt(formData.contact)
    if (isNaN(contactNumber)) {
      toast({
        title: "Error",
        description: "Please enter a valid contact number",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          contact: contactNumber
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to register user')
      }

      if (response.ok) {
        await response.json()
        setNewUserData(formData)
        setShowWelcomeDialog(true)
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          contact: '',
          role: '',
          position: ''
        })
      }

      toast({
        title: "Success",
        description: "User registered successfully!",
      })


    } catch (error) {
      console.error('Registration error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to register user. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-6">
      <div className="max-w-4xl mx-auto p-8">
        {/* Back to Logs */}
        <Link href="/admin" className="flex items-center gap-2 text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-300 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Logs</span>
        </Link>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Register New User</h1>
          <p className="text-gray-600 dark:text-gray-300">Fill in the following fields to register a new user</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <Input 
                id="fullName" 
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Full Name" 
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@gmail.com" 
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
                required
              />
            </div>

            {/* Contact No */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contact No
              </label>
              <Input 
                id="contact" 
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                placeholder="Enter phone number" 
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
                required
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)} required>
                <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                  <SelectItem value="visitor">Visitor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Position */}
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Position
            </label>
            <Input 
              id="position" 
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              placeholder="e.g Programs Manager, Visitor" 
              className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
              required
            />
          </div>

          {/* Register Button */}
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base font-medium"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>

      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-sm">
          <div className="bg-white rounded-lg shadow-lg w-full p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-blue-600 font-medium text-lg">Register New User</h2>
              <button
                onClick={() => setShowWelcomeDialog(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Success Content */}
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Check className="text-white w-6 h-6" />
              </div>
              <p className="text-gray-900 font-medium text-lg mb-2">Registered</p>
              {newUserData && (
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p>{newUserData.fullName}</p>
                  <p>{newUserData.role} ({newUserData.position})</p>
                  {/* <p className="text-blue-600">Login details sent to {newUserData.email}</p> */}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}