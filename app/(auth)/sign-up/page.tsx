import type { Metadata } from "next"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"

import {
  AuthForm,
  authInlineLinkClassName,
  authPrimaryButtonClassName,
  authSecondaryButtonClassName,
} from "@/components/shared/auth/AuthForm"
import { AuthShell } from "@/components/shared/auth/AuthShell"
import { PasswordInput } from "@/components/shared/auth/PasswordInput"
import { FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Sign up · JobGlow",
  description:
    "Create a JobGlow account to find jobs, connect with recruiters, and track your applications.",
}

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Join JobGlow to find jobs, connect with recruiters, and track every application."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className={authInlineLinkClassName}>
            Sign in
          </Link>
        </>
      }
    >
      <AuthForm>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
          />
        </div>

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
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="Create a password"
          />
          <p className="text-xs text-muted-foreground">
            Use at least 8 characters.
          </p>
        </div>

        <button type="submit" className={authPrimaryButtonClassName}>
          Create account
        </button>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy.
        </p>

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
