"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"

export function AdminNavbar() {
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin" className="flex-shrink-0 flex items-center">
              <Image
                src="/RIL logo.svg"
                alt="RIL Logo"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
