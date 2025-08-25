import { ReactNode } from "react"
import { AdminNavbar } from "../../components/admin-navbar"

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <AdminNavbar />
      <div className="pt-16">
        {children}
      </div>
    </div>
  )
}
