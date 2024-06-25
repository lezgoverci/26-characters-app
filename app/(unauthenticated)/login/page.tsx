'use client'


/**
 * v0 by Vercel.
 * @see https://v0.dev/t/I51BxIUMYKJ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from "axios"

export default function Component() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    });

  const router = useRouter()
  const processLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    axios.post('https://n8n.xponent.ph/webhook/api/auth/login', formData)
    .then(response => {
      console.log(response.data);
      if (response.status == 200) {
        router.push('/templates')
      } else {
        alert(response.data.message)
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-primary p-6 md:p-12">
        <div className="max-w-md space-y-4">
          <div className="flex items-center space-x-2">
            <MountainIcon className="h-8 w-8 text-primary-foreground" />
            <span className="text-2xl font-bold text-primary-foreground">26 Characters </span>
          </div>
          <p className="text-lg text-primary-foreground">
            Join the thousands of businesses that trust us to power their digital experiences.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold">Login</h2>
          <form className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required onChange={
                 (e) => setFormData({
                    ...formData,
                    email: e.target.value,
                  })
              }/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" required onChange={
                (e) => setFormData({
                    ...formData,
                    password: e.target.value,
                  })
              } />
            </div>
            <Button onClick={processLogin} type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium underline" prefetch={false}>
              Sign up
            </Link>  
          </div>
        </div>
      </div>
    </div>
  )
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}