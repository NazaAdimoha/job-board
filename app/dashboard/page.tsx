import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Jobs from "../jobs/page"

interface SearchParams {
  [key: string]: string | string[] | undefined
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: PageProps) => {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }

  const params = await searchParams;

  const intent = params.intent;
//   if (!user) {
//     return redirect("/welcome")
//   }


    if (intent) {
        return redirect(`/dashboard?intent=${intent}`)
    }

  const success = params.success

  return (
    <>
        <Jobs />
    </>
  )
}

export default Page