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

import { useToast } from "@/components/ui/use-toast"

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

    const { toast } = useToast()

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
    const [generatedDraftPost, setGeneratedDraftPost] = useState("")

    const [contentToBeReplaced, setContentToBeReplaced] = useState("")

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
                const sortedByIdPosts = response.data.data.sort((a: any, b: any) => a.id - b.id)
                setPosts(sortedByIdPosts)
                if (!selectedPost) {
                    setSelectedPost(sortedByIdPosts[0])
                }

                
                
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

            // const newSelectedPost = { ...selectedPost, updated_generated_content: response.data.data }
            // console.log(newSelectedPost)
            // setSelectedPost(newSelectedPost)
            setGeneratedDraftPost(response.data.data)
  
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
   
            setSettings(general_settings)
            setSelectedModel(general_settings?.default_model)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    const applyChanges = async () => {
        setLoading(true)
        try {
            const response = await axios.post(`https://n8n.xponent.ph/webhook/api/apply-single-post`, {
                generated_post_id: selectedPost?.id,
                generated_content: generatedDraftPost,
                original_content: selectedPost?.generated_content,
                presentation_file_id: file?.drive_id,
                title: selectedPost?.title,
                search_content: contentToBeReplaced
            });
            // console.log(response.data)
            await fetchGeneratedPosts()
            setContentToBeReplaced(generatedDraftPost)
            setLoading(false)
            toast({
                description: "Changes applied successfully",
            });
        } catch (error) {
            console.error(error);
            setLoading(false)
            toast({
                description: "Failed to apply changes",
                variant: "destructive"
            });
        }
    }

    useEffect(()=>{
        console.log("contentToBeReplaced",contentToBeReplaced)
    },[contentToBeReplaced])



    useEffect(() => {
        setGeneratedDraftPost(selectedPost?.generated_content as string)
        setContentToBeReplaced(selectedPost?.generated_content as string)
    }, [selectedPost])

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
                                    <div className='flex gap-4'>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {

                                                window.open(file?.link, "_blank");
                                            }}
                                        >Open Slides</Button>
                                        <Button onClick={
                                            (e) => {
                                                e.preventDefault()
                                                applyChanges()
                                            }
                                        } size="sm" className='w-auto'>
                                            Apply Changes
                                        </Button>
                                    </div>


                                </CardHeader>
                                <CardContent className="flex items-center gap-4">
                                    {loading ? <SkeletonInput /> :

                                        <div className='flex flex-1 gap-4'>
                                            <div className='flex flex-col gap-4 w-1/3'>
                                                <Label>Original</Label>
                                                <Textarea
                                                    id="writing-profile"
                                                    value={selectedPost?.raw_content}

                                                    onChange={
                                                        (e) => {
                                                            if (selectedPost) {
                                                                setSelectedPost({ ...selectedPost, raw_content: e.target.value })
                                                            }

                                                        }
                                                    }

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
                                                <Label>AI Model</Label>
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
                                                    <Button
                                                        disabled={file?.type == "premium" ? false : true}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            generateNewContent()
                                                        }} variant="outline" className='w-full'>Generate</Button>

                                                </div>
                                                {file?.type == "premium" ? null :
                                                    <p>
                                                        You can only generate content for personalized treasure chest
                                                    </p>
                                                }

                                            </div>
                                            {client?.subscription !== "premium" ? null :
                                                <div className='w-full'>
                                                    <Label>Generated</Label>
                                                    <Textarea
                                                        id="writing-profile"
                                                        value={generatedDraftPost}
                                                        onChange={
                                                            (e) => {
                                                                setGeneratedDraftPost(e.target.value)
                                                            }
                                                        }

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
