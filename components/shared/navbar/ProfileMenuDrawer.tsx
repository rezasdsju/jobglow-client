"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Briefcase,
  Building2,
  CreditCard,
  Loader2,
  LogOut,
  UserRound,
  X,
} from "lucide-react"

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
import { IUser } from "@/types/userTypes"
import UserAvatar, { getInitials } from "./UserAvatar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authClient } from "@/lib/auth-client"

const navLinks = [
  { label: "Profile", href: "/profile", icon: UserRound },
  { label: "Browse Jobs", href: "/browse-jobs", icon: Briefcase },
  { label: "Company", href: "/company", icon: Building2 },
  { label: "Pricing", href: "/pricing", icon: CreditCard },
]

const ProfileMenuDrawer = ({ user }: { user: IUser }) => {
  const [open, setOpen] = React.useState(false)
  const [isSigningOut, setIsSigningOut] = React.useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    if (isSigningOut) return

    setIsSigningOut(true)
    const { error } = await authClient.signOut()

    if (error) {
      setIsSigningOut(false)
      toast.error(error.message ?? "Couldn't sign you out. Please try again.")
      return
    }

    toast.success("You've been signed out.")
    setOpen(false)
    router.replace("/sign-in")
    router.refresh()
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection="right"
    >
      <DrawerTrigger
        render={
          <button
            type="button"
            aria-label="Open profile menu"
            className="cursor-pointer rounded-xl focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <UserAvatar user={user} />
          </button>
        }
      />

      <DrawerContent className="bg-background text-foreground">
        <DrawerHeader className="flex flex-row items-start justify-between gap-4 border-b border-border/70 px-5 pt-6 pb-4 text-left">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar size="lg" className="shrink-0">
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name} />
              ) : null}
              <AvatarFallback className="text-sm font-medium">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col gap-0.5">
              <DrawerTitle className="truncate text-lg font-semibold">
                {user.name}
              </DrawerTitle>
              <DrawerDescription className="truncate text-sm text-muted-foreground">
                {user.email}
              </DrawerDescription>
            </div>
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

        <section className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-1 px-3 py-3">
            {navLinks.map((nav) => {
              const isActive =
                pathname === nav.href || pathname.startsWith(`${nav.href}/`)
              const Icon = nav.icon

              return (
                <Link
                  key={nav.href}
                  href={nav.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2.5 text-sm font-semibold text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                      : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                  }
                >
                  <Icon
                    className={
                      isActive
                        ? "size-4 text-foreground"
                        : "size-4 text-muted-foreground"
                    }
                    aria-hidden="true"
                  />
                  {nav.label}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-border/70 px-4 py-4">
            <Button
              type="button"
              variant="destructive"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="h-10 w-full cursor-pointer gap-2 disabled:cursor-not-allowed"
            >
              {isSigningOut ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <LogOut className="size-4" aria-hidden="true" />
              )}
              {isSigningOut ? "Signing out…" : "Sign Out"}
            </Button>
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

export default ProfileMenuDrawer
