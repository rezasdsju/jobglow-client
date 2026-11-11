import type { Metadata } from "next"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"

import {
  AuthForm,
  AuthSubmitButton,
  authInlineLinkClassName,
  authSecondaryButtonClassName,
} from "@/components/shared/auth/AuthForm"
import { AuthShell } from "@/components/shared/auth/AuthShell"
import { PasswordInput } from "@/components/shared/auth/PasswordInput"
import { FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Sign in · JobGlow",
  description:
    "Sign in to your JobGlow account to find jobs, connect with recruiters, and track your applications.",
}

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to continue your job search and keep track of your applications."
      footer={
        <>
          New to JobGlow?{" "}
          <Link href="/sign-up" className={authInlineLinkClassName}>
            Create an account
          </Link>
        </>
      }
    >
      <AuthForm mode="sign-in">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="password">Password</Label>
            <span
              title="Coming soon"
              className="cursor-default text-xs font-medium text-muted-foreground"
            >
              Forgot password?
            </span>
          </div>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </div>

        <AuthSubmitButton pendingLabel="Signing in…">Sign in</AuthSubmitButton>

        <FieldSeparator className="my-1 text-xs uppercase">
          or continue with
        </FieldSeparator>

        <button type="button" className={authSecondaryButtonClassName}>
          <FcGoogle className="size-4" aria-hidden="true" />
          Continue with Google
        </button>
      </AuthForm>
    </AuthShell>
  )
}
