# Z-Pricing-Unit-Test Page - Complete Documentation

## Overview

The Z-Pricing-Unit-Test page is a comprehensive unit testing environment for Split Lease's pricing calculations. It serves as a diagnostic tool to compare prices from three different sources of truth:

1. **Listing Schedule Selector** - Plugin-based calculations
2. **Pricing List Structure** - Database-stored values
3. **Direct on-screen formulas** - Manual calculations displayed in real-time

**Live URL**: `https://app.split.lease/version-live/z-pricing-unit-test?debug_mode=true`

---

## Page Layout & Sections

The page is organized into 14 numbered sections, displayed in a structured vertical layout:

### Section 1: Listing Selection
- **Dropdown selector** with search functionality
- Displays listing name, host compensation style, and week pattern
- Format: `[Listing Name] - [Host Comp Style] - [Week Pattern]`
- Example: "Harlem Hideaway Parlor Apartment - Nightly - Every week"

### Section 2: Reservation Parameters - Day Selector
- **Day of Week Selector**: S M T W T F S (Sunday through Saturday)
- Click days to toggle selection (selected days highlighted in blue)
- **Selected Nights Display**: Shows count of selected nights (e.g., "4 nights")
- Affects all prorated calculations throughout the page

### Section 3: Reservation Parameters - Duration
- **Reservation Span (weeks)** dropdown: Options from 6 to 26 weeks
- **Guest Pattern** dropdown: Inherited from listing, options include:
  - Every week
  - Alternating weeks
  - Two weeks on, two weeks off
  - One week on, one week off
  - One week on, three weeks off

### Section 4: Prorated Nightly Rates
Displays calculated rates for all three rental types side-by-side:

| Field | Monthly | Weekly | Nightly |
|-------|---------|--------|---------|
| Host Rate | Monthly rate / avg days | Weekly rate | Nightly rate |
| Avg Weekly Price | Monthly × 7 / 31 | Weekly rate | Nightly × 7 |
| Prorated Nightly | Avg Weekly / Nights | Weekly / Nights | Direct rate |

**Key Formulas**:
```
Monthly Prorated Nightly = (Monthly Host Rate / Avg Days Per Month × 7) / Selected Nights
Weekly Prorated Nightly = Weekly Host Rate / Selected Nights
Nightly Prorated = Nightly Host Rate (direct)
```

### Section 5: Rental Type Multipliers
Shows multipliers applied based on the listing's rental type:

| Rental Type | Base Multiplier | Notes |
|-------------|-----------------|-------|
| Monthly | 1.00 | No additional multiplier |
| Weekly | 1.00 + Weekly Price Adj | Typically 1.00 if adj is 0 |
| Nightly | 1.00 + Overall Site Markup | Typically 1.17 (17% markup) |

### Section 6: Markups and Discounts
Displays the combined markup calculation:

```
Markup Discount Multiplier = Overall Site Markup + Unit Markup - Unused Nights Discount + 1
```

**Components**:
- **Overall Site Markup**: Global percentage (typically 0.17 or 17%)
- **Unit Markup**: Per-listing adjustment (typically 0)
- **Unused Nights Discount**: 3% per unused night
  - 1 unused night = 3% discount
  - 2 unused nights = 6% discount
  - 3 unused nights = 9% discount
  - 4 unused nights = 12% discount
  - 5 unused nights = 15% discount
  - 6 unused nights = 18% discount
  - 7 nights = Full time discount (13%)

### Section 7: Final Pricing Calculations

| Field | Formula | Example (4 nights @ $150 prorated) |
|-------|---------|-----------------------------------|
| Listing Nightly Price | Multiplier × Prorated Nightly | 1.08 × $150 = $162.00 |
| 4 Week Rent | Nightly × Nights × Actual Weeks | $162 × 4 × 2 = $1,296 |
| Initial Reservation Payment | 4 Week Rent + Deposits | $1,296 + $300 = $1,596 |
| Total Reservation Price | Nightly × Nights × Total Actual Weeks | $162 × 4 × 9 = $5,832 |

