Z-PRICING-UNIT-TEST PAGE \- COMPREHENSIVE DESIGN GUIDE

Purpose: This document provides a comprehensive guide for recreating the z-pricing-unit-test Bubble page as a standalone code-based solution. The page serves as a unit testing environment for pricing calculations, comparing different calculation methods (Listing Schedule Selector, Pricing List Structure, and direct formulas) to ensure consistency.

\=== PAGE OVERVIEW \===

The page is organized into distinct sections for testing pricing calculations based on:

1. A selected listing  
2. 2\. Reservation span (in weeks)  
3. 3\. Guest desired pattern

The page displays and compares prices from three different sources of truth:

- Listing Schedule Selector (plugin-based calculations)  
- \- Pricing List Structure (database-stored values)  
- \- Direct on-screen formulas (manual calculations)

\=== SECTION 1: INPUTS \===

STEP 1 \- Listing Selection:

- Element: Dropdown (D: listing selector)  
- \- Type: Dynamic choices  
- \- Data Type: Listing  
- \- Search Expression: Search for Listings where:  
-   \- pricing\_list isn’t empty  
-   \- rental type isn’t empty  
-   \- Sorted by: Modified Date (descending)  
- \- Display Caption: \[Name\] \- \[rental type’s Display\] \- \[Weeks offered’s Display\]

STEP 2 \- Listing Schedule Selector (Plugin):

- Element: Custom plugin element “Listing Schedule Selector”  
- \- Data Source: Parent group’s Listing  
- \- Purpose: This is a reusable element that calculates and exposes various pricing values  
- \- Key Exposed Properties:  
-   \- Prorated Nightly Host Rate (Weekly Rental)  
-   \- Prorated Nightly Host Rate (Monthly Rental)  
-   \- Selected Nights (nights):count  
-   \- Unused Nights Discount  
-   \- Selected Host Rate  
-   \- Total Reservation Price  
-   \- 4 Week Rent  
-   \- Initial Reservation Payment  
-   \- Listing Nightly Price

STEP 3 \- Reservation Parameters:

- Reservation Span (weeks) dropdown: Allows selection of reservation duration  
- \- Enter \# of Weeks: Manual input field for custom week count  
- \- Guest Desired Pattern: Set button for pattern selection

\=== SECTION 2: PRORATED NIGHTLY RATES \===

The page displays prorated nightly rates for three rental types side by side:

COLUMN 1 \- Weekly Rental:

