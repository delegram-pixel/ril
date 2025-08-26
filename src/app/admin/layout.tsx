import { ReactNode } from "react"
import { AdminNavbar } from "../../components/admin-navbar"

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-black">
      <AdminNavbar />
      <div className="pt-16 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