### Section 8: Host Prices Input
Displays the listing's configured host rates:

- **Host Rate - Monthly**: Monthly compensation amount
- **Host Rate - Weekly**: Weekly compensation amount
- **Nightly Host Rate**: Direct nightly rate
- **2 Night Host Rate** through **5 Night Host Rate**: Per-night rates for short stays
- **Damage Deposit**: Security deposit amount
- **Cleaning Deposit**: Cleaning fee amount

### Section 9: Host Guidelines
Shows recommended/historical pricing guidelines for hosts.

### Section 10: SL Unit Settings
Displays calculated settings for the Split Lease unit:

- **Actual Weeks 4 Weeks**: Weeks the guest actually stays in first 4 weeks (pattern-dependent)
- **Actual Weeks During Reservation Span**: Total weeks guest stays during reservation
- **Weeks in First 4 Weeks**: Standard value (typically 4)
- **Cleaning Deposit**: Cleaning fee
- **Damage Deposit**: Security deposit

### Section 11: Validation Flags
Boolean flags indicating data quality:

| Flag | Description |
|------|-------------|
| Price exists | Listing has valid pricing configured |
| Rental type selected | A rental type (Monthly/Weekly/Nightly) is set |
| Appears in Search | Listing is visible in search results |
| Discounts are positive | All discount values are valid |
| Nightly Pricing All Good | All nightly price points are valid |

### Section 12: ZAT-Price Configuration
Global pricing configuration from the database:

| Setting | Typical Value | Description |
|---------|---------------|-------------|
| Unused nights discount multiplier | 0.03 | 3% per unused night |
| Weekly Price Adj | 0 | Adjustment for weekly rentals |
| Overall Site Markup | 0.17 | 17% platform markup |
| Average days per month | 31 | Used for monthly calculations |
| Full Time (7 Nights) | 0.13 | 13% discount for full-week guests |

### Section 13: Price List Table
Pre-calculated pricing grid for 1-7 nights:

| Nights | Host Compensation | Unused Nights | Unused Nights Discounts | Discounts and Markups Multiplier | Nightly Price |
|--------|-------------------|---------------|------------------------|----------------------------------|---------------|
| 1 | Base rate | 6 | 0.18 | 0.99 | Calculated |
| 2 | Base rate | 5 | 0.15 | 1.02 | Calculated |
| 3 | Base rate | 4 | 0.12 | 1.05 | Calculated |
| 4 | Base rate | 3 | 0.09 | 1.08 | Calculated |
| 5 | Base rate | 2 | 0.06 | 1.11 | Calculated |
| 6 | Base rate | 1 | 0.03 | 1.14 | Calculated |
| 7 | Base rate | 0 | 0.00 | 1.04 | Calculated |

**Action Buttons**:
- **Update Starting Nightly Price**: Triggers `CORE-Find lowest nightly price` workflow
- **Update Price List**: Triggers `CORE-save_pricing_robert` workflow

### Section 14: Workflow vs Formula Checks
Validation comparison section with "Run Checks" button:

| Check | Workflow Value | Formula Value | Match Status |
|-------|----------------|---------------|--------------|
| Markup Discount Multiplier | From plugin | Calculated | Yes/No |
| Prorated Nightly Rate | From plugin | Calculated | Yes/No |
| Listing Nightly Price | From plugin | Calculated | Yes/No |
| 4 Week Rent | From plugin | Calculated | Yes/No |
| Initial Reservation Payment | From plugin | Calculated | Yes/No |

---

## Data Schema

### Listing Entity
```typescript
interface Listing {
  // Identification
  id: string;                    // Unique listing ID
  name: string;                  // Display name
  address: string;               // Property address

  // Pricing Configuration
  rentalType: 'Monthly' | 'Weekly' | 'Nightly';
  monthlyHostRate: number;       // Monthly compensation
  weeklyHostRate: number;        // Weekly compensation
  nightlyHostRate: number;       // Per-night rate
  twoNightHostRate: number;      // 2-night rate
  threeNightHostRate: number;    // 3-night rate
  fourNightHostRate: number;     // 4-night rate
  fiveNightHostRate: number;     // 5-night rate

  // Fees
  damageDeposit: number;         // Security deposit
  cleaningDeposit: number;       // Cleaning fee

  // Availability Settings
  weeksOffered: WeeksOffered;    // Guest pattern
  minNights: number;             // Minimum stay
  maxNights: number;             // Maximum stay

  // Unit Configuration
  unitMarkup: number;            // Per-listing markup adjustment

  // Calculated/Stored Pricing
  pricingList: PricingList;      // Pre-calculated price grid
}
```

