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
            name: 'story',
            title: 'Story / Narrative',
            type: 'blockContent',
            description: 'The main luxury story/intro for this piece.',
        }),
        defineField({
            name: 'materialsSection',
            title: 'Materials Section',
            type: 'object',
            fields: [
                defineField({ name: 'heading', type: 'string', title: 'Heading' }),
                defineField({ name: 'description', type: 'blockContent', title: 'Description' }),
                defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
            ],
            options: { collapsible: true, collapsed: true }
        }),
        defineField({
            name: 'craftsmanshipSection',
            title: 'Craftsmanship Section',
            type: 'object',
            fields: [
                defineField({ name: 'heading', type: 'string', title: 'Heading' }),
                defineField({ name: 'description', type: 'blockContent', title: 'Description' }),
                defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
            ],
            options: { collapsible: true, collapsed: true }
        }),
        defineField({
            name: 'dimensionsSection',
            title: 'Dimensions Section',
            type: 'object',
            fields: [
                defineField({ name: 'heading', type: 'string', title: 'Heading' }),
                defineField({ name: 'description', type: 'blockContent', title: 'Description' }),
                defineField({ name: 'diagram', type: 'image', title: 'Dimensions Diagram/Image', options: { hotspot: true } }),
            ],
            options: { collapsible: true, collapsed: true }
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
