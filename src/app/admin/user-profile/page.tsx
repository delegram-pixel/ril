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
    <div className="min-h-screen bg-white dark:bg-black p-6">
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
        <div className="bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 ">
              <tr className="hidden md:table-row">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider">Contact No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-black  uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className=" ">
                  {/* Mobile View */}
                  <td className="md:hidden px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">{user.initials}</span>
                      </div>
                      <div>
                        <div className="font-medium text-black dark:text-white">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.role}</div>
                        <div className="mt-1 text-sm">{user.contact}</div>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                            {user.position}
                          </Badge>
                          <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900">
                            {user.status}
                          </Badge>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <Button variant="outline" size="sm" className="text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-950">
                            Generate OTP
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Desktop View */}
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">{user.initials}</span>
                      </div>
                      <div>
                        <div className="font-medium text-black dark:text-white">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                    {user.contact}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline" className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                      {user.position}
                    </Badge>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900">
                      {user.status}
                    </Badge>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" className="text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-950">
                        Generate OTP
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
