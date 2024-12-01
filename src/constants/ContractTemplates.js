export const CONTRACT_TEMPLATES = {
  NFT_MINT: `
module nft_minting::nft {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::url::{Self, Url};
    use std::string::{Self, String};
    use sui::event;

    // Events
    struct NFTMinted has copy, drop {
        creator: address,
        nft_id: ID,
        name: String
    }

    // NFT struct
    struct NFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: Url,
        creator: address
    }

    // Collection struct to manage NFTs
    struct Collection has key {
        id: UID,
        owner: address,
        minted: u64
    }

    // Error codes
    const ENotOwner: u64 = 0;
    const EInvalidMetadata: u64 = 1;

    // Initialize new collection
    public fun create_collection(ctx: &mut TxContext) {
        let collection = Collection {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            minted: 0
        };
        transfer::share_object(collection)
    }

    // Mint new NFT
    public entry fun mint_nft(
        collection: &mut Collection,
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Create new NFT
        let nft = NFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
            creator: sender
        };

        // Emit mint event
        event::emit(NFTMinted {
            creator: sender,
            nft_id: object::uid_to_inner(&nft.id),
            name: nft.name
        });

        collection.minted = collection.minted + 1;
        transfer::transfer(nft, sender)
    }
}`,

  NFT_MARKETPLACE: `
module nft_marketplace::market {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;

    // Events
    struct ListingCreated has copy, drop {
        seller: address,
        nft_id: ID,
        price: u64
    }

    struct NFTSold has copy, drop {
        seller: address,
        buyer: address,
        nft_id: ID,
        price: u64
    }

    // Listing struct
    struct Listing has key {
        id: UID,
        nft_id: ID,
        seller: address,
        price: u64
    }

    // Marketplace struct
    struct Marketplace has key {
        id: UID,
        owner: address,
        fee_percentage: u64,
        total_sales: u64
    }

    // Error codes
    const ENotOwner: u64 = 0;
    const EInvalidPrice: u64 = 1;
    const EInvalidFee: u64 = 2;

    // Initialize marketplace
    public fun initialize(fee_percentage: u64, ctx: &mut TxContext) {
        assert!(fee_percentage <= 1000, EInvalidFee); // Max 10% fee
        
        let marketplace = Marketplace {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            fee_percentage,
            total_sales: 0
        };
        transfer::share_object(marketplace)
    }

    // Create new listing
    public entry fun create_listing(
        marketplace: &mut Marketplace,
        nft_id: ID,
        price: u64,
        ctx: &mut TxContext
    ) {
        assert!(price > 0, EInvalidPrice);
        let sender = tx_context::sender(ctx);
        
        let listing = Listing {
            id: object::new(ctx),
            nft_id,
            seller: sender,
            price
        };

        event::emit(ListingCreated {
            seller: sender,
            nft_id,
            price
        });

        transfer::share_object(listing)
    }

    // Buy NFT
    public entry fun buy_nft(
        marketplace: &mut Marketplace,
        listing: &mut Listing,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let payment_amount = coin::value(&payment);
        assert!(payment_amount >= listing.price, EInvalidPrice);

        let fee_amount = (listing.price * marketplace.fee_percentage) / 10000;
        let seller_amount = listing.price - fee_amount;

        // Transfer payment to seller
        let seller_payment = coin::split(&mut payment, seller_amount, ctx);
        transfer::transfer(seller_payment, listing.seller);

        // Transfer fee to marketplace owner
        let fee_payment = coin::split(&mut payment, fee_amount, ctx);
        transfer::transfer(fee_payment, marketplace.owner);

        // Emit sale event
        event::emit(NFTSold {
            seller: listing.seller,
            buyer: tx_context::sender(ctx),
            nft_id: listing.nft_id,
            price: listing.price
        });

        marketplace.total_sales = marketplace.total_sales + 1;
    }
}`,

  TOKEN_SWAP: `
module token_swap::swap {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use sui::event;

    // Events and other code for token swap...
}`,

  // Add more templates as needed
};

export const getContractTemplate = (description) => {
  const lowercaseDesc = description.toLowerCase();
  
  if (lowercaseDesc.includes('nft') && lowercaseDesc.includes('mint')) {
    return CONTRACT_TEMPLATES.NFT_MINT;
  }
  
  if (lowercaseDesc.includes('marketplace') || 
      (lowercaseDesc.includes('nft') && lowercaseDesc.includes('market'))) {
    return CONTRACT_TEMPLATES.NFT_MARKETPLACE;
  }
  
  if (lowercaseDesc.includes('swap') || lowercaseDesc.includes('exchange')) {
    return CONTRACT_TEMPLATES.TOKEN_SWAP;
  }
  
  // Default to NFT minting if no match
  return CONTRACT_TEMPLATES.NFT_MINT;
}; 