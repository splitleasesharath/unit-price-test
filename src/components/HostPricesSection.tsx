import React from 'react';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { Listing } from '../types/pricing.types';

interface HostPricesSectionProps {
  listing: Listing | null;
}

export const HostPricesSection: React.FC<HostPricesSectionProps> = ({ listing }) => {
  if (!listing) {
    return (
      <div className="section host-prices">
        <h3>Section 6: Host Prices Input</h3>
        <p className="no-data">Select a listing to view host prices</p>
      </div>
    );
  }

  return (
    <div className="section host-prices">
      <h3>Section 6: Host Prices Input</h3>

      <div className="host-prices-grid">
        <div className="row">
          <div className="price-item">
            <span className="label">Host Comp Style:</span>
            <span className="value">{listing.rentalType}</span>
          </div>
          <div className="price-item">
            <span className="label">Weeks Offered:</span>
            <span className="value">{listing.weeksOffered}</span>
          </div>
        </div>

        <div className="row">
          <div className="price-item">
            <span className="label">Weekly Host Rate:</span>
            <span className="value">{formatCurrency(listing.weeklyHostRate)}</span>
          </div>
          <div className="price-item">
            <span className="label">Monthly Host Rate:</span>
            <span className="value">{formatCurrency(listing.monthlyHostRate)}</span>
          </div>
        </div>

        <div className="row">
          <div className="price-item">
            <span className="label">Damage Deposit:</span>
            <span className="value">{formatCurrency(listing.damageDeposit)}</span>
          </div>
          <div className="price-item">
            <span className="label">Cleaning Deposit:</span>
            <span className="value">{formatCurrency(listing.cleaningCost)}</span>
          </div>
        </div>

        <div className="row nightly-rates">
          <div className="price-item">
            <span className="label">2 night Host Rate:</span>
            <span className="value">{formatCurrency(listing.nightlyHostRateFor2Nights)}</span>
          </div>
          <div className="price-item">
            <span className="label">3 night Host Rate:</span>
            <span className="value">{formatCurrency(listing.nightlyHostRateFor3Nights)}</span>
          </div>
          <div className="price-item">
            <span className="label">4 night Host Rate:</span>
            <span className="value">{formatCurrency(listing.nightlyHostRateFor4Nights)}</span>
          </div>
          <div className="price-item">
            <span className="label">5 night Host Rate:</span>
            <span className="value">{formatCurrency(listing.nightlyHostRateFor5Nights)}</span>
          </div>
        </div>

        <div className="row">
          <div className="price-item">
            <span className="label">Nights available:</span>
            <span className="value">{listing.nightsAvailable.join(', ')}</span>
          </div>
          <div className="price-item">
            <span className="label">Nights/Wk available:</span>
            <span className="value">{listing.numberOfNightsAvailable}</span>
          </div>
        </div>
      </div>

      <h3>Section 7: Host Guidelines</h3>

      <div className="host-guidelines-grid">
        <div className="guideline-row">
          <span className="label">Minimum Nights Desired by Host:</span>
          <span className="value">{listing.minimumNights}</span>
        </div>
        <div className="guideline-row">
          <span className="label">Minimum Days Desired by Host:</span>
          <span className="value">{listing.minimumNights + 1}</span>
        </div>
        <div className="guideline-row">
          <span className="label">Maximum Nights Desired by Host:</span>
          <span className="value">{listing.maximumNights}</span>
        </div>
        <div className="guideline-row">
          <span className="label">Maximum Days Desired by Host:</span>
          <span className="value">{listing.maximumNights + 1}</span>
        </div>
        <div className="guideline-row">
          <span className="label">Min Desired Reservation Term:</span>
          <span className="value">{listing.minimumWeeks} weeks</span>
        </div>
        <div className="guideline-row">
          <span className="label">Max Desired Reservation Term:</span>
          <span className="value">{listing.maximumWeeks} weeks</span>
        </div>
      </div>

      <h3>Section 8: Listing Unique Settings</h3>

      <div className="unique-settings-grid">
        <div className="setting-row">
          <span className="label">SL Unit Markup:</span>
          <span className="value">{formatPercentage(listing.unitMarkup)}</span>
        </div>
        <div className="setting-row">
          <span className="label">Price Override:</span>
          <span className="value">
            {listing.priceOverride ? formatCurrency(listing.priceOverride) : 'None'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HostPricesSection;
