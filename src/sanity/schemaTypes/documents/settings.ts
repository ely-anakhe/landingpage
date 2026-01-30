import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'settings',
    title: 'Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string',
        }),
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
                { name: 'favicon', type: 'image', title: 'Favicon (Browser Tab Icon)' },
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
            name: 'footerContact',
            title: 'Footer Contact Info',
            type: 'blockContent',
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
            group: 'homeAssets',
        }),
        defineField({
            name: 'materialsImage',
            title: 'Materials Section Image',
            type: 'image',
            options: { hotspot: true },
            group: 'homeAssets',
        }),
        defineField({
            name: 'artistImage',
            title: 'Artist Showcase Image',
            type: 'image',
            options: { hotspot: true },
            group: 'homeAssets',
        }),
        defineField({
            name: 'atelierHeroImage',
            title: 'Atelier Page Hero Image',
            type: 'image',
            options: { hotspot: true },
            group: 'homeAssets',
        }),
        defineField({
            name: 'aboutPortrait',
            title: 'About Page Portrait',
            type: 'image',
            options: { hotspot: true },
            group: 'homeAssets', // Could make a new group but reusing homeAssets is simpler for now
        }),
    ],
    groups: [
        {
            name: 'homeAssets',
            title: 'Home Page Assets',
        },
    ],
})
