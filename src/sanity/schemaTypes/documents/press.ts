import { defineField, defineType } from 'sanity'
import { FileText } from 'lucide-react'

export const press = defineType({
    name: 'press',
    title: 'Press / Articles',
    type: 'document',
    icon: FileText,
    fields: [
        defineField({
            name: 'title',
            title: 'Article Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'publication',
            title: 'Publication Name',
            type: 'string',
            description: 'e.g. Vogue Living, AD, etc.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published Date',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'url',
            title: 'External Link',
            type: 'url',
            description: 'Link to the full article (e.g. jordananais.com/article/...)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ],
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'publication',
            media: 'image',
        },
    },
})
