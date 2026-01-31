import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'sizeVariant',
    title: 'Size Variant',
    type: 'object',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Size Name',
            description: 'e.g., "2-Seater", "3-Seater", "Large", "Small"',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'diagram',
            type: 'image',
            title: 'Dimensions Diagram',
            options: { hotspot: true },
            description: 'Technical drawing or blueprint showing dimensions'
        }),
        defineField({
            name: 'specs',
            type: 'array',
            title: 'Specifications',
            of: [{ type: 'string' }],
            description: 'e.g., "Width: 2,200 mm", "Depth: 1,100 mm", "Weight: 145 kg"'
        }),
    ],
    preview: {
        select: { title: 'name', media: 'diagram' }
    }
})
