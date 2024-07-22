/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aIkIMPbjHrt
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function Component() {

    const { toast } = useToast()
    const [formData, setFormData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "",
        newPassword: "",
        confirmPassword: "",
        profilePhoto: null as File | null,
        phone: "555-1234",
        address: "123 Main St, Anytown USA",
    })
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        newPassword: false,
        confirmPassword: false,
        phone: false,
        address: false,
    })
    const [success, setSuccess] = useState(false)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: false })
    }
    const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, profilePhoto: e.target.files[0] })
        }
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newErrors = {
            firstName: formData.firstName.trim() === "",
            lastName: formData.lastName.trim() === "",
            email: !validateEmail(formData.email),
            password: formData.password.trim() === "",
            newPassword: formData.newPassword.trim() === "",
            confirmPassword: formData.newPassword.trim() !== formData.confirmPassword.trim(),
            phone: formData.phone.trim() === "",
            address: formData.address.trim() === "",
        }
        setErrors(newErrors)
        if (Object.values(newErrors).some(Boolean)) {
            return
        }
        setSuccess(true)
        toast({
            title: "Success",
            description: "Profile updated successfully",
        })
    }
    const validateEmail = (email: string) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }
    return (
        <>
            <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 md:px-6">
                <h1 className="text-lg font-semibold">Account</h1>
                <div className="flex items-center gap-2">

                    <Button size="sm">Save</Button>

                </div>
            </header>

            <div className="w-full max-w-4xl mx-auto p-8 grid lg:grid-cols-2 gap-8">

                <Card>
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>Update your personal information and change your password.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={errors.firstName ? "border-red-500" : ""}
                                    />
                                    {errors.firstName && <p className="text-red-500 text-sm">First name is required</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={errors.lastName ? "border-red-500" : ""}
                                    />
                                    {errors.lastName && <p className="text-red-500 text-sm">Last name is required</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && <p className="text-red-500 text-sm">Invalid email address</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Current Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={errors.password ? "border-red-500" : ""}
                                />
                                {errors.password && <p className="text-red-500 text-sm">Current password is required</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className={errors.newPassword ? "border-red-500" : ""}
                                />
                                {errors.newPassword && <p className="text-red-500 text-sm">New password is required</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={errors.confirmPassword ? "border-red-500" : ""}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm">Passwords do not match</p>}
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Additional Information</CardTitle>
                        <CardDescription>Update your contact and professional details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={errors.phone ? "border-red-500" : ""}
                                />
                                {errors.phone && <p className="text-red-500 text-sm">Phone number is required</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className={errors.address ? "border-red-500" : ""}
                                />
                                {errors.address && <p className="text-red-500 text-sm">Address is required</p>}
                            </div>


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
                            {/* <Button type="submit" className="w-full">
                                Save Changes
                            </Button> */}
                        </form>
                    </CardContent>
                </Card>
                {success && (
                    <div>
                        <div>
                            <div />
                            <div>
                                <div>Success</div>
                                <div>Profile updated successfully</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}