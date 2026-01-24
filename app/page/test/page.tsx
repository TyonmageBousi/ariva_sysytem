// app/test/page.tsx
import { auth } from "@/auth"
import { headers, cookies } from "next/headers"

export default async function TestPage() {
  console.log("=== Start ===")
  
  // クッキーを確認
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("authjs.session-token")
  console.log("Cookie exists?", !!sessionToken)
  console.log("Cookie value:", sessionToken?.value?.substring(0, 50))
  
  // authを呼ぶ
  try {
    const session = await auth()
    console.log("Session:", session)
    console.log("Session user:", session?.user)
  } catch (error) {
    console.log("Error:", error)
  }
  
  return <div>Check terminal</div>
}