import React from 'react';
import { formatPercentage } from '../utils/formatters';
import { ListingScheduleSelectorOutput, Listing } from '../types/pricing.types';

interface SLUnitSettingsProps {
  calculatedValues: ListingScheduleSelectorOutput | null;
  listing?: Listing | null;
}

/**
 * Listing Unique Settings Section
 * From documentation - displays:
 * - Unused Nights
 * - SL Unit Markup
 * - Unused Nights Discount Rate
 * - Nightly Discount Rate, Weekly Model
 */
export const SLUnitSettings: React.FC<SLUnitSettingsProps> = ({ calculatedValues, listing }) => {
  if (!calculatedValues) {
    return (
      <div className="section sl-unit-settings">
        <h3>Listing Unique Settings</h3>
        <p className="no-data">Select a listing to view unit settings</p>
      </div>
    );
  }

  return (
    <div className="section sl-unit-settings">
      <h3>Listing Unique Settings</h3>

      <div className="settings-grid two-column">
        {/* Left Column - Discount Settings */}
        <div className="settings-column">
          <div className="setting-row highlight">
            <span className="label">Unused Nights:</span>
            <span className="value">{calculatedValues.unusedNights}</span>
          </div>
          <div className="setting-row">
            <span className="label">SL Unit Markup:</span>
            <span className="value">{formatPercentage(listing?.unitMarkup || 0)}</span>
          </div>
          <div className="setting-row">
            <span className="label">Unused Nights Discount Rate:</span>
            <span className="value">{formatPercentage(calculatedValues.unusedNightsDiscountRate)}</span>
          </div>
          <div className="setting-row">
            <span className="label">Nightly Discount Rate, Weekly Model:</span>
            <span className="value">{formatPercentage(calculatedValues.nightlyDiscountRateWeeklyModel)}</span>
          </div>
        </div>

        {/* Right Column - Reservation Calculations */}
        <div className="settings-column">
          <div className="setting-row">
            <span className="label">Number of Months in Reservation Span:</span>
            <span className="value">{calculatedValues.numberOfMonthsInReservationSpan.toFixed(2)}</span>
          </div>
          <div className="setting-row">
            <span className="label">Reservation Span (Weeks):</span>
            <span className="value">{calculatedValues.reservationSpanWeeks}</span>
          </div>
          <div className="setting-row">
            <span className="label">Required Pattern:</span>
            <span className="value">{calculatedValues.guestDesiredPattern}</span>
          </div>
          <div className="setting-row highlight">
            <span className="label">Actual Weeks 4 Weeks:</span>
            <span className="value">{calculatedValues.actualWeeksDuring4Week}</span>
          </div>
          <div className="setting-row highlight">
            <span className="label">Actual Weeks During Reservation Span:</span>
            <span className="value">{calculatedValues.actualWeeksDuringReservationSpan}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLUnitSettings;
