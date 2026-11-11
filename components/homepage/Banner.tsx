import { BriefcaseBusiness, MapPin, Search } from "lucide-react"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "DevOps Engineer",
]

const trendingClassName =
  "cursor-pointer rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"

const Banner = () => {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-border/60 bg-neutral-950 px-4 py-16 sm:px-8 sm:py-20">
      {/* Background: soft indigo glow + faint star field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_70%_at_50%_100%,rgba(99,102,241,0.35),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(40%_60%_at_85%_90%,rgba(168,85,247,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] mask-[linear-gradient(to_top,black,transparent_75%)] bg-size-[34px_34px] opacity-40" />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-10 bg-linear-to-r from-transparent to-white/25 sm:w-16"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 py-1.5 pr-3.5 pl-1.5 text-[11px] font-medium tracking-[0.16em] text-white/60 uppercase">
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
              <BriefcaseBusiness className="size-3" aria-hidden="true" />
            </span>
            58,000+ new jobs this month
          </span>
          <span
            aria-hidden="true"
            className="h-px w-10 bg-linear-to-l from-transparent to-white/25 sm:w-16"
          />
        </div>

        <h1 className="mt-7 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-white/55 sm:text-base">
          JobGlow connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <div
          role="search"
          aria-label="Search jobs"
          className="mt-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/4 p-2 shadow-2xl shadow-black/40 backdrop-blur-sm sm:rounded-full"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-0">
            <label className="flex flex-1 items-center gap-2.5 rounded-xl px-3 sm:rounded-full">
              <Search
                className="size-4 shrink-0 text-white/40"
                aria-hidden="true"
              />
              <span className="sr-only">Job title, skill or company</span>
              <input
                type="text"
                name="query"
                placeholder="Job title, skill or company"
                className="h-11 w-full min-w-0 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </label>

            <span
              aria-hidden="true"
              className="mx-3 h-px bg-white/10 sm:mx-0 sm:h-6 sm:w-px"
            />

            <label className="flex flex-1 items-center gap-2.5 rounded-xl px-3 sm:rounded-full">
              <MapPin
                className="size-4 shrink-0 text-white/40"
                aria-hidden="true"
              />
              <span className="sr-only">Location or Remote</span>
              <input
                type="text"
                name="location"
                placeholder="Location or Remote"
                className="h-11 w-full min-w-0 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </label>

            <button
              type="button"
              aria-label="Search jobs"
              className="mt-1 inline-flex h-11 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-500 text-sm font-medium text-white transition-colors hover:bg-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-none active:translate-y-px sm:mt-0 sm:size-11 sm:w-11"
            >
              <Search className="size-5" aria-hidden="true" />
              <span className="sm:hidden">Search jobs</span>
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-xs text-white/40">Trending Position</span>
          {trendingPositions.map((position) => (
            <button key={position} type="button" className={trendingClassName}>
              {position}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Banner
