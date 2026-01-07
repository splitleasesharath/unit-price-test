// Rental Type Option Set
export type RentalType = 'Monthly' | 'Weekly' | 'Nightly';

// Weekly Selection Options
export type WeeksOffered = 'Every week' | 'Alternating weeks' | 'First and third' | 'Second and fourth';

// Days of week
export type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

// Num wrapper (used in Bubble for list items)
export interface NumItem {
  num: number;
}

// Pricing List Structure - Pre-calculated pricing data stored on each Listing
export interface PricingList {
  startingNightlyPrice: number;
  nightlyPrice: NumItem[];           // Prices for 1-7 nights
  hostCompensation: NumItem[];       // Host payment amounts for 1-7 nights
  combinedMarkup: number;            // Total markup percentage
  overallSiteMarkup: number;         // Site-wide markup
  unitMarkup: number;                // Listing-specific markup
  fullTimeDiscount: number;          // Discount for 7-night stays
  weeklyPriceAdjust: number;         // Weekly rate adjustment
  unusedNights: NumItem[];           // Unused nights for each stay length
  unusedNightsDiscount: NumItem[];   // Discounts for unused nights
  markupAndDiscountMultiplier: NumItem[]; // Combined multipliers
  numberSelectedNights: number[];    // Night counts
  slope: number;                     // Price curve slope
}

// Listing Data Type - Primary entity containing property information
export interface Listing {
  id: string;
  name: string;
  modifiedDate: Date;

  // Availability
  numberOfNightsAvailable: number;   // Default: 7
  rentalType: RentalType;
  weeksOffered: WeeksOffered;
  pricingList: PricingList | null;
  standardizedMinimumNightlyPrice: number;

  // Host Rate Fields
  monthlyHostRate: number;
  weeklyHostRate: number;
  nightlyHostRateFor2Nights: number;
  nightlyHostRateFor3Nights: number;
  nightlyHostRateFor4Nights: number;
  nightlyHostRateFor5Nights: number;

  // Fee Fields
  damageDeposit: number;             // Default: 0
  cleaningCost: number;              // Default: 0
  nightlyUtilities: number;

  // Override Fields
  priceOverride: number | null;
  unitMarkup: number;                // Default: 0

  // Constraint Fields
  minimumNights: number;             // Default: 2
  maximumNights: number;
  minimumWeeks: number;              // Default: 6
  maximumWeeks: number;              // Default: 26
  minimumMonths: number;
  maximumMonths: number;

  // Availability Lists
  daysAvailable: DayOfWeek[];
  daysNotAvailable: DayOfWeek[];
  nightsAvailable: number[];
  nightsNotAvailable: number[];
  blockedDates: Date[];
  bookedDates: Date[];

  // Host info (for search)
  hostEmail?: string;
  hostName?: string;
}

// ZAT-Price Configuration - Global pricing configuration settings
export interface ZATPriceConfiguration {
  id: string;
  createdDate: Date;
  overallSiteMarkup: number;         // Site-wide markup percentage
  weeklyMarkup: number;              // Adjustment for weekly rentals
  unusedNightsDiscountMultiplier: number;  // Global unused nights discount
  avgDaysPerMonth: number;           // Used for monthly rate calculations
  fullTime7NightsDiscount: number;   // Discount for full-week stays
  minPricePerNight: number;          // Minimum allowed nightly price
  maxPricePerNight: number;          // Maximum allowed nightly price
  suggestionAdditionalPrice?: number;
  suggestionBedroomsMultiplier?: number;
  suggestionBedsMultiplier?: number;
}

// Listing Schedule Selector outputs
export interface ListingScheduleSelectorOutput {
  // Selection Data
  selectedDays: DayOfWeek[];
  selectedDaysCount: number;
  selectedNights: number;
  nightsNumber: number;

  // Calculated Rates
  proratedNightlyHostRateWeekly: number;
  proratedNightlyHostRateMonthly: number;
  selectedHostRateNightlyModel: number;
  priceMultiplierMonthly: number;
  priceMultiplierWeekly: number;
  priceMultiplierNightly: number;

  // Discount Calculations
  unusedNights: number;
  unusedNightsDiscount: number;
  unusedNightsDiscountRate: number;
  nightlyDiscountRateWeeklyModel: number;

  // Time Period Calculations
  reservationSpanWeeks: number;
  numberOfMonthsInReservationSpan: number;
  actualWeeksDuringReservationSpan: number;
  actualWeeksDuring4Week: number;
  guestDesiredPattern: string;

  // Payment Calculations
  initialReservationPayment: number;
  fourWeekRent: number;
  totalReservationPrice: number;
  listingNightlyPrice: number;
}

// Comparison result for validation
export interface PriceComparisonResult {
  workflowValue: number;
  formulaValue: number;
  matches: boolean;
  difference: number;
}

// Data Validation Flags
export interface ValidationFlags {
  priceExists: boolean;
  rentalTypeSelected: boolean;
  appearsInSearch: boolean;
  discountsArePositive: boolean;
  unusedNightsDiscountNotDecreasing: boolean;
  minMaxNightsMakesSense: boolean;
  nightlyPricingAllGood: boolean;
  allGood: boolean;
}
