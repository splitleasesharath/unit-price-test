import React, { useState, useEffect } from 'react';
import { WeeksOffered } from '../types/pricing.types';

interface ReservationInputsProps {
  selectedNights: number;
  onNightsChange: (nights: number) => void;
  reservationSpanWeeks: number;
  onReservationSpanChange: (weeks: number) => void;
  guestPattern: WeeksOffered;
  onPatternChange: (pattern: WeeksOffered) => void;
}

// Day abbreviations matching documentation: S M T W T F S
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const ReservationInputs: React.FC<ReservationInputsProps> = ({
  selectedNights,
  onNightsChange,
  reservationSpanWeeks,
  onReservationSpanChange,
  guestPattern,
  onPatternChange,
}) => {
  // Track which days are selected (indices 0-6 for Sun-Sat)
  const [selectedDays, setSelectedDays] = useState<boolean[]>([true, true, true, true, true, false, false]);

  // Reservation span options from documentation: 6 to 26 weeks
  const weekOptions = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

  // Guest pattern options from documentation
  const patternOptions: WeeksOffered[] = [
    'Every week',
    'Alternating weeks',
    'Two weeks on, two weeks off',
    'One week on, one week off',
    'One week on, three weeks off',
  ];

  // Update selectedDays when selectedNights prop changes externally
  useEffect(() => {
    const newSelected = Array(7).fill(false);
    // Select consecutive days starting from Sunday (index 0)
    for (let i = 0; i <= selectedNights && i < 7; i++) {
      newSelected[i] = true;
    }
    setSelectedDays(newSelected);
  }, []);

  // Toggle a day selection
  const toggleDay = (dayIndex: number) => {
    const newSelected = [...selectedDays];
    newSelected[dayIndex] = !newSelected[dayIndex];
    setSelectedDays(newSelected);

    // Count selected days and derive nights (days - 1)
    const selectedCount = newSelected.filter(Boolean).length;
    const nights = Math.max(1, selectedCount - 1);
    onNightsChange(nights);
  };

  // Calculate selected days count
  const selectedDaysCount = selectedDays.filter(Boolean).length;

  return (
    <div className="section reservation-inputs">
      {/* Section 2: Day Selector */}
      <h3>Section 2: Reservation Parameters - Day Selector</h3>

      <div className="day-selector-container">
        <h4>Day of Week Selector</h4>
        <p className="section-desc">Click days to toggle selection (selected days highlighted in blue)</p>

        <div className="day-selector-grid">
          {DAYS.map((day, index) => (
            <button
              key={`${day}-${index}`}
              type="button"
              className={`day-button ${selectedDays[index] ? 'selected' : ''}`}
              onClick={() => toggleDay(index)}
              title={DAY_NAMES[index]}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="selected-nights-display">
          <span className="nights-count">{selectedNights} nights</span>
          <span className="days-info">({selectedDaysCount} days selected)</span>
        </div>
      </div>

      {/* Section 3: Duration Parameters */}
      <h3>Section 3: Reservation Parameters - Duration</h3>

      <div className="inputs-grid">
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
          <label>Guest Pattern:</label>
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

      {/* Quick Night Selection */}
      <div className="quick-night-selection">
        <label>Quick Select Nights:</label>
        <div className="night-buttons">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <button
              key={n}
              type="button"
              className={`night-button ${selectedNights === n ? 'active' : ''}`}
              onClick={() => {
                // Set consecutive days from Sunday
                const newSelected = Array(7).fill(false);
                for (let i = 0; i <= n && i < 7; i++) {
                  newSelected[i] = true;
                }
                setSelectedDays(newSelected);
                onNightsChange(n);
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationInputs;
