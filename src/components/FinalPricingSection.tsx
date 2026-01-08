import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { ListingScheduleSelectorOutput, Listing } from '../types/pricing.types';

interface FinalPricingSectionProps {
  calculatedValues: ListingScheduleSelectorOutput | null;
  listing: Listing | null;
}

/**
 * Section 7: Final Pricing Calculations
 * Displays the final calculated prices based on the documentation:
 * - Listing Nightly Price = Multiplier × Prorated Nightly
 * - 4 Week Rent = Nightly × Nights × Actual Weeks
 * - Initial Reservation Payment = 4 Week Rent + Deposits
 * - Total Reservation Price = Nightly × Nights × Total Actual Weeks
 */
export const FinalPricingSection: React.FC<FinalPricingSectionProps> = ({
  calculatedValues,
  listing,
}) => {
  if (!calculatedValues || !listing) {
    return (
      <div className="section final-pricing">
        <h3>Section 7: Final Pricing Calculations</h3>
        <p className="no-data">Select a listing to view final pricing</p>
      </div>
    );
  }

  // Get the actual prorated rate based on rental type
  const getProratedRate = () => {
    switch (listing.rentalType) {
      case 'Monthly':
        return calculatedValues.proratedNightlyHostRateMonthly;
      case 'Weekly':
        return calculatedValues.proratedNightlyHostRateWeekly;
      case 'Nightly':
        return calculatedValues.selectedHostRateNightlyModel;
      default:
        return 0;
    }
  };

  const proratedRate = getProratedRate();

  return (
    <div className="section final-pricing">
      <h3>Section 7: Final Pricing Calculations</h3>

      <div className="pricing-summary-grid">
        {/* Listing Nightly Price */}
        <div className="pricing-card highlight">
          <h4>Listing Nightly Price</h4>
          <div className="price-value">{formatCurrency(calculatedValues.listingNightlyPrice)}</div>
          <div className="formula">
            Multiplier × Prorated Nightly
          </div>
          <div className="formula-detail">
            = {formatCurrency(proratedRate)} × markup
          </div>
        </div>

        {/* 4 Week Rent */}
        <div className="pricing-card">
          <h4>4 Week Rent</h4>
          <div className="price-value">{formatCurrency(calculatedValues.fourWeekRent)}</div>
          <div className="formula">
            Nightly × Nights × Actual Weeks (4 wk)
          </div>
          <div className="formula-detail">
            = {formatCurrency(calculatedValues.listingNightlyPrice)} × {calculatedValues.selectedNights} × {calculatedValues.actualWeeksDuring4Week}
          </div>
        </div>

        {/* Initial Reservation Payment */}
        <div className="pricing-card">
          <h4>Initial Reservation Payment</h4>
          <div className="price-value">{formatCurrency(calculatedValues.initialReservationPayment)}</div>
          <div className="formula">
            4 Week Rent + Damage Deposit
          </div>
          <div className="formula-detail">
            = {formatCurrency(calculatedValues.fourWeekRent)} + {formatCurrency(listing.damageDeposit)}
          </div>
        </div>

        {/* Total Reservation Price */}
        <div className="pricing-card total">
          <h4>Total Reservation Price</h4>
          <div className="price-value">{formatCurrency(calculatedValues.totalReservationPrice)}</div>
          <div className="formula">
            Nightly × Nights × Total Actual Weeks
          </div>
          <div className="formula-detail">
            = {formatCurrency(calculatedValues.listingNightlyPrice)} × {calculatedValues.selectedNights} × {calculatedValues.actualWeeksDuringReservationSpan}
          </div>
        </div>
      </div>

      {/* Calculation breakdown table */}
      <div className="calculation-breakdown">
        <h4>Calculation Breakdown</h4>
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Formula</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Selected Nights</td>
              <td>Days selected - 1</td>
              <td><strong>{calculatedValues.selectedNights}</strong></td>
            </tr>
            <tr>
              <td>Unused Nights</td>
              <td>7 - Selected Nights</td>
              <td><strong>{calculatedValues.unusedNights}</strong></td>
            </tr>
            <tr>
              <td>Unused Nights Discount</td>
              <td>Unused × 0.03</td>
              <td><strong>{(calculatedValues.unusedNightsDiscount * 100).toFixed(0)}%</strong></td>
            </tr>
            <tr>
              <td>Prorated Nightly Rate ({listing.rentalType})</td>
              <td>
                {listing.rentalType === 'Weekly' && 'Weekly Rate / Nights'}
                {listing.rentalType === 'Monthly' && '(Monthly / 31 × 7) / Nights'}
                {listing.rentalType === 'Nightly' && 'Direct Nightly Rate'}
              </td>
              <td><strong>{formatCurrency(proratedRate)}</strong></td>
            </tr>
            <tr>
              <td>Actual Weeks (4 week period)</td>
              <td>Based on pattern: {calculatedValues.guestDesiredPattern}</td>
              <td><strong>{calculatedValues.actualWeeksDuring4Week}</strong></td>
            </tr>
            <tr>
              <td>Actual Weeks (Full span)</td>
              <td>{calculatedValues.reservationSpanWeeks} weeks with pattern</td>
              <td><strong>{calculatedValues.actualWeeksDuringReservationSpan}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinalPricingSection;
