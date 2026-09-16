import { motion } from 'motion/react';

import FrameNav from '../vora/FrameNav';
import FrameFooter from '../vora/FrameFooter';
import { mask, archivo, geist, reveal } from '../vora/mask';

import shopNavBg from '../../assets/vora/shop-nav-bg.png';
import voraLogoDark from '../../assets/vora/vora-logo-dark.png';
import shopCardVora01 from '../../assets/vora/shop-card-vora01.png';
import shopCardVora02 from '../../assets/vora/shop-card-vora02.png';
import shopCardVora03 from '../../assets/vora/shop-card-vora03.png';
import shopCardVora04 from '../../assets/vora/shop-card-vora04.png';
import shopCardVora05 from '../../assets/vora/shop-card-vora05.png';
import shopHeroModel from '../../assets/vora/shop-hero-model.png';
import shopHeroModelCutout from '../../assets/vora/shop-hero-model-cutout.png';
import shopDiagonalVector from '../../assets/vora/shop-diagonal-vector.svg';
import line11 from '../../assets/vora/line-11.svg';
import shopDetailMask from '../../assets/vora/shop-detail-mask.svg';
import shopDetailPrint from '../../assets/vora/shop-detail-print.png';
import shopDetailFabric from '../../assets/vora/shop-detail-fabric.png';
import shopDetailLabel from '../../assets/vora/shop-detail-label.png';
import shopLookbookMask from '../../assets/vora/shop-lookbook-mask.svg';
import shopPortrait1 from '../../assets/vora/shop-mask-portrait-1.png';
import shopPortrait2 from '../../assets/vora/shop-mask-portrait-2.png';
import shopPortrait3 from '../../assets/vora/shop-mask-portrait-3.png';

const products = [
  { left: 680, top: 172, name: 'VORA 01', variant: 'Camiseta / Azul', image: shopCardVora01.src, slug: 'vora-01', blur: 18 },
  { left: 1108, top: 174, name: 'VORA 02', variant: 'Camiseta / Beige', image: shopCardVora02.src, slug: 'vora-02', blur: 18 },
  { left: 102, top: 555, name: 'VORA 03', variant: 'Camiseta / Verde', image: shopCardVora03.src, slug: 'vora-03', blur: 18 },
  { left: 605, top: 555, name: 'VORA 04', variant: 'Camiseta / Blanco', image: shopCardVora04.src, slug: 'vora-04', blur: 18 },
  { left: 1108, top: 555, name: 'VORA 05', variant: 'Camiseta / Azul Claro', image: shopCardVora05.src, slug: 'vora-05', blur: 18.1 },
];

const detailCopy = [
  { left: 104, title: '01 / MATERIAL', lines: ['Algodón de alta calidad,', ' transpirable y resistente.'] },
  { left: 518, title: '02 / CONSTRUCCIÓN', lines: ['Costuras reforzadas', ' y acabados premium.'] },
  { left: 932, title: '03 / IDENTIDAD', lines: ['Un símbolo que representa', ' movimiento y dirección.'] },
];

const lookbookCaptions = [
  { left: 120, name: 'VORA 01', tag: 'Movimieno / Ciudad' },
  { left: 540, name: 'VORA 02', tag: 'Dirección / Libertad' },
  { left: 959, name: 'VORA 03', tag: 'Exploración / Futuro' },
];

const lookbookShadow = 'inset -1px -50px 41.4px 0px rgba(0,0,0,0.36)';