### WeeksOffered (Guest Pattern)
```typescript
type WeeksOffered =
  | 'Every week'
  | 'Alternating weeks'
  | 'Two weeks on, two weeks off'
  | 'One week on, one week off'
  | 'One week on, three weeks off';
```

### ZAT-Price Configuration
```typescript
interface ZATPriceConfiguration {
  unusedNightsDiscountMultiplier: number;  // 0.03 (3%)
  weeklyPriceAdj: number;                  // 0
  overallSiteMarkup: number;               // 0.17 (17%)
  avgDaysPerMonth: number;                 // 31
  fullTimeDiscount: number;                // 0.13 (13%)
}
```

### Pricing List Structure
```typescript
interface PricingList {
  nights: number[];              // [1, 2, 3, 4, 5, 6, 7]
  hostCompensation: number[];    // Base rates per night count
  unusedNights: number[];        // [6, 5, 4, 3, 2, 1, 0]
  unusedNightsDiscounts: number[]; // [0.18, 0.15, 0.12, 0.09, 0.06, 0.03, 0]
  discountsAndMarkupsMultiplier: number[]; // Combined multipliers
  nightlyPrice: number[];        // Final guest-facing prices
}
```

---

## Workflows

### 1. Listing Selection Workflow
**Trigger**: User selects listing from dropdown
**Actions**:
1. Load listing data from database
2. Populate all host rate fields
3. Set guest pattern from listing's `weeksOffered`
4. Load associated `PricingList` if exists
5. Recalculate all displayed values

### 2. Day Selection Workflow
**Trigger**: User clicks day buttons (S M T W T F S)
**Actions**:
1. Toggle day selection state
2. Count selected nights
3. Recalculate prorated nightly rates for all rental types
4. Recalculate markup discount multiplier (unused nights changes)
5. Update listing nightly price
6. Update 4 week rent
7. Update initial reservation payment
8. Update total reservation price

### 3. Reservation Span Change Workflow
**Trigger**: User changes reservation span dropdown
**Actions**:
1. Calculate actual weeks based on guest pattern
2. Update total reservation price
3. Recalculate any span-dependent values

### 4. Run Checks Workflow
**Trigger**: User clicks "Run Checks" button
**Actions**:
1. Fetch values from Listing Schedule Selector plugin
2. Calculate values using direct formulas
3. Compare each value pair
4. Display match/mismatch status with checkmarks/X marks

### 5. Update Starting Nightly Price Workflow
**Trigger**: User clicks "Update Starting Nightly Price" button
**Actions**:
1. API call to `CORE-Find lowest nightly price`
2. Calculate minimum viable nightly rate
3. Update listing's base nightly price

### 6. Update Price List Workflow
**Trigger**: User clicks "Update Price List" button
**Actions**:
1. API call to `CORE-save_pricing_robert`
2. Generate new pricing grid for 1-7 nights
3. Save to listing's `PricingList` entity
4. Refresh displayed price table

---

## Calculation Examples

### Example 1: Weekly Rental - 4 Nights Selected

**Listing**: Cozy Private Room in Astoria1
- Host Comp Style: Weekly
- Weekly Host Rate: $600
- Pattern: Two weeks on, two weeks off
- Reservation Span: 17 weeks

