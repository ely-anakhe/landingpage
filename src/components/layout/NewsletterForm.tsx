"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export const NewsletterForm = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email) return;

        setStatus("loading");

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus("success");
                setEmail("");
            } else {
                // Log detailed error for debugging
                const errorData = await response.text();
                console.error("Newsletter Subscription Failed:", {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData
                });
                setStatus("error");
            }
        } catch (error) {
            console.error("Newsletter Network Error:", error);
            setStatus("error");
        }
    };

    const isLoading = status === "loading";
    const isSuccess = status === "success";
    const isError = status === "error";

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading || isSuccess}
                required
                className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-primary font-serif placeholder:italic disabled:opacity-50"
            />
            {isError && (
                <p className="text-red-600 text-xs font-serif mt-2">
                    Unable to subscribe. Please try again.
                </p>
            )}
            <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="mt-4 w-full bg-black text-white font-serif uppercase tracking-widest py-3 text-xs hover:bg-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? "Signing up..." : isSuccess ? "Subscribed" : "Subscribe"}
            </button>
        </form>
    );
};
