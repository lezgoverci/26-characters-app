/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tvIALyN8hfa
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useMemo, useEffect, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

import { useRouter } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Client, Template } from "@/types"

import { useParams } from "next/navigation"

import axios from "axios"

import { SkeletonOneRow } from "@/components/skeleton-one-row"
import { SkeletonListThumbnail } from "@/components/skeleton-list-thumbnail"

export default function TemplatesCreate() {

  const [loading, setLoading] = useState<boolean>(true)
  const { toast } = useToast()

  const router = useRouter()

  const [settings, setSettings] = useState<any>({})

  // const id = searchParams.get("id")
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState<Client[]>([])

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`;
      return (
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search, users])

  const [template, setTemplate] = useState<Template | null>(null)

  // const [templateName, setTemplateName] = useState("")
  // const [googleDriveLink, setGoogleDriveLink] = useState("")
  // const [date, setDate] = useState(new Date())
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const handleUserSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setSelectedUser(user)
  }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`https://n8n.xponent.ph/webhook/api/clients`);

      setUsers(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error updating data:', error);
      setLoading(false)
    }
  }

  const fetchSettings = async () => {

    setLoading(true)
    try {
      const response = await axios.get(`https://n8n.xponent.ph/webhook/api/settings`);
      // localStorage.setItem("settings", JSON.stringify(response.data))

      setSettings(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }

  const searchUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`https://n8n.xponent.ph/webhook/api/clients?search=${search}`);

      setUsers(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error updating data:', error);
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`https://n8n.xponent.ph/webhook/api/templates`, {
        link: template?.link,
        name: template?.name,
        month: template?.month,
        year: template?.year,
        general_settings: settings.find((setting: any) => setting.name === "general_settings")?.value
      });
      toast({
        description: "Successfully created template",
        variant: "default"
      });
      setLoading(false)
      router.push('/dashboard/templates')
    } catch (error) {
      console.error('Error updating data:', error);
      setLoading(false)
      toast({
        description: "Failed to create template",
        variant: "destructive"
      });
    }
  };

  const handleSetTemplate = (e: ChangeEvent<HTMLInputElement>) => {
    setTemplate(
      {
        ...template,
        [e.target.name]: e.target.value

      } as Template
    )
  }

  useEffect(() => {
    setLoading(false)
    fetchUsers()
    fetchSettings()

  }, []);

  useEffect(() => {
    if (search == '') {
      fetchUsers()
    }
  }, [search]);

  return (

    <div className="flex flex-col">
      <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 md:px-6">
        <h1 className="text-lg font-semibold">Templates</h1>
        <Button size="sm" onClick={handleSave} disabled={loading}>{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Save</Button>
      </header>
      <main className="max-w-2xl mx-auto p-8 grid  gap-8">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Template</CardTitle>
              <CardDescription>
                Add a new template by providing a Google Drive link and selecting a month.
              </CardDescription>
            </CardHeader>
            <CardContent>
            <form className="grid gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="template-name">Template Name</Label>
                    {loading ? <SkeletonOneRow /> :
                      <Input name="name" id="template-name" placeholder="Enter name" value={template?.name} onChange={(e) => handleSetTemplate(e)} />
                    }
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="google-drive-link">Google Drive Link</Label>
                    <CardDescription>Remember to set file access to <strong>Anyone with the link can edit</strong></CardDescription>
                    {loading ? <SkeletonOneRow /> :
                      <Input name="link" id="google-drive-link" placeholder="Enter link" value={template?.link} onChange={(e) => handleSetTemplate(e)} />
                    } </div>
                  <div className="flex ">
                    <div className="space-y-1 w-full flex flex-col">  
                      <Label htmlFor="month-picker">Month</Label>
                      {loading ? <SkeletonOneRow /> :
                        <Select value={template?.month} onValueChange={(e) => setTemplate({ ...template, month: e } as Template)}>
                          <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Select Month" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>

                              <SelectItem value="1">January</SelectItem>
                              <SelectItem value="2">February</SelectItem>
                              <SelectItem value="3">March</SelectItem>
                              <SelectItem value="4">April</SelectItem>
                              <SelectItem value="5">May</SelectItem>
                              <SelectItem value="6">June</SelectItem>
                              <SelectItem value="7">July</SelectItem>
                              <SelectItem value="8">August</SelectItem>
                              <SelectItem value="9">September</SelectItem>
                              <SelectItem value="10">October</SelectItem>
                              <SelectItem value="11">November</SelectItem>
                              <SelectItem value="12">December</SelectItem>

                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      }
                    </div>
                    <div className="space-y-1 ml-4 w-full flex flex-col">
                      <Label htmlFor="year-picker">Year</Label>
                      {loading ? <SkeletonOneRow /> :
                        <Select defaultValue={template?.year} value={template?.year} onValueChange={(e) => setTemplate({ ...template, year: e } as Template)}>
                          <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="2024">2024</SelectItem>
                              <SelectItem value="2025">2025</SelectItem>
                              <SelectItem value="2026">2026</SelectItem>
                              <SelectItem value="2027">2027</SelectItem>
                              <SelectItem value="2028">2028</SelectItem>
                              <SelectItem value="2029">2029</SelectItem>
                              <SelectItem value="2030">2030</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      }
                    </div>
                  </div>



                </form>
            </CardContent>
          </Card>
        </div>
        {/* <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview Users</CardTitle>
              <CardDescription>Search and preview users to use in your project.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Input placeholder="Search users..." value={search}
                    onChange={handleSearch}
                    className="w-full"
                  />
                  <Button
                    onClick={searchUsers}
                    variant="outline"
                    size="sm" disabled={loading}>
                    Search
                  </Button>
                </div>
                <Separator />
                <div className="grid gap-4">
                  {loading ? <SkeletonListThumbnail /> :
                    filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-4 cursor-pointer hover:bg-muted/50 p-2 rounded-md"
                      // onClick={() => handleUserSelect(user)}
                      >
                        <Avatar>
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>{user.first_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.first_name} {user.last_name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </main>
    </div>

  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
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


function FileIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function GroupIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  )
}


function LayoutDashboardIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}


function LayoutTemplateIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="7" x="3" y="3" rx="1" />
      <rect width="9" height="7" x="3" y="14" rx="1" />
      <rect width="5" height="7" x="16" y="14" rx="1" />
    </svg>
  )
}


function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function Package2Icon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}