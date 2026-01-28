import { createClient } from '@sanity/client'
import { basename, join } from 'path'
import { createReadStream } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get these from process.env or .env.local if possible, but for script simplicity we might need to hardcode or read .env
// Note: For this script to work, the user needs to provide the token, or we try to read it.
// Assuming we can read from .env.local

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN // Needs a write token

if (!token) {
    console.error("Error: SANITY_API_TOKEN not found in environment variables.")
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2024-01-01',
})

const materials = [
    {
        title: 'Renewable Timber',
        description: 'Wood is not a surface; it is a structure. It breathes. It moves. We use timber sourced from forests managed with the logic of continuity. To destroy the source of one’s craft is not just unethical; it is irrational. We take only what the earth can replace, ensuring the cycle of creation remains unbroken.',
        imagePath: '../public/material_timber.png',
        order: 1
    },
    {
        title: 'Quartz & Stone',
        description: 'We demand permanence. Quartz is the earth compressed into absolute solidity. It does not fear use. It does not ask to be handled delicately. It is there to serve the purpose of the room—to hold weight, to endure heat, to survive the friction of living without eroding.',
        imagePath: '../public/material_quartz.png',
        order: 2
    },
    {
        title: 'Pure Linen',
        description: 'Linen is not synthesized in a lab; it is grown from the soil. It possesses a tensile strength that synthetic fibers cannot mimic. It has a texture that engages the hand—cool, crisp, and unpretentious. It does not hide its weave; it declares it.',
        imagePath: '../public/material_linen.png',
        order: 3
    },
    {
        title: 'Cotton Velvet',
        description: 'We reject synthetics that shine cheaply. We choose cotton velvet for its depth. It absorbs light rather than reflecting it. It offers a softness that is substantial, not flimsy. It wears its history, marking the passage of time and the comfort of its owner.',
        imagePath: '../public/material_velvet.png',
        order: 4
    }
]

async function migrate() {
    console.log('Starting migration...')

    for (const material of materials) {
        console.log(`Processing: ${material.title}`)

        try {
            const filePath = join(__dirname, material.imagePath)
            const stream = createReadStream(filePath)

            console.log(`  Uploading image: ${material.imagePath}`)
            const asset = await client.assets.upload('image', stream, {
                filename: basename(filePath)
            })

            console.log(`  Image uploaded. Asset ID: ${asset._id}`)

            const doc = {
                _type: 'material',
                title: material.title,
                description: material.description,
                order: material.order,
                image: {
                    _type: 'image',
                    asset: {
                        _ref: asset._id,
                        _type: 'reference'
                    }
                }
            }

            const createdDoc = await client.create(doc)
            console.log(`  Document created: ${createdDoc._id}`)

        } catch (err) {
            console.error(`  Error processing ${material.title}:`, err)
        }
    }

    console.log('Migration complete.')
}

migrate()
