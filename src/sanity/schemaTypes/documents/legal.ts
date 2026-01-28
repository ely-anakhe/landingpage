import { defineField, defineType } from 'sanity'
import { Scale } from 'lucide-react'

export default defineType({
    name: 'legal',
    title: 'Legal Page',
    type: 'document',
    icon: Scale,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'lastUpdated',
            title: 'Last Updated',
            type: 'date',
            options: {
                dateFormat: 'MMMM D, YYYY',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'blockContent',
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            updated: 'lastUpdated',
        },
        prepare({ title, updated }) {
            return {
                title,
                subtitle: updated ? `Last updated: ${updated}` : 'No date set',
            }
        },
    },
})
