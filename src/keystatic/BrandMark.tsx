import voraLogo from '../assets/vora/vora-logo.png';
// Side-effect import: Keystatic's page is injected by the integration (a same-pattern page of ours would collide with it),
// so the admin theme rides along with the one module only the panel's client bundle loads.
import '../styles/keystatic.css';

// The logo is white on transparent, so it sits on a black chip to stay visible on both light and dark panel themes.
export default function BrandMark() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', background: '#0b0b0d', borderRadius: 6, padding: '4px 8px' }}>
      <img src={voraLogo.src} alt="VORA" style={{ height: 14, width: 'auto', display: 'block' }} />
    </span>
  );
}
