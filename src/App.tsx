import React, { useState, useEffect, useMemo } from 'react';
import { Listing, WeeksOffered, ListingScheduleSelectorOutput, PriceComparisonResult, ValidationFlags } from './types/pricing.types';
import { searchListings, getLatestZATConfig } from './data/mockData';
import { PricingCalculator } from './services/PricingCalculator';

// Components
import { ListingSelector } from './components/ListingSelector';
import { ReservationInputs } from './components/ReservationInputs';
import { ProratedRatesSection } from './components/ProratedRatesSection';
import { MarkupsSection } from './components/MarkupsSection';
import { FinalPricingSection } from './components/FinalPricingSection';
import { HostPricesSection } from './components/HostPricesSection';
import { HostGuidelinesSection } from './components/HostGuidelinesSection';
import { ZATConfigSection } from './components/ZATConfigSection';
import { PriceListTable } from './components/PriceListTable';
import { WorkflowFormulaChecks } from './components/WorkflowFormulaChecks';
import { ValidationSection } from './components/ValidationSection';
import { SLUnitSettings } from './components/SLUnitSettings';

import './styles/index.css';

function App() {
  // State - Default values match documentation examples
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedNights, setSelectedNights] = useState(4); // Documentation example uses 4 nights
  const [reservationSpanWeeks, setReservationSpanWeeks] = useState(17); // Documentation example: 17 weeks
  const [guestPattern, setGuestPattern] = useState<WeeksOffered>('Every week');
  const [comparisonResults, setComparisonResults] = useState<Record<string, PriceComparisonResult>>({});

  // Global config
  const globalConfig = getLatestZATConfig();

  // Filter listings based on search
  const listings = useMemo(() => {
    return searchListings({
      pricingListNotEmpty: false, // Show all for testing
      rentalTypeNotEmpty: true,
      searchQuery: searchQuery || undefined,
    });
  }, [searchQuery]);

  // Calculator instance
  const calculator = useMemo(() => {
    if (!selectedListing) return null;
    return new PricingCalculator(selectedListing, globalConfig, selectedNights, reservationSpanWeeks);
  }, [selectedListing, globalConfig, selectedNights, reservationSpanWeeks]);

  // Calculated values
  const calculatedValues: ListingScheduleSelectorOutput | null = useMemo(() => {
    if (!calculator) return null;
    return calculator.calculateAll();
  }, [calculator]);

  // Validation flags
  const validationFlags: ValidationFlags | null = useMemo(() => {
    if (!calculator) return null;
    return calculator.validateListing();
  }, [calculator]);

  // Additional calculated values
  const avgWeeklyPrice = useMemo(() => {
    if (!calculator) return 0;
    return calculator.calculateAvgWeeklyPrice();
  }, [calculator]);

  const monthlyAvgNightlyPrice = useMemo(() => {
    if (!calculator) return 0;
    return calculator.calculateMonthlyAvgNightlyPrice();
  }, [calculator]);

  // Update pattern when listing changes
  useEffect(() => {
    if (selectedListing) {
      setGuestPattern(selectedListing.weeksOffered);
    }
  }, [selectedListing]);

  // Handlers
  const handleRunChecks = () => {
    if (!calculator) return;
    const results = calculator.compareCalculations();
    setComparisonResults(results);
  };

  const handleUpdateStartingNightlyPrice = () => {
    console.log('Update Starting Nightly Price clicked');
    alert('API call: CORE-Find lowest nightly price');
  };

  const handleUpdatePriceList = () => {
    console.log('Update Price List clicked');
    alert('API call: CORE-save_pricing_robert');
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Z-PRICING-UNIT-TEST</h1>
        <p>
          Unit testing environment for pricing calculations. Compare Listing Schedule Selector,
          Pricing List Structure, and direct formulas to ensure consistency.
        </p>
        <p className="header-url">
          Live URL: app.split.lease/version-live/z-pricing-unit-test?debug_mode=true
        </p>
      </header>

      {/* Section 1: Listing Selection */}
      <ListingSelector
        listings={listings}
        selectedListing={selectedListing}
        onSelect={setSelectedListing}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Section 2 & 3: Reservation Parameters (Day Selector + Duration) */}
      <ReservationInputs
        selectedNights={selectedNights}
        onNightsChange={setSelectedNights}
        reservationSpanWeeks={reservationSpanWeeks}
        onReservationSpanChange={setReservationSpanWeeks}
        guestPattern={guestPattern}
        onPatternChange={setGuestPattern}
      />

      {/* Section 4: Prorated Nightly Rates */}
      <ProratedRatesSection
        calculatedValues={calculatedValues}
        avgWeeklyPrice={avgWeeklyPrice}
        monthlyAvgNightlyPrice={monthlyAvgNightlyPrice}
      />

      {/* Section 5 & 6: Rental Type Multipliers & Markups */}
      <MarkupsSection
        calculatedValues={calculatedValues}
        globalConfig={globalConfig}
        listing={selectedListing}
      />

      {/* Section 7: Final Pricing Calculations */}
      <FinalPricingSection
        calculatedValues={calculatedValues}
        listing={selectedListing}
      />

      {/* Section 8: Host Prices Input */}
      <HostPricesSection listing={selectedListing} />

      {/* Section 9: Host Guidelines */}
      <HostGuidelinesSection
        listing={selectedListing}
        globalConfig={globalConfig}
      />

      {/* Section 10: SL Unit Settings */}
      <SLUnitSettings calculatedValues={calculatedValues} />

      {/* Section 11: Validation Flags */}
      <ValidationSection validationFlags={validationFlags} />

      {/* Section 12: ZAT-Price Configuration */}
      <ZATConfigSection globalConfig={globalConfig} />

      {/* Section 13: Price List Table */}
      <PriceListTable
        listing={selectedListing}
        globalConfig={globalConfig}
        onUpdateStartingNightlyPrice={handleUpdateStartingNightlyPrice}
        onUpdatePriceList={handleUpdatePriceList}
      />

      {/* Section 14: Workflow vs Formula Checks */}
      <WorkflowFormulaChecks
        calculatedValues={calculatedValues}
        comparisonResults={comparisonResults}
        onRunChecks={handleRunChecks}
      />
    </div>
  );
}

export default App;
