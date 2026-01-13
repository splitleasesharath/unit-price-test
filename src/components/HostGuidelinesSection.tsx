import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { Listing, ZATPriceConfiguration } from '../types/pricing.types';

interface HostGuidelinesSectionProps {
  listing: Listing | null;
  globalConfig: ZATPriceConfiguration;
}

/**
 * Host Guidelines Section
 * Shows host-configured constraints and requirements from documentation:
 * - Minimum/Maximum Nights Desired by Host
 * - Minimum/Maximum Days Desired by Host
 * - Min/Max Desired Reservation Term (Weeks)
 */
export const HostGuidelinesSection: React.FC<HostGuidelinesSectionProps> = ({
  listing,
  globalConfig,
}) => {
  if (!listing) {
    return (
      <div className="section host-guidelines">
        <h3>Host Guidelines</h3>
        <p className="no-data">Select a listing to view host guidelines</p>
      </div>
    );
  }

  // Calculate days from nights (days = nights + 1)
  const minDays = listing.minimumNights + 1;
  const maxDays = listing.maximumNights + 1;

  // Calculate weekly equivalent from monthly
  const monthlyToWeekly = listing.monthlyHostRate / 4.3;
  const weeklyToNightly = listing.weeklyHostRate / 7;

  return (
    <div className="section host-guidelines">
      <h3>Host Guidelines</h3>

      <div className="guidelines-grid">
        {/* Night Constraints */}
        <div className="guideline-card">
          <h4>Nights Desired by Host</h4>
          <div className="guideline-row">
            <span className="label">Minimum Nights:</span>
            <span className="value">{listing.minimumNights}</span>
          </div>
          <div className="guideline-row">
            <span className="label">Maximum Nights:</span>
            <span className="value">{listing.maximumNights}</span>
          </div>
        </div>

        {/* Day Constraints */}
        <div className="guideline-card">
          <h4>Days Desired by Host</h4>
          <div className="guideline-row">
            <span className="label">Minimum Days:</span>
            <span className="value">{minDays}</span>
          </div>
          <div className="guideline-row">
            <span className="label">Maximum Days:</span>
            <span className="value">{maxDays}</span>
          </div>
        </div>

        {/* Week Constraints */}
        <div className="guideline-card">
          <h4>Reservation Term (Weeks)</h4>
          <div className="guideline-row">
            <span className="label">Min Desired:</span>
            <span className="value">{listing.minimumWeeks} weeks</span>
          </div>
          <div className="guideline-row">
            <span className="label">Max Desired:</span>
            <span className="value">{listing.maximumWeeks} weeks</span>
          </div>
        </div>

        {/* Month Constraints */}
        <div className="guideline-card">
          <h4>Reservation Term (Months)</h4>
          <div className="guideline-row">
            <span className="label">Min Months:</span>
            <span className="value">{listing.minimumMonths}</span>
          </div>
          <div className="guideline-row">
            <span className="label">Max Months:</span>
            <span className="value">{listing.maximumMonths}</span>
          </div>
        </div>

        {/* Rate Equivalents */}
        <div className="guideline-card">
          <h4>Rate Equivalents</h4>
          <div className="guideline-row">
            <span className="label">Monthly → Weekly:</span>
            <span className="value">{formatCurrency(monthlyToWeekly)}</span>
          </div>
          <div className="guideline-row">
            <span className="label">Weekly → Nightly:</span>
            <span className="value">{formatCurrency(weeklyToNightly)}</span>
          </div>
        </div>

        {/* Rental Configuration */}
        <div className="guideline-card">
          <h4>Rental Configuration</h4>
          <div className="guideline-row">
            <span className="label">Host Comp Style:</span>
            <span className="value rental-type">{listing.rentalType}</span>
          </div>
          <div className="guideline-row">
            <span className="label">Weeks Offered:</span>
            <span className="value">{listing.weeksOffered}</span>
          </div>
        </div>
      </div>

      {/* Pricing recommendations based on rental type */}
      <div className="pricing-recommendations">
        <h4>Pricing Model Information</h4>
        <div className="recommendation-text">
          {listing.rentalType === 'Monthly' && (
            <p>
              For monthly rentals, the prorated nightly rate is calculated as:
              <strong> Monthly Rate ({formatCurrency(listing.monthlyHostRate)}) ÷ {globalConfig.avgDaysPerMonth} × 7 ÷ Selected Nights</strong>.
              This ensures consistent weekly pricing regardless of month length.
            </p>
          )}
          {listing.rentalType === 'Weekly' && (
            <p>
              For weekly rentals, the prorated nightly rate is calculated as:
              <strong> Weekly Rate ({formatCurrency(listing.weeklyHostRate)}) ÷ Selected Nights</strong>.
              The unused nights discount ({(globalConfig.unusedNightsDiscountMultiplier * 100).toFixed(0)}% per night) incentivizes longer stays.
            </p>
          )}
          {listing.rentalType === 'Nightly' && (
            <p>
              For nightly rentals, the host rate is applied directly with the
              <strong> {(globalConfig.overallSiteMarkup * 100).toFixed(0)}% site markup</strong>. Nightly listings typically command premium rates
              due to their flexibility.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostGuidelinesSection;
