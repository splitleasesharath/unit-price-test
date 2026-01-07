import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { ListingScheduleSelectorOutput } from '../types/pricing.types';

interface ProratedRatesSectionProps {
  calculatedValues: ListingScheduleSelectorOutput | null;
  avgWeeklyPrice: number;
  monthlyAvgNightlyPrice: number;
}

export const ProratedRatesSection: React.FC<ProratedRatesSectionProps> = ({
  calculatedValues,
  avgWeeklyPrice,
  monthlyAvgNightlyPrice,
}) => {
  if (!calculatedValues) {
    return (
      <div className="section prorated-rates">
        <h3>Section 2: Prorated Nightly Rates</h3>
        <p className="no-data">Select a listing to view prorated rates</p>
      </div>
    );
  }

  return (
    <div className="section prorated-rates">
      <h3>Section 2: Prorated Nightly Rates</h3>

      <div className="rates-grid">
        <div className="rate-card">
          <h4>Weekly Rental</h4>
          <div className="rate-label">Prorated Nightly Rate - Weekly Rental</div>
          <div className="rate-value">
            {formatCurrency(calculatedValues.proratedNightlyHostRateWeekly)}
          </div>
        </div>

        <div className="rate-card">
          <h4>Monthly Rental</h4>
          <div className="rate-label">Prorated Nightly Rate - Monthly Rental</div>
          <div className="rate-value">
            {formatCurrency(calculatedValues.proratedNightlyHostRateMonthly)}
          </div>
        </div>

        <div className="rate-card">
          <h4>Monthly (Alt Calc)</h4>
          <div className="rate-label">Prorated Nightly Rate (Monthly)</div>
          <div className="rate-value">
            {formatCurrency(avgWeeklyPrice / calculatedValues.selectedNights)}
          </div>
          <div className="rate-formula">
            = Avg Weekly Price / Selected Nights
          </div>
        </div>
      </div>

      <div className="additional-values">
        <div className="value-row">
          <span className="label">Monthly Average Nightly Price:</span>
          <span className="value">{formatCurrency(monthlyAvgNightlyPrice)}</span>
          <span className="formula">(Monthly Host Rate / Avg days per month)</span>
        </div>
        <div className="value-row">
          <span className="label">Average Weekly Price (Monthly Listing):</span>
          <span className="value">{formatCurrency(avgWeeklyPrice)}</span>
          <span className="formula">(Monthly Avg Nightly * 7)</span>
        </div>
      </div>
    </div>
  );
};

export default ProratedRatesSection;
