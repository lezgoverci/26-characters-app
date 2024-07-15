'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/F3hDyv0OUod
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandList, CommandItem } from "@/components/ui/command"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Client } from "@/types"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import axios from "axios"


export default function ClientsDetails() {

  const params = useParams<{ id: string }>()
  const [client, setClient] = useState<Client | null>(null)
  const [url, setUrl] = useState<string>("")
  const [clientEmailInput, setClientEmailInput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const { toast } = useToast()

  const formSchema = z.object({
    first_name: z.string().min(2).max(50),
    last_name: z.string().min(2).max(50),
    email: z.string().email(),
    company: z.string().min(2).max(50),
    company_description: z.string().min(2).max(50),
    role: z.string().min(2).max(50),
    experience: z.string().min(1).max(50),
    subscription: z.string().min(2).max(50),
    writing_profile: z.string().min(2).max(50),
    recruiting_profile: z.string().min(2).max(50),
    treasure_chest_link: z.string().min(2).max(50)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: client?.first_name || "",
      last_name: "",
      email: "",
      company: "",
      company_description: "",
      role: "",
      experience: "",
      subscription: client?.subscription || "",
      writing_profile: "",
      recruiting_profile: "",
      treasure_chest_link: ""
    },
  })

  const fetchClient = async () => {
    try {
      const response = await axios.get(`https://n8n.xponent.ph/webhook/2f4bc294-6be4-4da2-ba85-9f681a8e93b4/api/clients/${params?.id}`);
      console.log(response.data);
      setClient(response.data)
      form.reset(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateClick = () => {


    const newUrl = 'http://example.com/generated-url'; // Replace this with URL generation logic
    setUrl(newUrl);
    form.setValue('treasure_chest_link', newUrl);
  };

  const handleClientEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientEmailInput(e.target.value);
  }

  const deleteClient = async () => {
    setLoading(true)
    try {
      const response = await axios.delete(`https://n8n.xponent.ph/webhook/api/clients`,{
        data:{
          id: params?.id
        }
      });
    toast({
      title: "Client deleted",
      description: "The client has been deleted successfully."
    });
 

    router.push('/dashboard/clients');

    } catch (error) {
      console.error(error);
      toast({
        title: "Error deleting client",
        description: "There was an error deleting the client."
      });
    }
    setLoading(false)
  }

  const onSubmit = async (values: Client) => {


    console.log(values)
    try {
      const response = await axios.post(`https://n8n.xponent.ph/webhook/7cbc6da7-575d-4e36-90f6-25602514b561/api/clients/${params?.id}`, {
        values
      });
      //TODO: show success message
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  const onErorrs = (errors: any) => {
    console.log(errors)
  }

  useEffect(() => {
  
    fetchClient()
  },[])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onErorrs)}>
        <div className="flex flex-col">
          <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 md:px-6">
            <h1 className="text-lg font-semibold">Client Details</h1>
            <Button>Save</Button>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">

            <div className="grid gap-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">



                <Card>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="name">First Name</FormLabel>
                          <FormControl>
                            <Input
                              id="first_name"
                              type="text"
                              placeholder="Enter your first name"

                              {...field}
                              className="w-full text-sm font-medium"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="name">Last Name</FormLabel>
                          <FormControl>
                            <Input
                              id="last_name"
                              type="text"
                              placeholder="Enter your last name"

                              {...field}
                              className="w-full text-sm font-medium"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="name">Email</FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              type="text"
                              placeholder="Enter email"

                              {...field}
                              className="w-full text-sm font-medium"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="name">Company</FormLabel>
                          <FormControl>
                            <Input
                              id="company"
                              type="text"
                              placeholder="Enter your company"

                              {...field}
                              className="w-full text-sm font-medium"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company_description"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="name">Company Description</FormLabel>
                          <FormControl>
                            <Textarea
                              id="company_description"

                              placeholder="Enter your company description"

                              {...field}
                              className="w-full text-sm font-medium"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="name">Role</FormLabel>
                          <FormControl>
                            <Input
                              id="role"
                              type="text"
                              placeholder="Enter your role"

                              {...field}
                              className="w-full text-sm font-medium"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="name">Experience</FormLabel>
                          <FormControl>
                            <Input
                              id="experience"
                              type="text"
                              placeholder="Enter your experience"

                              {...field}
                              className="w-full text-sm font-medium"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subscription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subscription</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a client subscription" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>

                            </SelectContent>
                          </Select>

                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="treasure_chest_link"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="role">Treasure Chest</FormLabel>
                          <FormControl>
                            <div className="flex w-full text-sm items-center space-x-2">
                              <Input
                                id="treasure_chest_link"
                                type="text"
                                // placeholder="Enter your role"
                                {...field}

                                className=" text-muted-foreground"
                              />
                              <Button variant="outline" size="sm" onClick={(event) => { event.preventDefault(); handleGenerateClick(); }}>
                                <GiftIcon className="h-4 w-4 mr-2" />
                                Generate
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Subscription</span>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm">
                                Standard <ChevronDownIcon className="h-4 w-4 ml-2" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" align="end">
                              <Command>
                                <CommandList>
                                  <CommandItem className="px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                                    Standard
                                  </CommandItem>
                                  <CommandItem className="px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                                    Premium
                                  </CommandItem>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Treasure Chest</span>
                          <Button variant="outline" size="sm">
                            <GiftIcon className="h-4 w-4 mr-2" />
                            Generate
                          </Button>
                        </div>
                      </div> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="space-y-4">
                    {/* <div className="space-y-1">
                        <Label htmlFor="writing-profile" className="text-sm">
                          Writing Profile
                        </Label>
                        <Textarea
                          id="writing-profile"
                          placeholder="Enter your writing profile"
                          className="w-full min-h-[100px] text-sm text-muted-foreground"
                          defaultValue="Enter your writing profile"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="recruiting-profile" className="text-sm">
                          Recruiting Profile
                        </Label>
                        <Textarea
                          id="recruiting-profile"
                          placeholder="Enter your recruiting profile"
                          className="w-full min-h-[100px] text-sm text-muted-foreground"
                          defaultValue="Enter your recruiting profile"
                        />
                      </div> */}
                    <FormField
                      control={form.control}
                      name="writing_profile"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="writing-profile">Writing Profile</FormLabel>
                          <FormControl>
                            <Textarea
                              id="writing-profile"
                              placeholder="Enter your writing profile"
                              {...field}
                              className="w-full min-h-[100px] text-sm text-muted-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="recruiting_profile"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="recruiting-profile">Recruiting Profile</FormLabel>
                          <FormControl>
                            <Textarea
                              id="recruiting-profile"
                              placeholder="Enter your recruiting profile"
                              {...field}
                              className="w-full min-h-[100px] text-sm text-muted-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                  </CardContent>
                </Card>

                <Card>
            <CardHeader>
              <CardTitle>Delete Client</CardTitle>
              <CardDescription>
                Type <strong>{ client?.email }</strong> in the input field below to delete this template. This action cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Enter client email to confirm deletion"
                  onChange={(e) => handleClientEmailInput(e)}
                  value={clientEmailInput}
                />
                <Button
                  variant="destructive"
                  className="w-auto"
                  size="sm"
                  onClick={deleteClient}
                  disabled={!( clientEmailInput === client?.email && clientEmailInput !== "" && !loading)}
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Delete
                </Button>
              </div>
            </CardContent>
          </Card>

              </div>
            </div>

          </main>
        </div>
      </form>
    </Form>
  )
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function GiftIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  )
}