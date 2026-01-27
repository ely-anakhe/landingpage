
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center flex-grow w-full px-4 text-center h-full min-h-[50vh]">
            <p className="text-xl md:text-2xl font-serif mb-8">
                404 - This space has not been designed.
            </p>
            <Link href="/" className={buttonVariants({ variant: "solid" })}>
                Return Home
            </Link>
        </div>
    );
}
