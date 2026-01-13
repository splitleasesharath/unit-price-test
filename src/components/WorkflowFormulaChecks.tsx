import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatters';
import { ListingScheduleSelectorOutput, PriceComparisonResult } from '../types/pricing.types';

interface WorkflowFormulaChecksProps {
  calculatedValues: ListingScheduleSelectorOutput | null;
  comparisonResults: Record<string, PriceComparisonResult>;
  onRunChecks: () => void;
}

/**
 * Workflow vs Formula Check Section
 * From documentation:
 * - Listing Nightly Price WF vs Listing Nightly Price Formula's value
 * - 4 Week Rent WF vs 4 week rent calculation formula
 * - Initial Reservation Payment WF vs Initial Reservation Payment formula
 *
 * This dual-calculation approach allows developers to verify calculation consistency.
 */
export const WorkflowFormulaChecks: React.FC<WorkflowFormulaChecksProps> = ({
  calculatedValues,
  comparisonResults,
  onRunChecks,
}) => {
  const [checksRun, setChecksRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunChecks = () => {
    setIsRunning(true);
    // Simulate API call delay
    setTimeout(() => {
      onRunChecks();
      setChecksRun(true);
      setIsRunning(false);
    }, 500);
  };

  if (!calculatedValues) {
    return (
      <div className="section workflow-checks">
        <h3>Workflow vs Formula Check</h3>
        <p className="no-data">Select a listing and run checks to compare values</p>
        <button className="run-checks-btn" disabled>
          Run Checks
        </button>
      </div>
    );
  }

  // Comparison items from documentation
  const comparisons = [
    {
      label: 'Listing Nightly Price',
      wfLabel: 'Listing Nightly Price WF',
      formulaLabel: "Listing Nightly Price Formula's value",
      key: 'listingNightlyPrice',
      description: 'Calculated nightly price after markups/discounts',
    },
    {
      label: '4 Week Rent',
      wfLabel: '4 Week Rent WF',
      formulaLabel: '4 week rent calculation formula',
      key: 'fourWeekRent',
      description: 'Nightly × Nights × Actual Weeks During 4 Week',
    },
    {
      label: 'Initial Reservation Payment',
      wfLabel: 'Initial Reservation Payment WF',
      formulaLabel: 'Initial Reservation Payment',
      key: 'initialReservationPayment',
      description: '4 Week Rent + Damage Deposit',
    },
    {
      label: 'Total Reservation Price',
      wfLabel: 'Total Reservation Price WF',
      formulaLabel: 'Total Reservation Price',
      key: 'totalReservationPrice',
      description: 'Nightly × Nights × Actual Weeks During Reservation Span',
    },
  ];

  const allMatch = Object.values(comparisonResults).every((r) => r.matches);

  return (
    <div className="section workflow-checks">
      <h3>Workflow vs Formula Check</h3>
      <p className="section-desc">
        Compare workflow-generated prices against formula-based calculations to detect discrepancies.
      </p>

      <div className="checks-actions">
        <button
          className={`run-checks-btn ${isRunning ? 'loading' : ''}`}
          onClick={handleRunChecks}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Run Checks'}
        </button>
        {checksRun && (
          <span className={`overall-status ${allMatch ? 'match' : 'mismatch'}`}>
            {allMatch ? '✓ All calculations match' : '✗ Discrepancies found'}
          </span>
        )}
      </div>

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
                {result ? (result.matches ? 'MATCH ✓' : 'MISMATCH ✗') : 'Pending'}
              </div>
            </div>
          );
        })}
      </div>

      <div className="calculation-summary">
        <h4>Formula Breakdown</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Listing Nightly Price:</span>
            <span className="value">{formatCurrency(calculatedValues.listingNightlyPrice)}</span>
            <span className="formula">= Markup Discount Multiplier × Prorated Nightly Rate</span>
          </div>
          <div className="summary-item">
            <span className="label">4 Week Rent:</span>
            <span className="value">{formatCurrency(calculatedValues.fourWeekRent)}</span>
            <span className="formula">
              = {formatCurrency(calculatedValues.listingNightlyPrice)} × {calculatedValues.selectedNights} nights × {calculatedValues.actualWeeksDuring4Week} weeks
            </span>
          </div>
          <div className="summary-item">
            <span className="label">Initial Payment:</span>
            <span className="value">{formatCurrency(calculatedValues.initialReservationPayment)}</span>
            <span className="formula">= 4 Week Rent + Damage Deposit</span>
          </div>
          <div className="summary-item">
            <span className="label">Total Reservation Price:</span>
            <span className="value">{formatCurrency(calculatedValues.totalReservationPrice)}</span>
            <span className="formula">
              = {formatCurrency(calculatedValues.listingNightlyPrice)} × {calculatedValues.selectedNights} nights × {calculatedValues.actualWeeksDuringReservationSpan} weeks
            </span>
          </div>
        </div>
      </div>

      {/* G: Workflow Double Check - for debugging */}
      <div className="double-check-section">
        <h4>G: Workflow Double Check</h4>
        <p className="section-desc">Double-check validation of workflow-generated pricing vs formula-based pricing</p>
        <div className="double-check-values">
          <div className="check-item">
            <span className="label">Selected Host Rate (Nightly Model):</span>
            <span className="value">{formatCurrency(calculatedValues.selectedHostRateNightlyModel)}</span>
          </div>
          <div className="check-item">
            <span className="label">Nights Number:</span>
            <span className="value">{calculatedValues.nightsNumber}</span>
          </div>
          <div className="check-item">
            <span className="label">Actual Weeks During 4 Week:</span>
            <span className="value">{calculatedValues.actualWeeksDuring4Week}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowFormulaChecks;
