import React from 'react';
import { WeeksOffered } from '../types/pricing.types';

interface ReservationInputsProps {
  selectedNights: number;
  onNightsChange: (nights: number) => void;
  reservationSpanWeeks: number;
  onReservationSpanChange: (weeks: number) => void;
  guestPattern: WeeksOffered;
  onPatternChange: (pattern: WeeksOffered) => void;
}

export const ReservationInputs: React.FC<ReservationInputsProps> = ({
  selectedNights,
  onNightsChange,
  reservationSpanWeeks,
  onReservationSpanChange,
  guestPattern,
  onPatternChange,
}) => {
  const nightOptions = [1, 2, 3, 4, 5, 6, 7];
  const weekOptions = [4, 6, 8, 10, 12, 16, 20, 24, 26];
  const patternOptions: WeeksOffered[] = [
    'Every week',
    'Alternating weeks',
    'First and third',
    'Second and fourth',
  ];

  return (
    <div className="section reservation-inputs">
      <h3>Step 3 - Reservation Parameters</h3>

      <div className="inputs-grid">
        <div className="form-group">
          <label>Selected Nights (per week):</label>
          <select
            value={selectedNights}
            onChange={(e) => onNightsChange(Number(e.target.value))}
            className="nights-dropdown"
          >
            {nightOptions.map((n) => (
              <option key={n} value={n}>
                {n} night{n !== 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Reservation Span (weeks):</label>
          <select
            value={reservationSpanWeeks}
            onChange={(e) => onReservationSpanChange(Number(e.target.value))}
            className="weeks-dropdown"
          >
            {weekOptions.map((w) => (
              <option key={w} value={w}>
                {w} weeks
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Enter # of Weeks (custom):</label>
          <input
            type="number"
            min="1"
            max="52"
            value={reservationSpanWeeks}
            onChange={(e) => onReservationSpanChange(Number(e.target.value) || 4)}
            className="weeks-input"
          />
        </div>

        <div className="form-group">
          <label>Guest Desired Pattern:</label>
          <select
            value={guestPattern}
            onChange={(e) => onPatternChange(e.target.value as WeeksOffered)}
            className="pattern-dropdown"
          >
            {patternOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="day-selector">
        <h4>Day Selection Grid (Listing Schedule Selector)</h4>
        <div className="days-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div
              key={day}
              className={`day-cell ${index < selectedNights + 1 ? 'selected' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
        <p className="selection-summary">
          {selectedNights + 1} days selected = {selectedNights} nights
        </p>
      </div>
    </div>
  );
};

export default ReservationInputs;
