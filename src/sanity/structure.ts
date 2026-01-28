import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton: Settings
      S.listItem()
        .title('Settings')
        .id('settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      S.divider(),
      // Regular Documents
      S.documentTypeListItem('project').title('Interiors (Projects)'),
      S.documentTypeListItem('piece').title('Art (Furniture)'),
      S.divider(),
      S.documentTypeListItem('faq').title('FAQs'),
    ])
