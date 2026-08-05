import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="XPHERE Documentation"
      description="Official documentation for XPHERE — an EVM-compatible Layer 1 with a dual-chain architecture: a PBFT Main Chain for fast finality and an xpHash Proof-of-Work Proof Chain.">
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
