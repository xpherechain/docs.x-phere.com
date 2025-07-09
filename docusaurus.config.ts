import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "X-Phere v2.0 Docs",
  tagline: "Welcome to the X-Phere",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.x-phere.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "x-phere", // Usually your repo name.

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

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/xpherechain",
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
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
      { name: "og:title", content: "X-Phere v2.0 Docs" },
      { name: "og:description", content: "Welcome to the X-Phere" },
      {
        name: "og:image",
        content: "https://docs.x-phere.com/img/kakao_bg.png",
      },
      { name: "og:url", content: "https://docs.x-phere.com" },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: "X-Phere v2.0 Docs" },
    ],
    colorMode: {
      defaultMode: "dark", // 기본 모드를 다크 모드로 설정
      disableSwitch: false, // 다크/라이트 모드 전환 버튼 활성화 (true로 설정하면 전환 불가능)
      respectPrefersColorScheme: false, // 사용자의 시스템 설정을 따르지 않음 (true로 설정하면 OS 테마를 따름)
    },
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "X-Phere",
      logo: {
        alt: "X-Phere",
        src: "img/logo.svg",
      },
      items: [
        // {
        //   to: 'learn',
        //   position: 'left',
        //   sidebarid: 'learnSidebar',
        //   label: 'Learn'
        // },
        // {
        //   to: "build",
        //   position: 'left',
        //   sidebarid: 'buildSidebar',
        //   label: 'Build',
        // },
        // {
        //   to: "nodes",
        //   position: 'left',
        //   sidebarid: 'nodeSidebar',
        //   label: 'Nodes',
        // },
        // {
        //   label: "Petstore API",
        //   position: "left",
        //   to: "/docs/category/petstore-api",
        // },

        {
          to: "references",
          position: "left",
          sidebarid: "refSidebar",
          label: "References",
        },
        {
          to: "nodes/Xphere-Endpoint-Node",
          position: "left",
          label: "Nodes",
        },
        {
          to: "mining",
          position: "left",
          sidebarid: "miningSidebar",
          label: "Mining",
        },
        // {
        //   to: "whitepaper",
        //   position: "left",
        //   label: "Whitepaper",
        // },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          to: "faucet",
          position: "left",
          sidebarid: "faucetSidebar",
          label: "Faucet",
        },
        {
          href: "https://github.com/x-phere",
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
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "X",
              href: "https://x.com/Xphere_official",
            },
          ],
        },
        {
          title: "Docs",
          items: [
            {
              label: "Docs",
              href: "/",
            },
            {
              label: "Reference",
              href: "/references",
            },
            {
              label: "Nodes",
              href: "/nodes",
            },
            {
              label: "Mining",
              href: "/mining",
            },
            {
              label: "Faucet",
              href: "/faucet",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/x-phere",
            },
          ],
        },
      ],
      copyright: `Copyright © 2024. X-Phere. All rights reserved`,
    },
    plugins: [
      [
        "docusaurus-plugin-openapi-docs",
        {
          id: "api", // plugin id
          docsPluginId: "classic", // configured for preset-classic
          config: {
            petstore: {
              specPath: "examples/petstore.yaml",
              outputDir: "docs/petstore",
              sidebarOptions: {
                groupPathsBy: "tag",
              },
            } satisfies OpenApiPlugin.Options,
          },
        },
      ],
    ],
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
