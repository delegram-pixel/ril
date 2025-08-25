import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function RegisterNewUser() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto p-8">
        {/* Back to Logs */}
        <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Logs</span>
        </Link>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Register New User</h1>
          <p className="text-gray-600">Fill in the following fields to register a new user</p>
        </div>

        {/* Registration Form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input id="fullName" placeholder="Full Name" className="bg-gray-50 border-gray-200" />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input id="email" type="email" placeholder="example@gmail.com" className="bg-gray-50 border-gray-200" />
            </div>

            {/* Contact No */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                Contact No
              </label>
              <Input id="contact" placeholder="Enter phone number" className="bg-gray-50 border-gray-200" />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <Select>
                <SelectTrigger className="bg-gray-50 border-gray-200">
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
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>
            <Input id="position" placeholder="e.g Programs Manager, Visitor" className="bg-gray-50 border-gray-200" />
          </div>

          {/* Register Button */}
          <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base font-medium">Register</Button>
        </form>
      </div>
    </div>
  )
}
