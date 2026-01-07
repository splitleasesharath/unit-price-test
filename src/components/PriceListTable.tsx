import React from 'react';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { Listing, ZATPriceConfiguration } from '../types/pricing.types';
import { PricingCalculator } from '../services/PricingCalculator';

interface PriceListTableProps {
  listing: Listing | null;
  globalConfig: ZATPriceConfiguration;
  onUpdateStartingNightlyPrice: () => void;
  onUpdatePriceList: () => void;
}

export const PriceListTable: React.FC<PriceListTableProps> = ({
  listing,
  globalConfig,
  onUpdateStartingNightlyPrice,
  onUpdatePriceList,
}) => {
  if (!listing) {
    return (
      <div className="section price-list-table">
        <h3>Section 12: Price List Comparison Table</h3>
        <p className="no-data">Select a listing to view price list</p>
      </div>
    );
  }

  const calculator = new PricingCalculator(listing, globalConfig);
  const priceData = calculator.getPriceListData();

  const startingNightlyPrice = listing.pricingList?.startingNightlyPrice || 0;
  const combinedMarkup = listing.pricingList?.combinedMarkup || 0;
  const fullTimeDiscount = listing.pricingList?.fullTimeDiscount || 0;

  return (
    <div className="section price-list-table">
      <h3>Section 12: Price List Comparison Table</h3>

      <div className="table-header-info">
        <div className="info-item">
          <span className="label">Starting Nightly:</span>
          <span className="value">{formatCurrency(startingNightlyPrice)}</span>
        </div>
        <div className="info-item">
          <span className="label">Combined Markup:</span>
          <span className="value">{formatPercentage(combinedMarkup)}</span>
        </div>
        <div className="info-item">
          <span className="label">Full Time Discount:</span>
          <span className="value">{formatPercentage(fullTimeDiscount)}</span>
        </div>
      </div>

      <div className="table-container">
        <table className="price-table">
          <thead>
            <tr>
              <th>Nights</th>
              <th>Host Compensation</th>
              <th>Unused Nights</th>
              <th>Unused Nights Discount</th>
              <th>Full Time Discount</th>
              <th>Combined Markup</th>
              <th>Markup Multiplier</th>
              <th>Nightly Price</th>
            </tr>
          </thead>
          <tbody>
            {priceData.nightCount.map((night, index) => (
              <tr key={night} className={night === 7 ? 'full-week' : ''}>
                <td className="night-cell">{night} night{night !== 1 ? 's' : ''}</td>
                <td>{formatCurrency(priceData.hostCompensation[index])}</td>
                <td>{priceData.unusedNights[index]}</td>
                <td>{formatPercentage(priceData.unusedNightsDiscount[index])}</td>
                <td>{formatPercentage(priceData.fullTimeDiscount[index])}</td>
                <td>{formatPercentage(priceData.combinedMarkup[index])}</td>
                <td>{priceData.markupDiscountMultiplier[index].toFixed(4)}</td>
                <td className="price-cell">{formatCurrency(priceData.nightlyPrice[index])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-actions">
        <button className="action-btn" onClick={onUpdateStartingNightlyPrice}>
          Update Starting Nightly Price
        </button>
        <button className="action-btn primary" onClick={onUpdatePriceList}>
          Update Price List
        </button>
      </div>
    </div>
  );
};

export default PriceListTable;
