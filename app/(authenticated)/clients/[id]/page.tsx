/**
 * v0 by Vercel.
 * @see https://v0.dev/t/F3hDyv0OUod
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandList, CommandItem } from "@/components/ui/command"
import { Textarea } from "@/components/ui/textarea"


export default function ClientsDetails(){
    return(
        <>
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
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-sm">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      defaultValue="John Doe"
                      className="w-full text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      defaultValue="johndoe@example.com"
                      className="w-full text-sm text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="company" className="text-sm">
                      Company
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Acme Inc"
                      defaultValue="Acme Inc"
                      className="w-full text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="company-description" className="text-sm">
                      Company Description
                    </Label>
                    <Textarea
                      id="company-description"
                      placeholder="Acme Inc is a leading provider of innovative software solutions. We specialize in developing cutting-edge applications that empower our clients to achieve their business goals."
                      className="w-full text-sm text-muted-foreground"
                      defaultValue="Acme Inc is a leading provider of innovative software solutions. We specialize in developing cutting-edge applications that empower our clients to achieve their business goals."
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="role" className="text-sm">
                      Role
                    </Label>
                    <Input
                      id="role"
                      type="text"
                      placeholder="Software Engineer"
                      defaultValue="Software Engineer"
                      className="w-full text-sm text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="experience" className="text-sm">
                      Experience
                    </Label>
                    <Input
                      id="experience"
                      type="text"
                      placeholder="5 years of experience"
                      defaultValue="5 years of experience"
                      className="w-full text-sm text-muted-foreground"
                    />
                  </div>
                  <div className="grid gap-2">
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
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
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
                  </div>
             
                  
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
        </>
    )
}

function ChevronDownIcon(props:React.SVGProps<SVGSVGElement>) {
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

  function GiftIcon(props:React.SVGProps<SVGSVGElement>) {
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