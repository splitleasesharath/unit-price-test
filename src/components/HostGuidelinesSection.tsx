import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { Listing, ZATPriceConfiguration } from '../types/pricing.types';

interface HostGuidelinesSectionProps {
  listing: Listing | null;
  globalConfig: ZATPriceConfiguration;
}

/**
 * Section 9: Host Guidelines
 * Shows recommended/historical pricing guidelines for hosts
 */
export const HostGuidelinesSection: React.FC<HostGuidelinesSectionProps> = ({
  listing,
  globalConfig,
}) => {
  if (!listing) {
    return (
      <div className="section host-guidelines">
        <h3>Section 9: Host Guidelines</h3>
        <p className="no-data">Select a listing to view host guidelines</p>
      </div>
    );
  }

  // Calculate suggested prices based on config
  const suggestedMinNightly = globalConfig.minPricePerNight;
  const suggestedMaxNightly = globalConfig.maxPricePerNight;

  // Calculate weekly equivalent from monthly
  const monthlyToWeekly = listing.monthlyHostRate / 4.3;
  const weeklyToNightly = listing.weeklyHostRate / 7;

  return (
    <div className="section host-guidelines">
      <h3>Section 9: Host Guidelines</h3>

      <div className="guidelines-grid">
        <div className="guideline-card">
          <h4>Price Range Guidelines</h4>
          <div className="guideline-row">
            <span className="label">Minimum Nightly:</span>
            <span className="value">{formatCurrency(suggestedMinNightly)}</span>
          </div>
          <div className="guideline-row">
            <span className="label">Maximum Nightly:</span>
            <span className="value">{formatCurrency(suggestedMaxNightly)}</span>
          </div>
        </div>

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

        <div className="guideline-card">
          <h4>Rental Type</h4>
          <div className="guideline-row">
            <span className="label">Current Type:</span>
            <span className="value rental-type">{listing.rentalType}</span>
          </div>
          <div className="guideline-row">
            <span className="label">Week Pattern:</span>
            <span className="value">{listing.weeksOffered}</span>
          </div>
        </div>

        <div className="guideline-card">
          <h4>Stay Constraints</h4>
          <div className="guideline-row">
            <span className="label">Min Nights:</span>
            <span className="value">{listing.minimumNights}</span>
          </div>
          <div className="guideline-row">
            <span className="label">Max Nights:</span>
            <span className="value">{listing.maximumNights}</span>
          </div>
          <div className="guideline-row">
            <span className="label">Min Weeks:</span>
            <span className="value">{listing.minimumWeeks}</span>
          </div>
          <div className="guideline-row">
            <span className="label">Max Weeks:</span>
            <span className="value">{listing.maximumWeeks}</span>
          </div>
        </div>
      </div>

      {/* Pricing recommendations based on rental type */}
      <div className="pricing-recommendations">
        <h4>Pricing Recommendations</h4>
        <div className="recommendation-text">
          {listing.rentalType === 'Monthly' && (
            <p>
              For monthly rentals, the prorated nightly rate is calculated as:
              <strong> Monthly Rate ({formatCurrency(listing.monthlyHostRate)}) ÷ 31 × 7 ÷ Selected Nights</strong>.
              This ensures consistent weekly pricing regardless of month length.
            </p>
          )}
          {listing.rentalType === 'Weekly' && (
            <p>
              For weekly rentals, the prorated nightly rate is calculated as:
              <strong> Weekly Rate ({formatCurrency(listing.weeklyHostRate)}) ÷ Selected Nights</strong>.
              The unused nights discount (3% per night) incentivizes longer stays.
            </p>
          )}
          {listing.rentalType === 'Nightly' && (
            <p>
              For nightly rentals, the host rate is applied directly with the
              <strong> 17% site markup</strong>. Nightly listings typically command premium rates
              due to their flexibility.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostGuidelinesSection;
