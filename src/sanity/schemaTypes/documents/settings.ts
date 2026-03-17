import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'settings',
    title: 'Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'heroContent',
            title: 'Home Hero Content',
            type: 'array',
            description: 'Mixed content (Images and Videos) for the home page hero carousel.',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        { name: 'alt', type: 'string', title: 'Alternative Text' }
                    ]
                },
                { type: 'mux.video', title: 'Video' }
            ]
        }),
        defineField({
            name: 'seo',
            title: 'Global SEO Defaults',
            type: 'object',
            description: 'Default title, description, and share image for the site.',
            fields: [
                { name: 'title', type: 'string', title: 'Site Title (Browser Tab)' },
                { name: 'description', type: 'text', rows: 3, title: 'Meta Description' },
                { name: 'favicon', type: 'image', title: 'Favicon' },
            ],
        }),
        defineField({
            name: 'announcementBar',
            title: 'Announcement Bar',
            type: 'object',
            fields: [
                { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: false },
                { name: 'text', type: 'string', title: 'Text' },
                { name: 'link', type: 'url', title: 'Link (Optional)' },
            ]
        }),
        defineField({
            name: 'mainNavigation',
            title: 'Main Navigation',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'href', type: 'string', title: 'Link (e.g. /interiors)' },
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'href' }
                    }
                }
            ]
        }),

        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', type: 'string', title: 'Platform' },
                        { name: 'url', type: 'url', title: 'URL' },
                    ],
                    preview: {
                        select: { title: 'platform', subtitle: 'url' }
                    }
                }
            ]
        }),
        defineField({
            name: 'philosophyImage',
            title: 'Philosophy Section Image',
            type: 'image',
            options: { hotspot: true },
            group: 'homePage',
        }),
        defineField({
            name: 'philosophyText',
            title: 'Philosophy Text',
            type: 'text',
            rows: 5,
            group: 'homePage',
        }),
        defineField({
            name: 'founderText',
            title: 'Founder Text (Home Page)',
            type: 'text',
            rows: 7,
            group: 'homePage',
        }),
        defineField({
            name: 'artistImage',
            title: 'Artist Showcase Image',
            type: 'image',
            options: { hotspot: true },
            group: 'homePage',
        }),
        defineField({
            name: 'aboutText',
            title: 'About Page Text',
            type: 'text',
            rows: 7,
            group: 'aboutPage',
        }),
        defineField({
            name: 'aboutPoem',
            title: 'About Page Quote/Poem',
            type: 'text',
            rows: 4,
            group: 'aboutPage',
        }),
        defineField({
            name: 'aboutPortrait',
            title: 'About Page Portrait',
            type: 'image',
            options: { hotspot: true },
            group: 'aboutPage',
        }),
        defineField({
            name: 'aboutInteriorImage',
            title: 'About Page Interior Image',
            type: 'image',
            options: { hotspot: true },
            group: 'aboutPage',
        }),
    ],
    groups: [
        {
            name: 'homePage',
            title: 'Home Page',
        },
        {
            name: 'aboutPage',
            title: 'About Page',
        },
    ],
})
