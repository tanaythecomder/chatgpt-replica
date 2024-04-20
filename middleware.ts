import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'


export async function middleware(request: NextRequest) {
  // console.log("yes ")
 const {response,data} =  await updateSession(request);

 if((request.nextUrl.pathname==='/login' || request.nextUrl.pathname==='/signup') && data.user) {
   return NextResponse.redirect(new URL('/', request.url))
 }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}