"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { useInquiryStore } from "@/lib/store/inquiryStore"

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().optional(),
    pieceContext: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function InquiryForm() {
    const { contextPiece, closeInquiry } = useInquiryStore()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            pieceContext: "",
        },
    })

    // Set the context piece when it changes
    useEffect(() => {
        if (contextPiece) {
            setValue("pieceContext", `${contextPiece.title} | ${contextPiece.slug}`)
        }
    }, [contextPiece, setValue])

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true)
        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("email", data.email)
            if (data.message) formData.append("message", data.message)
            if (data.pieceContext) formData.append("pieceContext", data.pieceContext)




            const response = await fetch("/api/inquire", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Failed to send inquiry")
            }

            setIsSuccess(true)
            reset()

            // Close modal after a delay or let user close it
            setTimeout(() => {
                closeInquiry()
                setIsSuccess(false) // Reset for next time
            }, 2000)
        } catch (error) {
            console.error("Error sending inquiry:", error)
            // Ideally show error message
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center animate-in fade-in duration-300">
                <p className="font-serif text-xl italic text-primary mb-2">Thank you.</p>
                <p className="text-muted/60 font-serif text-sm">We'll be in touch shortly.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input type="hidden" {...register("pieceContext")} />

            <div className="space-y-2">
                <label htmlFor="name" className="text-xs uppercase tracking-widest opacity-50 block">Name</label>
                <Input
                    id="name"
                    placeholder="Your full name"
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest opacity-50 block">Email Address</label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest opacity-50 block">Message</label>
                <Textarea
                    id="message"
                    placeholder="Tell us about the space you are envisioning..."
                    rows={5}
                    {...register("message")}
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-background py-4 uppercase tracking-[0.2em] text-xs hover:bg-primary/90 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Sending..." : "Send Request"}
            </button>
        </form>
    )
}
