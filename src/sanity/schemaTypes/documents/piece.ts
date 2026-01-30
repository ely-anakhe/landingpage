import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'piece',
    title: 'Piece (Art/Furniture)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'priceDisplay',
            title: 'Price Display',
            type: 'string',
            description: 'e.g. "From £2,400" or "Inquire for pricing"',
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'specifications',
            title: 'Specifications',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. "H: 80cm", "W: 60cm"',
        }),
        defineField({
            name: 'bespokeOptions',
            title: 'Bespoke Options',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. "Custom Upholstery available"',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'story',
            title: 'Story / Narrative',
            description: 'Rich text narrative for the piece. Replaces short description for the main story.',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'materials', // Field for linked materials
            title: 'Materials Used',
            description: 'Link specific materials used in this piece.',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'material' }] }],
        }),
        defineField({
            name: 'video',
            title: 'Video display',
            type: 'mux.video',
            description: 'Optional. If provided, this will play on the detail page.',
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'relatedFAQs',
            title: 'Related FAQs',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'faq' }] }],
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
        }),
    ],
})
