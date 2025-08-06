"use client"

import { signIn, signOut } from "next-auth/react"
 
export default function SignIn() {
    return(
         <button onClick={() => signIn("google")}>Sign In</button>
    )

}