/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aIkIMPbjHrt
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useEffect, useState, useRef, use } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"

import { Account, User } from "@/types"

import SkeletonInput from "@/components/skeleton-input"


import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { set } from "date-fns"

export default function Component() {


    const [loading, setLoading] = useState(true)

    const accountFormSchema = z.object({
        first_name: z.string().min(2),
        last_name: z.string().min(2)
    }).refine(data => data.first_name !== "" && data.last_name !== "", {
        message: "First name and last name are required",
        path: ["first_name", "last_name"]
    })
    const accountForm = useForm<z.infer<typeof accountFormSchema>>({
        resolver: zodResolver(accountFormSchema)
    })

    const changeEmailFormSchema = z.object({
        email: z.string().email(),
    }).refine(data => data.email !== user.email, {
        message: "Email cannot be the same",
        path: ["email"]
    })
    const changeEmailForm = useForm<z.infer<typeof changeEmailFormSchema>>({
        resolver: zodResolver(changeEmailFormSchema)
    })

    const changePasswordFormSchema = z.object({
        current_password: z.string().min(8),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })
    const changePasswordForm = useForm<z.infer<typeof changePasswordFormSchema>>({
        resolver: zodResolver(changePasswordFormSchema)
    })

    const { toast } = useToast()






    const [user, setUser] = useState<{
        id?: number;
        first_name?: string;
        last_name?: string;
        email?: string;
    }>({

        first_name: "",
        last_name: "",
        email: "",
    })
    const [access_token, setAccessToken] = useState("")





    const updateAccount = async (values: z.infer<typeof accountFormSchema>) => {
        const data = { ...values, id: user.id, access_token: access_token }
        setLoading(true)
        try {
            const response = await axios.put(`https://n8n.xponent.ph/webhook/api/account`, data);
            console.log(response.data);
            toast({
                title: "Success",
                description: "Profile updated successfully",
            });
            setLoading(false)
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred",
            });
            setLoading(false)
        }
    }

    const updateEmail = async (values: z.infer<typeof changeEmailFormSchema>) => {
        const data = { ...values, id: user.id, access_token: access_token }
        setLoading(true)
        try {
            const response = await axios.post(`https://n8n.xponent.ph/webhook/api/account/update-email`, data);
            console.log(response.data);
            toast({
                title: "Success",
                description: "Email updated successfully",
            });
            setLoading(false)
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred",
            });
            setLoading(false)
        }
    }


    const handleSubmit = (values: z.infer<typeof accountFormSchema>) => {
        updateAccount(values);
    }


    const handleChangePassword = async (values: z.infer<typeof changePasswordFormSchema>) => {

        setLoading(true)


        try {
            const response = await axios.post(`https://n8n.xponent.ph/webhook/api/account/update-password`, {
                new_password: values.password,
                access_token: access_token
            });

            toast({
                title: "Success",
                description: "Password updated successfully",
            });
            setLoading(false)
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred",
            });
            setLoading(false)
        }
    }


    const fetchLoggedInUser = async () => {


        if (user?.id == undefined)
            return

        try {
            setLoading(true)
            const response = await axios.get(`https://n8n.xponent.ph/webhook/api/account?id=${user?.id}`);
            console.log(response.data);


            accountForm.setValue("first_name", response.data.first_name)
            accountForm.setValue("last_name", response.data.last_name)

            setLoading(false)


        } catch (error) {
            console.error(error);
            setLoading(false)
        }


    };

    const loadUser = () => {
        setUser(JSON.parse(localStorage.getItem("user") as string));
        setAccessToken(localStorage.getItem("accessToken") as string);
    }

    useEffect(() => {
        loadUser();


    }, []);

    useEffect(() => {

        console.log("user", user)
        fetchLoggedInUser();
        changeEmailForm.setValue("email", user.email as string)

    }, [user?.id])
    return (
        <>
            <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 md:px-6">
                <h1 className="text-lg font-semibold">Account</h1>
                <div className="flex items-center gap-2">


                </div>
            </header>

            <div className="w-full max-w-2xl mx-auto p-8 grid  gap-8">


                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Account Settings</CardTitle>
                        <CardDescription>Update your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...accountForm} >
                            <form onSubmit={accountForm.handleSubmit(handleSubmit)} className="space-y-4">

                                {loading ? <SkeletonInput /> :
                                    <FormField
                                        control={accountForm.control}
                                        name="first_name"
                                        render={({ field }) => (
                                            <div className="space-y-1">
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <>
                                                        <Input required {...field} />
                                                        <FormMessage>{accountForm.formState.errors.first_name?.message}</FormMessage>
                                                    </>

                                                </FormControl>
                                            </div>
                                        )}
                                    />}
                                {loading ? <SkeletonInput /> :
                                    <FormField
                                        control={accountForm.control}
                                        name="last_name"
                                        render={({ field }) => (
                                            <div className="space-y-1">
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>

                                                    <Input required {...field} />
                                                </FormControl>
                                            </div>
                                        )}
                                    />}


                                <Button disabled={accountForm.formState.isSubmitting || !accountForm.formState.isDirty || !accountForm.formState.isValid} variant="outline" type="submit" className="w-full">
                                    Update Account
                                </Button>

                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Email</CardTitle>
                        <CardDescription>Update your email.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...changeEmailForm} >
                            <form onSubmit={changeEmailForm.handleSubmit(updateEmail)} className="space-y-4">
                                {loading ? <SkeletonInput /> :
                                    <FormField
                                        control={changeEmailForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <div className="space-y-1">
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                        )}
                                    />}
                                <Button disabled={changeEmailForm.formState.isSubmitting || !changeEmailForm.formState.isDirty || !changeEmailForm.formState.isValid} variant="outline" type="submit" className="w-full">
                                    Update Email
                                </Button>

                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Password</CardTitle>
                        <CardDescription>Update your password details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...changePasswordForm} >
                            <form onSubmit={changePasswordForm.handleSubmit(handleChangePassword)} className="space-y-4">
                                {loading ? <SkeletonInput /> :
                                    <FormField
                                        control={changePasswordForm.control}
                                        name="current_password"
                                        render={({ field }) => (
                                            <div className="space-y-1">
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl>
                                                    <Input id="password" type="password" placeholder="Enter your password" required {...field} />
                                                </FormControl>
                                            </div>
                                        )}
                                    />}
                                {loading ? <SkeletonInput /> :
                                    <FormField
                                        control={changePasswordForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <div className="space-y-1">
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input id="password" type="password" placeholder="Enter your new password" required {...field} />
                                                </FormControl>
                                            </div>
                                        )}
                                    />}
                                {loading ? <SkeletonInput /> :
                                    <FormField
                                        control={changePasswordForm.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <div className="space-y-1">
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input id="confirmPassword" type="password" placeholder="Retype your new password" required {...field} />
                                                </FormControl>
                                            </div>
                                        )}
                                    />}


                                <Button disabled={changePasswordForm.formState.isSubmitting || !changePasswordForm.formState.isDirty || !changePasswordForm.formState.isValid} variant="outline" type="submit" className="w-full">
                                    Update Password
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>


            </div>
        </>
    )
}