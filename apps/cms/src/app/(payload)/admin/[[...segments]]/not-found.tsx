/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

import config from '@payloadcms/next/config'
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'
import configPromise from '@/payload.config'

export const generateMetadata = async (): Promise<Metadata> =>
  generatePageMetadata({ config: configPromise, params: Promise.resolve({ segments: ['not-found'] }), searchParams: Promise.resolve({}) })

const NotFound = () => NotFoundPage({ config: configPromise, importMap })

export default NotFound
