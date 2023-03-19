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

In this article, we will deploy a smart contract across evm chains using Remix IDE.

> Remix IDE, is **a no-setup tool with a GUI for developing smart contracts**.

## How are contract addresses generated?

A contract address is derived from these three main components.

* Deployer’s address
* Deployer’s nonce
* Contract's bytecode

This ensures that a smart contract deployed to the network has a unique address.

For a contract address to remain the same across the target EVM chains, the contract must be deployed with the same wallet address, the wallet's nonce is equivalent on each network, and the contract’s bytecode remains the same.

### What Is a Nonce?

This is **the (sequential) number of transactions sent from a given address**. In English, a nonce is a number that can only be used once. It helps to keep transactions and transaction ids unique.

## Let’s go down the rabbit hole

A very quick way to play around with this convention is to use [remix](https://remix.ethereum.org/). Here's a simple Storage contract, we'll be deploying using to a remix vm.

    // SPDX-License-Identifier: GPL-3.0
    
    pragma solidity >=0.8.2 <0.9.0;
    
    /**
     * @title Storage
     * @dev Store & retrieve value in a variable
     */
    contract Storage {
    
        uint256 number;
    
        /**
         * @dev Store value in variable
         * @param num value to store
         */
        function store(uint256 num) public {
            number = num;
        }
    
        /**
         * @dev Return value 
         * @return value of 'number'
         */
        function retrieve() public view returns (uint256){
            return number;
        }
    }

We will utilize a single virtual account within the Remix IDE to deploy the contract onto two EVM virtual networks, the Remix VM (London) and Remix VM (Berlin).

w [remix](https://remix.ethereum.org/) IDE. 