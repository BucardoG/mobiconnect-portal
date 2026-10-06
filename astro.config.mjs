// Portal de developers de Mobiconnect (mobiconnect.dev) — AIR-1579.
// Dossier D12: Astro Starlight para documentación. Diseño: Figma JVm2f5xPVW7TX3FpnmmeCk, página 20.
// Contrato: entitlement/api-surface.md. Light-first, sin fuentes ni scripts de terceros.
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://mobiconnect.dev",
  integrations: [
    starlight({
      title: "Mobiconnect Developers",
      description:
        "Documentación de las APIs de Mobiconnect: Entitlements, el contrato comercial de cualquier API.",
      logo: { src: "./src/lockup.svg", replacesTitle: true, alt: "Mobiconnect" },
      favicon: "/favicon.svg",
      defaultLocale: "root",
      locales: { root: { label: "Español", lang: "es" } },
      customCss: ["./src/styles/brand.css"],
      expressiveCode: { themes: ["github-light"], useStarlightUiThemeColors: false },
      components: {
        ThemeSelect: "./src/components/NoThemeSelect.astro",
        ThemeProvider: "./src/components/LightOnly.astro",
      },
      social: [
        { icon: "email", label: "hola@mobiconnect.app", href: "mailto:hola@mobiconnect.app" },
      ],
      lastUpdated: false,
      pagination: true,
      sidebar: [
        {
          label: "Empezar",
          items: [
            { label: "Introducción", slug: "index" },
            { label: "Quickstart", slug: "quickstart" },
            { label: "Autenticación", slug: "autenticacion" },
            { label: "Claves y entornos", slug: "claves-y-entornos" },
          ],
        },
        {
          label: "Conceptos",
          items: [
            { label: "El contrato: planes y cuotas", slug: "conceptos/contrato" },
            { label: "Decisiones del PDP", slug: "conceptos/decisiones" },
            { label: "Errores", slug: "conceptos/errores" },
            { label: "x-correlator e idempotencia", slug: "conceptos/idempotencia" },
            { label: "Fail-closed", slug: "conceptos/fail-closed" },
          ],
        },
        {
          label: "APIs",
          items: [
            {
              label: "Entitlements v1",
              badge: { text: "staging", variant: "success" },
              items: [
                { label: "POST /v1/entitlements/check", slug: "apis/entitlements/check" },
                { label: "POST /v1/entitlements/release", slug: "apis/entitlements/release" },
                { label: "Admin", slug: "apis/entitlements/admin" },
                { label: "Salud", slug: "apis/entitlements/salud" },
              ],
            },
            { label: "Number Intelligence v1", slug: "apis/number-intelligence", badge: { text: "en diseño", variant: "default" } },
            { label: "Plataforma CAMARA", slug: "apis/camara", badge: { text: "en construcción", variant: "default" } },
            { label: "Open Finance Bridge", slug: "apis/open-finance", badge: { text: "en diseño", variant: "default" } },
          ],
        },
        {
          label: "Recursos",
          items: [
            { label: "Changelog", slug: "recursos/changelog" },
            { label: "Estado del servicio", slug: "recursos/estado" },
          ],
        },
      ],
    }),
  ],
});
