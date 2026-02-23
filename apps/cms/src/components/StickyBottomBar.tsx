'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

/**
 * StickyBottomBar Component
 * 
 * Mobile-only sticky bar that appears at the bottom of the screen
 * Shows "Get a Free Quote" button
 * Only visible on mobile devices (< 1024px)
 */
export function StickyBottomBar() {
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#7cb342] shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <Link
                    href="/quote"
                    className="flex items-center justify-center gap-3 text-white font-black text-lg py-4 px-6 hover:bg-[#689f38] transition-all uppercase tracking-wide"
                >
                    <span>Get a Free Quote</span>
                    <ArrowRight className="w-6 h-6" />
                </Link>
            </div>
        </div>
    )
}
