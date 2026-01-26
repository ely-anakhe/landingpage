import { HelpCircle } from "lucide-react"
import { defineField, defineType } from "sanity"

export default defineType({
    name: "faq",
    title: "Frequently Asked Question",
    type: "document",
    icon: HelpCircle,
    fields: [
        defineField({
            name: "question",
            title: "Question",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "answer",
            title: "Answer",
            type: "blockContent",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    "Ordering & Lead Times",
                    "Shipping & Delivery",
                    "Bespoke & Customization",
                    "Care & Maintenance",
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "question",
            subtitle: "category",
        },
    },
})
