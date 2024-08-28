'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8JUkUJwAd9v
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { Client } from "@/types"
import SkeletonCardGrid from "@/components/skeleton-card-grid"
import { Badge } from "@/components/ui/badge"





export default function Clients() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true)

  const [clients, setClients] = useState<Client[]>([])

  const [searchInput, setSearchInput] = useState<string>("")

  const viewDetails = (id: string) => {

    router.push(`/dashboard/clients/${id}/treasure-chest`)
  }

  const fetchClients = async () => {
    setLoading(true)
    try {
      const response = await axios.get("https://n8n.xponent.ph/webhook/api/clients/")
      // setClients(response.data.data)
      const sortedClients = response.data.data.sort((a: Client, b: Client) => (b.id ?? 0) - (a.id ?? 0))
      setClients(sortedClients)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const editDetails = (id: string) => {

    router.push(`/dashboard/clients/${id}/edit`)
  }

  const searchClients = async () => {

    setLoading(true)
    try {
      const response = await axios.get(`https://n8n.xponent.ph/webhook/api/clients/?search=${searchInput}`)
      setClients(response.data.data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }


  const handleSearchClientInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)

  }


  useEffect(() => {
    fetchClients()
  }, [])

  useEffect(() => {
    if (searchInput === "") {
      fetchClients()
    }

  }
    , [searchInput])
  return (
    <>
      <div className="flex flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 md:px-6">
          <h1 className="text-lg font-semibold">Clients</h1>
          <div className="flex items-center gap-2">

            <Button size="sm" onClick={() => {
              router.push("/dashboard/clients/create")
            }}>Create New</Button>
            {/* <Button variant="outline" size="sm">
              <UploadIcon className="h-4 w-4 mr-2" />
              Import CSV
            </Button> */}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex justify-start mb-4 gap-2">
            <Input type="search" onChange={handleSearchClientInput} placeholder="Search clients..." className="max-w-[200px]" ></Input>
            <Button onClick={searchClients} variant="outline" >Search</Button>
          </div>

          {loading ? <SkeletonCardGrid /> :
            <div className="grid gap-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                {
                  clients.map((client, index) => {
                    return (
                      <Card key={index}>
                        <CardHeader className="flex items-center">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>
                              {client.first_name[0].toUpperCase() + client.last_name[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col items-center gap-4 ">

                            <div className="flex flex-col gap-2 text-center">
                              <h3 className="text-lg font-semibold">{client.first_name + " " + client.last_name}</h3>


                              <p className="text-sm text-muted-foreground">{client.email}</p>
                              <div>
                                <Badge className={client.subscription == "premium" ? "bg-amber-500" : "bg-sky-400"} variant="default">{client.subscription}</Badge>
                              </div>


                            </div>
                            <div className="flex gap-2">
                              <Button onClick={() => viewDetails(client.id?.toString() ?? "")} variant="outline" size="sm">
                                Treasure Chest
                              </Button>
                              <Button onClick={(e) => { e.preventDefault(); editDetails(client.id?.toString() ?? "") }} variant="outline" size="sm">
                                Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                }

              </div>
              {/* <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div> */}
            </div>
          }
        </main>

      </div>
    </>
  )
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}