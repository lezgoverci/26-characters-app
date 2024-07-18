'use client'
import SideMenu from "@/components/sidemenu"
import { Toaster } from "@/components/ui/toaster"
import GenerateTc from "@/components/generate-tc-dialog"



export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {


  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[280px_1fr]">
      <SideMenu />
      <div className="flex flex-col overflow-auto h-full">

        {children}
        <Toaster />
      </div>



    </div>
  )
}