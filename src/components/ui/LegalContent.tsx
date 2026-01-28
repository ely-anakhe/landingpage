import { PortableText, PortableTextComponents } from "next-sanity";

const components: PortableTextComponents = {
    block: {
        normal: ({ children }) => <p className="mb-4">{children}</p>,
        h1: ({ children }) => <h1 className="text-4xl mb-4 font-normal">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl mb-4 font-normal">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl mb-4 font-normal">{children}</h3>,
        h4: ({ children }) => <h4 className="text-lg mb-4 font-bold">{children}</h4>,
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-5 space-y-2 mb-4">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-5 space-y-2 mb-4">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li>{children}</li>,
        number: ({ children }) => <li>{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ value, children }) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
                <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : undefined} className="underline decoration-1 underline-offset-2 hover:decoration-2">
                    {children}
                </a>
            )
        },
    },
}

interface LegalContentProps {
    content: any
}

export function LegalContent({ content }: LegalContentProps) {
    return (
        <div className="font-serif text-text-main">
            <PortableText value={content} components={components} />
        </div>
    )
}
