export enum Exercise {
  BarbellBenchpress = "BarbellBenchpress",
  Dips = "Dips",
  Flys = "Flys",
  Pullup = "Pullup",
  Curls = "Curls",

  Legpress = "Legpress",
  Squat = "Squat",
  Lunges = "Lunges",
}

export interface SurveyAnswers {
  age: number
  gender: "m" | "f" | "u"
  gymFrequency: 1 | 2 | 3 | 4 | 5 | 6 | 7
  favoriteExercise: Exercise
  bulk: boolean
  timeToGym: number
}

export type AnswerData = Partial<SurveyAnswers>
