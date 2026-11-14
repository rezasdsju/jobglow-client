'use client'
import LightNavLogo from "@/app/assets/job_glow_light_mode_2.png"
import DarkNavLogo from "@/app/assets/job_glow_dark_mode_2.png"
import Image from "next/image"
import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { MobileDrawer } from "./MobileDrawer"
import ThemeToggle from "../ThemeToggle"
import { authClient } from "@/lib/auth-client"
import ProfileMenuDrawer from "./ProfileMenuDrawer"
import ProfileSkeleton from "./ProfileSkeleton"


const navLinks = [
    { label: "Browse Jobs", href: "/browse-jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
]

const navLinkClassName =
    "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user
    return (
        <nav className="sticky top-2 z-50 mx-2 before:absolute before:-inset-x-2 before:-top-2 before:bottom-0 before:-z-10 before:bg-background">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-2xl border border-border/70 bg-background/80 pr-2 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-background/60 dark:bg-black sm:dark:bg-transparent">
                <Link
                    href="/"
                    aria-label="JobGlow home"
                    className="overflow-hidden rounded-2xl transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                    <Image
                        src={LightNavLogo}
                        alt="JobGlow"
                        width={150}
                        height={50}
                        priority
                        className="dark:hidden"
                    ></Image>
                    <Image
                        src={DarkNavLogo}
                        alt="JobGlow"
                        height={50}
                        width={150}
                        priority
                        className="hidden bg-black object-contain dark:block"
                    ></Image>
                </Link>
                <div className="flex items-center justify-end gap-4 ">
                    <ul className="hidden md:flex items-center gap-1">
                        {isPending ? <ProfileSkeleton /> :
                            user && <Link href={`/dashboard/${user?.role}`} className={navLinkClassName}>Dashboard</Link>
                        }
                        {navLinks.map((nav) => (
                            <li key={nav.href}>
                                <Link href={nav.href} className={navLinkClassName}>
                                    {nav.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="hidden md:flex items-center justify-center">
                        <Separator orientation="vertical" className="h-5" />
                    </div>
                    <div>
                        <ThemeToggle />
                    </div>

                    <div>
                        {
                            isPending ? <ProfileSkeleton /> :
                                user ? <div>
                                    <ProfileMenuDrawer user={user} />
                                </div> :


                                    <div>
                                        <div className="hidden md:flex items-center justify-center gap-2">
                                            <Link
                                                href="/sign-in"
                                                className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                href="/sign-up"
                                                className="cursor-pointer rounded-lg bg-[radial-gradient(ellipse_at_center,var(--color-indigo-600)_0%,var(--color-indigo-500)_100%)] px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-600/25 transition-[filter,transform] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:translate-y-px"
                                            >
                                                Get Started
                                            </Link>
                                        </div>

                                        <div className="flex items-center gap-1 md:hidden">
                                            <MobileDrawer />
                                        </div>
                                    </div>
                        }
                    </div>
                </div>





                {/* <div className="flex items-center gap-1 md:hidden">
                    <div className="cursor-pointer">
                        <ThemeToggle />
                    </div>
                    <MobileDrawer />
                </div> */}
            </div>
        </nav>
    )
}

export default Navbar
