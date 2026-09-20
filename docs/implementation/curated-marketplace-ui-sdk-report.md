# Curated Marketplace UI SDK Report

## Components and Types

Added the following shared UI SDK exports:

- `MarketplaceListingCard`
- `MarketplaceCollectionGrid`
- `MarketplacePrice`
- `MarketplaceListing`
- `MarketplaceListingLabels`
- `MarketplaceCollectionEmptyState`
- `MarketplaceCollectionLoadingState`
- `MarketplaceCollectionErrorState`

The components are presentational. The SDK accepts already-loaded marketplace listings and does not fetch from Core.

## Core Fields Consumed

The UI-facing `MarketplaceListing` type matches these Core response fields:

- `listing_id`
- `product_id`
- `store_id`
- `store_name`
- `title`
- `slug`
- `price.amount_minor`
- `price.currency`
- `primary_image_uri`
- `badges`
- `availability`
- `delivered_quantity`

The card visibly renders the listing title, store name, current price, currency, primary image, badges, and availability. The remaining contract fields remain available on the typed listing object for callers to use when resolving links or collection actions.

## Fast Delivery Presentation

`FAST_DELIVERY` is rendered as a caller-localized discovery badge. The SDK does not describe it as a delivery-time SLA. The Core contract's meaning is local availability, so consumers should provide a localized label such as "Local availability" where appropriate.

The SDK does not calculate discounts or infer marketplace recommendations. `offers` and `trending` are not represented as available data in these components.

## Accessibility and Direction

- Cards use stable image and content dimensions so image fallback, loading, and long-title states do not shift grid geometry.
- Missing or failed images render a labeled accessible fallback.
- Href cards use native links; callback-only cards use keyboard-accessible button semantics for Enter and Space.
- Collection results use list/listitem semantics.
- Visible focus treatment comes from the SDK's existing `:focus-visible` token styling.
- Text and labels are caller-provided, allowing Arabic and English localization.
- Layout uses direction-neutral flow and flex properties, so it works with the SDK's existing `dir="rtl"` and `dir="ltr"` system.

## Validation

Focused tests cover:

- Listing title, store, price, and availability
- `FAST_DELIVERY` badge rendering without SLA language
- Missing and failed image fallback
- Long titles
- Empty, loading, and error collection states
- RTL and LTR direction
- Keyboard-accessible href and callback behavior
- Multiple listings
- Listings with no badges
- Out-of-stock listings

Validation commands:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
git diff --check
```
