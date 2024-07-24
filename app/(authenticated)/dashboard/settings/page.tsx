/**
 * v0 by Vercel.
 * @see https://v0.dev/t/yXbf9UHEYdb
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useMemo, useRef, SetStateAction, useEffect } from "react"
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


export default function Component() {

  const [googleDriveLink, setGoogleDriveLink] = useState("")
  const [openAIApiKey, setOpenAIApiKey] = useState("")
  const [defaultModel, setDefaultModel] = useState("gpt-3.5")
  const [assistant, setAssistant] = useState("gpt-3.5")
  const [googleDriveIntegration, setGoogleDriveIntegration] = useState(false)
  const [googleSheetsIntegration, setGoogleSheetsIntegration] = useState(false)
  const [gmailIntegration, setGmailIntegration] = useState(false)
  const [treasureChestCustomPrompt, setTreasureChestCustomPrompt] = useState("")


  const [settings, setSettings] = useState([])

  const [loading, setLoading] = useState(true)

  const generalSettingsFormSchema = z.object({
    google_drive_folder: z.string(),
    openai_api_key: z.string(),
    default_model: z.string(),
  });
  const generalSettingsForm = useForm<z.infer<typeof generalSettingsFormSchema>>({
    resolver: zodResolver(generalSettingsFormSchema)
  })



  const handleGoogleDriveLinkChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setGoogleDriveLink(e.target.value)
  }
  const handleOpenAIApiKeyChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setOpenAIApiKey(e.target.value)
  }
  const handleDefaultModelChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setDefaultModel(value)
  }
  const handleAssistantChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setAssistant(value)
  }
  const handleGoogleDriveIntegrationChange = () => {
    setGoogleDriveIntegration(!googleDriveIntegration)
  }
  const handleGoogleSheetsIntegrationChange = () => {
    setGoogleSheetsIntegration(!googleSheetsIntegration)
  }
  const handleGmailIntegrationChange = () => {
    setGmailIntegration(!gmailIntegration)
  }
  const handleTreasureChestCustomPromptChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setTreasureChestCustomPrompt(e.target.value)
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
      })
      .catch(error => {
        console.error(error)
      })
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

  useEffect(() => {
    fetchSettings()
  }, [])

  useEffect(() => {
    if (settings.length > 0) {
      const generalSettings = settings.find((setting: any) => setting.name === "general_settings")?.value;
      console.log(generalSettings)
      generalSettingsForm.setValue("google_drive_folder", generalSettings?.google_drive_folder)
      generalSettingsForm.setValue("openai_api_key", generalSettings?.openai_api_key)
      generalSettingsForm.setValue("default_model", generalSettings?.default_model)
    }
  }
    , [settings])

  return (

    <div className="flex flex-col flex-1">
      <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 md:px-6">
        <h1 className="text-lg font-semibold">Settings</h1>
        <div className="flex items-center gap-2">

          <Button size="sm">Save</Button>

        </div>
      </header>
      <main className="w-full max-w-2xl mx-auto p-8 grid  gap-8">

        <Card>
          <CardHeader>
            <CardTitle className="text-base">General Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...generalSettingsForm}>
              <form className="grid gap-4" onSubmit={generalSettingsForm.handleSubmit(handleSaveGeneralSettings)}>

                <FormField
                  control={generalSettingsForm.control}
                  name="google_drive_folder"
                  render={({ field }) => (
                    <div className="space-y-1">
                      <FormLabel>Google Drive Folder</FormLabel>
                      <FormControl>
                        <>
                          <Input required {...field} />
                          <FormMessage>{generalSettingsForm.formState.errors.google_drive_folder?.message}</FormMessage>
                        </>

                      </FormControl>
                    </div>
                  )}
                />

                <FormField
                  control={generalSettingsForm.control}
                  name="openai_api_key"
                  render={({ field }) => (
                    <div className="space-y-1">
                      <FormLabel>OpenAI API Key</FormLabel>
                      <FormControl>
                        <>
                          <Input required {...field} />
                          <FormMessage>{generalSettingsForm.formState.errors.openai_api_key?.message}</FormMessage>
                        </>

                      </FormControl>
                    </div>
                  )}
                />


                <FormField
                  control={generalSettingsForm.control}
                  name="default_model"
                  render={({ field }) => (
                    <div className="space-y-1">
                      <FormLabel>Default Model</FormLabel>
                      <FormControl>
                        <>
                          <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                              <SelectItem value="gpt-4">GPT-4</SelectItem>
                              <SelectItem value="gpt-4-o">GPT-4o</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage>{generalSettingsForm.formState.errors.default_model?.message}</FormMessage>
                        </>

                      </FormControl>
                    </div>
                  )}
                />


                <Button variant="outline" type="submit" className="w-full">
                  Save Settings
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button variant="outline">
                <ChromeIcon className="mr-2 h-4 w-4" /> Connect with Google Drive
              </Button>

              <Button variant="outline">
                <SheetIcon className="mr-2 h-4 w-4" /> Connect with Google Sheets
              </Button>


              <Button variant="outline">
                <MailIcon className="mr-2 h-4 w-4" /> Connect with Gmail
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-base">Treasure Chest Custom Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Textarea
                id="treasure-chest-custom-prompt"
                placeholder="Enter your custom prompt for the Treasure Chest feature"
                value={treasureChestCustomPrompt}
                // onChange={handleTreasureChestCustomPromptChange}
                className="min-h-[100px]"
              />
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