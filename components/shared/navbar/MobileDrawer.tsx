"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

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
  { label: "Browse Jobs", href: "/browse-jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export function MobileDrawer() {
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()

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
            type="button"
            aria-label="Open menu"
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <Menu className="size-5" />
          </button>
        }
      />

      <DrawerContent className="bg-background text-foreground">
        <DrawerHeader className="flex flex-row items-start justify-between gap-4 border-b border-border/70 px-5 pt-6 pb-4 text-left">
          <div className="flex flex-col gap-0.5">
            <DrawerTitle className="text-xl font-semibold">Menu</DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Explore jobs and top companies.
            </DrawerDescription>
          </div>
          <DrawerClose
            render={
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <X className="size-5" />
              </button>
            }
          />
        </DrawerHeader>

        <section className="overflow-y-auto">
          <nav className="flex flex-col gap-1 px-3 py-3">
            {navLinks.map((nav) => {
              const isActive =
                pathname === nav.href || pathname.startsWith(`${nav.href}/`)

              return (
                <Link
                  key={nav.href}
                  href={nav.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "rounded-lg bg-muted px-3 py-2.5 text-base font-semibold text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                      : "rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                  }
                >
                  {nav.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex flex-col gap-2.5 px-5 py-4">
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="block w-full cursor-pointer rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="block w-full cursor-pointer rounded-lg bg-[radial-gradient(ellipse_at_center,var(--color-indigo-600)_0%,var(--color-indigo-500)_100%)] px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm shadow-indigo-600/25 transition-[filter,transform] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:translate-y-px"
            >
              Get Started
            </Link>
          </div>
        </section>

        <DrawerFooter className="border-t border-border/70 px-5 pt-4 pb-6">
          <DrawerClose
            render={
              <Button variant="ghost" className="w-full cursor-pointer">
                Close
              </Button>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
