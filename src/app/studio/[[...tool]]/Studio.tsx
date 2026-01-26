'use client'

import { NextStudio } from 'next-sanity/studio'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import config from '../../../../sanity.config'

const ALLOWED_DOMAIN = '@anakhe.com'

export function Studio() {
    const router = useRouter()
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

    useEffect(() => {
        // Check if user is logged in and has the correct email domain
        const checkAuth = async () => {
            try {
                // Fetch current user from Sanity
                const response = await fetch(
                    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/users/me`,
                    { credentials: 'include' }
                )

                if (!response.ok) {
                    // Not logged in - let Sanity handle the login flow
                    setIsAuthorized(true) // Allow access to login page
                    return
                }

                const user = await response.json()

                if (user?.email?.endsWith(ALLOWED_DOMAIN)) {
                    setIsAuthorized(true)
                } else if (user?.email) {
                    // Logged in but wrong domain - redirect
                    router.replace('/')
                } else {
                    // No email (not logged in) - allow Sanity login
                    setIsAuthorized(true)
                }
            } catch {
                // Error checking - allow Sanity to handle
                setIsAuthorized(true)
            }
        }

        checkAuth()
    }, [router])

    if (isAuthorized === null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="text-center">
                    <p className="font-serif text-xl italic text-primary">Loading...</p>
                </div>
            </div>
        )
    }

    return <NextStudio config={config} />
}