**Calculations**:
```
Prorated Nightly Rate = $600 / 4 nights = $150.00

Unused Nights = 7 - 4 = 3
Unused Nights Discount = 3 × 0.03 = 0.09 (9%)

Markup Discount Multiplier = 0.17 + 0 - 0.09 + 1 = 1.08

Listing Nightly Price = 1.08 × $150.00 = $162.00

Actual Weeks (4 weeks) = 2 (due to two-on-two-off pattern)
4 Week Rent = $162.00 × 4 nights × 2 weeks = $1,296.00

Actual Weeks (17 week span) = 9 weeks
Total Reservation Price = $162.00 × 4 nights × 9 weeks = $5,832.00
```

### Example 2: Nightly Rental - 4 Nights Selected

**Listing**: Harlem Hideaway Parlor Apartment
- Host Comp Style: Nightly
- Nightly Host Rate: $283.50
- Pattern: Every week
- Reservation Span: 17 weeks

**Calculations**:
```
Prorated Nightly Rate = $283.50 (direct, no division needed)

Unused Nights = 7 - 4 = 3
Unused Nights Discount = 3 × 0.03 = 0.09 (9%)

For Nightly rentals, additional site markup applies:
Markup Discount Multiplier = 0.17 + 0 - 0.09 + 1 = 1.08
But Nightly type multiplier = 1.17

Final Multiplier = 1.17 (nightly premium overrides)

Listing Nightly Price = 1.17 × $283.50 = $331.70

Actual Weeks (4 weeks) = 4 (every week pattern)
4 Week Rent = $331.70 × 4 nights × 4 weeks = $5,307.12

Actual Weeks (17 week span) = 17 weeks
Total Reservation Price = $331.70 × 4 nights × 17 weeks = $22,555.60
```

---

## Pattern Impact on Actual Weeks

| Pattern | Weeks in 4 | Weeks in 8 | Weeks in 12 | Weeks in 17 |
|---------|------------|------------|-------------|-------------|
| Every week | 4 | 8 | 12 | 17 |
| Alternating weeks | 2 | 4 | 6 | 9 |
| Two on, two off | 2 | 4 | 6 | 9 |
| One on, one off | 2 | 4 | 6 | 9 |
| One on, three off | 1 | 2 | 3 | 5 |

---

## UI/UX Design Notes

### Color Scheme
- **Primary Blue**: #0066CC - Used for selected states, buttons
- **Background**: Light gray (#F5F5F5) for sections
- **Text**: Dark gray for labels, black for values
- **Success**: Green checkmarks for validation passes
- **Error**: Red X marks for validation failures

### Layout Patterns
- Sections use consistent padding and margins
- Labels are left-aligned, values right-aligned in grids
- Action buttons are prominent with blue backgrounds
- Dropdowns have consistent styling with borders
- Day selector uses pill-shaped buttons

### Responsive Considerations
- Price table scrolls horizontally on mobile
- Sections stack vertically
- Day selector wraps appropriately

---

## Validation Rules

1. **Price Exists**: `listing.pricingList !== null && listing.pricingList.nightlyPrice.length > 0`
2. **Rental Type Selected**: `listing.rentalType !== null && listing.rentalType !== ''`
3. **Appears in Search**: `listing.isVisible === true && listing.isActive === true`
4. **Discounts are Positive**: `all(pricingList.unusedNightsDiscounts) >= 0`
5. **Nightly Pricing All Good**: `all(pricingList.nightlyPrice) > 0 && no NaN values`

---

## API Endpoints Referenced

| Workflow | Endpoint | Purpose |
|----------|----------|---------|
| Update Starting Nightly Price | `CORE-Find lowest nightly price` | Calculate minimum viable nightly rate |
| Update Price List | `CORE-save_pricing_robert` | Generate and save 1-7 night pricing grid |
| Run Checks | Internal plugin call | Compare Listing Schedule Selector output |

---

## Debugging Tips

1. **Enable Debug Mode**: Add `?debug_mode=true` to URL
2. **Check Console**: Browser console shows calculation steps
3. **Compare Sources**: Use "Run Checks" to identify discrepancies
4. **Verify ZAT Config**: Ensure global configuration is current
5. **Check Pattern**: Guest pattern significantly affects actual weeks

---

## Version History

| Date | Change |
|------|--------|
| 2025-01-08 | Initial documentation based on live page observation |

