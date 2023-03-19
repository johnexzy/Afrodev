---
title: 'Deploying one contract address across chains: A practical guide'
featured_image: "/public/deploying-one-contract-address-across-chains.png"
draft: true
excerpt: A practical guide to deploying a contract with identical contract-address
  on different chains
author: John Oba - Afrodev
date: March 19, 2023
read_time: 5 min

---
While dabbling with dApps and smart contracts, you may have noticed some contracts with the same  addresses across testnets and mainnets. It provides a good developer experience for developers building with your smart contracts. A clean example is [Uniswap router](https://docs.uniswap.org/protocol/V2/reference/smart-contracts/router-02) smart contract. 

[![uniswap router](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Ffbc3eeae-55b4-4ec3-ac94-843cea9a183b_1872x154.png "uniswap")](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02 "uniswap router")