"use client"

import React, { ChangeEvent, useState, useEffect } from 'react';
import { useParams } from "next/navigation"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import SkeletonInput from "@/components/skeleton-input"

import axios from "axios"

export default function TreasureChestDetailsPage() {
    const params = useParams<{ treasureChestId: string, id: string }>()
    const [loading, setLoading] = useState(true)

    const [posts, setPosts] = useState([])

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

    useEffect(() => {
        fetchGeneratedPosts()
    }, [])
    return (
        <div className="flex flex-col">
            <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 md:px-6">

                <h1 className="text-lg font-semibold">Treasure Chest</h1>

            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6 gap-4">

                <div className="flex flex-col justify-between mb-4 gap-2">
                    {posts.length > 0 && (
                        posts.map((post: any) => (
                            <Card key={post.id}>

                                <CardHeader className="flex flex-row justify-between">
                                    <div className="font-medium">{post.title}</div>

                                </CardHeader>
                                <CardContent className="flex items-center gap-4">
                                    {loading ? <SkeletonInput /> :

                                        <div className='flex flex-1 gap-4'>
                                            <div className='w-full'>
                                                <Label>Generated Content</Label>
                                                <Textarea
                                                    id="writing-profile"
                                                    value={post.generated_content}

                                                    className="w-full min-h-[100px] text-sm text-muted-foreground"
                                                />
                                            </div>
                                            <div className='w-full'>
                                                <Label>Raw Content</Label>
                                                <Textarea
                                                    id="writing-profile"
                                                    value={post.raw_content}

                                                    className="w-full min-h-[100px] text-sm text-muted-foreground"
                                                />
                                            </div>

                                        </div>



                                    }

                                </CardContent>
                            </Card>
                        ))
                    )}

                </div>

            </main>
        </div>
    )
}