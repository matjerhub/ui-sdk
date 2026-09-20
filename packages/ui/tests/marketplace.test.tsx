import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  MarketplaceCollectionGrid,
  MarketplaceListingCard,
  type MarketplaceListing,
  type MarketplaceListingLabels,
} from '../src/index.js';

const labels: MarketplaceListingLabels = {
  availabilityLabel: 'Availability',
  availability: {
    IN_STOCK: 'In stock',
    OUT_OF_STOCK: 'Out of stock',
  },
  badges: {
    FAST_DELIVERY: 'Local availability',
  },
  missingImage: 'Product image unavailable',
};

const listing: MarketplaceListing = {
  listing_id: 'listing-1',
  product_id: 'product-1',
  store_id: 'store-1',
  store_name: 'Cairo Workshop',
  title: 'Handmade serving tray',
  slug: 'handmade-serving-tray',
  price: {
    amount_minor: 150000,
    currency: 'EGP',
  },
  primary_image_uri: 'https://example.com/tray.jpg',
  badges: ['FAST_DELIVERY'],
  availability: 'IN_STOCK',
  delivered_quantity: 0,
};

function renderGrid(overrides: Partial<React.ComponentProps<typeof MarketplaceCollectionGrid>> = {}) {
  return render(
    <MarketplaceCollectionGrid
      listings={[listing]}
      labels={labels}
      emptyState={{ title: 'No products', description: 'No products are available.' }}
      {...overrides}
    />
  );
}

describe('MarketplaceListingCard', () => {
  it('renders the listing title, store, current price, and availability', () => {
    render(<MarketplaceListingCard listing={listing} labels={labels} locale="en-US" />);

    expect(screen.getByRole('heading', { name: listing.title })).toBeInTheDocument();
    expect(screen.getByText(listing.store_name)).toBeInTheDocument();
    expect(screen.getByText(/EGP\s*1,500\.00/)).toBeInTheDocument();
    expect(screen.getByText('In stock')).toBeInTheDocument();
  });

  it('renders fast delivery as a local availability badge without SLA language', () => {
    render(<MarketplaceListingCard listing={listing} labels={labels} />);

    expect(screen.getByText('Local availability')).toBeInTheDocument();
    expect(screen.queryByText(/sla|delivery time|minutes|hours/i)).not.toBeInTheDocument();
  });

  it('renders an accessible fallback when the image URI is missing or fails', () => {
    const missingImageListing = { ...listing, primary_image_uri: '' };
    const { rerender } = render(<MarketplaceListingCard listing={missingImageListing} labels={labels} />);

    expect(screen.getByRole('img', { name: labels.missingImage })).toBeInTheDocument();

    rerender(<MarketplaceListingCard listing={listing} labels={labels} />);
    fireEvent.error(screen.getByRole('img', { name: listing.title }));

    expect(screen.getByRole('img', { name: labels.missingImage })).toBeInTheDocument();
  });

  it('keeps the title area stable for long titles', () => {
    const longTitleListing = {
      ...listing,
      title: 'A very long product title that should remain readable without changing the card grid geometry',
    };
    render(<MarketplaceListingCard listing={longTitleListing} labels={labels} />);

    expect(screen.getByRole('heading', { name: longTitleListing.title })).toHaveStyle({ minHeight: '45px' });
  });

  it('supports href navigation and callback activation from the keyboard', () => {
    const onClick = vi.fn();
    render(<MarketplaceListingCard listing={listing} labels={labels} href="/products/tray" onClick={onClick} />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(link).toHaveAttribute('href', '/products/tray');
    expect(onClick).toHaveBeenCalledWith(listing);

    render(<MarketplaceListingCard listing={listing} labels={labels} onClick={onClick} />);
    const button = screen.getAllByRole('button')[0];
    fireEvent.keyDown(button, { key: 'Enter' });

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});

describe('MarketplaceCollectionGrid', () => {
  it('renders multiple listings as an accessible list', () => {
    const secondListing = { ...listing, listing_id: 'listing-2', title: 'Woven basket', badges: [] };
    renderGrid({ listings: [listing, secondListing] });

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: secondListing.title })).toBeInTheDocument();
  });

  it('renders an empty collection state', () => {
    renderGrid({ listings: [] });
    expect(screen.getByRole('heading', { name: 'No products' })).toBeInTheDocument();
  });

  it('renders a loading collection state', () => {
    render(
      <MarketplaceCollectionGrid
        listings={[]}
        labels={labels}
        isLoading
        loadingState={{ title: 'Loading products', skeletonCount: 2 }}
        emptyState={{ title: 'No products', description: 'No products are available.' }}
      />
    );
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status').querySelectorAll('[aria-label="Loading products"]')).toHaveLength(2);
  });

  it('renders an error collection state and retries', () => {
    const onRetry = vi.fn();
    render(
      <MarketplaceCollectionGrid
        listings={[]}
        labels={labels}
        errorState={{ title: 'Could not load products', message: 'Please try again.', retryLabel: 'Retry' }}
        onRetry={onRetry}
        emptyState={{ title: 'No products', description: 'No products are available.' }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(screen.getByRole('heading', { name: 'Could not load products' })).toBeInTheDocument();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders an out-of-stock listing without badges in RTL', () => {
    const outOfStockListing = {
      ...listing,
      listing_id: 'listing-2',
      badges: [],
      availability: 'OUT_OF_STOCK',
    };
    const { rerender } = render(
      <div dir="rtl">
        <MarketplaceListingCard listing={outOfStockListing} labels={labels} />
      </div>
    );

    expect(screen.getByText('Out of stock')).toBeInTheDocument();
    expect(screen.queryByText('Local availability')).not.toBeInTheDocument();
    expect(screen.getByText(outOfStockListing.title).closest('[dir="rtl"]')).toBeInTheDocument();
  });

  it('supports LTR direction', () => {
    render(
      <div dir="ltr">
        <MarketplaceListingCard listing={listing} labels={labels} />
      </div>
    );

    expect(screen.getByText(listing.title).closest('[dir="ltr"]')).toBeInTheDocument();
  });
});
