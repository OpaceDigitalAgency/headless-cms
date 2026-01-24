import type { Endpoint } from 'payload'

export const seoAdvancedEndpoint: Endpoint = {
    path: '/admin/seo/advanced',
    method: 'get',
    handler: async (req) => {
        try {
            const settings = await req.payload.findGlobal({
                slug: 'settings',
            })

            return Response.json({
                advanced: {
                    defaultRobotsMeta: settings?.seoAdvanced?.defaultRobotsMeta || 'index,follow',
                    googleSiteVerification: settings?.seoAdvanced?.googleSiteVerification || '',
                    bingSiteVerification: settings?.seoAdvanced?.bingSiteVerification || '',
                    facebookDomainVerification: settings?.seoAdvanced?.facebookDomainVerification || '',
                    organizationType: settings?.seoAdvanced?.organizationType || 'Organization',
                    organizationName: settings?.seoAdvanced?.organizationName || '',
                },
            })
        } catch (error) {
            req.payload.logger.error({ err: error }, 'Error loading SEO advanced settings')
            return Response.json({ error: 'Failed to load settings' }, { status: 500 })
        }
    },
}

export const seoAdvancedSaveEndpoint: Endpoint = {
    path: '/admin/seo/advanced',
    method: 'post',
    handler: async (req) => {
        try {
            const body = await req.json?.()
            if (!body) {
                return Response.json({ error: 'No data provided' }, { status: 400 })
            }

            const { advanced } = body

            await req.payload.updateGlobal({
                slug: 'settings',
                data: {
                    seoAdvanced: advanced,
                },
            })

            return Response.json({ success: true })
        } catch (error) {
            req.payload.logger.error({ err: error }, 'Error saving SEO advanced settings')
            return Response.json({ error: 'Failed to save settings' }, { status: 500 })
        }
    },
}

export const seoAdvancedEndpoints: Endpoint[] = [seoAdvancedEndpoint, seoAdvancedSaveEndpoint]
