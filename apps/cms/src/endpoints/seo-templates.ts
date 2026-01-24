import type { Endpoint } from 'payload'

export const seoTemplatesEndpoint: Endpoint = {
    path: '/admin/seo/templates',
    method: 'get',
    handler: async (req) => {
        try {
            // Get templates from settings global or a dedicated collection
            // For now, we'll use a simple key-value store or global
            const settings = await req.payload.findGlobal({
                slug: 'settings',
            })

            return Response.json({
                templates: {
                    defaultMetaTitlePattern: settings?.seo?.defaultMetaTitlePattern || '',
                    defaultMetaDescription: settings?.seo?.defaultMetaDescription || '',
                    titleSeparator: settings?.seo?.titleSeparator || '|',
                    twitterCardType: settings?.seo?.twitterCardType || 'summary_large_image',
                },
            })
        } catch (error) {
            req.payload.logger.error({ err: error }, 'Error loading SEO templates')
            return Response.json({ error: 'Failed to load templates' }, { status: 500 })
        }
    },
}

export const seoTemplatesSaveEndpoint: Endpoint = {
    path: '/admin/seo/templates',
    method: 'post',
    handler: async (req) => {
        try {
            const body = await req.json()
            const { templates } = body

            // Save to settings global
            await req.payload.updateGlobal({
                slug: 'settings',
                data: {
                    seo: templates,
                },
            })

            return Response.json({ success: true })
        } catch (error) {
            req.payload.logger.error({ err: error }, 'Error saving SEO templates')
            return Response.json({ error: 'Failed to save templates' }, { status: 500 })
        }
    },
}

export const seoTemplatesEndpoints: Endpoint[] = [seoTemplatesEndpoint, seoTemplatesSaveEndpoint]
