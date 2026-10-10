// @astrojs/vercel's runtime entrypoint imports its build-time module (which imports rolldown, a native
// bundler). Aliasing it here keeps the unused native binary out of the deployed function.
export const rolldown = undefined;
