import { Search, Grid3X3, List, Edit, Trash2, ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function UserProfiles() {
  const users = [
    {
      id: 1,
      name: "Uriella A",
      role: "Product Design Intern",
      email: "jewveua@gmail.com",
      contact: "0808 251 1156",
      position: "Intern",
      status: "In Office",
      initials: "UA",
    },
    {
      id: 2,
      name: "Hannah Suni",
      role: "Programs Manager",
      email: "hannahsuni@gmail.com",
      contact: "0801 234 5679",
      position: "Staff",
      status: "In Office",
      initials: "HS",
    },
    {
      id: 3,
      name: "John Doe",
      role: "Visitor",
      email: "johndoe@gmail.com",
      contact: "0704 617 3221",
      position: "Visitor",
      status: "In Office",
      initials: "JD",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">User Profiles</h1>
        
            <Button variant="outline" className="gap-2 bg-white">
              All Users
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-black">Quick Actions</span>
            {/* <Link href="/admin/user-profile">
              <Button variant="outline" className="gap-2 bg-white">
                Manage Existing Users
                <ChevronDown className="w-4 h-4" />
              </Button>
            </Link> */}

            <Link href="/admin/register-new-user">
              <Button className="bg-blue-500 hover:bg-blue-600 gap-2">
                <Plus className="w-4 h-4" />
                Register New User
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search" 
              className="pl-10 bg-white border-gray-200 rounded-lg"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 bg-white">
              <List className="w-4 h-4" />
              <span>List</span>
            </Button>
            <Button variant="outline" className="gap-2 bg-white">
              <Grid3X3 className="w-4 h-4" />
              <span>Grid</span>
            </Button>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 text-sm font-medium text-gray-500">
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Contact No</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {/* Users */}
          {users.map((user) => (
            <div key={user.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50">
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">{user.initials}</span>
                </div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.role}</div>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <span>{user.contact}</span>
              </div>
              <div className="col-span-2 flex items-center">
                <Badge variant="outline" className="border-gray-200 text-gray-700">
                  {user.position}
                </Badge>
              </div>
              <div className="col-span-2 flex items-center">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  {user.status}
                </Badge>
              </div>
              <div className="col-span-3 flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-100 hover:bg-blue-50">
                  Generate OTP
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
