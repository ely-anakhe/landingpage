import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project (Interiors)',
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
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'blockContent',
        }),
        defineField({
            name: 'linkedPieces',
            title: 'Linked Pieces',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'piece' }],
                },
            ],
            description: 'Tag pieces of furniture used in this project.',
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
        }),
    ],
})
