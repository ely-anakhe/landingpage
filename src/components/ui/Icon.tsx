import * as React from "react";
import { LucideIcon, LucideProps } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface IconProps extends Omit<LucideProps, "ref"> {
    icon: LucideIcon;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ icon: LucideIconComponent, className, strokeWidth = 1.5, ...props }, ref) => {
        return (
            <LucideIconComponent
                ref={ref}
                strokeWidth={strokeWidth}
                className={cn("h-6 w-6", className)}
                {...props}
            />
        );
    }
);
Icon.displayName = "Icon";

export { Icon };
