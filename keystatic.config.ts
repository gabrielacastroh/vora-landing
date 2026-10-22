import { collection, config, fields, singleton } from '@keystatic/core';

// Admin schemas mirror the zod schemas in src/content.config.ts and src/data/site.ts. Keep them in sync.
// In a collection Keystatic prefixes `directory`/`publicPath` with the entry slug, so an image of entry <slug> lives at
// <directory>/<slug>/<file> and is stored as <publicPath><slug>/<file> (e.g. ../../assets/vora/first-step/card-first-step.webp).
const image = (label: string, directory: string, required = true) =>
  fields.image({ label, directory, publicPath: `../../${directory.slice('src/'.length)}/`, validation: { isRequired: required } });
const productImage = (label: string, required = true) => image(label, 'src/assets/vora', required);

const link = { label: fields.text({ label: 'Label' }), href: fields.text({ label: 'Href' }) };
const socialUrl = (label: string) => fields.text({ label, description: 'Full profile URL, or empty to hide it.' });

export default config({
  storage: { kind: 'local' },
  collections: {
    products: collection({
      label: 'Products',
      slugField: 'name',
      path: 'src/data/products/*',
      format: { data: 'json' },
      schema: {
        order: fields.integer({ label: 'Order', description: 'Position in the catalog (1 = first).', validation: { isRequired: true, min: 1 } }),
        name: fields.slug({ name: { label: 'Name' } }),
        variant: fields.text({ label: 'Variant' }),
        line: fields.select({
          label: 'Line',
          description: 'Collection-page group. None leaves the product out of /coleccion.',
          options: [
            { label: 'None', value: '' },
            { label: 'Unisex', value: 'unisex' },
            { label: 'Womens', value: 'womens' },
          ],
          defaultValue: '',
        }),
        cardImage: productImage('Card image'),
        gallery: fields.array(
          fields.object({
            image: productImage('Image'),
            position: fields.text({ label: 'Position (object-position)' }),
          }),
          { label: 'Gallery', itemLabel: (p) => p.fields.image.value?.filename || 'Photo' },
        ),
        heroImage: productImage('Hero image', false),
        heroPosition: fields.text({ label: 'Hero position (object-position)' }),
        featured: fields.integer({ label: 'Featured', description: 'Position in the home row. Empty leaves it out.', validation: { min: 1 } }),
        description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
        details: fields.array(
          fields.object({
            label: fields.text({ label: 'Label', validation: { isRequired: true } }),
            value: fields.text({ label: 'Value', validation: { isRequired: true } }),
          }),
          { label: 'Details', itemLabel: (p) => p.fields.label.value },
        ),
        sizes: fields.array(fields.text({ label: 'Size', validation: { isRequired: true } }), { label: 'Sizes' }),
      },
    }),
    details: collection({
      label: 'Details',
      slugField: 'title',
      path: 'src/data/details/*',
      format: { data: 'json' },
      schema: {
        order: fields.integer({ label: 'Order', description: 'Position on /coleccion (1 = first).', validation: { isRequired: true, min: 1 } }),
        title: fields.slug({ name: { label: 'Title' } }),
        lines: fields.array(fields.text({ label: 'Line', validation: { isRequired: true } }), { label: 'Lines (one per line)' }),
        image: image('Image', 'src/assets/vora/details'),
        frame: fields.object(
          {
            x: fields.number({ label: 'X' }),
            y: fields.number({ label: 'Y' }),
            width: fields.number({ label: 'Width' }),
            height: fields.number({ label: 'Height' }),
          },
          { label: 'Frame', description: 'Figma mask framing of the image rect, relative to the visible window. Leave empty to fill.' },
        ),
      },
    }),
  },
  singletons: {
    site: singleton({
      label: 'Site',
      path: 'src/data/site',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
        description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
        pages: fields.object({
          home: fields.object({ title: fields.text({ label: 'Home title', validation: { isRequired: true } }) }),
          coleccion: fields.object({ title: fields.text({ label: 'Colección title', validation: { isRequired: true } }) }),
          nosotros: fields.object({ title: fields.text({ label: 'Nosotros title', validation: { isRequired: true } }) }),
          contacto: fields.object({ title: fields.text({ label: 'Contacto title', validation: { isRequired: true } }) }),
        }),
        nav: fields.array(fields.object({ key: fields.text({ label: 'Key', validation: { isRequired: true } }), ...link }), {
          label: 'Nav',
          itemLabel: (p) => p.fields.label.value,
        }),
        footer: fields.object({
          explora: fields.array(fields.object(link), { label: 'Explora', itemLabel: (p) => p.fields.label.value }),
          legal: fields.array(fields.object(link), { label: 'Legal', itemLabel: (p) => p.fields.label.value }),
        }),
        contact: fields.object({
          email: fields.text({ label: 'Email', validation: { isRequired: true } }),
          whatsappMessage: fields.text({ label: 'WhatsApp message', multiline: true, validation: { isRequired: true } }),
        }),
        social: fields.object({
          whatsapp: socialUrl('WhatsApp'),
          instagram: socialUrl('Instagram'),
          tiktok: socialUrl('TikTok'),
        }),
      },
    }),
  },
});
