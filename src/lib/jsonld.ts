/** Serializes structured data for an inline `<script type="application/ld+json">`. Escaping `<` keeps admin-edited text from closing the script tag. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
