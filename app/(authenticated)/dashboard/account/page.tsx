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

export default function Component() {

    const accountFormSchema = z.object({
        first_name: z.string().min(2),
        last_name: z.string().min(2)
    })
    const accountForm = useForm<z.infer<typeof accountFormSchema>>({
        resolver: zodResolver(accountFormSchema)
    })

    const changeEmailFormSchema = z.object({
        email: z.string().email(),
    })
    const changeEmailForm = useForm<z.infer<typeof changeEmailFormSchema>>({
        resolver: zodResolver(changeEmailFormSchema)
    })

    const changePasswordFormSchema = z.object({
        current_password: z.string().min(8),
        new_password: z.string().min(8),
        retype_password: z.string().min(8),
    })
    const changePasswordForm = useForm<z.infer<typeof changePasswordFormSchema>>({
        resolver: zodResolver(changePasswordFormSchema)
    })

    const { toast } = useToast()




    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
        profilePhoto: null as File | null,
    })
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        newPassword: false,
        confirmPassword: false,
    })

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


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: false })
    }
    const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, profilePhoto: e.target.files[0] })
        }
    }

    const updateAccount = async (values: z.infer<typeof accountFormSchema>) => {
        const data = { ...values, id: user.id, access_token: access_token }
        try {
            const response = await axios.put(`https://n8n.xponent.ph/webhook/api/account`, data);
            console.log(response.data);
            toast({
                title: "Success",
                description: "Profile updated successfully",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred",
            });
        }
    }

    const updateEmail = async (values: z.infer<typeof changeEmailFormSchema>) => {
        const data = { ...values, id: user.id, access_token: access_token }
        try {
            const response = await axios.post(`https://n8n.xponent.ph/webhook/api/account/update-email`, data);
            console.log(response.data);
            toast({
                title: "Success",
                description: "Email updated successfully",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred",
            });
        }
    }


    const handleSubmit = (values: z.infer<typeof accountFormSchema>) => {
        updateAccount(values);
    }


    const handleChangePassword = async (values: z.infer<typeof changePasswordFormSchema>) => {




        try {
            const response = await axios.post(`https://n8n.xponent.ph/webhook/api/account/update-password`, {
                new_password: values.new_password,
                access_token: access_token
            });

            toast({
                title: "Success",
                description: "Password updated successfully",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred",
            });
        }
    }


    const fetchLoggedInUser = async () => {


        if (user?.id == undefined)
            return

        try {
            const response = await axios.get(`https://n8n.xponent.ph/webhook/api/account?id=${user?.id}`);
            console.log(response.data);


            accountForm.setValue("first_name", response.data.first_name)
            accountForm.setValue("last_name", response.data.last_name)




        } catch (error) {
            console.error(error);
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

    }, [user.id])
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
                                />
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
                                />

                                <Button variant="outline" type="submit" className="w-full">
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
                                />
                                <Button variant="outline" type="submit" className="w-full">
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
                                />
                                <FormField
                                    control={changePasswordForm.control}
                                    name="new_password"
                                    render={({ field }) => (
                                        <div className="space-y-1">
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input id="new_password" type="password" placeholder="Enter your new password" required {...field} />
                                            </FormControl>
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={changePasswordForm.control}
                                    name="retype_password"
                                    render={({ field }) => (
                                        <div className="space-y-1">
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input id="retype_password" type="password" placeholder="Retype your new password" required {...field} />
                                            </FormControl>
                                        </div>
                                    )}
                                />


                                <Button variant="outline" type="submit" className="w-full">
                                    Update Password
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                {/* <Card>
                    <CardHeader>
                        <CardTitle>Additional Information</CardTitle>
                        <CardDescription>Update your contact and professional details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="profilePhoto">Profile Photo</Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        id="profilePhoto"
                                        name="profilePhoto"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePhotoChange}
                                    />
                                    {formData.profilePhoto && (
                                        <img src="/placeholder.svg" alt="Profile Photo" width={100} height={100} className="rounded-full" />
                                    )}
                                </div>
                            </div>


                            <Button type="submit" className="w-full">
                                Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card> */}

            </div>
        </>
    )
}