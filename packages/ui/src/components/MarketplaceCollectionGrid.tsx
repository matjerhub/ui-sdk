import React from 'react';
import { Card } from './Card.js';
import { MarketplaceListingCard } from './MarketplaceListingCard.js';
import { Skeleton } from './Skeleton.js';
import { Grid } from '../layout/Grid.js';
import { EmptyState } from '../states/EmptyState.js';
import { ErrorState } from '../states/ErrorState.js';
import type {
  MarketplaceCollectionEmptyState,
  MarketplaceCollectionErrorState,
  MarketplaceCollectionLoadingState,
  MarketplaceListing,
  MarketplaceListingLabels,
} from '../marketplace/types.js';

export interface MarketplaceCollectionGridProps {
  listings: readonly MarketplaceListing[];
  labels: MarketplaceListingLabels;
  locale?: string;
  isLoading?: boolean;
  loadingState?: MarketplaceCollectionLoadingState;
  emptyState: MarketplaceCollectionEmptyState;
  errorState?: MarketplaceCollectionErrorState;
  onRetry?: () => void;
  getItemHref?: (listing: MarketplaceListing) => string | undefined;
  onItemClick?: (listing: MarketplaceListing) => void;
}

function MarketplaceCollectionSkeleton({ title }: { title?: string }) {
  return (
    <Card
      aria-label={title}
      padding="none"
      style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '380px', overflow: 'hidden' }}
    >
      <Skeleton variant="rectangular" height="180px" style={{ borderRadius: 0 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
        <Skeleton variant="text" width="35%" height="16px" />
        <Skeleton variant="text" width="90%" height="22px" />
        <Skeleton variant="text" width="55%" height="20px" />
        <Skeleton variant="text" width="40%" height="20px" />
      </div>
    </Card>
  );
}

function renderLoadingState(loadingState: MarketplaceCollectionLoadingState | undefined) {
  const skeletonCount = loadingState?.skeletonCount ?? 4;

  return (
    <Grid
      aria-label={loadingState?.title}
      aria-busy="true"
      minColWidth="240px"
      role="status"
      style={{ alignItems: 'stretch' }}
    >
      {Array.from({ length: skeletonCount }, (_, index) => (
        <MarketplaceCollectionSkeleton key={index} title={loadingState?.title} />
      ))}
    </Grid>
  );
}

export const MarketplaceCollectionGrid: React.FC<MarketplaceCollectionGridProps> = ({
  listings,
  labels,
  locale = 'en',
  isLoading = false,
  loadingState,
  emptyState,
  errorState,
  onRetry,
  getItemHref,
  onItemClick,
}) => {
  if (isLoading) {
    return renderLoadingState(loadingState);
  }

  if (errorState) {
    return (
      <ErrorState
        title={errorState.title}
        message={errorState.message}
        actionLabel={errorState.retryLabel}
        onRetry={onRetry}
      />
    );
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        icon={emptyState.icon}
        title={emptyState.title}
        description={emptyState.description}
      />
    );
  }

  return (
    <Grid aria-label={emptyState.title} minColWidth="240px" role="list" style={{ alignItems: 'stretch' }}>
      {listings.map((listing) => (
        <div key={listing.listing_id} role="listitem">
          <MarketplaceListingCard
            listing={listing}
            labels={labels}
            locale={locale}
            href={getItemHref?.(listing)}
            onClick={onItemClick}
          />
        </div>
      ))}
    </Grid>
  );
};
