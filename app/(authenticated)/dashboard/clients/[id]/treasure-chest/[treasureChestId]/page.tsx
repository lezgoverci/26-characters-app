"use client"

import React, { ChangeEvent, useState, useEffect } from 'react';
import { useParams, useSearchParams } from "next/navigation"

import SkeletonCardPost from "@/components/skeleton-card-post"


import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"
import { Client, File, Post } from "@/types"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import SkeletonInput from "@/components/skeleton-input"

import axios from "axios"



export default function TreasureChestDetailsPage() {
    const params = useParams<{ treasureChestId: string, id: string }>()

    const searchParams = useSearchParams()

    const fileId = searchParams?.get('fileId')
    const [loading, setLoading] = useState(true)

    const [client, setClient] = useState<Client | null>(null)

    const [posts, setPosts] = useState<Post[]>([])

    const [selectedPost, setSelectedPost] = useState<Post | null>(null)

    const [selectedModel, setSelectedModel] = useState("")

    const [customPrompt, setCustomPrompt] = useState("")

    const [file, setFile] = useState<File | null>(null)

    const [settings, setSettings] = useState<any | null>()

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

    const fetchFile = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://n8n.xponent.ph/webhook/756fafd4-8400-4421-8892-455a7026ee9d/api/files/${fileId}`);
            console.log(response.data)
            setFile(response.data)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }


    const fetchGeneratedPosts = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://n8n.xponent.ph/webhook/api/generated-posts?id=${params?.treasureChestId}`);
            if (response.data.data.length == 0) {
                setPosts([])
                console.log("No posts found")
            } else {
                setPosts(response.data.data)
            }

            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    const generateNewContent = async () => {
        setLoading(true)
        try {
            const response = await axios.post(`https://n8n.xponent.ph/webhook/api/generate-single-post`, {
                original: selectedPost?.raw_content,
                custom_prompt: customPrompt,
                writing_profile: client?.writing_profile,
                recruiting_profile: client?.recruiting_profile,
                original_prompt: client?.prompt,
                model: selectedModel,
                openai_api_key: settings?.openai_api_key
            });
            
            const newSelectedPost = { ...selectedPost, generated_content: response.data.data }
            console.log(newSelectedPost)
            setSelectedPost(newSelectedPost)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    const fetchSettings = async () => {

        setLoading(true)
        try {
          const response = await axios.get(`https://n8n.xponent.ph/webhook/api/settings`);
          // localStorage.setItem("settings", JSON.stringify(response.data))
    
          const general_settings = response.data.find((setting: any) => setting.name == "general_settings")?.value
          console.log(general_settings)
          setSettings(general_settings)
          setLoading(false)
        } catch (error) {
          console.error(error);
          setLoading(false)
        }
      }

    useEffect(() => {
        fetchGeneratedPosts()
        fetchClient()
        fetchSettings()

        if (fileId) {
            fetchFile()
        }
    }, [])
    return (
        <div className="flex flex-col">
            <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 md:px-6">

                {!loading && <h1 className="text-lg font-semibold">{file?.filename} ({file?.type == "premium" ? "Personalized" : "Standard"})</h1>}

            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6 gap-4">

                <div className="flex flex-col justify-between mb-4 gap-4">
                    {loading ? <SkeletonCardPost /> :
                        (posts.length > 0) && (

                            <Card >

                                <CardHeader className="flex flex-row justify-between items-center">

                                    <Select value={selectedPost?.id.toString()} onValueChange={(value) => {
                                        const foundPost = posts?.find((post: Post) => post.id.toString() == value);
                                        setSelectedPost(foundPost ?? null);
                                    }}  >
                                        <SelectTrigger className="w-1/4">
                                            <SelectValue placeholder="Select a post" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {posts.map((post: any) => (
                                                    <SelectItem key={post?.id} value={post?.id.toString()}>{post?.title}</SelectItem>))}
                                            </SelectGroup>
                                        </SelectContent>

                                    </Select>
                                    <Button size="sm" className='w-auto'>
                                        Apply Changes
                                    </Button>

                                </CardHeader>
                                <CardContent className="flex items-center gap-4">
                                    {loading ? <SkeletonInput /> :

                                        <div className='flex flex-1 gap-4'>
                                            <div className='flex flex-col gap-4 w-1/3'>
                                                <Label>Original</Label>
                                                <Textarea
                                                    id="writing-profile"
                                                    value={selectedPost?.raw_content}

                                                    className="w-full min-h-[200px] text-sm text-muted-foreground"
                                                />
                                                <Label>Custom Prompt</Label>
                                                <Textarea
                                                    name="custom_prompt"
                                                    id="custom_prompt"
                                                    value={customPrompt}
                                                    
                                                    onChange={(e) => {
                                                        setCustomPrompt(e.target.value)
                                                    }}

                                                    className="w-full min-h-[100px] text-sm text-muted-foreground"
                                                />
                                                <Select value={selectedModel} onValueChange={
                                                    (value) => {
                                                        setSelectedModel(value)
                                                    }
                                                } >
                                                    <SelectTrigger >
                                                        <SelectValue placeholder="Select a model" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>

                                                            <SelectItem value="gpt-3.5-turbo">GPT 3.5 Turbo</SelectItem>
                                                            <SelectItem value="gpt-4">GPT 4</SelectItem>
                                                            <SelectItem value="gpt-4-turbo">GPT 4 Turbo</SelectItem>
                                                            <SelectItem value="gpt-4o">GPT 4o</SelectItem>
                                                            <SelectItem value="gpt-4o-mini">GPT 4o Mini</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>

                                                </Select>
                                                <div className='flex gap-4'>
                                                    <Button onClick={(e)=>{
                                                        e.preventDefault()
                                                        generateNewContent()}} variant="outline" className='w-full'>Generate</Button>

                                                </div>

                                            </div>
                                            {client?.subscription !== "premium" ? null :
                                                <div className='w-full'>
                                                    <Label>Generated</Label>
                                                    <Textarea
                                                        id="writing-profile"
                                                        value={selectedPost?.generated_content}

                                                        className="w-full min-h-[600px] text-sm text-muted-foreground"
                                                    />
                                                </div>}
                                        </div>
                                    }

                                </CardContent>
                            </Card>
                        )
                    }

                </div>

            </main>
        </div>
    )
}