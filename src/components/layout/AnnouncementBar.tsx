import Link from "next/link";

interface AnnouncementBarProps {
    data?: {
        enabled: boolean;
        text?: string;
        link?: string;
    } | null;
}

export function AnnouncementBar({ data }: AnnouncementBarProps) {
    if (!data?.enabled || !data.text) return null;

    return (
        <div className="w-full bg-text-main text-background py-2 px-4 text-center z-50 relative">
            {data.link ? (
                <Link
                    href={data.link}
                    className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase hover:underline underline-offset-4"
                >
                    {data.text}
                </Link>
            ) : (
                <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase">
                    {data.text}
                </p>
            )}
        </div>
    );
}
