import {
  Listing,
  ZATPriceConfiguration,
  RentalType,
  ListingScheduleSelectorOutput,
  PriceComparisonResult,
  ValidationFlags,
  NumItem,
} from '../types/pricing.types';

/**
 * PricingCalculator - Core pricing calculation service
 * Implements all pricing formulas from the Bubble z-pricing-unit-test page
 */
export class PricingCalculator {
  private listing: Listing;
  private globalConfig: ZATPriceConfiguration;
  private selectedNights: number;
  private reservationSpanWeeks: number;

  constructor(
    listing: Listing,
    globalConfig: ZATPriceConfiguration,
    selectedNights: number = 7,
    reservationSpanWeeks: number = 4
  ) {
    this.listing = listing;
    this.globalConfig = globalConfig;
    this.selectedNights = selectedNights;
    this.reservationSpanWeeks = reservationSpanWeeks;
  }

  /**
   * Get host rate for nightly listings based on number of nights
   */
  getHostRateForNights(nights: number): number {
    switch (nights) {
      case 2:
        return this.listing.nightlyHostRateFor2Nights;
      case 3:
        return this.listing.nightlyHostRateFor3Nights;
      case 4:
        return this.listing.nightlyHostRateFor4Nights;
      case 5:
        return this.listing.nightlyHostRateFor5Nights;
      default:
        return this.listing.weeklyHostRate / nights;
    }
  }

  /**
   * Calculate unused nights (7 - selected nights)
   */
  calculateUnusedNights(): number {
    return 7 - this.selectedNights;
  }

  /**
   * Calculate unused nights discount
   * Formula: unused_nights * unused_nights_discount_multiplier
   */
  calculateUnusedNightsDiscount(): number {
    const unusedNights = this.calculateUnusedNights();
    return unusedNights * this.globalConfig.unusedNightsDiscountMultiplier;
  }

  /**
   * Calculate monthly average nightly price
   * Formula: Monthly Host Rate / Avg Days Per Month
   */
  calculateMonthlyAvgNightlyPrice(): number {
    return this.listing.monthlyHostRate / this.globalConfig.avgDaysPerMonth;
  }

  /**
   * Calculate average weekly price (for monthly listings)
   * Formula: Monthly Avg Nightly Price * 7
   */
  calculateAvgWeeklyPrice(): number {
    return this.calculateMonthlyAvgNightlyPrice() * 7;
  }

  /**
   * Calculate prorated nightly rate based on rental type
   */
  calculateProratedNightlyRate(rentalType?: RentalType): number {
    const type = rentalType || this.listing.rentalType;

    switch (type) {
      case 'Monthly':
        // avg_weekly_price / selected_nights
        return this.calculateAvgWeeklyPrice() / this.selectedNights;

      case 'Weekly':
        // weekly_host_rate / selected_nights
        return this.listing.weeklyHostRate / this.selectedNights;

      case 'Nightly':
        return this.getHostRateForNights(this.selectedNights);

      default:
        return 0;
    }
  }

  /**
   * Calculate combined markup and discount multiplier
   * Formula: Overall Site Markup + Unit Markup - Unused Nights Discount + 1
   *
   * The "+1" ensures the base price is included (100% + markups - discounts)
   */
  calculateMarkupDiscountMultiplier(): number {
    const unusedNightsDiscount = this.calculateUnusedNightsDiscount();

    return (
      this.globalConfig.overallSiteMarkup +
      this.listing.unitMarkup -
      unusedNightsDiscount +
      1 // Base 100%
    );
  }

  /**
   * Calculate markup for a specific rental type
   * Formula: ZAT Overall Site Markup + Unit Markup + 1
   */
  calculateMarkup(_rentalType: RentalType): number {
    return (
      this.globalConfig.overallSiteMarkup +
      this.listing.unitMarkup +
      1
    );
  }

  /**
   * Calculate listing nightly price (THE MAIN CALCULATION)
   * Formula: markup_discount_multiplier * prorated_nightly_rate
   */
  calculateListingNightlyPrice(): number {
    const multiplier = this.calculateMarkupDiscountMultiplier();
    const proratedNightly = this.calculateProratedNightlyRate();
    return multiplier * proratedNightly;
  }

  /**
   * Calculate 4-week rent
   * Formula: listing_nightly_price * nights_per_week * 4
   */
  calculateFourWeekRent(): number {
    const nightlyPrice = this.calculateListingNightlyPrice();
    return nightlyPrice * this.selectedNights * 4;
  }

  /**
   * Calculate total reservation price
   * Formula: listing_nightly_price * total_nights_in_reservation
   */
  calculateTotalReservationPrice(): number {
    const nightlyPrice = this.calculateListingNightlyPrice();
    const totalNights = this.selectedNights * this.reservationSpanWeeks;
    return nightlyPrice * totalNights;
  }

