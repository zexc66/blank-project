import { SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    {
      name: 'opportunity',
      title: 'Opportunity',
      type: 'document',
      fields: [
        { name: 'slug', type: 'slug', options: { source: 'title_en' } },
        { name: 'title_ar', type: 'string' },
        { name: 'title_en', type: 'string' },
        { name: 'summary_ar', type: 'text' },
        { name: 'summary_en', type: 'text' },
        { name: 'sector', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'ticketMinUSD', type: 'number' },
        { name: 'ticketMaxUSD', type: 'number' },
        { name: 'stage', type: 'string' },
        { name: 'sdgs', type: 'array', of: [{ type: 'string' }] },
        { name: 'esgScore', type: 'number' },
        { name: 'heroImage', type: 'image' },
        { name: 'documents', type: 'array', of: [{ type: 'file' }] },
      ],
    },
    {
      name: 'partner',
      title: 'Partner',
      type: 'document',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'logoUrl', type: 'url' },
        { name: 'link', type: 'url' },
      ],
    },
    {
      name: 'countryProfile',
      title: 'Country Profile',
      type: 'document',
      fields: [
        { name: 'iso2', type: 'string' },
        { name: 'name_ar', type: 'string' },
        { name: 'name_en', type: 'string' },
        { name: 'summary', type: 'text' },
        { name: 'indicators', type: 'array', of: [{ type: 'object', fields: [{ name: 'key', type: 'string' }, { name: 'value', type: 'number' }] }] },
      ],
    },
    {
      name: 'newsPost',
      title: 'News Post',
      type: 'document',
      fields: [
        { name: 'slug', type: 'slug', options: { source: 'title_en' } },
        { name: 'title_ar', type: 'string' },
        { name: 'title_en', type: 'string' },
        { name: 'body_ar', type: 'text' },
        { name: 'body_en', type: 'text' },
        { name: 'published_at', type: 'datetime' },
      ],
    },
  ],
}