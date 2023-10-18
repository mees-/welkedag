"use client"

import { DateTime } from "luxon"
import Link from "next/link"
import { useLocalStorage } from "./survey/useLocalStorage"
import { AnswerData, SurveyAnswers } from "./survey/types"
import { Exercise } from "./survey/types"
import { PropsWithChildren } from "react"

enum Day {
  Push,
  Pull,
  Legs,
}

export default function Home() {
  const [surveyAnswers] = useLocalStorage<AnswerData>("survey-answers")
  const usePersonalised =
    surveyAnswers != null &&
    surveyAnswers.age != null &&
    surveyAnswers.gender != null &&
    surveyAnswers.gymFrequency != null &&
    surveyAnswers.favoriteExercise != null &&
    surveyAnswers.bulk != null &&
    surveyAnswers.timeToGym != null

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {usePersonalised ? <PersonalisedSchedule /> : <GeneralDaySchedule />}
      <PersonalisedLink />
    </main>
  )
}

function PersonalisedLink() {
  const [answers, setAnswers] = useLocalStorage<SurveyAnswers>("survey-answers")
  if (answers == null) {
    return (
      <Link href="/survey" className="mt-6 font-semibold opacity-50">
        Click here for personalised days
      </Link>
    )
  } else {
    return (
      <button onClick={() => setAnswers(null)} className="mt-6 font-semibold opacity-50">
        Click here to reset your personalised answers
      </button>
    )
  }
}

function MainText({ children }: PropsWithChildren) {
  return <h1 className="text-6xl font-bold animate-bounce">{children}</h1>
}

const days = ["push", "pull", "leg"] as Record<Day, string>
function GeneralDaySchedule() {
  const today = DateTime.now()
  const firstPushDay = today.set({ month: 1, day: 1 })
  const daysSinceFirstPushDay = today.diff(firstPushDay, "days").days
  const day = (daysSinceFirstPushDay % 3) as Day
  return <MainText>Het is {days[day]} day</MainText>
}

const legDayExercises = new Set<Exercise>([Exercise.Legpress, Exercise.Squat, Exercise.Lunges])

function PersonalisedSchedule() {
  const [surveyAnswers] = useLocalStorage<SurveyAnswers>("survey-answers")
  if (surveyAnswers == null) {
    return <GeneralDaySchedule />
  }
  const { age, gender, gymFrequency, favoriteExercise, bulk, timeToGym } = surveyAnswers
  const today = DateTime.now()
  if (gymFrequency < 3 && bulk) {
    const isBulkDay = today.weekday % 2 === 0
    if (isBulkDay) {
      return <MainText>Het is bulk day!</MainText>
    } else {
      return <MainText>Lekker full body day!</MainText>
    }
  } else if (gymFrequency < 3) {
    if (gender === "m") {
      return (
        <>
          <MainText>Omdat jij bijna nooit gaat, is elke dag full body.</MainText>
          <p className="opacity-50">Als je cool bent doe je minimaal 6 exercises</p>
        </>
      )
    } else {
      if (today.weekday < 4) {
        return <MainText>Het is upper body-day. Doe lekker push en pull</MainText>
      } else {
        if (age < 34) {
          return <MainText>Het is ass-day!</MainText>
        } else {
          return <MainText>Het is leg-day!</MainText>
        }
      }
    }
  } else if (favoriteExercise === Exercise.Lunges && gymFrequency < 5) {
    return <MainText>Als jij zo van lunges houd is elke dag lunge-day voor jou</MainText>
  } else if (gymFrequency > 5 && timeToGym >= 40) {
    return <MainText>Jij moet zo ver dat je zelf mag kiezen welke dag je doet!</MainText>
  } else if (favoriteExercise === Exercise.Flys) {
    const day = today.set({ month: 1, day: 1 }).diff(today, "days").days % gymFrequency
    if (day === 0) {
      return <MainText>It&apos;s fly day baby!</MainText>
    } else {
      const routineDay = day % 3
      switch (routineDay) {
        case 1:
          return <MainText>It&apos;s push day</MainText>
        case 2:
          return <MainText>It&apos;s pull day</MainText>
        default:
          return <MainText>It&apos;s skip day</MainText>
      }
    }
  } else if (legDayExercises.has(favoriteExercise)) {
    const day = (today.set({ month: 1, day: 1 }).diff(today, "days").days % (gymFrequency * 3)) % 3
    switch (day) {
      case 1:
        return <MainText>It&apos;s push day</MainText>
      case 2:
        return <MainText>It&apos;s pull day</MainText>
      default:
        if (gender === "m") {
          return <MainText>It&apos;s leg day</MainText>
        } else {
          return <MainText>It&apos;s ass day</MainText>
        }
    }
  } else {
    return <GeneralDaySchedule />
  }
}