- Label: “Prorated Nightly Rate \- Weekly Rental”  
- \- Formula: Listing Schedule Selector’s Prorated Nightly Host Rate (Weekly Rental)  
- \- Display: Formatted as currency ($X,[XXX.XX](http://XXX.XX))

COLUMN 2 \- Monthly Rental:

- Label: “Prorated Nightly Rate \- Monthly Rental”  
- \- Formula: Listing Schedule Selector’s Prorated Nightly Host Rate (Monthly Rental)  
- \- Display: Formatted as currency

COLUMN 3 \- Prorated Nightly Rate (Monthly) \- Alternative Calculation:

- Label: “Prorated Nightly Rate (Monthly)”  
- \- Formula: Avg Weekly Price’s value (converted to number) / Listing Schedule Selector’s Selected Nights:count  
- \- Display: Formatted as currency

Additional Displayed Values:

- Monthly Average Nightly Price:  
-   Formula: Listing Schedule Selector’s Listing’s Monthly Host Rate / Search for ZAT-Price Configurations:last item’s Avg days per month  
- Average Weekly Price (Monthly Listing):  
-   References: Monthly Avg Nightly Price value

\=== SECTION 3: RENTAL TYPE MULTIPLIERS \===

For each rental type (Monthly, Weekly, Nightly), displays:

- Night price multiplier from Listing Schedule Selector  
- \- The multiplier affects how nightly prices are calculated

Elements:

- Monthly rental type Night price multiplier: Listing Schedule Selector’s Price…  
- \- Weekly rental type Night price multiplier: Listing Schedule Selector’s Price…  
- \- Nightly rental type Night price multiplier: Listing Schedule Selector’s…

\=== SECTION 4: MARKUP AND DISCOUNTS \===

For each rental type, displays combined markup calculation:

Formula Structure:  
Search for ZAT-Price Configurations:each item’s Overall Site Markup:last item

+ Listing Schedule Selector’s Listing’s Unit Markup  
+ \- Listing Schedule Selector’s Unused Nights Discount  
+ \+ 1

Displayed for:

- Markup and Discounts for Monthly Listings  
- \- Markup and Discounts for Weekly Listings    
- \- Markup and Discounts for Nightly Listings

Associated Search Expressions:

- Search for ZAT-Price Configurations:each… (for Weekly)  
- \- Search for ZAT-Pric… (for Nightly)

\=== SECTION 5: RESERVATION SPAN CALCULATIONS \===

Displays calculated values based on selected reservation span:

- Number of Months in Reservation Span: Listing Schedule Selector’s…  
- \- Reservation Span (Weeks): Listing Schedule Selector’s…  
- \- Required Pattern: Listing Schedule Selector’s Guest…  
- \- Actual Weeks 4 Weeks: Listing Schedule Selector’s Actual…  
- \- Actual Weeks During Reservation Span: Listing Schedule Selector’s Actual…

\=== SECTION 6: HOST PRICES INPUT \===

Displays listing host rate information from the Listing Schedule Selector:

Grid Layout:  
Row 1:

- Host Comp Style: Listing Schedule Selector’s…  
- \- Weeks Offered: Listing Schedule Selector’s Listing’s Weeks…

Row 2:

- Weekly Host Rate: Listing Schedule Selector’s…  
- \- Monthly Host Rate: Listing Schedule Selector’s…

Row 3:

- Damage Deposit: Listing Schedule Selector’s Listing’s…  
- \- Cleaning Deposit: Listing Schedule Selector’s Listing’s…

Row 4:

- 2 night Host Rate: Listing Schedule Selector’s Listing’s…  
- \- 3 night Host Rate: Listing Schedule Selector’s Listing’s Nightly…  
- \- 4 night Host Rate: Listing Schedule Selector’s Listing’s…  
- \- 5 night Host Rate: Listing Schedule Selector’s…

Row 5:

- Nights available: Listing Schedule Selector’s Listing’s Nights  
- \- Nights/Wk available: Listing…

\=== SECTION 7: HOST GUIDELINES \===

Displays minimum and maximum constraints from the listing:

- Minimum Nights Desired by Host: Listing Schedule…  
- \- Minimum Days Desired by Host: Listing Schedule…  
- \- Maximum Nights Desired by Host: Listing Schedule Selector’s…  
- \- Maximum Days Desired by Host: Listing Schedule Selector’s…  
- \- Min Desired Reservation Term: Listing Schedule Selector’s…  
- \- Max Desired Reservation Term: Listing Schedule Selector’s…

\=== SECTION 8: LISTING UNIQUE SETTINGS \===

- Unused Nights: Listing Schedule…  
- \- SL Unit Markup: Listing Schedule Selector’s…

\=== SECTION 9: SL UNIT SETTINGS \===

- Price Override: Listing Schedule…  
- \- Nightly Discount Rate, Weekly Model: Listing Schedule…  
- \- Unused Nights Discount Rate: Listing Schedule…  
- \- Unused Nights Discount: Listing Schedule…

\=== SECTION 10: DATA VALIDATION FLAGS \===

Boolean indicators for data quality:

- Price exists: (empty/filled indicator)  
- \- Rental type selected: (empty/filled indicator)  
- \- Min and Max Nights Makes Sense: YES/NO indicator  
- \- Unused nights discount is m…: “need to fix with database e…”  
- \- All Good: Overall validation status

\=== SECTION 11: ZAT-PRICE CONFIGURATION (DATABASE) \===

Database search results for site-wide pricing configuration:

Search Expression: Search for ZAT-Price Configurations (most recent)

Displayed Fields:

- Unused nights discount multiplier: Search f…  
- \- Weekly Price Adj: Search f…  
- \- Overall Site Markup: Search f…  
- \- Average days per month: Search…  
- \- Full Time (7 Nights): Search…

\=== SECTION 12: PRICE LIST COMPARISON TABLE \===

A comprehensive table comparing prices across different sources:

HEADERS:

- Row identifiers: 1 night, 2 night, 3 night, 4 night, 5 night, 6 night…, 7 night

COLUMNS:

1. Price map: G: Workflow Double Check’s…  
2. 2\. Starting nightly: G: Workflow Double Check’s…  
3. 3\. Host Compensation: G: Workflow Double Check’s Listing’s pricing\_list’s Host Compensation:first item’s num  
4. 4\. Unused Nights: G: Workflow Double Check’s…  
5. 5\. Unused Nights Discounts: G: Workflow Double Check’s…  
6. 6\. Full Time Discount: G: Workflow Dou…  
7. 7\. Combined Markup: G: Workflow Dou…  
8. 8\. Discounts and Markups Multiplier: G: Workflow…  
9. 9\. Nightly Price: G: Workflow Double Check’s…

Data Source Structure:

- References: G: Workflow Double Check (group element)  
- \- Path: Listing → pricing\_list → \[specific field\]:first item’s num  
- \- Format: Formatted as currency ($X,[XXX.XX](http://XXX.XX))

Action Buttons:

- “Update Starting Nightly Price”: Triggers workflow  
- \- “Update Price List”: Triggers workflow

\=== SECTION 13: PRICING LIST SECTIONS \===

Two columns showing different calculation approaches:

PRICING LIST WEEKLY:

- Source: Listing Schedule Selector’s Listing…  
- \- Uses weekly pricing list data

PRICING LIST MONTHLY:

- Source: Listing Schedule Selector’s Listing…  
- \- Uses monthly pricing list data

\=== SECTION 14: WORKFLOW VS FORMULA CHECK \===

Critical comparison section for validation:

“Run Checks” Button \- Triggers comparison workflow

Comparison Rows (Workflow | Formula):

1. 4 Week Rent WF | 4 week rent  
2.    \- WF: Listing Schedule…  
3.    \- Formula: Listing Nightly Price Formula’s value:com…

2\. Initial Reservation Payment WF | Initial Reservation Payment

- WF: Listing Schedule…  
-    \- Formula: 4 week rent calculation formulas…

3\. Listing Nightly Price WF | Listing Nightly Pri…

- WF: Listing Schedule…  
-    \- Formula: Markups and Discounts’s value  
4. Total Reservation Price | Total Reservation P…  
5.    \- WF: Listing Schedule Selector’s…  
6.    \- Formula: Listing Nightly Pri Formula’s value:co…

\=== SECTION 15: BUBBLE WORKFLOW SECTION \===

Contains additional workflow-related calculations:

- Arrow indicator (-\>) for navigation/flow  
- \- G: Workflow Double Check’s L… references

\=== KEY DATA TYPES AND STRUCTURES \===

LISTING (Database Type):

- Pricing\_list: List of price configuration objects  
- \- rental\_type: Reference to rental type  
- \- Monthly Host Rate: Number  
- \- Weekly Host Rate: Number  
- \- Unit Markup: Number  
- \- Nights: Number/List  
- \- Weeks offered: Option set

PRICING\_LIST (Nested Structure):

- Host Compensation: Number (accessed via :first item’s num)  
- \- Unused Nights: Number  
- \- Unused Nights Discounts: Number  
- \- Full Time Discount: Number  
- \- Combined Markup: Number  
- \- Discounts and Markups Multiplier: Number  
- \- Nightly Price: Number

ZAT-PRICE CONFIGURATIONS (Database Type):

- Overall Site Markup: Number  
- \- Avg days per month: Number  
- \- Unused nights discount multiplier: Number  
- \- Weekly Price Adj: Number  
- \- Full Time (7 Nights): Number

\=== SEARCH EXPRESSIONS USED \===

1. Listing Search:  
2.    Search for Listings  
3.    \- Constraint: pricing\_list isn’t empty  
4.    \- Constraint: rental type isn’t empty  
5.    \- Sort: Modified Date (descending)

2\. ZAT-Price Configurations Search:  
   Search for ZAT-Price Configurations

- Access: :last item (for most recent)  
-    \- Or: :each item’s \[field\] for iteration

\=== RECOMMENDATIONS FOR CODE RECREATION \===

1. DATA LAYER:  
2.    \- Create database models for: Listing, PricingList, ZATConfiguration, RentalType  
3.    \- Implement relationship: Listing has\_many PricingList items  
4.    \- Store ZAT configurations in a settings table

2\. INPUT HANDLING:

- Implement listing selector with filtered search  
-    \- Create reservation span selector with week options  
-    \- Build pattern selection interface

3\. CALCULATION ENGINE:

- Create a PricingCalculator service class  
-    \- Implement methods for:  
-      \- calculateProratedNightlyRate(listing, rentalType, nights)  
-      \- calculateMarkupsAndDiscounts(listing, zatConfig)  
-      \- calculateTotalReservationPrice(...)  
-    \- Support all three rental types: Monthly, Weekly, Nightly

4\. COMPARISON FRAMEWORK:

- Build a ComparisonService that runs all calculation methods  
-    \- Flag discrepancies between:  
-      \- Workflow calculations  
-      \- Formula calculations    
-      \- Database-stored values  
-    \- Implement “Run Checks” functionality  
5. UI ORGANIZATION:  
6.    For better comparison when recreating:  
7.    \- Group related displays in logical sections  
8.    \- Use a table-based layout for the price list  
9.    \- Implement collapsible sections for different rental types  
10.    \- Add clear visual indicators for validation status

6\. TESTING APPROACH:

- Unit test each calculation formula independently  
-    \- Create integration tests comparing all three sources  
-    \- Implement automated regression testing  
-    \- Add logging for calculation debugging

\=== FORMULA DOCUMENTATION \===

KEY FORMULAS:

1. Prorated Nightly Rate (Monthly):  
2.    \= Avg Weekly Price / Selected Nights Count

2\. Monthly Avg Nightly Price:  
   \= Monthly Host Rate / Avg Days Per Month

3. Markup and Discounts Multiplier:  
4.    \= ZAT Overall Site Markup \+ Unit Markup \- Unused Nights Discount \+ 1

4\. Price from Pricing List:  
   \= Listing.pricing\_list.Host\_Compensation\[index\].num

5. Nightly Price Calculation:  
6.    \= Base Rate × Markup Multiplier × Night Price Multiplier

\=== ELEMENT GROUPS HIERARCHY \===

Group E (Main Container)  
├── Group: Search Listing  
│   ├── D: listing selector (dropdown)  
│   ├── Text: listing selector’s value  
│   └── Listing Schedule Selector (plugin)  
├── Group DZZZ: Prorated Rates Section  
├── Group BZZ: Multipliers Section  
├── Group: Host Prices Input  
├── Group: Host Guidelines  
├── Group: Listing Unique Settings  
├── Group: SL Unit Settings  
├── Group: ZAT-Price Configuration  
├── G: Workflow Double Check (Price List table)  
├── Group: Pricing List Weekly/Monthly  
└── Group: Workflow vs Formula Check

\=== END OF DOCUMENT \===