export default function ShopFrame() {
  return (
    <div className="relative size-full bg-[#ece6dd]">
      <motion.div
        {...reveal}
        className="pointer-events-none absolute h-[498px] w-[399px]"
        style={{ left: 104, top: 2312, ...mask(shopLookbookMask.src, '0px 24px', '393px 378px') }}
      >
        <img alt="" src={shopPortrait1.src} className="absolute inset-0 size-full max-w-none object-cover" />
        <div className="absolute inset-0" style={{ boxShadow: lookbookShadow }} />
      </motion.div>

      <motion.div
        className="absolute flex w-[420px] flex-col items-start gap-[24px]"
        style={{ left: 102, top: 172 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="whitespace-nowrap text-[14px] font-semibold leading-[normal] text-[#5c141a]" style={geist}>
          01 / 01 — SS26 PRE-RELEASE
        </p>
        <p className="w-full text-[52px] font-black leading-[normal] text-[#6d1212]" style={archivo}>
          COLECCIÓN / 01
        </p>
        <p className="w-full text-[15px] font-normal leading-[1.6] text-[#525256] opacity-80" style={geist}>
          Una colección diseñada en torno a la geometría y el movimiento, adaptándose a siluetas
          contemporáneas con materiales premium. Hilos de algodón peinado y cortes oversize
          estructurados.
        </p>
      </motion.div>

      {products.map((product, i) => (
        <motion.a
          key={product.slug}
          href={`/producto/${product.slug}`}
          className="group absolute flex flex-col items-start gap-[12px]"
          style={{ left: product.left, top: product.top }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="relative h-[240px] w-[230px] shrink-0 overflow-hidden"
            style={{ boxShadow: `4px 12px ${product.blur}px 0px rgba(0,0,0,0.11)` }}
          >
            <img
              alt={`${product.name} — ${product.variant}`}
              src={product.image}
              className="pointer-events-none absolute inset-0 size-full max-w-none object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex w-full shrink-0 items-center justify-between whitespace-nowrap text-left leading-[normal]">
            <div className="flex shrink-0 flex-col items-start gap-[2px]">
              <p className="text-[15px] font-bold text-[#240407]" style={archivo}>
                {product.name}
              </p>
              <p className="text-[12px] font-normal text-[#8d877d]" style={geist}>
                {product.variant}
              </p>
            </div>
            <p className="shrink-0 text-[11px] font-bold text-[#a32b32]" style={geist}>
              VER PRODUCTO →
            </p>
          </div>
        </motion.a>
      ))}

      <FrameFooter left={0} top={2812} />

      <div className="absolute left-0 h-[617px] w-[1440px]" style={{ top: 983 }}>
        <img alt="" src={shopHeroModel.src} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
      </div>
      <div className="absolute left-0 h-[617px] w-[1440px]" style={{ top: 983 }}>
        <img
          alt="Modelo con camiseta VORA"
          src={shopHeroModelCutout.src}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      </div>
      <div className="absolute h-[605.5px] w-[1263px]" style={{ left: -31.5, top: 994 }}>
        <img alt="" src={shopDiagonalVector.src} className="absolute inset-0 block size-full max-w-none" />
      </div>

      <motion.div
        {...reveal}
        className="absolute flex w-[420px] flex-col items-start gap-[24px] text-[#ece6dd]"
        style={{ left: 102, top: 1207 }}
      >
        <p className="whitespace-nowrap text-[14px] font-semibold leading-[normal]" style={geist}>
          COLECCIÓN / 01
        </p>
        <div className="w-full text-[52px] font-black" style={archivo}>
          <p className="leading-[normal]">HECHA PARA</p>
          <p className="leading-[normal]">SEGUIR</p>
          <p className="leading-[normal]">AVANZANDO</p>
        </div>
        <p className="w-full text-[15px] font-normal leading-[1.6] opacity-80" style={geist}>
          Una colección construida alrededor del movimiento, la dirección y la idea de no permanecer
          en el mismo lugar.
        </p>
      </motion.div>

      <div className="absolute h-0 w-[102px]" style={{ left: 103, top: 1507 }}>
        <div className="absolute inset-[-0.25px_0_0_0]">
          <img alt="" src={line11.src} className="block size-full max-w-none" />
        </div>
      </div>

      <motion.p
        {...reveal}
        className="absolute w-[357px] whitespace-pre-wrap text-[32px] font-extrabold leading-[normal] text-[#5c141a]"
        style={{ left: 103, top: 2271, ...archivo }}
      >
        {`LOOKBOOK   /   01`}
      </motion.p>

      <motion.div
        {...reveal}
        className="absolute w-[419px] text-[32px] font-extrabold text-[#6d1212]"
        style={{ left: 103, top: 1718, ...archivo }}
      >
        <p className="leading-[normal]">DETALLES</p>
        <p className="leading-[normal]">DE LA COLECCIÓN</p>
      </motion.div>

      <motion.div
        {...reveal}
        className="pointer-events-none absolute h-[514px] w-[411px]"
        style={{ left: 939, top: 2321, ...mask(shopLookbookMask.src, '3px 15px', '393px 378px') }}
      >
        <img alt="" src={shopPortrait2.src} className="absolute inset-0 size-full max-w-none object-cover" />
        <div className="absolute inset-0" style={{ boxShadow: lookbookShadow }} />
      </motion.div>

      <motion.div
        {...reveal}
        className="pointer-events-none absolute h-[526px] w-[420.95px]"
        style={{ left: 509, top: 2274, ...mask(shopLookbookMask.src, '14px 62px', '393px 378px') }}
      >
        <img alt="" src={shopPortrait3.src} className="absolute inset-0 size-full max-w-none object-cover" />
        <div className="absolute inset-0" style={{ boxShadow: lookbookShadow }} />
      </motion.div>

      {lookbookCaptions.map((caption) => (
        <div
          key={caption.name}
          className="absolute flex flex-col items-start gap-[2px] whitespace-nowrap leading-[normal] text-white"
          style={{ left: caption.left, top: 2666 }}
        >
          <p className="text-[15px] font-bold" style={archivo}>
            {caption.name}
          </p>
          <p className="text-[12px] font-normal" style={geist}>
            {caption.tag}
          </p>
        </div>
      ))}

      <motion.div
        {...reveal}
        className="absolute size-[399px]"
        style={{ left: 512, top: 1768, ...mask(shopDetailMask.src, '6px 47px', '393px 234px') }}
      >
        <img alt="" src={shopDetailFabric.src} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
      </motion.div>

      <motion.div
        {...reveal}
        className="absolute size-[399px]"
        style={{ left: 926, top: 1768, ...mask(shopDetailMask.src, '6px 47px', '393px 234px') }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            alt=""
            src={shopDetailLabel.src}
            className="absolute left-[-8.86%] top-[-11.85%] h-[135.9%] w-[108.76%] max-w-none"
          />
        </div>
      </motion.div>

      {detailCopy.map((detail) => (
        <div
          key={detail.title}
          className="absolute flex flex-col items-start gap-[2px] leading-[normal] text-[#332727]"
          style={{ left: detail.left, top: 2086 }}
        >
          <p className="whitespace-nowrap text-[15px] font-bold" style={archivo}>
            {detail.title}
          </p>
          <p className="whitespace-pre text-[12px] font-normal" style={geist}>
            {detail.lines[0]}
            <br />
            {detail.lines[1]}
          </p>
        </div>
      ))}

      <motion.div
        {...reveal}
        className="absolute h-[518px] w-[414px]"
        style={{ left: 92, top: 1658, ...mask(shopDetailMask.src, '12px 157px', '393px 234px') }}
      >
        <img alt="" src={shopDetailPrint.src} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
      </motion.div>

      <FrameNav active="coleccion" background={shopNavBg.src} theme="light" logo={voraLogoDark.src} />
    </div>
  );
}
