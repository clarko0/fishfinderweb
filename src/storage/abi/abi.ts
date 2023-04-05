export const erc721abi = [
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export const fishfinderabi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_order_ids",
        type: "uint256[]",
      },
    ],
    name: "bulkBuy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_order_id",
        type: "uint256",
      },
    ],
    name: "buyOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "changeFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeWallet",
        type: "address",
      },
    ],
    name: "changeFeeWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "Contract",
        type: "address",
      },
    ],
    name: "getWodPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_feeWallet",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "withdrawWod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_order_id",
        type: "uint256",
      },
    ],
    name: "getOrder",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "token_id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "created_at",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "auction",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "successful",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "closed",
            type: "bool",
          },
          {
            internalType: "uint48",
            name: "price",
            type: "uint48",
          },
          {
            internalType: "uint64",
            name: "lifetime",
            type: "uint64",
          },
          {
            internalType: "bytes3",
            name: "nft_name",
            type: "bytes3",
          },
        ],
        internalType: "struct IMarketplace.Order",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const marketplaceabi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "bet_id",
        type: "uint256",
      },
    ],
    name: "BetClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "bet_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "order_id",
        type: "uint256",
      },
      { indexed: false, internalType: "uint48", name: "price", type: "uint48" },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "BetCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "bet_id",
        type: "uint256",
      },
    ],
    name: "BetSuccessful",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "bet_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "new_price",
        type: "uint48",
      },
    ],
    name: "BetUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "FeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "order_id",
        type: "uint256",
      },
    ],
    name: "OrderClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "order_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "token_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "createdAt",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "bytes3",
        name: "nft_name",
        type: "bytes3",
      },
      { indexed: false, internalType: "bool", name: "auction", type: "bool" },
      { indexed: false, internalType: "uint48", name: "price", type: "uint48" },
      {
        indexed: false,
        internalType: "uint64",
        name: "lifetime",
        type: "uint64",
      },
    ],
    name: "OrderCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "order_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "OrderSuccessful",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ROOT_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "_fee_percent", type: "uint256" },
    ],
    name: "_substractFee",
    outputs: [
      { internalType: "uint256", name: "_fee_amount", type: "uint256" },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes3", name: "_name", type: "bytes3" },
      {
        internalType: "contract IERC721",
        name: "_token_address",
        type: "address",
      },
    ],
    name: "addNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "bets",
    outputs: [
      { internalType: "uint256", name: "orderId", type: "uint256" },
      { internalType: "address", name: "buyer", type: "address" },
      { internalType: "uint48", name: "price", type: "uint48" },
      { internalType: "bool", name: "closed", type: "bool" },
      { internalType: "bool", name: "successful", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_orderId", type: "uint256" }],
    name: "buyOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_orderId", type: "uint256" }],
    name: "buyOrderWithFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_orderId", type: "uint256" }],
    name: "calculate",
    outputs: [
      { internalType: "uint256", name: "_resultPrice", type: "uint256" },
      { internalType: "uint256", name: "_fee", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_orderId", type: "uint256" }],
    name: "closeAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_betId", type: "uint256" }],
    name: "closeBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_orderId", type: "uint256" }],
    name: "closeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_token_id", type: "uint256" },
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "uint256", name: "_lifetime", type: "uint256" },
      { internalType: "bytes3", name: "_nft_name", type: "bytes3" },
    ],
    name: "createAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_token_id", type: "uint256" },
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "bytes3", name: "_nft_name", type: "bytes3" },
    ],
    name: "createOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fee_percent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_orderId", type: "uint256" }],
    name: "finishAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "getBet",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "orderId", type: "uint256" },
          { internalType: "address", name: "buyer", type: "address" },
          { internalType: "uint48", name: "price", type: "uint48" },
          { internalType: "bool", name: "closed", type: "bool" },
          { internalType: "bool", name: "successful", type: "bool" },
        ],
        internalType: "struct MarketplaceAuctions.Bet",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_orderId", type: "uint256" }],
    name: "getBiggestBet",
    outputs: [{ internalType: "uint256", name: "_betId", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMoneyCollector",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_order_id", type: "uint256" }],
    name: "getOrder",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "token_id", type: "uint256" },
          { internalType: "address", name: "seller", type: "address" },
          { internalType: "uint64", name: "createdAt", type: "uint64" },
          { internalType: "bool", name: "auction", type: "bool" },
          { internalType: "bool", name: "exists", type: "bool" },
          { internalType: "bool", name: "successful", type: "bool" },
          { internalType: "bool", name: "closed", type: "bool" },
          { internalType: "uint48", name: "price", type: "uint48" },
          { internalType: "uint64", name: "lifetime", type: "uint64" },
          { internalType: "bytes3", name: "nft_name", type: "bytes3" },
        ],
        internalType: "struct MarketplaceBase.Order",
        name: "order",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOrdersCount",
    outputs: [{ internalType: "uint256", name: "count", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "orders",
    outputs: [
      { internalType: "uint256", name: "token_id", type: "uint256" },
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "uint64", name: "createdAt", type: "uint64" },
      { internalType: "bool", name: "auction", type: "bool" },
      { internalType: "bool", name: "exists", type: "bool" },
      { internalType: "bool", name: "successful", type: "bool" },
      { internalType: "bool", name: "closed", type: "bool" },
      { internalType: "uint48", name: "price", type: "uint48" },
      { internalType: "uint64", name: "lifetime", type: "uint64" },
      { internalType: "bytes3", name: "nft_name", type: "bytes3" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_orderId", type: "uint256" },
      { internalType: "uint256", name: "_price", type: "uint256" },
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes3", name: "_name", type: "bytes3" }],
    name: "removeNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_percent", type: "uint256" }],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_collector", type: "address" }],
    name: "setMoneyCollector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_betId", type: "uint256" },
      { internalType: "uint256", name: "_price", type: "uint256" },
    ],
    name: "updateBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token_contract_address",
        type: "address",
      },
      {
        internalType: "address",
        name: "_roles_contract_address",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const erc20abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];

