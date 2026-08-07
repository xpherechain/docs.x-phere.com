import React from "react";
import clsx from "clsx";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

interface Destination {
  to: string;
  title: string;
  blurb: string;
}

/**
 * Where a reader who hit a dead URL most likely wanted to go. Ordered by how
 * often each one is the answer, not alphabetically.
 */
const DESTINATIONS: Destination[] = [
  {
    to: "/references/network-info",
    title: "Network Information",
    blurb: "Chain IDs, RPC endpoints, explorers, and wallet configuration",
  },
  {
    to: "/references/public-en",
    title: "Public JSON-RPC Endpoints",
    blurb: "Foundation and third-party endpoints, with namespaces and limits",
  },
  {
    to: "/developers/quickstart",
    title: "Developer Quickstart",
    blurb: "Deploy and verify a contract on XPHERE",
  },
  {
    to: "/nodes",
    title: "Run a Node",
    blurb: "Endpoint node setup, snapshots, and CLI reference",
  },
];

interface NotFoundContentProps {
  className?: string;
}

export default function NotFoundContent({
  className,
}: NotFoundContentProps): React.ReactElement {
  // Rendered during the static build too, where there is no window.
  const path =
    typeof window !== "undefined" ? window.location.pathname : undefined;

  return (
    <main className={clsx("container margin-vert--lg", className)}>
      {/*
        Every dead URL renders this page with a canonical pointing at /404.html.
        Without noindex those URLs are eligible for the index, which puts an
        error page in front of people searching for the real one.
      */}
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className={styles.wrap}>
        <p className={styles.code}>404</p>

        <Heading as="h1" className={styles.title}>
          This page does not exist
        </Heading>

        {path ? (
          <p className={styles.path}>
            <code>{path}</code>
          </p>
        ) : null}

        <p className={styles.lede}>
          The page may have been renamed, or the link that brought you here may
          be out of date. <Link to="/search">Search the documentation</Link> if
          you know what you are after — otherwise these are the pages people
          reach for most often.
        </p>

        <nav className={styles.grid} aria-label="Popular pages">
          {DESTINATIONS.map((d) => (
            <Link key={d.to} to={d.to} className={styles.card}>
              <span className={styles.cardTitle}>{d.title}</span>
              <span className={styles.cardBlurb}>{d.blurb}</span>
            </Link>
          ))}
        </nav>

        <p className={styles.footer}>
          Still stuck? <Link to="/">Start from the documentation home</Link>, or{" "}
          <Link href="https://github.com/xpherechain/docs.x-phere.com/issues/new">
            tell us which link was broken
          </Link>{" "}
          so we can fix it.
        </p>
      </div>
    </main>
  );
}
