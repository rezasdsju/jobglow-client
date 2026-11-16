import type { ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import type Stripe from "stripe"
import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  CreditCard,
  LayoutDashboard,
  Mail,
  ReceiptText,
  ShieldCheck,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { CopyButton } from "./CopyButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { checkoutVerify } from "@/lib/actions/payments"
import { getSession } from "@/lib/core/server"
import { stripe } from "@/lib/stripe"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Payment successful · JobGlow",
  description: "Your JobGlow Pro payment receipt.",
}

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

const formatAmount = (amount: number | null, currency: string | null) => {
  const total = (amount ?? 0) / 100
  const code = (currency ?? "usd").toUpperCase()

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
    }).format(total)
  } catch {
    return `${total.toFixed(2)} ${code}`
  }
}

const paymentMethodLabel = (paymentIntent: Stripe.PaymentIntent | null) => {
  const paymentMethod = paymentIntent?.payment_method
  if (!paymentMethod || typeof paymentMethod === "string") return null

  if (paymentMethod.card) {
    return `${capitalize(paymentMethod.card.brand)} •••• ${paymentMethod.card.last4}`
  }

  return paymentMethod.type ? capitalize(paymentMethod.type) : null
}

type DetailRowProps = {
  label: string
  icon?: LucideIcon
  children: ReactNode
  mono?: boolean
  emphasis?: boolean
  copyValue?: string
}

const DetailRow = ({
  label,
  icon: Icon,
  children,
  mono,
  emphasis,
  copyValue,
}: DetailRowProps) => (
  <div className="flex items-center justify-between gap-4 py-3">
    <dt className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
      {Icon && <Icon className="size-4" aria-hidden="true" />}
      {label}
    </dt>
    <dd
      className={cn(
        "flex min-w-0 items-center justify-end gap-1 text-right text-sm font-medium",
        mono && "font-mono text-xs break-all",
        emphasis && "text-base font-semibold"
      )}
    >
      <span className={cn(mono && "select-all")}>{children}</span>
      {copyValue && <CopyButton value={copyValue} label={`Copy ${label.toLowerCase()}`} />}
    </dd>
  </div>
)

type NoticeProps = {
  title: string
  description: string
}

const SessionNotice = ({ title, description }: NoticeProps) => (
  <main className="mx-auto w-full max-w-lg px-4 py-16 sm:py-24">
    <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <ReceiptText className="size-5" aria-hidden="true" />
      </span>
      <h1 className="mt-4 text-xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Button
        nativeButton={false}
        render={<Link href="/payment" />}
        className="mt-6 h-9 gap-2 px-4"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to payment
      </Button>
    </div>
  </main>
)

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) {
    return (
      <SessionNotice
        title="No checkout session found"
        description="Open this page from the payment confirmation link, or start a new checkout."
      />
    )
  }

  let session: Stripe.Checkout.Session

  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent", "payment_intent.payment_method"],
    })
  } catch {
    return (
      <SessionNotice
        title="We couldn't load this receipt"
        description="This checkout session is invalid or no longer available."
      />
    )
  }

  // Unpaid sessions should not land on a success page.
  if (session.status === "open") {
    redirect("/payment?canceled=true")
  }

  if (session.status !== "complete" || session.payment_status !== "paid") {
    redirect("/payment?canceled=true")
  }

  const verification = await checkoutVerify(session_id).catch(() => null)
  const upgraded =
    verification?.success === true ||
    verification?.message === "Payment already verified"

  const paymentIntent =
    typeof session.payment_intent === "object" ? session.payment_intent : null
  const transactionId =
    paymentIntent?.id ??
    (typeof session.payment_intent === "string" ? session.payment_intent : null)
  const plan = session.line_items?.data[0]?.description ?? "JobGlow Pro"
  const amount = formatAmount(session.amount_total, session.currency)
  const paidOn = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(session.created * 1000))
  const method = paymentMethodLabel(paymentIntent)

  const currentSession = await getSession().catch(() => null)
  const role = currentSession?.user.role ?? "seeker"
  const dashboardHref =
    role === "recruiter"
      ? "/dashboard/recruiter/jobs"
      : role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/seeker/applications"

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Success header */}
        <div className="relative isolate border-b border-border px-6 py-10 text-center sm:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(99,102,241,0.16),transparent_70%)] dark:bg-[radial-gradient(70%_120%_at_50%_0%,rgba(99,102,241,0.24),transparent_70%)]"
          />

          <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Check className="size-7" strokeWidth={2.5} aria-hidden="true" />
          </span>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Payment successful
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground">
            {upgraded
              ? "Your JobGlow Pro plan is active. Thanks for choosing JobGlow."
              : "Your payment was received. We are still activating your plan, so refresh this page in a moment."}
          </p>

          <Badge
            variant="outline"
            className="mt-5 gap-1.5 border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-700 dark:text-emerald-400"
          >
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Paid
          </Badge>
        </div>

        {/* Receipt */}
        <div className="px-6 py-6 sm:px-10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <ReceiptText className="size-4 text-muted-foreground" aria-hidden="true" />
              Receipt
            </h2>
            <span className="text-lg font-semibold tracking-tight">{amount}</span>
          </div>

          <Separator className="mt-4" />

          <dl className="divide-y divide-border">
            <DetailRow label="Plan">{plan}</DetailRow>
            {session.customer_email && (
              <DetailRow label="Billing email" icon={Mail}>
                {session.customer_email}
              </DetailRow>
            )}
            {method && (
              <DetailRow label="Payment method" icon={CreditCard}>
                {method}
              </DetailRow>
            )}
            <DetailRow label="Paid on">{paidOn}</DetailRow>
            <DetailRow label="Amount paid" emphasis>
              {amount}
            </DetailRow>
            {transactionId && (
              <DetailRow label="Transaction ID" mono copyValue={transactionId}>
                {transactionId}
              </DetailRow>
            )}
          </dl>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button
          nativeButton={false}
          render={<Link href={dashboardHref} />}
          className="h-10 gap-2 bg-indigo-500 px-5 text-white shadow-xs shadow-indigo-500/25 hover:bg-indigo-600 focus-visible:ring-indigo-500/40"
        >
          <LayoutDashboard className="size-4" aria-hidden="true" />
          Go to dashboard
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/browse-jobs" />}
          variant="outline"
          className="h-10 gap-2 px-5"
        >
          <BriefcaseBusiness className="size-4" aria-hidden="true" />
          Browse jobs
        </Button>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Keep the transaction ID above for your records.
      </p>
    </main>
  )
}
