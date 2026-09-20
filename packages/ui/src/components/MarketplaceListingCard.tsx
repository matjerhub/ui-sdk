import React, { useState } from 'react';
import { Badge } from './Badge.js';
import { Card } from './Card.js';
import type { MarketplaceListing, MarketplaceListingLabels, MarketplacePrice } from '../marketplace/types.js';

export interface MarketplaceListingCardProps {
  listing: MarketplaceListing;
  labels: MarketplaceListingLabels;
  locale?: string;
  href?: string;
  onClick?: (listing: MarketplaceListing) => void;
  formatPrice?: (price: MarketplacePrice, locale: string) => React.ReactNode;
}

function formatMarketplacePrice(price: MarketplacePrice, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: price.currency,
  }).format(price.amount_minor / 100);
}

function getBadgeLabel(badge: string, labels: MarketplaceListingLabels): string {
  return labels.badges[badge] ?? badge;
}

function getAvailabilityLabel(availability: string, labels: MarketplaceListingLabels): string {
  return labels.availability[availability] ?? availability;
}

const marketplaceImageFallbackStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: 'var(--color-muted)',
  color: 'var(--color-muted-foreground)',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',
};

function MarketplaceImageFallback({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} style={marketplaceImageFallbackStyle}>
      {label}
    </div>
  );
}

function MarketplaceImage({ listing, missingImageLabel }: { listing: MarketplaceListing; missingImageLabel: string }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!listing.primary_image_uri || imageFailed) {
    return <MarketplaceImageFallback label={missingImageLabel} />;
  }

  return (
    <img
      src={listing.primary_image_uri}
      alt={listing.title}
      onError={() => setImageFailed(true)}
      style={{ height: '100%', objectFit: 'cover', width: '100%' }}
    />
  );
}

function MarketplaceListingPrice({
  listing,
  labels,
  locale,
  formatPrice,
}: {
  listing: MarketplaceListing;
  labels: MarketplaceListingLabels;
  locale: string;
  formatPrice?: (price: MarketplacePrice, locale: string) => React.ReactNode;
}) {
  const priceLabel = formatPrice
    ? formatPrice(listing.price, locale)
    : formatMarketplacePrice(listing.price, locale);

  return (
    <div
      aria-label={`${labels.availabilityLabel}: ${getAvailabilityLabel(listing.availability, labels)}`}
      style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '24px' }}
    >
      <span style={{ color: 'var(--color-primary)', fontSize: '18px', fontWeight: 700 }}>{priceLabel}</span>
      <span style={{ color: 'var(--color-muted-foreground)', fontSize: '13px' }}>
        {getAvailabilityLabel(listing.availability, labels)}
      </span>
    </div>
  );
}

function MarketplaceListingBadges({
  badges,
  labels,
}: {
  badges: string[];
  labels: MarketplaceListingLabels;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', minHeight: '24px' }}>
      {badges.map((badge) => (
        <Badge key={badge} variant={badge === 'FAST_DELIVERY' ? 'success' : 'outline'} size="sm">
          {getBadgeLabel(badge, labels)}
        </Badge>
      ))}
    </div>
  );
}

function MarketplaceListingDetails({
  listing,
  labels,
  locale,
  formatPrice,
}: {
  listing: MarketplaceListing;
  labels: MarketplaceListingLabels;
  locale: string;
  formatPrice?: (price: MarketplacePrice, locale: string) => React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px' }}>
      <div style={{ color: 'var(--color-muted-foreground)', fontSize: '13px', minHeight: '20px' }}>
        {listing.store_name}
      </div>
      <h3
        style={{
          color: 'var(--color-foreground)',
          display: '-webkit-box',
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: 1.4,
          margin: 0,
          minHeight: '45px',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
        }}
      >
        {listing.title}
      </h3>
      <MarketplaceListingPrice listing={listing} labels={labels} locale={locale} formatPrice={formatPrice} />
      <MarketplaceListingBadges badges={listing.badges} labels={labels} />
    </div>
  );
}

function MarketplaceListingContent({
  listing,
  labels,
  locale,
  formatPrice,
}: {
  listing: MarketplaceListing;
  labels: MarketplaceListingLabels;
  locale: string;
  formatPrice?: (price: MarketplacePrice, locale: string) => React.ReactNode;
}) {
  return (
    <>
      <div style={{ backgroundColor: 'var(--color-muted)', height: '180px', overflow: 'hidden', width: '100%' }}>
        <MarketplaceImage listing={listing} missingImageLabel={labels.missingImage} />
      </div>
      <MarketplaceListingDetails
        listing={listing}
        labels={labels}
        locale={locale}
        formatPrice={formatPrice}
      />
    </>
  );
}

export const MarketplaceListingCard: React.FC<MarketplaceListingCardProps> = ({
  listing,
  labels,
  locale = 'en',
  href,
  onClick,
  formatPrice,
}) => {
  const content = (
    <Card
      className="matjer-marketplace-listing-card"
      hover
      padding="none"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '380px',
        overflow: 'hidden',
      }}
    >
      <MarketplaceListingContent
        listing={listing}
        labels={labels}
        locale={locale}
        formatPrice={formatPrice}
      />
    </Card>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={() => onClick?.(listing)}
        style={{ color: 'inherit', display: 'block', height: '100%', textDecoration: 'none' }}
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onClick(listing)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick(listing);
          }
        }}
        style={{ height: '100%' }}
      >
        {content}
      </div>
    );
  }

  return content;
};
