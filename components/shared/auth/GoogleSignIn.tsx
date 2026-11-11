"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { authSecondaryButtonClassName } from "./AuthForm"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const GoogleSignIn = () => {
  const [isRedirecting, setIsRedirecting] = React.useState(false)
  const pathname = usePathname()

  const handleGoogleSignIn = async () => {
    if (isRedirecting) return

    setIsRedirecting(true)

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: pathname,
      })

      if (error) {
        setIsRedirecting(false)
        toast.error(
          error.message ?? "Couldn't continue with Google. Please try again."
        )
      }
      // On success Better Auth redirects the browser to Google, so the
      // button stays in its pending state until the page navigates away.
    } catch {
      setIsRedirecting(false)
      toast.error("Couldn't continue with Google. Please try again.")
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={isRedirecting}
      aria-disabled={isRedirecting}
      className={cn(
        authSecondaryButtonClassName,
        "disabled:cursor-not-allowed disabled:opacity-80"
      )}
    >
      {isRedirecting ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <FcGoogle className="size-4" aria-hidden="true" />
      )}
      {isRedirecting ? "Redirecting to Google…" : "Continue with Google"}
    </button>
  )
}

export default GoogleSignIn
