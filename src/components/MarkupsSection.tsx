import React from 'react';
import { formatPercentage, formatCurrency } from '../utils/formatters';
import { ListingScheduleSelectorOutput, ZATPriceConfiguration, Listing } from '../types/pricing.types';

interface MarkupsSectionProps {
  calculatedValues: ListingScheduleSelectorOutput | null;
  globalConfig: ZATPriceConfiguration;
  listing: Listing | null;
}

export const MarkupsSection: React.FC<MarkupsSectionProps> = ({
  calculatedValues,
  globalConfig,
  listing,
}) => {
  if (!calculatedValues || !listing) {
    return (
      <div className="section markups">
        <h3>Section 3 & 4: Rental Type Multipliers & Markup and Discounts</h3>
        <p className="no-data">Select a listing to view markups</p>
      </div>
    );
  }

  // Calculate markups for each rental type
  const calculateMarkup = (unusedNightsDiscount: number) => {
    return globalConfig.overallSiteMarkup + listing.unitMarkup - unusedNightsDiscount + 1;
  };

  const monthlyMarkup = calculateMarkup(calculatedValues.unusedNightsDiscount);
  const weeklyMarkup = calculateMarkup(calculatedValues.unusedNightsDiscount);
  const nightlyMarkup = calculateMarkup(calculatedValues.unusedNightsDiscount);

  return (
    <div className="section markups">
      <h3>Section 3: Rental Type Multipliers</h3>

      <div className="multipliers-grid">
        <div className="multiplier-card">
          <h4>Monthly</h4>
          <div className="value">{calculatedValues.priceMultiplierMonthly.toFixed(2)}</div>
          <div className="label">Night price multiplier</div>
        </div>

        <div className="multiplier-card">
          <h4>Weekly</h4>
          <div className="value">{calculatedValues.priceMultiplierWeekly.toFixed(2)}</div>
          <div className="label">Night price multiplier</div>
        </div>

        <div className="multiplier-card">
          <h4>Nightly</h4>
          <div className="value">{calculatedValues.priceMultiplierNightly.toFixed(2)}</div>
          <div className="label">Night price multiplier</div>
        </div>
      </div>

      <h3>Section 4: Markup and Discounts</h3>

      <div className="markup-formula">
        <p className="formula-text">
          Formula: Overall Site Markup + Unit Markup - Unused Nights Discount + 1
        </p>
        <p className="formula-detail">
          = {formatPercentage(globalConfig.overallSiteMarkup)} + {formatPercentage(listing.unitMarkup)} - {formatPercentage(calculatedValues.unusedNightsDiscount)} + 1
        </p>
      </div>

      <div className="markups-grid">
        <div className="markup-card">
          <h4>Monthly Listings</h4>
          <div className="value">{monthlyMarkup.toFixed(4)}</div>
          <div className="label">Combined Markup Multiplier</div>
        </div>

        <div className="markup-card">
          <h4>Weekly Listings</h4>
          <div className="value">{weeklyMarkup.toFixed(4)}</div>
          <div className="label">Combined Markup Multiplier</div>
        </div>

        <div className="markup-card">
          <h4>Nightly Listings</h4>
          <div className="value">{nightlyMarkup.toFixed(4)}</div>
          <div className="label">Combined Markup Multiplier</div>
        </div>
      </div>

      <h3>Section 5: Reservation Span Calculations</h3>

      <div className="span-calculations">
        <div className="calc-row">
          <span className="label">Number of Months in Reservation Span:</span>
          <span className="value">{calculatedValues.numberOfMonthsInReservationSpan.toFixed(2)}</span>
        </div>
        <div className="calc-row">
          <span className="label">Reservation Span (Weeks):</span>
          <span className="value">{calculatedValues.reservationSpanWeeks}</span>
        </div>
        <div className="calc-row">
          <span className="label">Required Pattern:</span>
          <span className="value">{calculatedValues.guestDesiredPattern}</span>
        </div>
        <div className="calc-row">
          <span className="label">Actual Weeks 4 Weeks:</span>
          <span className="value">{calculatedValues.actualWeeksDuring4Week}</span>
        </div>
        <div className="calc-row">
          <span className="label">Actual Weeks During Reservation Span:</span>
          <span className="value">{calculatedValues.actualWeeksDuringReservationSpan}</span>
        </div>
      </div>
    </div>
  );
};

export default MarkupsSection;
