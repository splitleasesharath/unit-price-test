import React from 'react';
import { formatPercentage } from '../utils/formatters';
import { ZATPriceConfiguration } from '../types/pricing.types';

interface ZATConfigSectionProps {
  globalConfig: ZATPriceConfiguration;
}

export const ZATConfigSection: React.FC<ZATConfigSectionProps> = ({ globalConfig }) => {
  return (
    <div className="section zat-config">
      <h3>Section 11: ZAT-Price Configuration (Database)</h3>
      <p className="section-desc">
        Search for ZAT-Price Configurations (most recent)
      </p>

      <div className="config-grid">
        <div className="config-row">
          <span className="label">Unused nights discount multiplier:</span>
          <span className="value">{formatPercentage(globalConfig.unusedNightsDiscountMultiplier)}</span>
        </div>
        <div className="config-row">
          <span className="label">Weekly Price Adj:</span>
          <span className="value">{formatPercentage(globalConfig.weeklyMarkup)}</span>
        </div>
        <div className="config-row">
          <span className="label">Overall Site Markup:</span>
          <span className="value">{formatPercentage(globalConfig.overallSiteMarkup)}</span>
        </div>
        <div className="config-row">
          <span className="label">Average days per month:</span>
          <span className="value">{globalConfig.avgDaysPerMonth}</span>
        </div>
        <div className="config-row">
          <span className="label">Full Time (7 Nights):</span>
          <span className="value">{formatPercentage(globalConfig.fullTime7NightsDiscount)}</span>
        </div>
      </div>
    </div>
  );
};

export default ZATConfigSection;
