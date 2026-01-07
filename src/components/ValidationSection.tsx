import React from 'react';
import { ValidationFlags } from '../types/pricing.types';

interface ValidationSectionProps {
  validationFlags: ValidationFlags | null;
}

export const ValidationSection: React.FC<ValidationSectionProps> = ({ validationFlags }) => {
  if (!validationFlags) {
    return (
      <div className="section validation">
        <h3>Section 10: Data Validation Flags</h3>
        <p className="no-data">Select a listing to view validation status</p>
      </div>
    );
  }

  const ValidationItem: React.FC<{ label: string; value: boolean; invertDisplay?: boolean }> = ({
    label,
    value,
    invertDisplay = false,
  }) => {
    const displayValue = invertDisplay ? !value : value;
    return (
      <div className={`validation-item ${displayValue ? 'valid' : 'invalid'}`}>
        <span className="indicator">{displayValue ? '✓' : '✗'}</span>
        <span className="label">{label}</span>
        <span className="status">{displayValue ? 'YES' : 'NO'}</span>
      </div>
    );
  };

  return (
    <div className="section validation">
      <h3>Section 10: Data Validation Flags</h3>

      <div className="validation-grid">
        <ValidationItem label="Price exists" value={validationFlags.priceExists} />
        <ValidationItem label="Rental type selected" value={validationFlags.rentalTypeSelected} />
        <ValidationItem label="Appears in Search" value={validationFlags.appearsInSearch} />
        <ValidationItem label="Discounts are positive" value={validationFlags.discountsArePositive} />
        <ValidationItem
          label="Unused nights discount not decreasing"
          value={validationFlags.unusedNightsDiscountNotDecreasing}
        />
        <ValidationItem
          label="Min and Max Nights Makes Sense"
          value={validationFlags.minMaxNightsMakesSense}
        />
        <ValidationItem
          label="Nightly Pricing All Good"
          value={validationFlags.nightlyPricingAllGood}
        />
      </div>

      <div className={`all-good-indicator ${validationFlags.allGood ? 'valid' : 'invalid'}`}>
        <span className="label">All Good:</span>
        <span className="status">{validationFlags.allGood ? 'YES' : 'NO'}</span>
      </div>
    </div>
  );
};

export default ValidationSection;
