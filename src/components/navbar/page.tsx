import Image from "next/image";
import {ModeToggle} from "../mode-toggle"
import {Button} from "../ui/button"
import Link from "next/link"
export default function Navbar() {
    return (
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
            <div>
               <Image src="/RIL logo.svg" alt="logo" width={100} height={100} className="w-24 h-24"/>
            </div>
            <ModeToggle />

            <div className="flex gap-2">
                <Link href="/pages/sign-in">
                <Button variant="outline">Sign In</Button>
                </Link>

                <Link href="/pages/sign-out">
                <Button>Sign Out</Button>
                </Link>
            </div>
           
        </div>  
       </header>
    )
}