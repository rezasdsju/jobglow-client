import {
  ArrowRight,
  Building,
  CalendarDays,
  ChevronRight,
  DollarSign,
  Globe,
  MapPin,
  Sparkle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const jobCategories = [
  { label: "Engineering & Tech", value: "engineering-tech" },
  { label: "IT & Software", value: "it-software" },
  { label: "Design & Creative", value: "design-creative" },
  { label: "Marketing & Sales", value: "marketing-sales" },
  { label: "Accounting & Finance", value: "accounting-finance" },
  { label: "Education & Training", value: "education-training" },
  { label: "Customer Support", value: "customer-support" },
]

const jobTypes = [
  { label: "Full-time", value: "full-time", active: true },
  { label: "Part-time", value: "part-time", active: false },
  { label: "Contract", value: "contract", active: false },
  { label: "Internship", value: "internship", active: false },
]

const frequencies = [
  { label: "per hour", value: "hour" },
  { label: "per day", value: "day" },
  { label: "per month", value: "month" },
  { label: "per year", value: "year" },
]

const labelClassName = "gap-1 text-xs font-medium text-muted-foreground"

const iconClassName =
  "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"

const textareaClassName =
  "min-h-24 w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm leading-relaxed shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"

function Required() {
  return (
    <span aria-hidden="true" className="text-indigo-500">
      *
    </span>
  )
}

function SectionHeading({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Sparkle
        className="size-3.5 shrink-0 text-indigo-500"
        aria-hidden="true"
      />
      <h2 className="shrink-0 text-sm font-semibold tracking-tight">
        {step}. {title}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-border/70" />
    </div>
  )
}

const NewJobForm = () => {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <span>Manage Jobs</span>
            <ChevronRight
              className="size-3 text-muted-foreground/60"
              aria-hidden="true"
            />
            <span>Create New Listing</span>
          </nav>
          <h1 className="text-2xl font-semibold tracking-tight">
            Post a New Job
          </h1>
          <p className="max-w-lg text-sm text-muted-foreground">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>

        <Button
          type="button"
          className="h-9 shrink-0 gap-2 rounded-lg bg-indigo-500 px-4 text-white shadow-sm shadow-indigo-500/25 hover:bg-indigo-600 focus-visible:ring-indigo-500/40 dark:shadow-indigo-950/40"
        >
          Publish Job
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </header>

      <div aria-hidden="true" className="h-px bg-border/70" />

      {/* 1. Basic Information */}
      <section className="flex flex-col gap-4">
        <SectionHeading step={1} title="Basic Information" />

        <Field className="gap-1.5">
          <FieldLabel htmlFor="job-title" className={labelClassName}>
            Job Title <Required />
          </FieldLabel>
          <Input
            id="job-title"
            name="title"
            defaultValue="Frontend Developer"
            required
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="company-name" className={labelClassName}>
              Company Name <Required />
            </FieldLabel>
            <div className="relative">
              <Building className={iconClassName} aria-hidden="true" />
              <Input
                id="company-name"
                name="company"
                defaultValue="HireFuse Network"
                className="pl-9"
                required
              />
            </div>
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="job-category" className={labelClassName}>
              Job Category <Required />
            </FieldLabel>
            <Select
              items={jobCategories}
              defaultValue="engineering-tech"
              name="category"
            >
              <SelectTrigger
                id="job-category"
                className="h-10 w-full data-[size=default]:h-10"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {jobCategories.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className={labelClassName}>
            Job Type <Required />
          </span>
          <div
            role="radiogroup"
            aria-label="Job Type"
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          >
            {jobTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                role="radio"
                aria-checked={type.active}
                className={cn(
                  "h-10 rounded-lg border text-sm font-medium transition-[background-color,border-color,color] outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  type.active
                    ? "border-indigo-500/60 bg-indigo-50 text-indigo-700 dark:border-indigo-500/60 dark:bg-indigo-500/10 dark:text-indigo-300"
                    : "border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Location, Compensation & Timeline */}
      <section className="flex flex-col gap-4">
        <SectionHeading step={2} title="Location, Compensation & Timeline" />

        <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3.5 dark:bg-white/[0.02]">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/20 ring-inset dark:text-indigo-400">
            <Globe className="size-4" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-sm font-medium">
              Remote Work Allowed{" "}
              <span className="font-normal text-muted-foreground">
                (IsRemote)
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Enable worldwide or distributed candidate applications.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked="true"
            aria-label="Remote work allowed"
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-indigo-500 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span
              aria-hidden="true"
              className="absolute right-0.5 size-5 rounded-full bg-white shadow-sm"
            />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field className="gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <FieldLabel htmlFor="job-location" className={labelClassName}>
                Job Location{" "}
                <span className="text-muted-foreground/60">(Location)</span>
              </FieldLabel>
              <Badge
                variant="outline"
                className="h-4 rounded-full px-1.5 text-[10px] font-medium text-muted-foreground"
              >
                Required
              </Badge>
            </div>
            <div className="relative">
              <MapPin className={iconClassName} aria-hidden="true" />
              <Input
                id="job-location"
                name="location"
                defaultValue="New York, USA"
                className="pl-9"
              />
            </div>
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="job-deadline" className={labelClassName}>
              Application Deadline{" "}
              <span className="text-muted-foreground/60">(deadline)</span>
            </FieldLabel>
            <div className="relative">
              <CalendarDays className={iconClassName} aria-hidden="true" />
              <Input
                id="job-deadline"
                name="deadline"
                defaultValue="09/30/2025"
                className="pl-9"
              />
            </div>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="min-salary" className={labelClassName}>
              Min Salary / Rate{" "}
              <span className="text-muted-foreground/60">(min)</span>
            </FieldLabel>
            <div className="relative">
              <DollarSign className={iconClassName} aria-hidden="true" />
              <Input
                id="min-salary"
                name="min"
                defaultValue="25"
                className="pl-9"
              />
            </div>
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="max-salary" className={labelClassName}>
              Max Salary / Rate{" "}
              <span className="text-muted-foreground/60">(max)</span>
            </FieldLabel>
            <div className="relative">
              <DollarSign className={iconClassName} aria-hidden="true" />
              <Input
                id="max-salary"
                name="max"
                defaultValue="40"
                className="pl-9"
              />
            </div>
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="frequency" className={labelClassName}>
              Frequency{" "}
              <span className="text-muted-foreground/60">(frequency)</span>
            </FieldLabel>
            <Select items={frequencies} defaultValue="hour" name="frequency">
              <SelectTrigger
                id="frequency"
                className="h-10 w-full data-[size=default]:h-10"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {frequencies.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </section>

      {/* 3. Responsibilities & Requirements */}
      <section className="flex flex-col gap-4">
        <SectionHeading step={3} title="Responsibilities & Requirements" />

        <Field className="gap-1.5">
          <FieldLabel htmlFor="responsibilities" className={labelClassName}>
            Key Responsibilities <Required />
          </FieldLabel>
          <textarea
            id="responsibilities"
            name="responsibilities"
            rows={3}
            className={textareaClassName}
            defaultValue="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
          />
        </Field>

        <Field className="gap-1.5">
          <FieldLabel htmlFor="qualifications" className={labelClassName}>
            Qualifications & Requirements <Required />
          </FieldLabel>
          <textarea
            id="qualifications"
            name="qualifications"
            rows={4}
            className={textareaClassName}
            defaultValue={
              "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"
            }
          />
        </Field>
      </section>
    </div>
  )
}

export default NewJobForm

// import {
//     Field,
//     FieldDescription,
//     FieldLabel,
// } from "@/components/ui/field"
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"

// const items = [
//     { label: "Choose department", value: null },
//     { label: "Engineering", value: "engineering" },
//     { label: "Design", value: "design" },
//     { label: "Marketing", value: "marketing" },
//     { label: "Sales", value: "sales" },
//     { label: "Customer Support", value: "support" },
//     { label: "Human Resources", value: "hr" },
//     { label: "Finance", value: "finance" },
//     { label: "Operations", value: "operations" },
// ]

// export function FieldSelect() {
//     return (
//         <Field className="w-full max-w-xs">
//             <FieldLabel>Department</FieldLabel>
//             <Select items={items}>
//                 <SelectTrigger>
//                     <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                     <SelectGroup>
//                         {items.map((item) => (
//                             <SelectItem key={item.value} value={item.value}>
//                                 {item.label}
//                             </SelectItem>
//                         ))}
//                     </SelectGroup>
//                 </SelectContent>
//             </Select>
//             <FieldDescription>
//                 Select your department or area of work.
//             </FieldDescription>
//         </Field>
//     )
// }

// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//     Field,
//     FieldDescription,
//     FieldGroup,
//     FieldLabel,
//     FieldLegend,
//     FieldSeparator,
//     FieldSet,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"

// const months = [
//     { label: "MM", value: null },
//     { label: "01", value: "01" },
//     { label: "02", value: "02" },
//     { label: "03", value: "03" },
//     { label: "04", value: "04" },
//     { label: "05", value: "05" },
//     { label: "06", value: "06" },
//     { label: "07", value: "07" },
//     { label: "08", value: "08" },
//     { label: "09", value: "09" },
//     { label: "10", value: "10" },
//     { label: "11", value: "11" },
//     { label: "12", value: "12" },
// ]

// const years = [
//     { label: "YYYY", value: null },
//     { label: "2024", value: "2024" },
//     { label: "2025", value: "2025" },
//     { label: "2026", value: "2026" },
//     { label: "2027", value: "2027" },
//     { label: "2028", value: "2028" },
//     { label: "2029", value: "2029" },
// ]

// export function FieldDemo() {
//     return (
//         <div className="w-full max-w-md">
//             <form>
//                 <FieldGroup>
//                     <FieldSet>
//                         <FieldLegend>Payment Method</FieldLegend>
//                         <FieldDescription>
//                             All transactions are secure and encrypted
//                         </FieldDescription>
//                         <FieldGroup>
//                             <Field>
//                                 <FieldLabel htmlFor="checkout-7j9-card-name-43j">
//                                     Name on Card
//                                 </FieldLabel>
//                                 <Input
//                                     id="checkout-7j9-card-name-43j"
//                                     placeholder="Evil Rabbit"
//                                     required
//                                 />
//                             </Field>
//                             <Field>
//                                 <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
//                                     Card Number
//                                 </FieldLabel>
//                                 <Input
//                                     id="checkout-7j9-card-number-uw1"
//                                     placeholder="1234 5678 9012 3456"
//                                     required
//                                 />
//                                 <FieldDescription>
//                                     Enter your 16-digit card number
//                                 </FieldDescription>
//                             </Field>
//                             <div className="grid grid-cols-3 gap-4">
//                                 <Field>
//                                     <FieldLabel htmlFor="checkout-exp-month-ts6">
//                                         Month
//                                     </FieldLabel>
//                                     <Select items={months}>
//                                         <SelectTrigger id="checkout-exp-month-ts6">
//                                             <SelectValue />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectGroup>
//                                                 {months.map((item) => (
//                                                     <SelectItem key={item.value} value={item.value}>
//                                                         {item.label}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectGroup>
//                                         </SelectContent>
//                                     </Select>
//                                 </Field>
//                                 <Field>
//                                     <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
//                                         Year
//                                     </FieldLabel>
//                                     <Select items={years}>
//                                         <SelectTrigger id="checkout-7j9-exp-year-f59">
//                                             <SelectValue />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectGroup>
//                                                 {years.map((item) => (
//                                                     <SelectItem key={item.value} value={item.value}>
//                                                         {item.label}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectGroup>
//                                         </SelectContent>
//                                     </Select>
//                                 </Field>
//                                 <Field>
//                                     <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
//                                     <Input id="checkout-7j9-cvv" placeholder="123" required />
//                                 </Field>
//                             </div>
//                         </FieldGroup>
//                     </FieldSet>
//                     <FieldSeparator />
//                     <FieldSet>
//                         <FieldLegend>Billing Address</FieldLegend>
//                         <FieldDescription>
//                             The billing address associated with your payment method
//                         </FieldDescription>
//                         <FieldGroup>
//                             <Field orientation="horizontal">
//                                 <Checkbox
//                                     id="checkout-7j9-same-as-shipping-wgm"
//                                     defaultChecked
//                                 />
//                                 <FieldLabel
//                                     htmlFor="checkout-7j9-same-as-shipping-wgm"
//                                     className="font-normal"
//                                 >
//                                     Same as shipping address
//                                 </FieldLabel>
//                             </Field>
//                         </FieldGroup>
//                     </FieldSet>
//                     <FieldSet>
//                         <FieldGroup>
//                             <Field>
//                                 <FieldLabel htmlFor="checkout-7j9-optional-comments">
//                                     Comments
//                                 </FieldLabel>
//                                 <Textarea
//                                     id="checkout-7j9-optional-comments"
//                                     placeholder="Add any additional comments"
//                                     className="resize-none"
//                                 />
//                             </Field>
//                         </FieldGroup>
//                     </FieldSet>
//                     <Field orientation="horizontal">
//                         <Button type="submit">Submit</Button>
//                         <Button variant="outline" type="button">
//                             Cancel
//                         </Button>
//                     </Field>
//                 </FieldGroup>
//             </form>
//         </div>
//     )
// }
