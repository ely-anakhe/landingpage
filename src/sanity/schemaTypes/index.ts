import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './objects/blockContent'
import seo from './objects/seo'
import settings from './documents/settings'
import material from './documents/material'
import piece from './documents/piece'
import project from './documents/project'
import faq from './documents/faq'
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
    piece,
    project,
    faq,
    press,
    legal,

  ],
}