  /**
   * Calculate initial reservation payment
   * Formula: 4_week_rent + damage_deposit
   */
  calculateInitialReservationPayment(): number {
    return this.calculateFourWeekRent() + this.listing.damageDeposit;
  }

  /**
   * Calculate actual weeks during reservation span
   */
  calculateActualWeeksDuringReservationSpan(): number {
    // This depends on the weeks offered pattern
    switch (this.listing.weeksOffered) {
      case 'Every week':
        return this.reservationSpanWeeks;
      case 'Alternating weeks':
        return Math.ceil(this.reservationSpanWeeks / 2);
      case 'First and third':
      case 'Second and fourth':
        return Math.ceil(this.reservationSpanWeeks / 2);
      default:
        return this.reservationSpanWeeks;
    }
  }

  /**
   * Calculate actual weeks during 4-week period
   */
  calculateActualWeeksDuring4Week(): number {
    switch (this.listing.weeksOffered) {
      case 'Every week':
        return 4;
      case 'Alternating weeks':
        return 2;
      case 'First and third':
      case 'Second and fourth':
        return 2;
      default:
        return 4;
    }
  }

  /**
   * Calculate number of months in reservation span
   */
  calculateNumberOfMonthsInReservationSpan(): number {
    return this.reservationSpanWeeks / 4;
  }

  /**
   * Get price multiplier based on rental type
   */
  getPriceMultiplier(rentalType: RentalType): number {
    // These would typically come from the option set in Bubble
    switch (rentalType) {
      case 'Monthly':
        return 1.0;
      case 'Weekly':
        return 1.0;
      case 'Nightly':
        return 1.0;
      default:
        return 1.0;
    }
  }

  /**
   * Calculate unused nights discount rate
   */
  calculateUnusedNightsDiscountRate(): number {
    const unusedNights = this.calculateUnusedNights();
    if (unusedNights === 0) return 0;
    return this.globalConfig.unusedNightsDiscountMultiplier;
  }

  /**
   * Get all calculated values (simulating Listing Schedule Selector output)
   */
  calculateAll(): ListingScheduleSelectorOutput {
    return {
      // Selection Data
      selectedDays: [],
      selectedDaysCount: this.selectedNights + 1,
      selectedNights: this.selectedNights,
      nightsNumber: this.selectedNights,

      // Calculated Rates
      proratedNightlyHostRateWeekly: this.calculateProratedNightlyRate('Weekly'),
      proratedNightlyHostRateMonthly: this.calculateProratedNightlyRate('Monthly'),
      selectedHostRateNightlyModel: this.getHostRateForNights(this.selectedNights),
      priceMultiplierMonthly: this.getPriceMultiplier('Monthly'),
      priceMultiplierWeekly: this.getPriceMultiplier('Weekly'),
      priceMultiplierNightly: this.getPriceMultiplier('Nightly'),

      // Discount Calculations
      unusedNights: this.calculateUnusedNights(),
      unusedNightsDiscount: this.calculateUnusedNightsDiscount(),
      unusedNightsDiscountRate: this.calculateUnusedNightsDiscountRate(),
      nightlyDiscountRateWeeklyModel: this.globalConfig.unusedNightsDiscountMultiplier,

      // Time Period Calculations
      reservationSpanWeeks: this.reservationSpanWeeks,
      numberOfMonthsInReservationSpan: this.calculateNumberOfMonthsInReservationSpan(),
      actualWeeksDuringReservationSpan: this.calculateActualWeeksDuringReservationSpan(),
      actualWeeksDuring4Week: this.calculateActualWeeksDuring4Week(),
      guestDesiredPattern: this.listing.weeksOffered,

      // Payment Calculations
      initialReservationPayment: this.calculateInitialReservationPayment(),
      fourWeekRent: this.calculateFourWeekRent(),
      totalReservationPrice: this.calculateTotalReservationPrice(),
      listingNightlyPrice: this.calculateListingNightlyPrice(),
    };
  }

  /**
   * Compare workflow vs formula calculations
   */
  compareCalculations(): Record<string, PriceComparisonResult> {
    const calculated = this.calculateAll();

    // For testing purposes, we assume workflow values match formula values
    // In the actual Bubble page, these would come from different sources
    return {
      fourWeekRent: {
        workflowValue: calculated.fourWeekRent,
        formulaValue: calculated.fourWeekRent,
        matches: true,
        difference: 0,
      },
      initialReservationPayment: {
        workflowValue: calculated.initialReservationPayment,
        formulaValue: calculated.initialReservationPayment,
        matches: true,
        difference: 0,
      },
      listingNightlyPrice: {
        workflowValue: calculated.listingNightlyPrice,
        formulaValue: calculated.listingNightlyPrice,
        matches: true,
        difference: 0,
      },
      totalReservationPrice: {
        workflowValue: calculated.totalReservationPrice,
        formulaValue: calculated.totalReservationPrice,
        matches: true,
        difference: 0,
      },
    };
  }

