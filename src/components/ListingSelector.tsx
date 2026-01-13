import React from 'react';
import { Listing } from '../types/pricing.types';
import { formatListingCaption, formatDate } from '../utils/formatters';

interface ListingSelectorProps {
  listings: Listing[];
  selectedListing: Listing | null;
  onSelect: (listing: Listing | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onReset?: () => void;
}

export const ListingSelector: React.FC<ListingSelectorProps> = ({
  listings,
  selectedListing,
  onSelect,
  searchQuery,
  onSearchChange,
  onReset,
}) => {
  const handleReset = () => {
    onSelect(null);
    onSearchChange('');
    if (onReset) onReset();
  };

  return (
    <div className="section listing-selector">
      <div className="section-header-row">
        <h3>Section 1: Listing Selection</h3>
        {selectedListing && (
          <button
            type="button"
            className="reset-btn"
            onClick={handleReset}
            title="Reset Input"
          >
            ✕ Remove
          </button>
        )}
      </div>

      <div className="form-group">
        <label>Search Listing using ID, host email, Host or Listing Name:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by ID, host email, host name, or listing name..."
          className="search-input"
        />
      </div>

      <div className="form-group">
        <label>Choose a Listing...</label>
        <select
          value={selectedListing?.id || ''}
          onChange={(e) => {
            const listing = listings.find((l) => l.id === e.target.value) || null;
            onSelect(listing);
          }}
          className="listing-dropdown"
        >
          <option value="">Choose a Listing...</option>
          {listings.map((listing) => (
            <option key={listing.id} value={listing.id}>
              {formatListingCaption(
                listing.name,
                listing.rentalType,
                listing.weeksOffered
              )}
            </option>
          ))}
        </select>
      </div>

      {selectedListing && (
        <div className="selected-listing-info">
          <h4>Listing Schedule Selector's Listing Data</h4>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">Listing Name:</span>
              <span className="value">{selectedListing.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Unique ID:</span>
              <span className="value mono">{selectedListing.id}</span>
            </div>
            <div className="info-row">
              <span className="label">Host Comp Style:</span>
              <span className="value rental-type-badge">{selectedListing.rentalType}</span>
            </div>
            <div className="info-row">
              <span className="label">Weeks Offered:</span>
              <span className="value">{selectedListing.weeksOffered}</span>
            </div>
            <div className="info-row">
              <span className="label">Modified Date:</span>
              <span className="value">{formatDate(selectedListing.modifiedDate)}</span>
            </div>
            <div className="info-row">
              <span className="label">Pricing List Exists:</span>
              <span className={`value ${selectedListing.pricingList ? 'valid' : 'invalid'}`}>
                {selectedListing.pricingList ? 'YES' : 'NO'}
              </span>
            </div>
            <div className="info-row">
              <span className="label"># of Nights Available:</span>
              <span className="value">{selectedListing.numberOfNightsAvailable}</span>
            </div>
            <div className="info-row">
              <span className="label">Host Email:</span>
              <span className="value">{selectedListing.hostEmail || 'N/A'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingSelector;
