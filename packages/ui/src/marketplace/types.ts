import React from 'react';

export interface MarketplacePrice {
  amount_minor: number;
  currency: string;
}

export interface MarketplaceListing {
  listing_id: string;
  product_id: string;
  store_id: string;
  store_name: string;
  title: string;
  slug: string;
  price: MarketplacePrice;
  primary_image_uri: string;
  badges: string[];
  availability: string;
  delivered_quantity: number;
}

export interface MarketplaceListingLabels {
  availabilityLabel: string;
  availability: Record<string, string>;
  badges: Record<string, string>;
  missingImage: string;
}

export interface MarketplaceCollectionEmptyState {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface MarketplaceCollectionLoadingState {
  title?: string;
  skeletonCount?: number;
}

export interface MarketplaceCollectionErrorState {
  title: string;
  message: string;
  retryLabel?: string;
}
