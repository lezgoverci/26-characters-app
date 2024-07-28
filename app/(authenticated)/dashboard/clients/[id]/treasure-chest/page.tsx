/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gzIqVx5Ydw5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import React, { ChangeEvent } from 'react';
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Pagination } from "@/components/ui/pagination"
import { Loader2 } from "lucide-react"
import { Client, Template, File } from "@/types"
import axios from "axios"
import { useEffect } from "react"
import SkeletonCardGridSimple from '@/components/skeleton-card-grid-simple';
import { useParams } from "next/navigation"
import { Trash } from "lucide-react"

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



export default function Component() {
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const router = useRouter()


  const [client, setClient] = useState<Client | null>(null)

  const [settings, setSettings] = useState<any | null>()





  const [files, setFiles] = useState<File[] | null>()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const filteredFiles = useMemo(() => {
    return files?.filter((file) => {
      return file.filename?.toLowerCase().includes(search.toLowerCase()) ||
        templates.find((template) => template.id == file.template)?.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [search, files])
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredFiles?.slice(indexOfFirstItem, indexOfLastItem)
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
    setCurrentPage(1);
  };

  const handleDownload = (file: File) => {
    console.log(`Downloading ${file.filename}`);
    window.open(file.link + "/export/pdf", "_blank");
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const fetchTemplates = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`https://n8n.xponent.ph/webhook/api/templates`);
      setTemplates(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }

  const fetchFiles = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`https://n8n.xponent.ph/webhook/api/files?client=${params?.id}`);
      if (response.data.data.length == 0) {
        setFiles([])
        console.log("No files found")
      } else {
        setFiles(response.data.data)
      }

      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }


  const fetchClient = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`https://n8n.xponent.ph/webhook/2f4bc294-6be4-4da2-ba85-9f681a8e93b4/api/clients/${params?.id}`);

      setClient(response.data)
      setLoading(false)

    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

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



  const getTemplate = async (id: string) => {
    setLoading(true)
    try {
      const response = await axios.get(`https://n8n.xponent.ph/webhook/api/templates/${id}`);
      setLoading(false)
      return response.data.link
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }


  const handleGenerate = async () => {

    setLoading(true);
    const data = {
      client: client,
      type: client?.subscription,
      template: selectedTemplate,
      general_settings: settings.find((setting: any) => setting.name === "general_settings")?.value,
    };
    axios.post(`https://n8n.xponent.ph/webhook/api/treasure-chest?type=${data.type}`, data)
      .then(response => {
        console.log(response.data);
        fetchFiles()
        setLoading(false);
      })
      .catch(error => {
        console.error('Error updating data:', error);
        fetchFiles()
        setLoading(false);

      });

  }

  const handleSelectTemplate = (value: string) => {
    const template = templates.find(template => template.id.toString() === value) || null;
    setSelectedTemplate(template);
  }




  useEffect(() => {


    fetchFiles()
    fetchClient()
    fetchTemplates()
    fetchSettings()

  }, [])
  function handleDelete(file: File): void {
    setLoading(true);
    axios.delete(`https://n8n.xponent.ph/webhook/api/files?id=${file.id}`)
      .then(response => {
        console.log(response.data);
        fetchFiles()
        setLoading(false);
      })
      .catch(error => {
        console.error('Error updating data:', error);
        fetchFiles()
        setLoading(false);
      });
  }

  return (

    <div className="flex flex-col">
      <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 md:px-6">

        <h1 className="text-lg font-semibold">{client?.first_name} {client?.last_name} Treasure Chest</h1>

      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6 gap-4">

        <div className="flex justify-between mb-4 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search files..."
                value={search}
                onChange={handleSearch}
                className="w-full max-w-[300px]"
              />
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" >
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Filter
                    <ChevronDownIcon className="h-4 w-4 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[300px] p-2">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="filter-pdf" />
                      <Label htmlFor="filter-pdf">PDF</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="filter-xlsx" />
                      <Label htmlFor="filter-xlsx">XLSX</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="filter-pptx" />
                      <Label htmlFor="filter-pptx">PPTX</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="filter-docx" />
                      <Label htmlFor="filter-docx">DOCX</Label>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu> */}
              <Button variant="outline" onClick={fetchFiles} disabled={loading}>{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Refresh List</Button>
            </div>

          </div>
          <div className='flex gap-2'>
          
            <Select onValueChange={(value) => { handleSelectTemplate(value) }} value={selectedTemplate?.id.toString()}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Templates</SelectLabel> */}
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id.toString()}>
                      {template.name}
                    </SelectItem>
                  ))}

                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={(e) => { e.preventDefault(); handleGenerate() }} variant="default" disabled={loading || selectedTemplate == null}>{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Generate</Button>

          </div>

        </div>
        {
          loading ? <SkeletonCardGridSimple /> :
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {
                (currentItems?.length == 0 || currentItems == undefined) && !loading ? <div className="text-start">No files found</div> : null
              }
              {currentItems?.map((file) => (
                <Card key={file.id}>

                  <CardHeader className="flex flex-row justify-between">
                    <div className="font-medium">{file.filename} ({file.type == "premium" ? "Personalized" :"Standard"})</div>
                    <Trash onClick={() => handleDelete(file)} size={16} />
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                    <div className="flex-1">


                      <div className="text-sm text-muted-foreground">Created: {new Date(file.created_at)?.toLocaleDateString()}</div>
                      <div className="text-sm text-muted-foreground">Template: {templates.find((template) => template.id == file.template)?.name}</div>
                    </div>
                    {file.status === "completed" ?
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          console.log(`Viewing ${file.filename}`);
                          window.open(file.link, "_blank");
                        }}
                      >Open</Button> : null}
                    {/* <Button disabled={
                      !["completed", "failed"].includes(file.status)
                    } variant="outline" size="sm" onClick={() => handleDownload(file)}>
                      {
                        file.status === "processing" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null
                      }
                      {
                        file.status === "processing" ? "Processing" : "Download PDF"
                      }

                    </Button> */}
                    <Button variant="outline" size="sm" onClick={(e) => router.push(`treasure-chest/${file?.generated_treasure_chest}?fileId=${file?.id}`)}>Edit</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
        }
        <div className="flex justify-center mt-6">
          <Pagination
          // currentPage={currentPage}
          // totalItems={filteredFiles.length}
          // itemsPerPage={itemsPerPage}
          // onPageChange={handlePageChange}
          />
        </div>

     
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


function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
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