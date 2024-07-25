/**
 * v0 by Vercel.
 * @see https://v0.dev/t/yXbf9UHEYdb
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useMemo, useRef, SetStateAction, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
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

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"

import { CheckCircledIcon } from '@radix-ui/react-icons'
import { set } from "date-fns"

import { useToast } from "@/components/ui/use-toast"

import SkeletonInput from "@/components/skeleton-input"
import { Loader2 } from "lucide-react"


export default function Component() {

  const { toast } = useToast()

  const [settings, setSettings] = useState<any>([])
  const [generalSettings, setGeneralSettings] = useState<any>([])
  const [integrations, setIntegrations] = useState<any>([])

  const [loading, setLoading] = useState(true)

  const generalSettingsFormSchema = z.object({
    google_drive_folder: z.string(),
    openai_api_key: z.string(),
    default_model: z.string(),
  });
  const generalSettingsForm = useForm<z.infer<typeof generalSettingsFormSchema>>({
    resolver: zodResolver(generalSettingsFormSchema)
  })



  const generateGoogleDriveOAuthToken = async () => {
    const redirect_uri = "https://n8n.xponent.ph/webhook/api/integrations"
    const client_id = "1012113547659-pmqe0svb8mpcka5k5dth8n095jn1u4gq.apps.googleusercontent.com"
    const client_secret = "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"
    const scope = "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/presentations"
    const response_type = "code"
    const access_type = "offline"
    const prompt = "consent"

    const url = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${redirect_uri}&prompt=${prompt}&response_type=${response_type}&client_id=${client_id}&scope=${scope}&access_type=${access_type}`

    console.log(url)

    window.open(url, "_blank")

  }

  const handleGoogleDriveIntegration = () => {
    generateGoogleDriveOAuthToken()

  }
  const handleGoogleSheetsIntegration = () => {

  }
  const handleGmailIntegration = () => {

  }

  const handleGoogleSlidesIntegration = () => {

  }

  const handleSaveGeneralSettings = (values: z.infer<typeof generalSettingsFormSchema>) => {

    console.log(values)
    try {
      saveSettings(values)
    }
    catch (error) {
      console.error(error);
    }
  }

  const saveSettings = async (values: z.infer<typeof generalSettingsFormSchema>) => {
    setLoading(true)
    const generalSettingsId = settings.find((setting: any) => setting.name === "general_settings")?.id;
    const payload = {
      data: {
        "google_drive_folder": values.google_drive_folder,
        "openai_api_key": values.openai_api_key,
        "default_model": values.default_model
      },
      id: generalSettingsId
    }
    axios.post(`https://n8n.xponent.ph/webhook/api/settings`, payload)
      .then(response => {
        console.log(response)
        toast({
          title: "Settings Saved",
          description: "Settings have been saved successfully",
        })
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        toast({
          title: "Error",
          description: "An error occurred while saving settings",
          variant: "destructive"
        })
        setLoading(false)
      })
  }


  const fetchSettings = async () => {

    setLoading(true)
    try {
      const response = await axios.get(`https://n8n.xponent.ph/webhook/api/settings`);
      // localStorage.setItem("settings", JSON.stringify(response.data))

      setSettings(response.data)
      setGeneralSettings(response.data.find((setting: any) => setting.name === "general_settings")?.value)

      generalSettingsForm.setValue("google_drive_folder", response.data.find((setting: any) => setting.name === "general_settings")?.value?.google_drive_folder)
      generalSettingsForm.setValue("openai_api_key", response.data.find((setting: any) => setting.name === "general_settings")?.value?.openai_api_key)
      generalSettingsForm.setValue("default_model", response.data.find((setting: any) => setting.name === "general_settings")?.value?.default_model)
      

      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  // useEffect(() => {
  //   generalSettingsForm.setValue("google_drive_folder", generalSettings?.google_drive_folder)
  //     generalSettingsForm.setValue("openai_api_key", generalSettings?.openai_api_key)
  //     generalSettingsForm.setValue("default_model", generalSettings?.default_model)
  // } , [generalSettings])

  // useEffect(() => {
  //   if (settings.length > 0) {
  //     const newGeneralSettings = settings.find((setting: any) => setting.name === "general_settings")?.value;
  //     const newIntegrations = settings.find((setting: any) => setting.name === "integrations")?.value;

  //     setGeneralSettings(newGeneralSettings)
  //     setIntegrations(newIntegrations)

  //     generalSettingsForm.setValue("google_drive_folder", generalSettings?.google_drive_folder)
  //     generalSettingsForm.setValue("openai_api_key", generalSettings?.openai_api_key)
  //     generalSettingsForm.setValue("default_model", generalSettings?.default_model)


  //   }
  // }
  //   , [settings])

  return (

    <div className="flex flex-col flex-1">
      <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 md:px-6">
        <h1 className="text-lg font-semibold">Settings</h1>
        {/* <div className="flex items-center gap-2">

          <Button size="sm">Save</Button>

        </div> */}
      </header>
      <main className="w-full max-w-2xl mx-auto p-8 grid  gap-8">

        <Card>
          <CardHeader>
            <CardTitle className="text-base">General Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...generalSettingsForm}>
              <form className="grid gap-4" onSubmit={generalSettingsForm.handleSubmit(handleSaveGeneralSettings)}>
                {loading ? <SkeletonInput /> :
                  <FormField
                    control={generalSettingsForm.control}
                    name="google_drive_folder"
                    render={({ field }) => (
                      <div className="space-y-1">
                        <FormLabel>Google Drive</FormLabel>
                        <FormDescription>Generated files will be stored in this folder</FormDescription>
                        <FormControl>
                          <>
                            <Input required {...field} />
                            <FormMessage>{generalSettingsForm.formState.errors.google_drive_folder?.message}</FormMessage>
                          </>

                        </FormControl>
                      </div>
                    )}
                  />
                }

                {loading ? <SkeletonInput /> :
                  <FormField
                    control={generalSettingsForm.control}
                    name="openai_api_key"
                    render={({ field }) => (
                      <div className="space-y-1">
                        <FormLabel>OpenAI API Key</FormLabel>
                        <FormDescription>Visit this <a target="_blank" className="font-bold text-blue-800" href="https://platform.openai.com/settings/organization/team">OpenAI page</a> to get your API key</FormDescription>
                        <FormControl>
                          <>
                            <Input required {...field} />
                            <FormMessage>{generalSettingsForm.formState.errors.openai_api_key?.message}</FormMessage>
                          </>

                        </FormControl>
                      </div>
                    )}
                  />}

                {loading ? <SkeletonInput /> :
                  <FormField
                    control={generalSettingsForm.control}
                    name="default_model"
                    render={({ field }) => (
                      <div className="space-y-1">
                        <FormLabel>AI Model</FormLabel>
                        <FormDescription>Default model to use for generating TC contents</FormDescription>
                        <FormControl>
                          <>
                            <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Select a model" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                                <SelectItem value="gpt-4">GPT-4</SelectItem>
                                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                                <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage>{generalSettingsForm.formState.errors.default_model?.message}</FormMessage>
                          </>

                        </FormControl>
                      </div>
                    )}
                  />
                }


                <Button disabled={loading} variant="outline" type="submit" className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Settings
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle className="text-base">Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-3">
              <Card>
                <CardHeader className="flex flex-col items-center justify-between space-y-4">
                  <ChromeIcon className="h-5 w-5" />
                  <CardTitle className="text-sm text-center">Google Drive</CardTitle>

                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <Button onClick={()=> handleGoogleDriveIntegration()} size="sm" variant="outline">
                    {integrations.find((integration: any) => integration.type === "googleDriveOAuth2Api")?.is_active ? "Connected" : "Connect"}
                    {integrations.find((integration: any) => integration.type === "googleDriveOAuth2Api")?.is_active ? <CheckCircledIcon className="ml-2 h-4 w-4" /> : null}
      
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-col items-center justify-between space-y-4">
                  <SheetIcon className="h-5 w-5" />
                  <CardTitle className="text-sm text-center">Google Sheets</CardTitle>

                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <Button size="sm" variant="outline">
                    {integrations.find((integration: any) => integration.type === "googleSheetsOAuth2Api")?.is_active ? "Connected" : "Connect"}
                    {integrations.find((integration: any) => integration.type === "googleSheetsOAuth2Api")?.is_active ? <CheckCircledIcon className="ml-2 h-4 w-4" /> : null}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-col items-center justify-between space-y-4">
                  <SheetIcon className="h-5 w-5" />
                  <CardTitle className="text-sm text-center">Google Slides</CardTitle>

                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <Button size="sm" variant="outline">
                    {integrations.find((integration: any) => integration.type === "googleSlidesOAuth2Api")?.is_active ? "Connected" : "Connect"}
                    {integrations.find((integration: any) => integration.type === "googleSlidesOAuth2Api")?.is_active ? <CheckCircledIcon className="ml-2 h-4 w-4" /> : null}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-col items-center justify-between space-y-4">
                  <MailIcon className="h-5 w-5" />
                  <CardTitle className="text-sm text-center">Gmail</CardTitle>

                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <Button size="sm" variant="outline">
                    {integrations.find((integration: any) => integration.type === "gmailOAuth2")?.is_active ? "Connected" : "Connect"}
                    {integrations.find((integration: any) => integration.type === "gmailOAuth2")?.is_active ? <CheckCircledIcon className="ml-2 h-4 w-4 " /> : null}
                  </Button>
                </CardContent>
              </Card>


            </div>
          </CardContent>
        </Card> */}



      </main>
    </div>

  )
}


function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function SheetIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <line x1="3" x2="21" y1="15" y2="15" />
      <line x1="9" x2="9" y1="9" y2="21" />
      <line x1="15" x2="15" y1="9" y2="21" />
    </svg>
  )
}