import { DateTime } from "luxon"

enum Day {
  Push,
  Pull,
  Legs,
}

const days = ["push", "pull", "leg"] as Record<Day, string>

export default function Home() {
  const today = DateTime.now().setLocale("Europe/Amsterdam")
  const firstPushDay = today.set({ month: 1, day: 3 })
  const daysSinceFirstPushDay = today.diff(firstPushDay, "days").days
  const day = (daysSinceFirstPushDay % 3) as Day
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold animate-bounce">Het is {days[day]} day</h1>
    </main>
  )
}
