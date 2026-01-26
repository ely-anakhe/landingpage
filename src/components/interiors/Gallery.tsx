"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";

export function Gallery({ image, index }: { image: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
        >
            <Image
                src={urlFor(image).width(1200).url()}
                alt={`Gallery image ${index + 1}`}
                width={image.metadata?.dimensions?.width || 1200}
                height={image.metadata?.dimensions?.height || 800}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 80vw"
            />
        </motion.div>
    );
}
