import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const contactFormBlock: Block = {
    slug: 'contactForm',
    labels: {
        singular: 'Contact Form',
        plural: 'Contact Forms',
    },
    imageURL: blockIcons.form,
    imageAltText: 'Contact form block preview',
    fields: [
        {
            name: 'heading',
            type: 'text',
            label: 'Heading',
            defaultValue: 'Get in Touch',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            defaultValue: 'Have a question? Fill out the form below and we\'ll get back to you as soon as possible.',
        },
        {
            name: 'variant',
            type: 'select',
            label: 'Style Variant',
            defaultValue: 'modern',
            options: [
                { label: 'Modern (Two Column)', value: 'modern' },
                { label: 'Classic (Single Column)', value: 'classic' },
                { label: 'Minimal', value: 'minimal' },
            ],
        },
        {
            name: 'showContactInfo',
            type: 'checkbox',
            label: 'Show Contact Information',
            defaultValue: true,
            admin: {
                description: 'Display office address, email, and phone number alongside the form',
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'officeAddress',
                    type: 'textarea',
                    label: 'Office Address',
                    admin: {
                        width: '50%',
                        condition: (_, siblingData) => siblingData?.showContactInfo,
                    },
                },
                {
                    name: 'email',
                    type: 'email',
                    label: 'Contact Email',
                    admin: {
                        width: '50%',
                        condition: (_, siblingData) => siblingData?.showContactInfo,
                    },
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'phone',
                    type: 'text',
                    label: 'Phone Number',
                    admin: {
                        width: '50%',
                        condition: (_, siblingData) => siblingData?.showContactInfo,
                    },
                },
                {
                    name: 'disclaimer',
                    type: 'textarea',
                    label: 'Disclaimer Text',
                    admin: {
                        width: '50%',
                        description: 'Small text shown below the form (e.g., "Calls may be recorded...")',
                    },
                },
            ],
        },
        {
            name: 'form',
            type: 'relationship',
            relationTo: 'forms',
            required: true,
            label: 'Select Form',
            admin: {
                description: 'Choose which form to display. Create forms in the Forms collection.',
            },
        },
        {
            name: 'submitButtonText',
            type: 'text',
            label: 'Submit Button Text',
            defaultValue: 'Send Message',
        },
        {
            name: 'successMessage',
            type: 'textarea',
            label: 'Success Message',
            defaultValue: 'Thank you for your message! We\'ll get back to you soon.',
        },
    ],
}

export default contactFormBlock
