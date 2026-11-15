import { Check, Lock, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const plan = {
    name: "JobGlow Pro Plan",
    description: "Everything you need to hire faster.",
    price: 20,
    currency: "USD",
    features: [
        "Unlimited job postings",
        "Candidate search and shortlisting",
        "Priority listing on the homepage",
        "Email support",
    ],
}

const PaymentPage = async ({ searchParams }: { searchParams: Promise<{ plan?: string, canceled?: string }> }) => {
    const { canceled } = await searchParams

    return (
        <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:py-16">
            {canceled && (
                <p className="mb-6 rounded-md border border-border bg-muted p-3 text-sm text-muted-foreground">
                    Payment canceled. You can try again when you are ready.
                </p>
            )}

            <div className="mb-8 flex flex-col gap-1">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Complete your payment
                </h1>
                <p className="text-sm text-muted-foreground">
                    Review your plan, then continue to secure checkout.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-5">
                {/* Plan details */}
                <section className="rounded-xl border border-border bg-card p-6 md:col-span-3">
                    <h2 className="text-lg font-semibold">{plan.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {plan.description}
                    </p>

                    <Separator className="my-5" />

                    <ul className="flex flex-col gap-3">
                        {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm">
                                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                    <Check className="size-3.5" aria-hidden="true" />
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Order summary */}
                <aside className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 md:col-span-2">
                    <h2 className="text-lg font-semibold">Order summary</h2>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{plan.name}</span>
                        <span>${plan.price.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between font-semibold">
                        <span>Total</span>
                        <span>
                            ${plan.price.toFixed(2)} {plan.currency}
                        </span>
                    </div>

                    <form action="/api/checkout_sessions" method="POST">
                        <Button
                            type="submit"
                            className="h-10 w-full cursor-pointer gap-2 bg-[radial-gradient(ellipse_at_center,var(--color-indigo-600)_0%,var(--color-indigo-500)_100%)] text-white hover:brightness-110"
                        >
                            <Lock className="size-4" aria-hidden="true" />
                            Pay ${plan.price.toFixed(2)}
                        </Button>
                    </form>

                    <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                        <ShieldCheck className="size-3.5" aria-hidden="true" />
                        You will be redirected to Stripe to pay securely.
                    </p>
                </aside>
            </div>
        </main>
    )
}

export default PaymentPage