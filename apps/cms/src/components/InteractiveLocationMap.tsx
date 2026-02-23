// @ts-nocheck
'use client'

import { useState } from 'react'
import Link from 'next/link'

// Scotland map bounds for coordinate projection
const SCOTLAND_BOUNDS = {
    north: 60.86,  // Shetland Islands
    south: 54.63,  // Scottish Borders
    west: -7.57,   // Outer Hebrides
    east: -0.73,   // East coast
}

interface Coordinate {
    lat: number
    lng: number
}

interface LocationPin {
    name: string
    slug?: string
    coordinate?: Coordinate
}

interface InteractiveLocationMapProps {
    nearbyLocations: Array<{ name: string; slug?: string }>
    currentLocation?: { name: string; lat?: number; lng?: number }
    mapImageUrl: string
    className?: string
    coordinates: Record<string, Coordinate>
}

/**
 * Convert latitude/longitude to percentage position on map
 */
function latLngToPercent(lat: number, lng: number): { x: number; y: number } {
    const x = ((lng - SCOTLAND_BOUNDS.west) / (SCOTLAND_BOUNDS.east - SCOTLAND_BOUNDS.west)) * 100
    const y = ((SCOTLAND_BOUNDS.north - lat) / (SCOTLAND_BOUNDS.north - SCOTLAND_BOUNDS.south)) * 100

    return { x, y }
}

/**
 * Interactive Scotland map with clickable location pins
 */
export default function InteractiveLocationMap({
    nearbyLocations,
    currentLocation,
    mapImageUrl,
    className = '',
    coordinates,
}: InteractiveLocationMapProps) {
    const [hoveredPin, setHoveredPin] = useState<string | null>(null)


    // Map nearby locations to pins with coordinates
    const pins: LocationPin[] = nearbyLocations
        .map((location) => {
            const slug = location.slug || location.name.toLowerCase().replace(/\s+/g, '-')
            const coordinate = coordinates[slug]

            return {
                name: location.name,
                slug,
                coordinate,
            }
        })
        .filter((pin) => pin.coordinate) // Only show pins with valid coordinates

    // Add current location pin if it has coordinates
    if (currentLocation?.lat && currentLocation?.lng) {
        const currentSlug = currentLocation.name.toLowerCase().replace(/\s+/g, '-')
        pins.push({
            name: currentLocation.name,
            slug: currentSlug,
            coordinate: {
                lat: currentLocation.lat,
                lng: currentLocation.lng,
            },
        })
    }

    return (
        <div className={`relative ${className}`}>
            {/* Map Image */}
            <img
                src={mapImageUrl}
                alt="Scotland Coverage Map"
                className="w-full h-auto rounded-lg"
            />

            {/* SVG Overlay for Pins */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {pins.map((pin) => {
                    if (!pin.coordinate) return null

                    const { x, y } = latLngToPercent(pin.coordinate.lat, pin.coordinate.lng)
                    const isHovered = hoveredPin === pin.slug
                    const isCurrent = currentLocation?.name === pin.name

                    return (
                        <g key={pin.slug} className="pointer-events-auto">
                            {/* Clickable Link Area */}
                            <Link href={`/new-boiler-installation/${pin.slug}`}>
                                <g
                                    onMouseEnter={() => setHoveredPin(pin.slug || null)}
                                    onMouseLeave={() => setHoveredPin(null)}
                                    className="cursor-pointer transition-transform hover:scale-110"
                                    style={{ transformOrigin: `${x}% ${y}%` }}
                                >
                                    {/* Pin Shadow */}
                                    <ellipse
                                        cx={x}
                                        cy={y + 1.5}
                                        rx={isCurrent ? 2.5 : 1.8}
                                        ry={isCurrent ? 0.8 : 0.6}
                                        fill="rgba(0, 0, 0, 0.2)"
                                        className="transition-all"
                                    />

                                    {/* Pin Circle Background */}
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r={isCurrent ? 5 : isHovered ? 4.5 : 4}
                                        fill="white"
                                        stroke={isCurrent ? '#7cb342' : '#2196f3'}
                                        strokeWidth={0.6}
                                        className="transition-all"
                                    />

                                    {/* Pin Icon */}
                                    <path
                                        d={`M ${x} ${y - 1.5} 
                        C ${x - 0.8} ${y - 1.5} ${x - 1.5} ${y - 0.8} ${x - 1.5} ${y} 
                        C ${x - 1.5} ${y + 1.2} ${x} ${y + 2.5} ${x} ${y + 2.5} 
                        C ${x} ${y + 2.5} ${x + 1.5} ${y + 1.2} ${x + 1.5} ${y} 
                        C ${x + 1.5} ${y - 0.8} ${x + 0.8} ${y - 1.5} ${x} ${y - 1.5} Z`}
                                        fill={isCurrent ? '#7cb342' : '#2196f3'}
                                        className="transition-all"
                                        style={{
                                            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                                            transformOrigin: `${x}% ${y}%`,
                                        }}
                                    />

                                    {/* Pin Inner Dot */}
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r={0.8}
                                        fill="white"
                                        className="transition-all"
                                    />

                                    {/* Tooltip on Hover */}
                                    {isHovered && (
                                        <g>
                                            {/* Tooltip Background */}
                                            <rect
                                                x={x - 8}
                                                y={y - 7}
                                                width={16}
                                                height={3}
                                                rx={0.5}
                                                fill="rgba(38, 50, 56, 0.95)"
                                            />
                                            {/* Tooltip Text */}
                                            <text
                                                x={x}
                                                y={y - 5}
                                                textAnchor="middle"
                                                fill="white"
                                                fontSize="1.5"
                                                fontWeight="600"
                                                className="pointer-events-none"
                                            >
                                                {pin.name}
                                            </text>
                                        </g>
                                    )}
                                </g>
                            </Link>
                        </g>
                    )
                })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 text-xs">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-[#2196f3]"></div>
                    <span className="text-gray-700">Nearby Locations</span>
                </div>
                {currentLocation && (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#7cb342]"></div>
                        <span className="text-gray-700">Current Location</span>
                    </div>
                )}
            </div>
        </div>
    )
}
