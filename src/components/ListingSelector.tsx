import React from 'react';
import { Listing } from '../types/pricing.types';
import { formatListingCaption, formatDate } from '../utils/formatters';

interface ListingSelectorProps {
  listings: Listing[];
  selectedListing: Listing | null;
  onSelect: (listing: Listing | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ListingSelector: React.FC<ListingSelectorProps> = ({
  listings,
  selectedListing,
  onSelect,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="section listing-selector">
      <h3>Step 1 - Listing Selection</h3>

      <div className="form-group">
        <label>Search Listing using ID, host email, Host or Listing Name:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
      </div>

      <div className="form-group">
        <label>D: listing selector</label>
        <select
          value={selectedListing?.id || ''}
          onChange={(e) => {
            const listing = listings.find((l) => l.id === e.target.value) || null;
            onSelect(listing);
          }}
          className="listing-dropdown"
        >
          <option value="">Select a listing...</option>
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
          <div className="info-row">
            <span className="label">Selected:</span>
            <span className="value">{selectedListing.name}</span>
          </div>
          <div className="info-row">
            <span className="label">ID:</span>
            <span className="value">{selectedListing.id}</span>
          </div>
          <div className="info-row">
            <span className="label">Modified:</span>
            <span className="value">{formatDate(selectedListing.modifiedDate)}</span>
          </div>
          <div className="info-row">
            <span className="label">Rental Type:</span>
            <span className="value">{selectedListing.rentalType}</span>
          </div>
          <div className="info-row">
            <span className="label">Pricing List:</span>
            <span className={`value ${selectedListing.pricingList ? 'valid' : 'invalid'}`}>
              {selectedListing.pricingList ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingSelector;
