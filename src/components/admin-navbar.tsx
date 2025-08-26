"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, User, Shield, FileText } from "lucide-react"

const navItems = [
  // { name: 'Home', href: '/admin', icon: Home },
  { name: 'User Profile', href: '/admin/user-profile', icon: User },
  { name: 'Security Log', href: '/admin/security-log', icon: Shield },
  // Add more navigation items as needed
]

const NavLinks = ({ vertical = false }: { vertical?: boolean }) => {
  const pathname = usePathname()
  const className = vertical
    ? 'block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
    : 'px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'

  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon || FileText

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`${className} ${isActive
                ? 'bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              } flex items-center space-x-2`}
          >
            <Icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </>
  )
}

export function AdminNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin" className="flex-shrink-0 flex items-center">
              <div className="w-40 h-auto relative dark:invert">
                <Image width={100} height={84} alt="RIL logo" src="/RIL logo.svg" className="" />
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center space-x-4">
            <NavLinks />
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1 bg-white dark:bg-black px-2">
          <NavLinks vertical />
        </div>
      </div>
    </nav>
  )
}