export const toolabi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "vendor_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "bought",
        type: "uint32",
      },
    ],
    name: "ConsumableBought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "vendor_id",
        type: "uint256",
      },
    ],
    name: "ConsumableVendorClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "vendor_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "repair_amount",
        type: "uint32",
      },
      { indexed: false, internalType: "uint8", name: "rarity", type: "uint8" },
      {
        indexed: false,
        internalType: "uint128",
        name: "price",
        type: "uint128",
      },
      { indexed: false, internalType: "bool", name: "is_closed", type: "bool" },
    ],
    name: "ConsumableVendorCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "vendor_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "repair_amount",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "price",
        type: "uint128",
      },
    ],
    name: "ConsumableVendorUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "vendor_id",
        type: "uint256[]",
      },
    ],
    name: "VendorBatchCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "CONS_VENDOR_MANAGER_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "ROOT_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      { internalType: "uint8", name: "", type: "uint8" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "rarity_to_consumable_vendors",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "vendors",
    outputs: [
      { internalType: "uint32", name: "repair_amount", type: "uint32" },
      { internalType: "uint8", name: "rarity", type: "uint8" },
      { internalType: "uint128", name: "price", type: "uint128" },
      { internalType: "uint32", name: "sold", type: "uint32" },
      { internalType: "bool", name: "is_closed", type: "bool" },
      { internalType: "bool", name: "exists", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "contract IConsumables",
        name: "_cons_contract",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_token_contract",
        type: "address",
      },
      {
        internalType: "contract Repairments",
        name: "_repairments_contract",
        type: "address",
      },
    ],
    name: "setContracts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_cons_contract_address",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token_contract_address",
        type: "address",
      },
      {
        internalType: "address",
        name: "_roles_contract_address",
        type: "address",
      },
      { internalType: "address", name: "_money_receiver", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_vendor_id", type: "uint256" }],
    name: "getVendor",
    outputs: [
      {
        components: [
          { internalType: "uint32", name: "repair_amount", type: "uint32" },
          { internalType: "uint8", name: "rarity", type: "uint8" },
          { internalType: "uint128", name: "price", type: "uint128" },
          { internalType: "uint32", name: "sold", type: "uint32" },
          { internalType: "bool", name: "is_closed", type: "bool" },
          { internalType: "bool", name: "exists", type: "bool" },
        ],
        internalType: "struct ConsumableVendors.Vendor",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getVendorsCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [{ internalType: "uint32[]", name: "_ids", type: "uint32[]" }],
    name: "selectVendorsOptimized",
    outputs: [
      {
        components: [
          { internalType: "uint32", name: "repair_amount", type: "uint32" },
          { internalType: "uint8", name: "rarity", type: "uint8" },
        ],
        internalType: "struct ConsumableVendors.VendorOptimized[]",
        name: "_res",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      { internalType: "address", name: "_money_receiver", type: "address" },
    ],
    name: "setMoneyReceiver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "_repair_amount", type: "uint32" },
      { internalType: "uint8", name: "_rarity", type: "uint8" },
      { internalType: "uint128", name: "_price", type: "uint128" },
    ],
    name: "createVendor",
    outputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_vendor_id", type: "uint256" },
      { internalType: "uint32", name: "_repair_amount", type: "uint32" },
      { internalType: "uint128", name: "_price", type: "uint128" },
    ],
    name: "updateVendor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_vendor_id", type: "uint256" }],
    name: "closeVendor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_vendor_id", type: "uint256" },
      { internalType: "uint8", name: "_amount_to_buy", type: "uint8" },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_vendor_id", type: "uint256" },
      { internalType: "uint32", name: "_amount_to_buy", type: "uint32" },
    ],
    name: "buyV3",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const harborabi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "booty_ids",
        type: "bytes32[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount_fee_transferred",
        type: "uint256",
      },
    ],
    name: "ItemsWithdrawRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "request_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "item_ids",
        type: "uint256[]",
      },
    ],
    name: "ItemsWithdrawed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "booty_ids",
        type: "bytes32[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount_fee_transferred",
        type: "uint256",
      },
    ],
    name: "MaterialsWithdrawRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "request_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "material_ids",
        type: "uint256[]",
      },
    ],
    name: "MaterialsWithdrawed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount_fee_transferred",
        type: "uint256",
      },
    ],
    name: "WodWithdrawRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "request_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WodWithdrawed",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "BAY_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "ROOT_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_roles_contract_address",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_wod_contract",
        type: "address",
      },
      {
        internalType: "contract Items",
        name: "_items_contract",
        type: "address",
      },
      {
        internalType: "contract Materials",
        name: "_materials_contract",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_wod_contract",
        type: "address",
      },
      {
        internalType: "contract Items",
        name: "_items_contract",
        type: "address",
      },
      {
        internalType: "contract Materials",
        name: "_materials_contract",
        type: "address",
      },
    ],
    name: "setContracts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_fee_collector",
        type: "address",
      },
    ],
    name: "setFeeCollector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32[]", name: "_booty_ids", type: "bytes32[]" },
    ],
    name: "requestItemsWithdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      { internalType: "bytes32[]", name: "_booty_ids", type: "bytes32[]" },
    ],
    name: "requestMaterialsWithdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "requestWodWithdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      { internalType: "uint256", name: "_request_id", type: "uint256" },
      { internalType: "address", name: "_to", type: "address" },
      {
        internalType: "uint32[]",
        name: "_item_collection_ids",
        type: "uint32[]",
      },
    ],
    name: "withdrawItems",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_request_id", type: "uint256" },
      { internalType: "address", name: "_to", type: "address" },
      {
        internalType: "uint16[]",
        name: "_material_type_ids",
        type: "uint16[]",
      },
    ],
    name: "withdrawMaterials",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_request_id", type: "uint256" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "withdrawWod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const fishfindertestabi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_order_ids",
        type: "uint256[]",
      },
    ],
    name: "bulkBuy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_order_id",
        type: "uint256",
      },
    ],
    name: "buyOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "changeFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "Contract",
        type: "address",
      },
    ],
    name: "getWodPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawWod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "_feeWallet",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeWallet",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes3",
        name: "id",
        type: "bytes3",
      },
    ],
    name: "getContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_order_id",
        type: "uint256",
      },
    ],
    name: "getOrder",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "token_id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "created_at",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "auction",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "successful",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "closed",
            type: "bool",
          },
          {
            internalType: "uint48",
            name: "price",
            type: "uint48",
          },
          {
            internalType: "uint64",
            name: "lifetime",
            type: "uint64",
          },
          {
            internalType: "bytes3",
            name: "nft_name",
            type: "bytes3",
          },
        ],
        internalType: "struct IMarketplace.Order",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
