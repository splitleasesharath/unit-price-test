import { Listing, ZATPriceConfiguration, NumItem } from '../types/pricing.types';

// Helper to create NumItem arrays
const createNumItems = (values: number[]): NumItem[] =>
  values.map((num) => ({ num }));

// Mock ZAT-Price Configuration (Global Settings)
export const mockZATConfig: ZATPriceConfiguration = {
  id: 'zat-config-001',
  createdDate: new Date('2024-01-01'),
  overallSiteMarkup: 0.15, // 15% site markup
  weeklyMarkup: 0.05, // 5% weekly adjustment
  unusedNightsDiscountMultiplier: 0.02, // 2% per unused night
  avgDaysPerMonth: 30.5,
  fullTime7NightsDiscount: 0.10, // 10% discount for full week
  minPricePerNight: 50,
  maxPricePerNight: 500,
  suggestionAdditionalPrice: 10,
  suggestionBedroomsMultiplier: 25,
  suggestionBedsMultiplier: 15,
};

// Mock Listings
export const mockListings: Listing[] = [
  {
    id: 'listing-001',
    name: 'Downtown Luxury Apartment',
    modifiedDate: new Date('2024-12-15'),
    numberOfNightsAvailable: 7,
    rentalType: 'Monthly',
    weeksOffered: 'Every week',
    standardizedMinimumNightlyPrice: 120,

    // Host Rates
    monthlyHostRate: 3500,
    weeklyHostRate: 900,
    nightlyHostRateFor2Nights: 200,
    nightlyHostRateFor3Nights: 280,
    nightlyHostRateFor4Nights: 360,
    nightlyHostRateFor5Nights: 440,

    // Fees
    damageDeposit: 500,
    cleaningCost: 150,
    nightlyUtilities: 10,

    // Overrides
    priceOverride: null,
    unitMarkup: 0.05, // 5% unit markup

    // Constraints
    minimumNights: 2,
    maximumNights: 7,
    minimumWeeks: 4,
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
    hostEmail: 'host1@example.com',
    hostName: 'John Smith',

    // Pricing List (pre-calculated)
    pricingList: {
      startingNightlyPrice: 115,
      nightlyPrice: createNumItems([150, 145, 140, 135, 130, 125, 120]),
      hostCompensation: createNumItems([115, 230, 345, 460, 575, 690, 805]),
      combinedMarkup: 0.20,
      overallSiteMarkup: 0.15,
      unitMarkup: 0.05,
      fullTimeDiscount: 0.10,
      weeklyPriceAdjust: 0.05,
      unusedNights: createNumItems([6, 5, 4, 3, 2, 1, 0]),
      unusedNightsDiscount: createNumItems([0.12, 0.10, 0.08, 0.06, 0.04, 0.02, 0]),
      markupAndDiscountMultiplier: createNumItems([1.08, 1.10, 1.12, 1.14, 1.16, 1.18, 1.20]),
      numberSelectedNights: [1, 2, 3, 4, 5, 6, 7],
      slope: -5,
    },
  },
  {
    id: 'listing-002',
    name: 'Cozy Studio Near Beach',
    modifiedDate: new Date('2024-12-10'),
    numberOfNightsAvailable: 5,
    rentalType: 'Weekly',
    weeksOffered: 'Alternating weeks',
    standardizedMinimumNightlyPrice: 80,

    // Host Rates
    monthlyHostRate: 2200,
    weeklyHostRate: 600,
    nightlyHostRateFor2Nights: 140,
    nightlyHostRateFor3Nights: 195,
    nightlyHostRateFor4Nights: 260,
    nightlyHostRateFor5Nights: 320,

    // Fees
    damageDeposit: 300,
    cleaningCost: 100,
    nightlyUtilities: 8,

    // Overrides
    priceOverride: null,
    unitMarkup: 0.03,

    // Constraints
    minimumNights: 3,
    maximumNights: 5,
    minimumWeeks: 6,
    maximumWeeks: 20,
    minimumMonths: 2,
    maximumMonths: 5,

    // Availability
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    daysNotAvailable: ['Saturday', 'Sunday'],
    nightsAvailable: [3, 4, 5],
    nightsNotAvailable: [1, 2, 6, 7],
    blockedDates: [],
    bookedDates: [],

    // Host info
    hostEmail: 'host2@example.com',
    hostName: 'Jane Doe',

    // Pricing List
    pricingList: {
      startingNightlyPrice: 85,
      nightlyPrice: createNumItems([110, 105, 100, 95, 90, 88, 85]),
      hostCompensation: createNumItems([80, 160, 240, 320, 400, 480, 560]),
      combinedMarkup: 0.18,
      overallSiteMarkup: 0.15,
      unitMarkup: 0.03,
      fullTimeDiscount: 0.10,
      weeklyPriceAdjust: 0.05,
      unusedNights: createNumItems([6, 5, 4, 3, 2, 1, 0]),
      unusedNightsDiscount: createNumItems([0.12, 0.10, 0.08, 0.06, 0.04, 0.02, 0]),
      markupAndDiscountMultiplier: createNumItems([1.06, 1.08, 1.10, 1.12, 1.14, 1.16, 1.18]),
      numberSelectedNights: [1, 2, 3, 4, 5, 6, 7],
      slope: -3.5,
    },
  },
  {
    id: 'listing-003',
    name: 'Mountain Retreat Cabin',
    modifiedDate: new Date('2024-12-05'),
    numberOfNightsAvailable: 7,
    rentalType: 'Nightly',
    weeksOffered: 'Every week',
    standardizedMinimumNightlyPrice: 95,

    // Host Rates
    monthlyHostRate: 2800,
    weeklyHostRate: 750,
    nightlyHostRateFor2Nights: 180,
    nightlyHostRateFor3Nights: 255,
    nightlyHostRateFor4Nights: 320,
    nightlyHostRateFor5Nights: 400,

    // Fees
    damageDeposit: 400,
    cleaningCost: 125,
    nightlyUtilities: 12,

    // Overrides
    priceOverride: null,
    unitMarkup: 0.08,

    // Constraints
    minimumNights: 2,
    maximumNights: 7,
    minimumWeeks: 4,
    maximumWeeks: 16,
    minimumMonths: 1,
    maximumMonths: 4,

    // Availability
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    daysNotAvailable: [],
    nightsAvailable: [2, 3, 4, 5, 6, 7],
    nightsNotAvailable: [1],
    blockedDates: [],
    bookedDates: [],

    // Host info
    hostEmail: 'host3@example.com',
    hostName: 'Bob Wilson',

    // Pricing List
    pricingList: {
      startingNightlyPrice: 95,
      nightlyPrice: createNumItems([130, 125, 118, 112, 106, 100, 95]),
      hostCompensation: createNumItems([90, 180, 270, 360, 450, 540, 630]),
      combinedMarkup: 0.23,
      overallSiteMarkup: 0.15,
      unitMarkup: 0.08,
      fullTimeDiscount: 0.10,
      weeklyPriceAdjust: 0.05,
      unusedNights: createNumItems([6, 5, 4, 3, 2, 1, 0]),
      unusedNightsDiscount: createNumItems([0.12, 0.10, 0.08, 0.06, 0.04, 0.02, 0]),
      markupAndDiscountMultiplier: createNumItems([1.11, 1.13, 1.15, 1.17, 1.19, 1.21, 1.23]),
      numberSelectedNights: [1, 2, 3, 4, 5, 6, 7],
      slope: -5.8,
    },
  },
  {
    id: 'listing-004',
    name: 'Urban Loft - No Pricing',
    modifiedDate: new Date('2024-11-20'),
    numberOfNightsAvailable: 6,
    rentalType: 'Weekly',
    weeksOffered: 'First and third',
    standardizedMinimumNightlyPrice: 0,

    // Host Rates
    monthlyHostRate: 2500,
    weeklyHostRate: 700,
    nightlyHostRateFor2Nights: 160,
    nightlyHostRateFor3Nights: 225,
    nightlyHostRateFor4Nights: 290,
    nightlyHostRateFor5Nights: 360,

    // Fees
    damageDeposit: 350,
    cleaningCost: 120,
    nightlyUtilities: 9,

    // Overrides
    priceOverride: null,
    unitMarkup: 0.04,

    // Constraints
    minimumNights: 2,
    maximumNights: 6,
    minimumWeeks: 8,
    maximumWeeks: 24,
    minimumMonths: 2,
    maximumMonths: 6,

    // Availability
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysNotAvailable: ['Sunday'],
    nightsAvailable: [2, 3, 4, 5, 6],
    nightsNotAvailable: [1, 7],
    blockedDates: [],
    bookedDates: [],

    // Host info
    hostEmail: 'host4@example.com',
    hostName: 'Alice Johnson',

    // No pricing list - will calculate on the fly
    pricingList: null,
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
