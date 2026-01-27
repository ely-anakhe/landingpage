"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"

const formSchema = z.object({
    firstName: z.string().min(2, "Required"),
    lastName: z.string().min(2, "Required"),
    email: z.string().email("Invalid email"),
    subject: z.string().min(2, "Required"),
    message: z.string().min(10, "Required"),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true)
        try {
            const formData = new FormData()
            // Combine names for the API
            formData.append("name", `${data.firstName} ${data.lastName}`)
            formData.append("email", data.email)
            formData.append("message", data.message)
            // Use subject as context
            formData.append("pieceContext", data.subject)

            const response = await fetch("/api/inquire", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Failed to send inquiry")
            }

            setIsSuccess(true)
            reset()
        } catch (error) {
            console.error("Error sending inquiry:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in duration-500">
                <h2 className="font-serif text-3xl italic text-primary mb-4">Thank you.</h2>
                <p className="font-serif text-muted tracking-wide">
                    We have received your message and will be in touch shortly.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-xs uppercase tracking-widest border-b border-muted hover:border-primary hover:text-primary transition-colors pb-1"
                >
                    Send another message
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-16">

            {/* Name Section */}
            <div className="space-y-8">
                <span className="text-xs uppercase tracking-[0.2em] text-muted block">Name</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    <div className="space-y-2">
                        <div className="relative">
                            <Input
                                id="firstName"
                                placeholder=""
                                {...register("firstName")}
                                className={`border-b border-t-0 border-x-0 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-black ${errors.firstName ? "border-red-500" : "border-border"}`}
                            />
                            <label htmlFor="firstName" className="absolute left-0 -top-6 text-sm font-serif text-text-main">
                                First Name <span className="text-muted text-xs font-serif">(required)</span>
                            </label>
                        </div>
                        {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <div className="relative">
                            <Input
                                id="lastName"
                                placeholder=""
                                {...register("lastName")}
                                className={`border-b border-t-0 border-x-0 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-black ${errors.lastName ? "border-red-500" : "border-border"}`}
                            />
                            <label htmlFor="lastName" className="absolute left-0 -top-6 text-sm font-serif text-text-main">
                                Last Name <span className="text-muted text-xs font-serif">(required)</span>
                            </label>
                        </div>
                        {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
                    </div>
                </div>
            </div>

            {/* Email Section */}
            <div className="space-y-8">
                <span className="text-xs uppercase tracking-[0.2em] text-muted block">Email <span className="text-muted/60 lowercase">(required)</span></span>
                <div className="space-y-2">
                    <Input
                        id="email"
                        type="email"
                        placeholder=""
                        {...register("email")}
                        className={`border-b border-t-0 border-x-0 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-black ${errors.email ? "border-red-500" : "border-border"}`}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
            </div>

            {/* Subject Section */}
            <div className="space-y-8">
                <span className="text-xs uppercase tracking-[0.2em] text-muted block">Subject <span className="text-muted/60 lowercase">(required)</span></span>
                <div className="space-y-2">
                    <Input
                        id="subject"
                        placeholder=""
                        {...register("subject")}
                        className={`border-b border-t-0 border-x-0 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-black ${errors.subject ? "border-red-500" : "border-border"}`}
                    />
                    {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                </div>
            </div>

            {/* Message Section */}
            <div className="space-y-8">
                <span className="text-xs uppercase tracking-[0.2em] text-muted block">Message <span className="text-muted/60 lowercase">(required)</span></span>
                <div className="space-y-2">
                    <Textarea
                        id="message"
                        placeholder=""
                        rows={1}
                        {...register("message")}
                        className={`border-b border-t-0 border-x-0 rounded-none px-0 py-4 resize-y min-h-[100px] focus-visible:ring-0 focus-visible:border-black ${errors.message ? "border-red-500" : "border-border"}`}
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-8">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="font-serif text-lg tracking-widest uppercase border-b border-black pb-1 hover:text-primary hover:border-primary transition-colors disabled:opacity-50"
                >
                    {isSubmitting ? "Sending..." : "Send"}
                </button>
            </div>

        </form>
    )
}
