import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { ListingScheduleSelectorOutput, PriceComparisonResult } from '../types/pricing.types';

interface WorkflowFormulaChecksProps {
  calculatedValues: ListingScheduleSelectorOutput | null;
  comparisonResults: Record<string, PriceComparisonResult>;
  onRunChecks: () => void;
}

export const WorkflowFormulaChecks: React.FC<WorkflowFormulaChecksProps> = ({
  calculatedValues,
  comparisonResults,
  onRunChecks,
}) => {
  if (!calculatedValues) {
    return (
      <div className="section workflow-checks">
        <h3>Section 14: Workflow vs Formula Check</h3>
        <p className="no-data">Select a listing and run checks to compare values</p>
      </div>
    );
  }

  const comparisons = [
    {
      label: '4 Week Rent',
      wfLabel: '4 Week Rent WF',
      formulaLabel: '4 week rent',
      key: 'fourWeekRent',
    },
    {
      label: 'Initial Reservation Payment',
      wfLabel: 'Initial Reservation Payment WF',
      formulaLabel: 'Initial Reservation Payment',
      key: 'initialReservationPayment',
    },
    {
      label: 'Listing Nightly Price',
      wfLabel: 'Listing Nightly Price WF',
      formulaLabel: 'Listing Nightly Price',
      key: 'listingNightlyPrice',
    },
    {
      label: 'Total Reservation Price',
      wfLabel: 'Total Reservation Price WF',
      formulaLabel: 'Total Reservation Price',
      key: 'totalReservationPrice',
    },
  ];

  return (
    <div className="section workflow-checks">
      <h3>Section 14: Workflow vs Formula Check</h3>

      <button className="run-checks-btn" onClick={onRunChecks}>
        Run Checks
      </button>

      <div className="checks-table">
        <div className="checks-header">
          <span className="header-cell label-col">Calculation</span>
          <span className="header-cell">Workflow Value</span>
          <span className="header-cell">Formula Value</span>
          <span className="header-cell">Status</span>
        </div>

        {comparisons.map((comp) => {
          const result = comparisonResults[comp.key];
          return (
            <div key={comp.key} className="checks-row">
              <div className="label-col">
                <div className="wf-label">{comp.wfLabel}</div>
                <div className="formula-label">{comp.formulaLabel}</div>
              </div>
              <div className="value-col">
                {result ? formatCurrency(result.workflowValue) : '-'}
              </div>
              <div className="value-col">
                {result ? formatCurrency(result.formulaValue) : '-'}
              </div>
              <div className={`status-col ${result?.matches ? 'match' : 'mismatch'}`}>
                {result ? (result.matches ? 'MATCH' : 'MISMATCH') : '-'}
              </div>
            </div>
          );
        })}
      </div>

      <div className="calculation-summary">
        <h4>Calculation Details</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Listing Nightly Price:</span>
            <span className="value">{formatCurrency(calculatedValues.listingNightlyPrice)}</span>
            <span className="formula">= Markup Multiplier × Prorated Nightly Rate</span>
          </div>
          <div className="summary-item">
            <span className="label">4 Week Rent:</span>
            <span className="value">{formatCurrency(calculatedValues.fourWeekRent)}</span>
            <span className="formula">= Nightly Price × Nights × 4 weeks</span>
          </div>
          <div className="summary-item">
            <span className="label">Initial Payment:</span>
            <span className="value">{formatCurrency(calculatedValues.initialReservationPayment)}</span>
            <span className="formula">= 4 Week Rent + Damage Deposit</span>
          </div>
          <div className="summary-item">
            <span className="label">Total Reservation Price:</span>
            <span className="value">{formatCurrency(calculatedValues.totalReservationPrice)}</span>
            <span className="formula">= Nightly Price × Total Nights in Span</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowFormulaChecks;