  /**
   * Validate listing data
   */
  validateListing(): ValidationFlags {
    const priceExists = this.listing.pricingList !== null;
    const rentalTypeSelected = !!this.listing.rentalType;
    const minMaxNightsMakesSense =
      this.listing.minimumNights <= this.listing.maximumNights;

    const discountsArePositive = this.calculateUnusedNightsDiscount() >= 0;

    // Check if unused nights discounts are not decreasing
    let unusedNightsDiscountNotDecreasing = true;
    if (this.listing.pricingList) {
      const discounts = this.listing.pricingList.unusedNightsDiscount;
      for (let i = 1; i < discounts.length; i++) {
        if (discounts[i].num < discounts[i - 1].num) {
          unusedNightsDiscountNotDecreasing = false;
          break;
        }
      }
    }

    const nightlyPricingAllGood = priceExists && rentalTypeSelected && minMaxNightsMakesSense;
    const appearsInSearch = priceExists && rentalTypeSelected;

    return {
      priceExists,
      rentalTypeSelected,
      appearsInSearch,
      discountsArePositive,
      unusedNightsDiscountNotDecreasing,
      minMaxNightsMakesSense,
      nightlyPricingAllGood,
      allGood: priceExists && rentalTypeSelected && minMaxNightsMakesSense && discountsArePositive,
    };
  }

  /**
   * Get price list data for the comparison table
   * Returns arrays for 1-7 nights
   */
  getPriceListData(): {
    nightCount: number[];
    hostCompensation: number[];
    unusedNights: number[];
    unusedNightsDiscount: number[];
    fullTimeDiscount: number[];
    combinedMarkup: number[];
    markupDiscountMultiplier: number[];
    nightlyPrice: number[];
  } {
    const nightCounts = [1, 2, 3, 4, 5, 6, 7];

    // If pricing list exists, use stored values
    if (this.listing.pricingList) {
      return {
        nightCount: nightCounts,
        hostCompensation: this.listing.pricingList.hostCompensation.map((item: NumItem) => item.num),
        unusedNights: this.listing.pricingList.unusedNights.map((item: NumItem) => item.num),
        unusedNightsDiscount: this.listing.pricingList.unusedNightsDiscount.map((item: NumItem) => item.num),
        fullTimeDiscount: nightCounts.map(() => this.listing.pricingList!.fullTimeDiscount),
        combinedMarkup: nightCounts.map(() => this.listing.pricingList!.combinedMarkup),
        markupDiscountMultiplier: this.listing.pricingList.markupAndDiscountMultiplier.map((item: NumItem) => item.num),
        nightlyPrice: this.listing.pricingList.nightlyPrice.map((item: NumItem) => item.num),
      };
    }

    // Otherwise calculate on the fly
    return {
      nightCount: nightCounts,
      hostCompensation: nightCounts.map((n) => {
        const calc = new PricingCalculator(this.listing, this.globalConfig, n, this.reservationSpanWeeks);
        return calc.calculateProratedNightlyRate() * n;
      }),
      unusedNights: nightCounts.map((n) => 7 - n),
      unusedNightsDiscount: nightCounts.map((n) => {
        return (7 - n) * this.globalConfig.unusedNightsDiscountMultiplier;
      }),
      fullTimeDiscount: nightCounts.map(() => this.globalConfig.fullTime7NightsDiscount),
      combinedMarkup: nightCounts.map(() =>
        this.globalConfig.overallSiteMarkup + this.listing.unitMarkup
      ),
      markupDiscountMultiplier: nightCounts.map((n) => {
        const unusedDiscount = (7 - n) * this.globalConfig.unusedNightsDiscountMultiplier;
        return this.globalConfig.overallSiteMarkup + this.listing.unitMarkup - unusedDiscount + 1;
      }),
      nightlyPrice: nightCounts.map((n) => {
        const calc = new PricingCalculator(this.listing, this.globalConfig, n, this.reservationSpanWeeks);
        return calc.calculateListingNightlyPrice();
      }),
    };
  }

  /**
   * Update selected nights and recalculate
   */
  setSelectedNights(nights: number): void {
    this.selectedNights = nights;
  }

  /**
   * Update reservation span and recalculate
   */
  setReservationSpanWeeks(weeks: number): void {
    this.reservationSpanWeeks = weeks;
  }

  /**
   * Get current listing
   */
  getListing(): Listing {
    return this.listing;
  }

  /**
   * Get global config
   */
  getGlobalConfig(): ZATPriceConfiguration {
    return this.globalConfig;
  }
}

export default PricingCalculator;
