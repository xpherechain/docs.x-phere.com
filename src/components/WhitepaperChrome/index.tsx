import Head from '@docusaurus/Head';

const HIDE_CSS = `
  nav.navbar,
  .navbar,
  .navbar--fixed-top,
  footer,
  .footer,
  .theme-doc-sidebar-container,
  aside.theme-doc-sidebar-container,
  .theme-doc-toc-desktop,
  .theme-doc-toc-mobile,
  .theme-doc-breadcrumbs,
  .pagination-nav,
  .theme-doc-footer,
  .navbar-sidebar,
  .navbar-sidebar__backdrop {
    display: none !important;
  }
  :root { --ifm-navbar-height: 0 !important; }
  html, body { background: #121212 !important; }
  .main-wrapper { margin-left: 0 !important; max-width: 100% !important; padding-top: 0 !important; background: #121212 !important; }
  .main-wrapper:before,
  .main-wrapper:after { display: none !important; background: none !important; content: none !important; }
  main { padding-top: 1rem !important; padding-bottom: 2rem !important; background: #121212 !important; }
  main[class*='docMainContainer'] { margin-left: 0 !important; max-width: 100% !important; background: #121212 !important; }
  article, .theme-doc-markdown { background: #121212 !important; }
`;

export default function WhitepaperChrome(): JSX.Element {
  return (
    <Head>
      <style>{HIDE_CSS}</style>
    </Head>
  );
}
