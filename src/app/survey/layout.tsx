import { PropsWithChildren } from "react"

export default function SurveyLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="border shadow rounded flex flex-col gap-6 p-4 justify-center">{children}</div>
    </main>
  )
}
