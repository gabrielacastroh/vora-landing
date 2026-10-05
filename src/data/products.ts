import shopCardVora01 from '../assets/vora/shop-card-vora01.png';
import shopCardVora02 from '../assets/vora/shop-card-vora02.png';
import shopCardVora03 from '../assets/vora/shop-card-vora03.png';
import shopCardVora04 from '../assets/vora/shop-card-vora04.png';
import shopCardVora05 from '../assets/vora/shop-card-vora05.png';
import productModelBackView from '../assets/vora/product-model-back-view.png';
import shopHeroModel from '../assets/vora/shop-hero-model.png';
import shopPortrait2 from '../assets/vora/shop-mask-portrait-2.png';
import shopPortrait3 from '../assets/vora/shop-mask-portrait-3.png';

export interface Product {
  slug: string;
  name: string;
  variant: string;
  color: string;
  cardImage: ImageMetadata;
  heroImage: ImageMetadata;
  /** object-position for the hero photo, to keep the model in frame. */
  heroPosition?: string;
  /** No model photo yet: show the garment whole instead of cropping it. */
  packshot?: boolean;
  description: string;
  details: { label: string; value: string }[];
  sizes: string[];
}

export const products: Product[] = [
  {
    slug: 'vora-01',
    name: 'VORA 01',
    variant: 'Camiseta / Azul',
    color: 'Azul marino',
    cardImage: shopCardVora01,
    heroImage: productModelBackView,
    description:
      'Una camiseta de silueta oversize, confeccionada en algodón de alto gramaje para ofrecer estructura, comodidad y una caída natural. Diseñada con un estampado de inspiración hotelera que aporta carácter sin perder la esencia contemporánea de VORA.',
    details: [
      { label: 'Corte', value: 'Oversize contemporáneo' },
      { label: 'Material', value: '100% algodón de alto gramaje' },
      { label: 'Color', value: 'Azul marino' },
      { label: 'Estampado', value: 'Serigrafía premium de alta densidad' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'vora-02',
    name: 'VORA 02',
    variant: 'Camiseta / Beige',
    color: 'Beige',
    cardImage: shopCardVora02,
    heroImage: shopPortrait3,
    description:
      'Camiseta de corte oversize en algodón de alto gramaje, con caída estructurada y un tono beige versátil pensado para moverse entre el día y la noche.',
    details: [
      { label: 'Corte', value: 'Oversize contemporáneo' },
      { label: 'Material', value: '100% algodón de alto gramaje' },
      { label: 'Color', value: 'Beige' },
      { label: 'Estampado', value: 'Bordado minimalista' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'vora-03',
    name: 'VORA 03',
    variant: 'Camiseta / Verde',
    color: 'Verde',
    cardImage: shopCardVora03,
    heroImage: shopPortrait2,
    description:
      'Silueta oversize en verde profundo, con estampado frontal que resume la filosofía VORA: seguir avanzando sin perder identidad.',
    details: [
      { label: 'Corte', value: 'Oversize contemporáneo' },
      { label: 'Material', value: '100% algodón de alto gramaje' },
      { label: 'Color', value: 'Verde' },
      { label: 'Estampado', value: 'Serigrafía frontal' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'vora-04',
    name: 'VORA 04',
    variant: 'Camiseta / Blanco',
    color: 'Blanco',
    cardImage: shopCardVora04,
    heroImage: shopCardVora04,
    packshot: true,
    description:
      'Un básico reinterpretado: algodón premium en blanco puro, corte oversize y acabados reforzados para el uso diario.',
    details: [
      { label: 'Corte', value: 'Oversize contemporáneo' },
      { label: 'Material', value: '100% algodón de alto gramaje' },
      { label: 'Color', value: 'Blanco' },
      { label: 'Estampado', value: 'Logo tonal' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'vora-05',
    name: 'VORA 05',
    variant: 'Camiseta / Azul Claro',
    color: 'Azul claro',
    cardImage: shopCardVora05,
    heroImage: shopHeroModel,
    heroPosition: '68% center',
    description:
      'Azul claro con estampado gráfico contemporáneo, corte oversize y algodón de alto gramaje para una caída natural.',
    details: [
      { label: 'Corte', value: 'Oversize contemporáneo' },
      { label: 'Material', value: '100% algodón de alto gramaje' },
      { label: 'Color', value: 'Azul claro' },
      { label: 'Estampado', value: 'Gráfico frontal' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
