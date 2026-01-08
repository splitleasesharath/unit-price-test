import { Listing, ZATPriceConfiguration, NumItem } from '../types/pricing.types';

// Helper to create NumItem arrays
const createNumItems = (values: number[]): NumItem[] =>
  values.map((num) => ({ num }));

// Mock ZAT-Price Configuration (Global Settings) - Matches Documentation
export const mockZATConfig: ZATPriceConfiguration = {
  id: 'zat-config-001',
  createdDate: new Date('2025-01-08'),
  overallSiteMarkup: 0.17, // 17% site markup (per documentation)
  weeklyMarkup: 0, // Weekly price adjustment (typically 0)
  unusedNightsDiscountMultiplier: 0.03, // 3% per unused night (per documentation)
  avgDaysPerMonth: 31, // Used for monthly calculations (per documentation)
  fullTime7NightsDiscount: 0.13, // 13% discount for full week stays (per documentation)
  minPricePerNight: 50,
  maxPricePerNight: 500,
  suggestionAdditionalPrice: 10,
  suggestionBedroomsMultiplier: 25,
  suggestionBedsMultiplier: 15,
};

// Mock Listings - Based on Split Lease Documentation Examples
export const mockListings: Listing[] = [
  // Example from documentation: Weekly Rental - Cozy Private Room in Astoria1
  {
    id: 'listing-001',
    name: 'Cozy Private Room in Astoria1',
    modifiedDate: new Date('2025-01-08'),
    numberOfNightsAvailable: 7,
    rentalType: 'Weekly',
    weeksOffered: 'Two weeks on, two weeks off',
    standardizedMinimumNightlyPrice: 150,

    // Host Rates - From documentation example
    monthlyHostRate: 2600, // ~$600/week * 4.3
    weeklyHostRate: 600, // Documentation example: $600 weekly
    nightlyHostRateFor2Nights: 150,
    nightlyHostRateFor3Nights: 150,
    nightlyHostRateFor4Nights: 150,
    nightlyHostRateFor5Nights: 150,

    // Fees
    damageDeposit: 300,
    cleaningCost: 100,
    nightlyUtilities: 0,

    // Overrides
    priceOverride: null,
    unitMarkup: 0, // Documentation: typically 0

    // Constraints
    minimumNights: 2,
    maximumNights: 7,
    minimumWeeks: 6,
    maximumWeeks: 26,
    minimumMonths: 1,
    maximumMonths: 6,

    // Availability
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    daysNotAvailable: [],
    nightsAvailable: [1, 2, 3, 4, 5, 6, 7],
    nightsNotAvailable: [],
    blockedDates: [],
    bookedDates: [],

    // Host info
    hostEmail: 'host1@splitlease.com',
    hostName: 'Host One',

    // Pricing List (pre-calculated with documentation formula)
    pricingList: {
      startingNightlyPrice: 85.71, // $600 / 7 nights
      nightlyPrice: createNumItems([
        85.71 * 0.99,  // 1 night: 0.99 multiplier
        85.71 * 1.02,  // 2 nights: 1.02 multiplier
        85.71 * 1.05,  // 3 nights: 1.05 multiplier
        85.71 * 1.08,  // 4 nights: 1.08 multiplier (from doc example)
        85.71 * 1.11,  // 5 nights: 1.11 multiplier
        85.71 * 1.14,  // 6 nights: 1.14 multiplier
        85.71 * 1.04,  // 7 nights: 1.04 multiplier (full time discount)
      ]),
      hostCompensation: createNumItems([600, 600, 600, 600, 600, 600, 600]),
      combinedMarkup: 0.17,
      overallSiteMarkup: 0.17,
      unitMarkup: 0,
      fullTimeDiscount: 0.13,
      weeklyPriceAdjust: 0,
      unusedNights: createNumItems([6, 5, 4, 3, 2, 1, 0]),
      unusedNightsDiscount: createNumItems([0.18, 0.15, 0.12, 0.09, 0.06, 0.03, 0]),
      markupAndDiscountMultiplier: createNumItems([0.99, 1.02, 1.05, 1.08, 1.11, 1.14, 1.04]),
      numberSelectedNights: [1, 2, 3, 4, 5, 6, 7],
      slope: -5,
    },
  },
  // Example from documentation: Nightly Rental - Harlem Hideaway Parlor Apartment
  {
    id: 'listing-002',
    name: 'Harlem Hideaway Parlor Apartment',
    modifiedDate: new Date('2025-01-08'),
    numberOfNightsAvailable: 7,
    rentalType: 'Nightly',
    weeksOffered: 'Every week',
    standardizedMinimumNightlyPrice: 283.50,

    // Host Rates - From documentation example
    monthlyHostRate: 8500,
    weeklyHostRate: 2000,
    nightlyHostRateFor2Nights: 283.50,
    nightlyHostRateFor3Nights: 283.50,
    nightlyHostRateFor4Nights: 283.50, // Documentation: $283.50 nightly
    nightlyHostRateFor5Nights: 283.50,

    // Fees
    damageDeposit: 500,
    cleaningCost: 150,
    nightlyUtilities: 0,

    // Overrides
    priceOverride: null,
    unitMarkup: 0,

    // Constraints
    minimumNights: 2,
    maximumNights: 7,
    minimumWeeks: 6,
    maximumWeeks: 26,
    minimumMonths: 1,
    maximumMonths: 6,

    // Availability
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    daysNotAvailable: [],
    nightsAvailable: [1, 2, 3, 4, 5, 6, 7],
    nightsNotAvailable: [],
    blockedDates: [],
    bookedDates: [],

    // Host info
    hostEmail: 'host2@splitlease.com',
    hostName: 'Host Two',

    // Pricing List for Nightly rental type
    pricingList: {
      startingNightlyPrice: 283.50,
      nightlyPrice: createNumItems([
        283.50 * 1.17,  // Nightly type uses 1.17 multiplier
        283.50 * 1.17,
        283.50 * 1.17,
        283.50 * 1.17,  // 4 nights: $331.70 (from documentation)
        283.50 * 1.17,
        283.50 * 1.17,
        283.50 * 1.17,
      ]),
      hostCompensation: createNumItems([283.50, 283.50, 283.50, 283.50, 283.50, 283.50, 283.50]),
      combinedMarkup: 0.17,
      overallSiteMarkup: 0.17,
      unitMarkup: 0,
      fullTimeDiscount: 0.13,
      weeklyPriceAdjust: 0,
      unusedNights: createNumItems([6, 5, 4, 3, 2, 1, 0]),
      unusedNightsDiscount: createNumItems([0.18, 0.15, 0.12, 0.09, 0.06, 0.03, 0]),
      markupAndDiscountMultiplier: createNumItems([0.99, 1.02, 1.05, 1.08, 1.11, 1.14, 1.04]),
      numberSelectedNights: [1, 2, 3, 4, 5, 6, 7],
      slope: 0,
    },
  },
  // Monthly Rental Example
  {
    id: 'listing-003',
    name: 'Brooklyn Brownstone Suite',
    modifiedDate: new Date('2025-01-07'),
    numberOfNightsAvailable: 7,
    rentalType: 'Monthly',
    weeksOffered: 'Every week',
    standardizedMinimumNightlyPrice: 100,

    // Host Rates
    monthlyHostRate: 3100, // Monthly rate
    weeklyHostRate: 775, // ~$3100/4
    nightlyHostRateFor2Nights: 110,
    nightlyHostRateFor3Nights: 110,
    nightlyHostRateFor4Nights: 110,
    nightlyHostRateFor5Nights: 110,

    // Fees
    damageDeposit: 400,
    cleaningCost: 125,
    nightlyUtilities: 5,

    // Overrides
    priceOverride: null,
    unitMarkup: 0,

    // Constraints
    minimumNights: 2,
    maximumNights: 7,
    minimumWeeks: 6,
    maximumWeeks: 26,
    minimumMonths: 1,
    maximumMonths: 6,

    // Availability
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    daysNotAvailable: [],
    nightsAvailable: [1, 2, 3, 4, 5, 6, 7],
    nightsNotAvailable: [],
    blockedDates: [],
    bookedDates: [],

    // Host info
    hostEmail: 'host3@splitlease.com',
    hostName: 'Host Three',

    // Pricing List
    pricingList: {
      startingNightlyPrice: 100,
      nightlyPrice: createNumItems([99, 102, 105, 108, 111, 114, 104]),
      hostCompensation: createNumItems([100, 100, 100, 100, 100, 100, 100]),
      combinedMarkup: 0.17,
      overallSiteMarkup: 0.17,
      unitMarkup: 0,
      fullTimeDiscount: 0.13,
      weeklyPriceAdjust: 0,
      unusedNights: createNumItems([6, 5, 4, 3, 2, 1, 0]),
      unusedNightsDiscount: createNumItems([0.18, 0.15, 0.12, 0.09, 0.06, 0.03, 0]),
      markupAndDiscountMultiplier: createNumItems([0.99, 1.02, 1.05, 1.08, 1.11, 1.14, 1.04]),
      numberSelectedNights: [1, 2, 3, 4, 5, 6, 7],
      slope: -3,
    },
  },
  // Alternating weeks pattern example
  {
    id: 'listing-004',
    name: 'Queens Garden Apartment',
    modifiedDate: new Date('2025-01-06'),
    numberOfNightsAvailable: 7,
    rentalType: 'Weekly',
    weeksOffered: 'Alternating weeks',
    standardizedMinimumNightlyPrice: 120,

    // Host Rates
    monthlyHostRate: 3400,
    weeklyHostRate: 850,
    nightlyHostRateFor2Nights: 180,
    nightlyHostRateFor3Nights: 170,
    nightlyHostRateFor4Nights: 160,
    nightlyHostRateFor5Nights: 150,

    // Fees
    damageDeposit: 350,
    cleaningCost: 100,
    nightlyUtilities: 0,

    // Overrides
    priceOverride: null,
    unitMarkup: 0,

    // Constraints
    minimumNights: 2,
    maximumNights: 7,
    minimumWeeks: 6,
    maximumWeeks: 26,
    minimumMonths: 1,
    maximumMonths: 6,

    // Availability
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    daysNotAvailable: [],
    nightsAvailable: [2, 3, 4, 5, 6, 7],
    nightsNotAvailable: [1],
    blockedDates: [],
    bookedDates: [],

    // Host info
    hostEmail: 'host4@splitlease.com',
    hostName: 'Host Four',

    // No pricing list - will calculate on the fly
    pricingList: null,
  },
  // One week on, three weeks off pattern
  {
    id: 'listing-005',
    name: 'Manhattan Studio - Flexible',
    modifiedDate: new Date('2025-01-05'),
    numberOfNightsAvailable: 7,
    rentalType: 'Weekly',
    weeksOffered: 'One week on, three weeks off',
    standardizedMinimumNightlyPrice: 200,

    // Host Rates
    monthlyHostRate: 1400, // Lower because only 1 week per 4
    weeklyHostRate: 1400,
    nightlyHostRateFor2Nights: 250,
    nightlyHostRateFor3Nights: 233,
    nightlyHostRateFor4Nights: 225,
    nightlyHostRateFor5Nights: 215,

    // Fees
    damageDeposit: 500,
    cleaningCost: 150,
    nightlyUtilities: 10,

    // Overrides
    priceOverride: null,
    unitMarkup: 0.05, // 5% unit markup example

    // Constraints
    minimumNights: 2,
    maximumNights: 7,
    minimumWeeks: 8,
    maximumWeeks: 26,
    minimumMonths: 2,
    maximumMonths: 6,

    // Availability
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    daysNotAvailable: [],
    nightsAvailable: [2, 3, 4, 5, 6, 7],
    nightsNotAvailable: [1],
    blockedDates: [],
    bookedDates: [],

    // Host info
    hostEmail: 'host5@splitlease.com',
    hostName: 'Host Five',

    // Pricing List
    pricingList: null, // Calculate on the fly
  },
];

// Helper function to search listings (mimics Bubble search)
export function searchListings(options?: {
  pricingListNotEmpty?: boolean;
  rentalTypeNotEmpty?: boolean;
  searchQuery?: string;
}): Listing[] {
  let results = [...mockListings];

  if (options?.pricingListNotEmpty) {
    results = results.filter((l) => l.pricingList !== null);
  }

  if (options?.rentalTypeNotEmpty) {
    results = results.filter((l) => !!l.rentalType);
  }

  if (options?.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    results = results.filter(
      (l) =>
        l.name.toLowerCase().includes(query) ||
        l.id.toLowerCase().includes(query) ||
        l.hostEmail?.toLowerCase().includes(query) ||
        l.hostName?.toLowerCase().includes(query)
    );
  }

  // Sort by modified date descending
  results.sort((a, b) => b.modifiedDate.getTime() - a.modifiedDate.getTime());

  return results;
}

// Get ZAT config (simulates :last item behavior)
export function getLatestZATConfig(): ZATPriceConfiguration {
  return mockZATConfig;
}

export default mockListings;
