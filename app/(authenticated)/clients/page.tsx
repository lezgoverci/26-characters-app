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
import { Card, CardContent } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination"
import {useRouter} from "next/navigation"

export default function Clients(){
    const router = useRouter();

    const viewDetails = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        router.push("/clients/1")
    }
    return(
        <>
        <div className="flex flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 md:px-6">
          <h1 className="text-lg font-semibold">Clients</h1>
          <div className="flex items-center gap-2">
            <Input type="search" placeholder="Search clients..." className="max-w-[200px]" />
            <Button size="sm">Create New</Button>
            <Button variant="outline" size="sm">
              <UploadIcon className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
              <Card>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">johndoe@example.com</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={viewDetails} variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">Jane Doe</h3>
                      <p className="text-sm text-muted-foreground">janedoe@example.com</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={viewDetails} variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">Sarah Miller</h3>
                      <p className="text-sm text-muted-foreground">sarahmiller@example.com</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={viewDetails} variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">Michael Johnson</h3>
                      <p className="text-sm text-muted-foreground">michaeljohnson@example.com</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={viewDetails} variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
              <Card>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>EW</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">Emily Wilson</h3>
                      <p className="text-sm text-muted-foreground">emilywilson@example.com</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={viewDetails} variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>RD</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">Robert Davis</h3>
                      <p className="text-sm text-muted-foreground">robertdavis@example.com</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={viewDetails} variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center">
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
            </div>
          </div>
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