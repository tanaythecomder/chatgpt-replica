import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import func from '@/utils/gemini/gemini'


export default async function PrivatePage() {
  const supabase = createClient()

  func()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <p>Hello {data.user.email}</p>
}