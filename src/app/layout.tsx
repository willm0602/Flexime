import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Flexime',
    description: 'A flexible resume generator designed to let users tailor resumes for certain positions'
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" data-theme="business">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased prose max-w-full`}
            >
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    <Toaster position="bottom-center" />
                    {children}
                </main>
            </body>
        </html>
    )
}
