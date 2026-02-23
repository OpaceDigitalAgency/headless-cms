'use client'

import { useEffect, useRef } from 'react'

interface TrustpilotWidgetProps {
    /**
     * Template ID for the widget type
     * Micro Review Count: "5419b6a8b0d04a076446a9ad"
     * Mini Carousel: "53aa8912dec7e10d38f59f36"
     */
    templateId?: string
    /**
     * Business unit ID from Trustpilot
     */
    businessUnitId?: string
    /**
     * Locale for the widget
     */
    locale?: string
    /**
     * Height of the widget
     */
    height?: string
    /**
     * Width of the widget
     */
    width?: string
    /**
     * Alignment of the widget content
     */
    alignment?: 'left' | 'center' | 'right'
    /**
     * Minimum review count to display
     */
    minReviewCount?: number
    /**
     * Custom className for the container
     */
    className?: string
}

export function TrustpilotWidget({
    templateId = '5419b6a8b0d04a076446a9ad', // Micro Review Count
    businessUnitId = '5c08edf750a179000165e985',
    locale = 'en-US',
    height = '24px',
    width = '100%',
    alignment = 'center',
    minReviewCount = 50,
    className = '',
}: TrustpilotWidgetProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Load Trustpilot widget after component mounts
        if (ref.current && typeof window !== 'undefined') {
            const loadWidget = () => {
                if ((window as any).Trustpilot) {
                    (window as any).Trustpilot.loadFromElement(ref.current, true)
                }
            }

            // Try to load immediately if script is already loaded
            if ((window as any).Trustpilot) {
                loadWidget()
            } else {
                // Otherwise wait for script to load
                const checkInterval = setInterval(() => {
                    if ((window as any).Trustpilot) {
                        loadWidget()
                        clearInterval(checkInterval)
                    }
                }, 100)

                // Clean up interval after 5 seconds
                setTimeout(() => clearInterval(checkInterval), 5000)

                return () => clearInterval(checkInterval)
            }
        }
    }, [])

    return (
        <div
            ref={ref}
            className={`trustpilot-widget ${className}`}
            data-locale={locale}
            data-template-id={templateId}
            data-businessunit-id={businessUnitId}
            data-style-height={height}
            data-style-width={width}
            data-token="cafe3465-6e02-42a0-b575-69fb64781caa"
            data-min-review-count={minReviewCount}
            data-style-alignment={alignment}
        >
            <a
                href="https://www.trustpilot.com/review/onlineboilercompany.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-gray-600 hover:text-gray-900"
            >
                Trustpilot
            </a>
        </div>
    )
}
