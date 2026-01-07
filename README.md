# Unit Pricing Test Page - Split Lease

A React/TypeScript implementation of the Bubble.io z-pricing-unit-test page for the Split Lease application. This page serves as a unit testing environment for pricing calculations, comparing different calculation methods to ensure consistency.

## Purpose

This application compares prices from three different sources of truth:
1. **Listing Schedule Selector** - Plugin-based calculations
2. **Pricing List Structure** - Database-stored values
3. **Direct on-screen formulas** - Manual calculations

## Features

- Listing selection with search functionality
- Reservation parameters (nights, weeks, pattern)
- Prorated nightly rate calculations for all rental types
- Rental type multipliers (Monthly, Weekly, Nightly)
- Markup and discount calculations
- Host prices and guidelines display
- ZAT-Price Configuration display
- Price list comparison table (1-7 nights)
- Workflow vs Formula validation checks
- Data validation flags

## Key Formulas Implemented

### Markup and Discounts Multiplier
```
multiplier = Overall Site Markup + Unit Markup - Unused Nights Discount + 1
```

### Prorated Nightly Rate (Monthly)
```
avg_weekly_price / selected_nights
where avg_weekly_price = monthly_host_rate / avg_days_per_month * 7
```

### Prorated Nightly Rate (Weekly)
```
weekly_host_rate / selected_nights
```

### Listing Nightly Price
```
markup_discount_multiplier * prorated_nightly_rate
```

### 4 Week Rent
```
listing_nightly_price * nights_per_week * 4
```

### Initial Reservation Payment
```
4_week_rent + damage_deposit
```

## Project Structure

```
src/
├── components/           # React UI components
│   ├── ListingSelector.tsx
│   ├── ReservationInputs.tsx
│   ├── ProratedRatesSection.tsx
│   ├── MarkupsSection.tsx
│   ├── HostPricesSection.tsx
│   ├── ZATConfigSection.tsx
│   ├── PriceListTable.tsx
│   ├── WorkflowFormulaChecks.tsx
│   ├── ValidationSection.tsx
│   └── SLUnitSettings.tsx
├── data/
│   └── mockData.ts       # Mock listings and ZAT config
├── services/
│   └── PricingCalculator.ts  # Core pricing calculation engine
├── styles/
│   └── index.css         # All styles
├── types/
│   └── pricing.types.ts  # TypeScript interfaces
├── utils/
│   └── formatters.ts     # Currency/percentage formatters
├── App.tsx               # Main application component
└── main.tsx             # Entry point
```

## Data Types

### Listing
Primary entity containing property information and pricing inputs including:
- Host rates (Monthly, Weekly, Nightly)
- Fee fields (Damage deposit, Cleaning cost)
- Constraint fields (Min/Max nights, weeks, months)
- Availability settings

### PricingList
Pre-calculated pricing structure with arrays for 1-7 nights:
- Nightly prices
- Host compensation
- Unused nights discounts
- Markup multipliers

### ZATPriceConfiguration
Global pricing configuration:
- Overall Site Markup
- Weekly Markup
- Unused Nights Discount Multiplier
- Average Days Per Month
- Full Time (7 Nights) Discount

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Development

The application uses:
- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS** (no external UI library - custom styling)

## Configuration

Mock data can be modified in `src/data/mockData.ts` to test different scenarios.

The `PricingCalculator` class in `src/services/PricingCalculator.ts` contains all pricing formulas and can be extended or modified.

## License

Proprietary - Split Lease

## Context Documentation

See the following files for detailed Bubble page documentation:
- `unit pricing page - design.md` - Visual design and layout
- `unit pricing page - workflows.md` - Workflow logic
- `unit pricing page - data schema and expressions.md` - Data schema and formulas
