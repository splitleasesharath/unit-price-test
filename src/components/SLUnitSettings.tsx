import React from 'react';
import { formatPercentage } from '../utils/formatters';
import { ListingScheduleSelectorOutput } from '../types/pricing.types';

interface SLUnitSettingsProps {
  calculatedValues: ListingScheduleSelectorOutput | null;
}

export const SLUnitSettings: React.FC<SLUnitSettingsProps> = ({ calculatedValues }) => {
  if (!calculatedValues) {
    return (
      <div className="section sl-unit-settings">
        <h3>Section 9: SL Unit Settings</h3>
        <p className="no-data">Select a listing to view unit settings</p>
      </div>
    );
  }

  return (
    <div className="section sl-unit-settings">
      <h3>Section 9: SL Unit Settings</h3>

      <div className="settings-grid">
        <div className="setting-row">
          <span className="label">Unused Nights:</span>
          <span className="value">{calculatedValues.unusedNights}</span>
        </div>
        <div className="setting-row">
          <span className="label">Unused Nights Discount Rate:</span>
          <span className="value">{formatPercentage(calculatedValues.unusedNightsDiscountRate)}</span>
        </div>
        <div className="setting-row">
          <span className="label">Unused Nights Discount:</span>
          <span className="value">{formatPercentage(calculatedValues.unusedNightsDiscount)}</span>
        </div>
        <div className="setting-row">
          <span className="label">Nightly Discount Rate, Weekly Model:</span>
          <span className="value">{formatPercentage(calculatedValues.nightlyDiscountRateWeeklyModel)}</span>
        </div>
        <div className="setting-row">
          <span className="label">Actual Weeks 4 Weeks:</span>
          <span className="value">{calculatedValues.actualWeeksDuring4Week}</span>
        </div>
        <div className="setting-row">
          <span className="label">Actual Weeks During Reservation Span:</span>
          <span className="value">{calculatedValues.actualWeeksDuringReservationSpan}</span>
        </div>
        <div className="setting-row">
          <span className="label">Number of Months in Reservation Span:</span>
          <span className="value">{calculatedValues.numberOfMonthsInReservationSpan.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default SLUnitSettings;
