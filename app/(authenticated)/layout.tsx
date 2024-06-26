import SideMenu from "@/components/sidemenu"


export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[280px_1fr]">
      <SideMenu />
      <div className="flex flex-col">
 
       {children}
      </div>
    </div>
    )
  }