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

import { useParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { ToastAction } from "@/components/ui/toast"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useRouter } from 'next/navigation'

import axios from "axios"

import { SkeletonOneRow } from "@/components/skeleton-one-row"
import { SkeletonListThumbnail } from "@/components/skeleton-list-thumbnail"

import { Client, Template } from "@/types"

// import useGenerateTc from "@/hooks/useGenerateTc"
import GenerateTc from "@/components/generate-tc-dialog"

export default function Component() {

  const router = useRouter()

  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState<boolean>(true)
  const { toast } = useToast()

  const [template, setTemplate] = useState<Template | null>(null)

  const [showDialog, setShowDialog] = useState<boolean>(false)

  // const { user, tc, showDialog, openDialog, closeDialog } = useGenerateTc();

  // const id = searchParams.get("id")
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)

  const [selectedClient, setSelectedClient] = useState<Client>({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    company_description: '',
    role: '',
    experience: '',
    subscription: '',
    writing_profile: '',
    recruiting_profile: '',
    treasure_chest_link: '',
    prompt: ''
  })



  const [deleteTemplateInput, setDeleteTemplateInput] = useState("")

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


  const [date, setDate] = useState(new Date())
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const handleUserSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setSelectedUser(user)
  }

  const handleSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      link: template?.link,
      name: template?.name,
      month: template?.month,
      year: template?.year
    };
    axios.post(`https://n8n.xponent.ph/webhook/6cc085c7-f6bb-4744-bf8e-ce991c9450d6/api/templates/${params?.id}`, data)
      .then(response => {
        console.log(response.data);
        setLoading(false);
        toast({
          title: "Template saved",
          description: "Your template has been saved successfully."
        });
      })
      .catch(error => {
        console.error('Error updating data:', error);
        setLoading(false);
        toast({
          title: "Error saving template",
          description: "An error occurred while saving your template.",
          variant: "destructive"
        });
      });
  }

  const deleteTemplate = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);
    await axios.delete(`https://n8n.xponent.ph/webhook/api/templates`, {
      data: {
        id: params?.id,
        raw_template_id: template?.raw_template_id
      }
    })
      .then(response => {
        console.log(response.data);
        setLoading(false);
        toast({
          title: "Template deleted",
          description: "Your template has been deleted successfully."
        });
        router.push('/dashboard/templates')
      })
      .catch(error => {
        console.error('Error deleting data:', error);
        setLoading(false);
        toast({
          title: "Error deleting template",
          description: "An error occurred while deleting your template.",
          variant: "destructive"
        });
      });
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



  const handlePreviewTemplate = (user: Client) => {
    // previewTemplate(user, googleDriveLink)

    // if(showDialog){
    //   console.log("close dialog") 
    //   closeDialog()
    // }else{
    //   console.log("open dialog") 
    //   openDialog()
    // }

    setSelectedClient(user)

    setShowDialog(true)



  }

  const fetchTemplate = async () => {
    try {
      const response = await axios.get(`https://n8n.xponent.ph/webhook/c1491c73-4ff5-42ef-971f-1e15d2466730/api/templates/${params?.id}`);

      setTemplate(response.data)

      setLoading(false)

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false)
    }
  }

  const handleSetTemplate = (e: ChangeEvent<HTMLInputElement>) => {
    setTemplate(
      {
        ...template,
        [e.target.name]: e.target.value

      } as Template
    )
  }




  useEffect(() => {

    fetchTemplate()
    fetchUsers()
  }, []
  );

  useEffect(() => {
    if (search == '') {
      fetchUsers()
    }
  }, [search]);


  return (

    <>
      <div className="flex flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 md:px-6">
          <h1 className="text-lg font-semibold">Templates</h1>
          <Button size="sm" onClick={handleSave} disabled={loading}>{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Save</Button>
        </header>
        <main className=" max-w-2xl mx-auto p-8 grid  gap-8">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Template Details</CardTitle>
                <CardDescription>
                  Make changes to your template here. Click save when you&apos;re done.
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
                          <div onClick={() => handlePreviewTemplate(user)}>
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

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Delete Template</CardTitle>
                <CardDescription>
                  Type <strong>{template?.name}</strong> in the input field below to delete this template. This action cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <Input
                    placeholder="Template Link"
                    onChange={(e) => setDeleteTemplateInput(e.target.value)}
                    value={deleteTemplateInput}
                  />
                  <Button
                    variant="destructive"
                    className="w-auto"
                    size="sm"
                    onClick={deleteTemplate}
                    disabled={!(deleteTemplateInput === template?.name && deleteTemplateInput !== "" && !loading)}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <GenerateTc googleDriveLink={template?.link as string} showDialog={showDialog} setShowDialog={setShowDialog} client={selectedClient} />
    </>
  )
}

