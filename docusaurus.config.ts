import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "XPHERE v2.0 Docs",
  tagline: "Welcome to XPHERE",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.x-phere.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  organizationName: "xpherechain",
  projectName: "docs.x-phere.com",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root
          sidebarPath: "./sidebars.ts",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi

          editUrl:
            "https://github.com/xpherechain/docs.x-phere.com/tree/main/",
          // Show the last updated date on each doc page (derived from git history)
          showLastUpdateTime: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-25VV0Q5M3G",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],
  themes: ["docusaurus-theme-openapi-docs"], // export theme components

  themeConfig: {
    metadata: [
      { property: "og:title", content: "XPHERE Documentation" },
      {
        property: "og:description",
        content:
          "Official documentation for XPHERE — an EVM-compatible Layer 1 with a dual-chain PBFT and xpHash architecture.",
      },
      { property: "og:url", content: "https://docs.x-phere.com" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "XPHERE Documentation" },
    ],
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      // Ignore the visitor's OS theme so the site always opens in dark mode.
      respectPrefersColorScheme: false,
    },
    // Social card used for link previews.
    image: "img/xphere-social-card.png",
    navbar: {
      title: "XPHERE",
      logo: {
        alt: "XPHERE",
        src: "img/logo.svg",
      },
      items: [
        // Grouped by what a reader is trying to do, so the bar stays short.
        {
          type: "dropdown",
          label: "Build",
          position: "left",
          items: [
            { to: "/developers/quickstart", label: "Developer Guide" },
            { to: "/references", label: "References & RPC" },
            { to: "/faucet", label: "Testnet Faucet" },
          ],
        },
        {
          type: "dropdown",
          label: "Participate",
          position: "left",
          items: [
            { to: "/staking/overview", label: "Staking (Union Vault)" },
            { to: "/mining", label: "Mining" },
            { to: "/nodes", label: "Run a Node" },
            { to: "/union", label: "Union Membership" },
          ],
        },
        {
          type: "dropdown",
          label: "Ecosystem",
          position: "left",
          items: [
            { to: "/ecosystem/grants", label: "Grant Program" },
            { to: "/ecosystem/directory", label: "Ecosystem Directory" },
          ],
        },
        {
          type: "dropdown",
          label: "Resources",
          position: "left",
          items: [
            { to: "/resources/faq", label: "FAQ" },
            { to: "/resources/glossary", label: "Glossary" },
            { to: "/resources/tokenomics", label: "Tokenomics" },
            { to: "/resources/security", label: "Security" },
            { to: "/resources/network-upgrades", label: "Network Upgrades" },
            { to: "/resources/governance", label: "Governance" },
          ],
        },
        {
          to: "/whitepaper",
          label: "Whitepaper",
          position: "right",
        },
        {
          href: "https://github.com/xpherechain",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "telegram",
              href: "https://t.me/Xphere_official",
            },
            {
              label: "Discord",
              href: "https://discord.gg/xphere",
            },
            {
              label: "X",
              href: "https://x.com/Xphere_official",
            },
          ],
        },
        {
          title: "Build",
          items: [
            {
              label: "Developer Guide",
              href: "/developers/quickstart",
            },
            {
              label: "References & RPC",
              href: "/references",
            },
            {
              label: "Testnet Faucet",
              href: "/faucet",
            },
            {
              label: "Grant Program",
              href: "/ecosystem/grants",
            },
          ],
        },
        {
          title: "Participate",
          items: [
            {
              label: "Staking",
              href: "/staking/overview",
            },
            {
              label: "Mining",
              href: "/mining",
            },
            {
              label: "Run a Node",
              href: "/nodes",
            },
            {
              label: "Union Membership",
              href: "/union",
            },
          ],
        },
        {
          title: "Learn",
          items: [
            {
              label: "Whitepaper",
              href: "/whitepaper",
            },
            {
              label: "FAQ",
              href: "/resources/faq",
            },
            {
              label: "Tokenomics",
              href: "/resources/tokenomics",
            },
            {
              label: "Security",
              href: "/resources/security",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Staking Portal",
              href: "https://stake.x-phere.com",
            },
            {
              label: "XPScan Explorer",
              href: "https://xpscan.io",
            },
            {
              label: "GitHub",
              href: "https://github.com/xpherechain",
            },
          ],
        },
      ],
      copyright: `Ⓒ${new Date().getFullYear()} XPHERE Foundation. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
