const sidebars = {
  refSidebar: [
    "references/references",
    "references/network-info",
    "references/public-en",
    "references/javascript-api",
    "references/json-rpc",
    "references/xphere-rpc",
    "references/explorer-api",
  ],

  nodeSidebar: [
    "nodes/index",
    {
      type: "category",
      label: "Endpoint Node",
      items: [
        "nodes/Xphere-Endpoint-Node",
        "nodes/requirements",
        "nodes/Install-XEN-Guide",
        "nodes/xen-cli-commands",
        "nodes/json-RPC-APIs",
        "nodes/Use-Chaindata-Snapshots",
      ],
    },
    "nodes/validator-node",
    "nodes/downloads/Downloads",
  ],

  miningSidebar: [
    "mining/mining",
    "mining/requirements",
    "mining/getting-started",
    "mining/rewards",
    "mining/xphash-fork",
  ],

  stakingSidebar: [
    "staking/overview",
    "staking/how-it-works",
    "staking/user-guide",
    "staking/fees-and-risks",
    "staking/for-partners",
    "staking/contracts",
    "staking/faq",
  ],

  unionSidebar: ["union/index", "union/members"],

  ecosystemSidebar: ["ecosystem/grants", "ecosystem/directory"],

  faucetSidebar: ["faucet/faucet"],

  developersSidebar: [
    "developers/quickstart",
    "developers/wallet-setup",
    "developers/smart-contracts",
    "developers/token-standards",
    "developers/evm-compatibility",
  ],

  resourcesSidebar: [
    "resources/faq",
    "resources/glossary",
    "resources/staking",
    "resources/tokenomics",
    "resources/governance",
    "resources/security",
    "resources/network-upgrades",
    "resources/bridge",
  ],
};

module.exports = sidebars;
