"use client"
import { Search, Filter, Download, ChevronDown, List, Grid3X3, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function SecurityLogs() {
  const securityLogs = [
    {
      id: 1,
      dateTime: "2025-08-12 09:45",
      userEmail: "shammahnei@gmail.com",
      status: "Invalid OTP",
      attempts: 3,
    },
    {
      id: 2,
      dateTime: "2025-08-12 09:42",
      userEmail: "udemejonah@gmail.com",
      status: "Invalid OTP",
      attempts: 1,
    },
  ]

  return (
    <div className="p-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.history.back()} className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-semibold">Security Logs</h1>
            <Button variant="outline" className="gap-2 bg-white">
              All Users
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-black">Quick Actions</span>
            <Button variant="outline" className="gap-2 bg-white">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Search Bar */}
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

        {/* Content */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="hidden md:table-row">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attempts</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-black divide-y divide-gray-200">
              {securityLogs.map((log, index) => (
                <tr key={log.id} className="">
                  {/* Mobile View */}
                  <td className="md:hidden px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                    <div className="font-medium text-black">S/N: {index + 1}</div>
                    <div className="text-black dark:text-white">{log.dateTime}</div>
                    <div className="text-black dark:text-white">{log.userEmail}</div>
                    <div className="mt-2">
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                        {log.status}
                      </Badge>
                      <span className="ml-2 text-red-600 font-medium">
                        {log.attempts} attempts
                      </span> 
                    </div>
                  </td>
                  
                  {/* Desktop View */}
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                    {index + 1}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                    {log.dateTime}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                    {log.userEmail}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                      {log.status}
                    </Badge>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                    {log.attempts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-black dark:text-white">
            Showing {securityLogs.length} of {securityLogs.length}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-blue-600 text-white hover:bg-blue-700">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <span className="text-gray-400 px-2">...</span>
            <Button variant="outline" size="sm" className="h-8 px-3">
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
