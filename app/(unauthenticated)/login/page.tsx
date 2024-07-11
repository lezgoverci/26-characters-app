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
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function Component() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const { toast } = useToast()

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    await login(values)
  }

  const login = async (values: z.infer<typeof formSchema>) => {

    setIsLoading(true)
    await axios.post('https://n8n.xponent.ph/webhook/api/auth/login', values)
      .then(response => {
        // console.log(response.data);
        // if (response.status == 200) {
        //   router.push('/templates')
        // } else {
        //   alert(response.data.message)
        // }
        // setIsLoading(false)

        if (response.data.error && typeof response.data.error === 'object') {
          setIsLoading(false);
          toast({
            title: 'Error',
            description: "Login failed",
            variant: "destructive"
          });
          return;
        }
        if (response.data.statusCode === 200) {
          setIsLoading(false)
          toast({
            title: 'Success',
            description: "Login successful",
          });
          router.push('/templates')
        }

      })
      .catch(error => {
        setIsLoading(false);
        toast({
          title: 'Error',
          description: "Login failed",
          variant: "destructive"
        });
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
          {/* <form className="space-y-4">
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
            <Button onClick={processLogin} type="submit" className="w-full"  disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

              Login
            </Button>
          </form> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="space-y-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" placeholder="m@example.com" required {...field} />
                    </FormControl>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="space-y-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" placeholder="Enter your password" required {...field} />
                    </FormControl>
                  </div>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Login
              </Button>
            </form>
          </Form>
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