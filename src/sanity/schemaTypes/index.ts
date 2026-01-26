import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './objects/blockContent'
import seo from './objects/seo'
import settings from './documents/settings'
import piece from './documents/piece'
import project from './documents/project'
import faq from './documents/faq'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Helpers
    seo,
    blockContent,

    // Documents
    settings,
    piece,
    project,
    faq,
  ],
}
