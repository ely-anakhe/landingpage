import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './objects/blockContent'
import seo from './objects/seo'
import settings from './documents/settings'
import material from './documents/material'
import project from './documents/project'
import { press } from './documents/press'
import legal from './documents/legal'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Helpers
    seo,
    blockContent,

    // Documents
    settings,
    material,
    project,
    press,
    legal,
  ],
}
