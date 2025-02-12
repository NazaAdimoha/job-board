import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Jobs from "../jobs/page"

interface SearchParams {
  [key: string]: string | string[] | undefined
}

interface PageProps {
  searchParams: SearchParams
}

const Page = async ({ searchParams }: PageProps) => {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }


//   if (!user) {
//     return redirect("/welcome")
//   }

  const intent = searchParams.intent

    if (intent) {
        return redirect(`/dashboard?intent=${intent}`)
    }

  const success = searchParams.success

  return (
    <>
        <Jobs />
    </>
  )
}

export default Page