"use client"

import * as React from "react"
import Link from "next/link"
import { GiHamburgerMenu } from "react-icons/gi"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
]

export function NavDrawer() {
    const [open, setOpen] = React.useState(false)
    const isMobile = useIsMobile()

    return (
        <Drawer
            open={open}
            onOpenChange={setOpen}
            showSwipeHandle={isMobile}
            swipeDirection={isMobile ? "right" : "left"}
        >
            <DrawerTrigger
                render={
                    <button
                        aria-label="Open menu"
                        className="cursor-pointer rounded-md p-2 text-xl text-foreground transition-colors hover:bg-muted"
                    >
                        <GiHamburgerMenu />
                    </button>
                }
            />

            <DrawerContent>
                <DrawerHeader className="px-5 pt-6 text-left">
                    <DrawerTitle className="text-xl font-semibold">
                        Find your next job
                    </DrawerTitle>
                    <DrawerDescription className="text-sm text-muted-foreground">
                        Explore jobs and top companies.
                    </DrawerDescription>
                </DrawerHeader>

                <section className="overflow-y-auto">
                    <nav className="flex flex-col gap-1 px-3 py-2">
                        {navLinks.map((nav) => (
                            <Link
                                key={nav.href}
                                href={nav.href}
                                onClick={() => setOpen(false)}
                                className="rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                            >
                                {nav.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex flex-col gap-3 px-5 py-4">
                        <button className="cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
                            Sign In
                        </button>
                        <button className="cursor-pointer rounded-md bg-[radial-gradient(ellipse_at_center,var(--color-indigo-600)_0%,var(--color-indigo-500)_100%)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
                            Get Started
                        </button>
                    </div>
                </section>

                <DrawerFooter className="px-5 pb-6">
                    <DrawerClose
                        render={<Button variant="outline">Close</Button>}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}