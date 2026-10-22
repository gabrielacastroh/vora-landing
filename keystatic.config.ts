import { collection, config, fields, singleton } from '@keystatic/core';
import BrandMark from './src/keystatic/BrandMark';

// Admin schemas mirror the zod schemas in src/content.config.ts and src/data/site.ts. Keep them in sync.
// In a collection Keystatic prefixes `directory`/`publicPath` with the entry slug, so an image of entry <slug> lives at
// <directory>/<slug>/<file> and is stored as <publicPath><slug>/<file> (e.g. ../../assets/vora/first-step/card-first-step.webp).
const image = (label: string, directory: string, required = true, description?: string) =>
  fields.image({ label, description, directory, publicPath: `../../${directory.slice('src/'.length)}/`, validation: { isRequired: required } });
const productImage = (label: string, required = true, description?: string) => image(label, 'src/assets/vora', required, description);

const link = {
  label: fields.text({ label: 'Texto', description: 'Lo que lee el cliente.' }),
  href: fields.text({ label: 'Enlace', description: 'A dónde lleva, por ejemplo /coleccion o https://...' }),
};
const socialUrl = (label: string) => fields.text({ label, description: 'Dirección completa del perfil. Déjalo vacío para ocultarlo.' });

export default config({
  // Local files while developing; Keystatic Cloud (commits to GitHub) once deployed.
  storage: import.meta.env.DEV ? { kind: 'local' } : { kind: 'cloud' },
  cloud: { project: 'vora-prod/vora-landing' },
  ui: {
    brand: { name: 'VORA', mark: BrandMark },
    navigation: { Colección: ['products'], Contenido: ['details', 'site'] },
  },
  collections: {
    products: collection({
      label: 'Productos',
      slugField: 'name',
      path: 'src/data/products/*',
      format: { data: 'json' },
      schema: {
        active: fields.checkbox({ label: 'Visible en la tienda', description: 'Desactívalo para ocultar este producto del sitio. Los cambios se publican en 1-2 minutos.', defaultValue: true }),
        order: fields.integer({ label: 'Avanzado: orden en el catálogo', description: 'Posición en el catálogo (1 = primero). Normalmente no hace falta tocarlo.', validation: { isRequired: true, min: 1 } }),
        name: fields.slug({ name: { label: 'Nombre', description: 'Nombre del producto. Genera la dirección de su página.' } }),
        variant: fields.text({ label: 'Variante', description: 'Color o versión, por ejemplo "Negro".' }),
        line: fields.select({
          label: 'Línea',
          description: 'Grupo en la página de colección. "Ninguna" deja el producto fuera de esa página.',
          options: [
            { label: 'Ninguna', value: '' },
            { label: 'Unisex', value: 'unisex' },
            { label: 'Mujer', value: 'womens' },
          ],
          defaultValue: '',
        }),
        cardImage: productImage('Foto principal', true, 'Se ve en la tarjeta de la colección y en la página de inicio.'),
        gallery: fields.array(
          fields.object({
            image: productImage('Foto'),
            position: fields.text({ label: 'Avanzado: encuadre', description: 'Qué parte de la foto se muestra al recortarla (por ejemplo "50% 20%"). Vacío = centrada.' }),
          }),
          { label: 'Galería', description: 'Fotos de la página del producto, en orden.', itemLabel: (p) => p.fields.image.value?.filename || 'Foto' },
        ),
        heroImage: productImage('Foto de portada', false, 'Foto grande de la página del producto. Opcional.'),
        heroPosition: fields.text({ label: 'Avanzado: encuadre de la portada', description: 'Qué parte de la foto de portada se muestra (por ejemplo "50% 20%"). Vacío = centrada.' }),
        featured: fields.integer({ label: 'Destacado', description: 'Posición en la fila de inicio (1 = primero). Vacío = no aparece en inicio.', validation: { min: 1 } }),
        description: fields.text({ label: 'Descripción', description: 'Texto que describe el producto en su página.', multiline: true, validation: { isRequired: true } }),
        details: fields.array(
          fields.object({
            label: fields.text({ label: 'Característica', description: 'Por ejemplo "Material".', validation: { isRequired: true } }),
            value: fields.text({ label: 'Valor', description: 'Por ejemplo "Algodón peinado".', validation: { isRequired: true } }),
          }),
          { label: 'Detalles', description: 'Lista de características del producto.', itemLabel: (p) => p.fields.label.value },
        ),
        sizes: fields.array(fields.text({ label: 'Talla', validation: { isRequired: true } }), { label: 'Tallas', description: 'Tallas disponibles, por ejemplo S, M, L.' }),
      },
    }),
    details: collection({
      label: 'Detalles',
      slugField: 'title',
      path: 'src/data/details/*',
      format: { data: 'json' },
      schema: {
        order: fields.integer({ label: 'Avanzado: orden', description: 'Posición en la página de colección (1 = primero). Normalmente no hace falta tocarlo.', validation: { isRequired: true, min: 1 } }),
        title: fields.slug({ name: { label: 'Título', description: 'Título del detalle en la página de colección.' } }),
        lines: fields.array(fields.text({ label: 'Línea', validation: { isRequired: true } }), { label: 'Texto', description: 'Una línea de texto por elemento.' }),
        image: image('Foto', 'src/assets/vora/details', true, 'Foto que acompaña este detalle.'),
        frame: fields.object(
          {
            x: fields.number({ label: 'X', description: 'Desplazamiento horizontal.' }),
            y: fields.number({ label: 'Y', description: 'Desplazamiento vertical.' }),
            width: fields.number({ label: 'Ancho' }),
            height: fields.number({ label: 'Alto' }),
          },
          { label: 'Avanzado: encuadre de la foto', description: 'Recorte de la foto dentro de su marco, medido desde la ventana visible (viene del diseño en Figma). Vacío = la foto llena el marco.' },
        ),
      },
    }),
  },
  singletons: {
    site: singleton({
      label: 'Textos del sitio',
      path: 'src/data/site',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Nombre de la marca', description: 'Nombre que aparece en el sitio y en Google.', validation: { isRequired: true } }),
        description: fields.text({ label: 'Descripción del sitio', description: 'Frase corta que aparece en Google y al compartir el enlace.', multiline: true, validation: { isRequired: true } }),
        pages: fields.object({
          home: fields.object({ title: fields.text({ label: 'Título de Inicio', description: 'Título de la pestaña del navegador.', validation: { isRequired: true } }) }),
          coleccion: fields.object({ title: fields.text({ label: 'Título de Colección', description: 'Título de la pestaña del navegador.', validation: { isRequired: true } }) }),
          nosotros: fields.object({ title: fields.text({ label: 'Título de Nosotros', description: 'Título de la pestaña del navegador.', validation: { isRequired: true } }) }),
          contacto: fields.object({ title: fields.text({ label: 'Título de Contacto', description: 'Título de la pestaña del navegador.', validation: { isRequired: true } }) }),
        }, { label: 'Títulos de las páginas', description: 'Título que se ve en la pestaña del navegador.' }),
        nav: fields.array(fields.object({ key: fields.text({ label: 'Identificador', description: 'Uso interno. No lo cambies.', validation: { isRequired: true } }), ...link }), {
          label: 'Menú principal',
          description: 'Enlaces del menú de arriba.',
          itemLabel: (p) => p.fields.label.value,
        }),
        footer: fields.object({
          explora: fields.array(fields.object(link), { label: 'Pie de página: Explora', description: 'Enlaces de la columna Explora.', itemLabel: (p) => p.fields.label.value }),
          legal: fields.array(fields.object(link), { label: 'Pie de página: Legal', description: 'Enlaces legales.', itemLabel: (p) => p.fields.label.value }),
        }, { label: 'Pie de página' }),
        contact: fields.object({
          email: fields.text({ label: 'Correo', description: 'Correo de contacto de la tienda.', validation: { isRequired: true } }),
          whatsappMessage: fields.text({ label: 'Mensaje de WhatsApp', description: 'Mensaje que se escribe solo cuando un cliente te escribe por WhatsApp.', multiline: true, validation: { isRequired: true } }),
        }, { label: 'Contacto' }),
        social: fields.object({
          whatsapp: socialUrl('WhatsApp'),
          instagram: socialUrl('Instagram'),
          tiktok: socialUrl('TikTok'),
        }, { label: 'Redes sociales' }),
      },
    }),
  },
});
