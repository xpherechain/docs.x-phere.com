const sidebars = {
  // learnSidebar: [
  //   'learn/learn',
  //   'learn/learn2',
  //   {
  //     type: 'category',
  //     label: 'Temp',
  //     link: { type: 'doc', id: 'learn/temp/temp' },
  //     items: [
  //       'learn/temp/temp2',
  //     ],
  //   },
  // ],
  refSidebar: [
    "references/references",
    "references/public-en",
    "references/javascript-api",
    "references/json-rpc",
    // {
    //   type: "category",
    //   label: "Petstore",
    //   link: {
    //     type: "generated-index",
    //     title: "Petstore API",
    //     description:
    //       "This is a sample server Petstore server. You can find out more about Swagger at http://swagger.io or on irc.freenode.net, #swagger. For this sample, you can use the api key special-key to test the authorization filters.",
    //     slug: "/category/petstore-api"
    //   },
    //   items: require("./docs/petstore/sidebar.js")
    // },
    // {
    //   type: 'category',
    //   label: 'RPC API Reference',
    //   link: { type: 'doc', id: 'references/json-rpc/references' },
    //   items: [
    //     require('./web3rpc/web3rpc-sidebar').ethSidebarFormatted,
    //     require('./web3rpc/web3rpc-sidebar').netSidebarFormatted,
    //   ],
    // },
  ],

  nodeSidebar: [
    {
      type: "category",
      label: "Xphere-Endpoint-Node",
      items: [
        "nodes/Xphere-Endpoint-Node",
        "nodes/requirements",
        "nodes/Install-XEN-Guide",
        "nodes/json-RPC-APIs",
      ],
    },
    "nodes/Use-Chaindata-Snapshots",
    "nodes/downloads/Downloads",
  ],

  miningSidebar: [
    "mining/mining",
    "mining/requirements",
    "mining/getting-started",
    // "mining/rewards",
  ],
};

module.exports = sidebars;
