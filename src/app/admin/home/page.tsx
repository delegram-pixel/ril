import { Search, Filter, Download, ChevronLeft, ChevronRight, ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AdminDashboard() {
  const users = [
    {
      id: 1,
      name: "Shammah Nei",
      email: "shammahnei@gmail.com",
      role: "Staff",
      signInTime: "10:48 AM",
      signOutTime: "5:05 PM",
      status: "Complete",
    },
    {
      id: 2,
      name: "Udeme Jonah",
      email: "udemejonah@gmail.com",
      role: "Staff",
      signInTime: "9:30 AM",
      signOutTime: "5:35 PM",
      status: "Complete",
    },
    {
      id: 3,
      name: "Yemi O",
      email: "yemioo@gmail.com",
      role: "Staff",
      signInTime: "9:20 AM",
      signOutTime: "--",
      status: "In Office",
    },
    {
      id: 4,
      name: "Uriella A",
      email: "jewveua@gmail.com",
      role: "Intern",
      signInTime: "10:10 AM",
      signOutTime: "--",
      status: "In Office",
    },
    {
      id: 5,
      name: "John Doe",
      email: "johndoe@gmail.com",
      role: "Visitor",
      signInTime: "11:07 AM",
      signOutTime: "--",
      status: "In Office",
    },
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-end gap-3">
          <span className="text-sm text-black">Quick Actions</span>
          <Link href="/admin/user-profile">
            <Button className="gap-2 bg-blue-500">
              Manage Existing Users
              <ChevronDown className="w-4 h-4" />
            </Button>
          </Link>

          <Link href="/admin/register-new-user">
            <Button className="bg-blue-200 gap-2">
              <Plus className="w-4 h-4" />
              Register New User
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search" 
              className="pl-10 bg-gray-50 border-gray-200 h-10" 
            />
          </div>
        </div>

        {/* Daily Log Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Daily Log</h2>
              <p className="text-gray-600 text-sm">See who&apos;s signed in today</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2 bg-white">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-white">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="w-16 text-left p-4 font-medium text-gray-500 text-xs uppercase tracking-wider">S/N</th>
                    <th className="min-w-[200px] text-left p-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Name</th>
                    <th className="min-w-[200px] text-left p-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Email</th>
                    <th className="w-24 text-left p-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Role</th>
                    <th className="w-32 text-left p-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Sign In</th>
                    <th className="w-36 text-left p-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Sign Out</th>
                    <th className="w-28 text-left p-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-600">{index + 1}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{user.email}</td>
                      <td className="p-4 whitespace-nowrap">
                        <Badge variant="outline" className="text-xs w-full text-center">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{user.signInTime}</td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{user.signOutTime}</td>
                      <td className="p-4">
                        <Badge
                          variant={user.status === "Complete" ? "outline" : "default"}
                          className={
                            user.status === "Complete"
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200"
                              : "bg-green-100 text-green-700 hover:bg-green-100 border-green-200"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">Showing 5 of 5</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-blue-600 text-white hover:bg-blue-700 hover:text-white">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                3
              </Button>
              <span className="text-gray-500 px-2">...</span>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* More Options */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-semibold mb-3">More Options</h3>
            
            <div className="flex items-center gap-2">
              <Link href="/admin/security-log" className="text-blue-600 hover:text-blue-700 p-0 h-auto text-base">
                Security Logs
              </Link>
            </div>
            <p className="text-sm text-gray-600 mt-1">View invalid OTP attempts</p>
          </div>
        </div>
      </div>
    </div>
  )
}
