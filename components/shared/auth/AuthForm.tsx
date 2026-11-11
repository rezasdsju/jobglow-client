"use client"

import * as React from "react"
import type { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

export const authPrimaryButtonClassName = cn(
  "inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium text-white",
  "bg-[radial-gradient(ellipse_at_center,var(--color-indigo-600)_0%,var(--color-indigo-500)_100%)]",
  "shadow-sm shadow-indigo-600/25 transition-[filter,transform] hover:brightness-110 active:translate-y-px",
  "focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
)

export const authSecondaryButtonClassName = cn(
  "inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background px-4",
  "text-sm font-medium transition-colors hover:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
  "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
)

export const authInlineLinkClassName =
  "font-medium text-foreground underline-offset-4 transition-colors hover:text-indigo-600 hover:underline dark:hover:text-indigo-400 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"

const AuthFormContext = React.createContext(false)

type AuthFormProps = {
  children: ReactNode
  className?: string
  mode: "sign-in" | "sign-up"
}

export function AuthForm({ children, className, mode }: AuthFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    setIsSubmitting(true)

    try {
      const { error } =
        mode === "sign-up"
          ? await authClient.signUp.email({ name, email, password })
          : await authClient.signIn.email({ email, password })

      if (error) {
        toast.error(error.message ?? "Something went wrong. Please try again.")
        return
      }

      toast.success(
        mode === "sign-up"
          ? "Account created. Welcome to JobGlow!"
          : "Welcome back!"
      )
      router.replace("/")
      router.refresh()
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthFormContext.Provider value={isSubmitting}>
      <form
        noValidate
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
        className={cn("flex flex-col gap-5", className)}
      >
        {children}
      </form>
    </AuthFormContext.Provider>
  )
}

type AuthSubmitButtonProps = React.ComponentProps<"button"> & {
  pendingLabel?: string
}

export function AuthSubmitButton({
  children,
  pendingLabel = "Please wait…",
  className,
  ...props
}: AuthSubmitButtonProps) {
  const isSubmitting = React.useContext(AuthFormContext)

  return (
    <button
      {...props}
      type="submit"
      disabled={isSubmitting || props.disabled}
      aria-disabled={isSubmitting || props.disabled}
      className={cn(
        authPrimaryButtonClassName,
        "disabled:cursor-not-allowed disabled:opacity-80",
        className
      )}
    >
      {isSubmitting && (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      )}
      {isSubmitting ? pendingLabel : children}
    </button>
  )
}
