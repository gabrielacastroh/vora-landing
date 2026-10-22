# Feature: whatsapp-emoji-deeplink

Objective: make emojis work in prefilled WhatsApp messages (user request) without relying on WhatsApp's landing page, which replaces every emoji with U+FFFD (measured: wa.me and api.whatsapp.com/send, all encodings, and the chat box receives the mangled text).
Branch: feat/whatsapp-emoji-deeplink. Route: delegated writer.

## Design
- SSR href stays a plain-text (emoji-free) api.whatsapp.com/send link: always works, no JS needed, desktop users get plain text.
- On mobile (iOS/Android UA), a click handler opens `whatsapp://send?phone=<n>&text=<message with emoji>` (client-side, the app decodes UTF-8 emoji itself). If the page is still visible after ~1.2 s (app not installed / blocked) fall back to the plain link in a new tab.
- Desktop keeps the plain link (cannot be fixed from our side).
- One message source with emoji; the plain text is derived by stripping emoji.

## Messages (with emoji)
- general: ¡Hey, VORA! ♦️ Ando viendo lo que tienen en la web y me surgieron unas dudas. ¿Me echan una mano?
- product, no size: ¡Hola, VORA! 👋 Me interesa {NAME} ({VARIANT}). ¿Qué tallas tienen disponibles? 🚀
- product, size: ¡Hola, VORA! 👋 Me interesa {NAME} ({VARIANT}) en talla {SIZE}. ¿Está disponible? 🚀

## Tasks
- [ ] T1 helper: emoji message + derived plain text + data attributes
- [ ] T2 click handler in motion.ts (mobile deep link + fallback), size picker keeps data in sync
- [ ] T3 verify (build, hrefs plain, emoji only in data attrs, simulated mobile UA click)

## Evidence
(pending)
