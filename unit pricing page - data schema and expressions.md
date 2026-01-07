Z-PRICING-UNIT-TEST PAGE \- COMPREHENSIVE PRICING GUIDE

This document provides a detailed analysis of the z-pricing-unit-test page from the Split Lease Bubble application. This page is used to test and compare pricing calculations from different sources: the Listing Schedule Selector component, stored pricing list structures, and direct formulas.

\================================================================================  
SECTION 1: PAGE OVERVIEW  
\================================================================================

The z-pricing-unit-test page is a testing/debugging page that allows:

1. Selecting a listing from the database  
2. 2\. Setting a reservation span (in weeks)  
3. 3\. Setting a guest desired pattern  
4. 4\. Viewing and comparing calculated prices from multiple sources

The page compares three sources of truth:

- Calculations from the Listing Schedule Selector reusable element  
- \- Calculations stored in the pricing\_list database structure  
- \- Direct formulas calculated on screen

\================================================================================  
SECTION 2: DATA SCHEMA  
\================================================================================

2.1 LISTING DATA TYPE  
—------------------  
Primary entity containing property information and pricing inputs.

Key Pricing Fields:

- \# of nights available (number, default: 7\) \- nights per week listing is available  
- \- rental type (Rental Type option set) \- Monthly, Weekly, or Nightly  
- \- Weeks offered (Weekly Selection options) \- Every week, etc.  
- \- pricing\_list (pricing\_list type) \- contains pre-calculated pricing data  
- \- Standardized Minimum Nightly Price (number) \- used for search filtering

Host Rate Fields (💰 prefix):

- 💰Monthly Host Rate (number) \- host compensation for monthly rentals  
- \- 💰Weekly Host Rate (number) \- host compensation for weekly rentals  
- \- 💰Nightly Host Rate for 2 nights (number)  
- \- 💰Nightly Host Rate for 3 nights (number)  
- \- 💰Nightly Host Rate for 4 nights (number)  
- \- 💰Nightly Host Rate for 5 nights (number)

Fee Fields:

- 💰Damage Deposit (number, default: 0\)  
- \- 💰Cleaning Cost / Maintenance Fee (number, default: 0\)  
- \- 💰Nightly Utilities (number)

Override Fields:

- 💰Price Override (number) \- overrides calculated price  
- \- 💰Unit Markup (number, default: 0\) \- listing-specific markup percentage

Constraint Fields:

- Minimum Nights (number, default: 2\)  
- \- Maximum Nights (number)  
- \- Minimum Weeks (number, default: 6\)  
- \- Maximum Weeks (number, default: 26\)  
- \- Minimum Months (number)  
- \- Maximum Months (number)

Availability Fields:

- Days Available (List of Days) \- which days of week available  
- \- Days Not Available (List of Days)  
- \- Nights Available (List of Nights)  
- \- Nights Not Available (List of Nights)  
- \- Dates \- Blocked (List of dates)  
- \- Dates \- Booked Dates (List of dates)

2.2 PRICING\_LIST DATA TYPE  
—-----------------------  
Pre-calculated pricing structure stored on each Listing.

Fields:

- Starting Nightly Price (number) \- base price before adjustments  
- \- Nightly Price (List of nums) \- prices for 1-7 nights  
- \- Host Compensation (List of nums) \- host payment amounts for 1-7 nights  
- \- Combined Markup (number) \- total markup percentage  
- \- Overall Site Markup (number) \- site-wide markup  
- \- Unit Markup (number) \- listing-specific markup  
- \- Full Time Discount (number) \- discount for 7-night stays  
- \- Weekly Price Adjust (number) \- weekly rate adjustment  
- \- Unused Nights (List of nums) \- unused nights for each stay length  
- \- Unused Nights Discount (List of nums) \- discounts for unused nights  
- \- Markup and Discount Multiplier (List of nums) \- combined multipliers  
- \- Number Selected Nights (List of numbers) \- night counts  
- \- Slope (number) \- price curve slope

2.3 ZAT-PRICE CONFIGURATION DATA TYPE  
—----------------------------------  
Global pricing configuration settings (single record, most recent is used).

Fields:

- Overall Site Markup (number) \- site-wide markup percentage  
- \- Weekly Markup (number) \- adjustment for weekly rentals  
- \- Unused Nights Discount Multiplier (number) \- global unused nights discount  
- \- Avg days per month (number) \- used for monthly rate calculations  
- \- full time (7 nights) Discount (number) \- discount for full-week stays  
- \- Min Price per night (number) \- minimum allowed nightly price  
- \- Max Price per night (number) \- maximum allowed nightly price  
- \- Suggestion Additional P… (number) \- price suggestion parameters  
- \- Suggestion Bedrooms M… (number)  
- \- Suggestion Beds Multip… (number)

2.4 RENTAL TYPE OPTION SET  
—-----------------------  
Options: Monthly, Weekly, Nightly  
Each option has:

- Display name  
- \- Night price multiplier

\================================================================================  
SECTION 3: INPUT FIELDS ON THE PAGE  
\================================================================================

3.1 LISTING SELECTION (Section 1\)  
—------------------------------  
Search Input: “Search Listing using ID, host email, Host or Listing Name”

- Filters listings for selection

Listing Dropdown: “D: listing selector”

- Type of choices: Listing  
- \- Choices source: Search for Listings  
- \- Search constraints:   
-   \* pricing\_list isn’t empty  
-   \* rental type isn’t empty  
- \- Sort by: Modified Date (descending)  
- \- Option caption: Current option’s Name \- Current option’s rental type’s Display \- Current option’s Weeks offered’s Display

3.2 LISTING SCHEDULE SELECTOR (Section 2\)  
—--------------------------------------  
Reusable element: “Listing Schedule Selector”

- Data source: Parent group’s Listing (from dropdown selection)  
- \- Contains day selection grid (RG Days repeating group)  
- \- Calculates all pricing based on selected days and listing data

Key outputs from this element:

- Selected Days (days count)  
- \- Selected Nights (nights count)  
- \- Reservation Span (Weeks)  
- \- Guest Desired Pattern  
- \- Prorated Nightly Host Rate (Weekly Rental)  
- \- Prorated Nightly Host Rate (Monthly Rental)  
- \- Price Multiplier @ Monthly Rental  
- \- Price Multiplier @ Weekly Rental  
- \- Price Multiplier @ Nightly Rental  
- \- Unused Nights  
- \- Unused Nights Discount  
- \- Unused Nights Discount Rate  
- \- Nightly Discount Rate, Weekly Model  
- \- Initial Reservation Payment  
- \- Selected Host Rate (Nightly Model)  
- \- Number of Months In Reservation Span  
- \- Actual Weeks During Reservation Span  
- \- Actual Weeks During 4 Week

3.3 RESERVATION SPAN INPUT (Section 3\)  
—-----------------------------------  
Dropdown: “Reservation Span”

- Sets the number of weeks for reservation calculation

Input: “Enter \# of Weeks”

- Manual entry for weeks

Guest Desired Pattern: Dropdown for selecting pattern

\================================================================================  
SECTION 4: KEY EXPRESSIONS AND FORMULAS  
\================================================================================

4.1 PRORATED NIGHTLY RATE CALCULATIONS  
—-----------------------------------

For Weekly Rental:  
Expression: Listing Schedule Selector’s Prorated Nightly Host Rate (Weekly Rental)  
This is a calculated field from the Listing Schedule Selector component.

For Monthly Rental:  
Expression: Listing Schedule Selector’s Prorated Nightly Host Rate (Monthly Rental)

4.2 MARKUP AND DISCOUNT FORMULA  
—----------------------------  
The combined markup and discount multiplier:

Formula: Search for ZAT-Price Configurations:each item’s Overall Site Markup:last item 

+ Listing Schedule Selector’s Listing’s 💰Unit Markup   
+          \- Listing Schedule Selector’s Unused Nights Discount   
+          \+ 1

Components:

1. Overall Site Markup: Global markup from ZAT-Price Configuration  
2. 2\. Unit Markup: Listing-specific markup (💰Unit Markup field)  
3. 3\. Unused Nights Discount: Calculated based on unused nights in the week

4.3 AVERAGE WEEKLY PRICE (Monthly Listing)  
—---------------------------------------  
Formula: Listing Schedule Selector’s Listing’s 💰Weekly Host Rate / Listing Schedule Selector’s Nights/Week

This divides the weekly host rate by the number of nights per week available.

4.4 NIGHTLY PRICE FORMULA  
—----------------------  
Formula: Listing Nightly Price Formula’s value:converted to number \* Listing Schedule Selector’s Nights \[...\]

The nightly price is calculated and then multiplied by the number of nights.

4.5 4-WEEK RENT CALCULATION  
—------------------------  
Formula: 4 week rent calculation formula’s number \+ Listing Schedule Selector’s Listing’s 💰Damage Deposit \[...\]

Adds the damage deposit to the 4-week rent calculation.

4.6 TOTAL RESERVATION PRICE  
—------------------------  
Formula: Listing Nightly Price Formula’s value:converted to number \* Listing Schedule Selector’s Nights \[...\]

\================================================================================  
SECTION 5: HOST PRICES INPUT DISPLAY  
\================================================================================

These fields display the listing’s host rates from the database:

Host Comp Style: Listing Schedule Selector’s Listing’s rental type’s Display  
Weekly Host Rate: Listing Schedule Selector’s Listing’s 💰Weekly Host Rate  
Monthly Host Rate: Listing Schedule Selector’s Listing’s 💰Monthly Host Rate  
2 night Host Rate: Listing Schedule Selector’s Listing’s 💰Nightly Host Rate for 2 nights  
3 night Host Rate: Listing Schedule Selector’s Listing’s 💰Nightly Host Rate for 3 nights  
4 night Host Rate: Listing Schedule Selector’s Listing’s 💰Nightly Host Rate for 4 nights  
5 night Host Rate: Listing Schedule Selector’s Listing’s 💰Nightly Host Rate for 5 nights  
Damage Deposit: Listing Schedule Selector’s Listing’s 💰Damage Deposit  
Cleaning Deposit: Listing Schedule Selector’s Listing’s 💰Cleaning Cost / Maintenance Fee  
Nights available: Listing Schedule Selector’s Listing’s Nights Available (List of Nights):each item’s Display  
Weeks Offered: Listing Schedule Selector’s Listing’s Weeks offered’s Display  
Nights/Wk available: Listing Schedule Selector’s Listing’s \# of nights available

\================================================================================  
SECTION 6: HOST GUIDELINES DISPLAY  
\================================================================================

Minimum Nights Desired by Host: Listing Schedule Selector’s Listing’s Minimum Nights  
Maximum Nights Desired by Host: Listing Schedule Selector’s Listing’s Maximum Nights  
Minimum Days Desired by Host: Listing Schedule Selector’s Listing’s Minimum Nights \+ 1  
Maximum Days Desired by Host: Listing Schedule Selector’s Listing’s Maximum Nights \+ 1  
Min Desired Reservation Term (Weeks): Listing Schedule Selector’s Listing’s Minimum Weeks  
Max Desired Reservation Term (Weeks): Listing Schedule Selector’s Listing’s Maximum Weeks

\================================================================================  
SECTION 7: LISTING UNIQUE SETTINGS  
\================================================================================

Unused Nights: Listing Schedule Selector’s Unused Nights  
Unused Nights Discount Rate: Listing Schedule Selector’s Unused Nights Discount Rate  
Unused Nights Discount: Listing Schedule Selector’s Unused Nights Discount  
Nightly Discount Rate, Weekly Model: Listing Schedule Selector’s Nightly Discount Rate, Weekly Model  
Actual Weeks 4 Weeks: Listing Schedule Selector’s Actual Weeks During 4 Week  
Actual Weeks During Reservation Span: Listing Schedule Selector’s Actual Weeks During Reservation Span  
Number of Months in Reservation Span: Listing Schedule Selector’s Number of Months In Reservation Span

\================================================================================  
SECTION 8: SL UNIT SETTINGS  
\================================================================================

Price Override: Listing Schedule Selector’s Listing’s 💰Price Override  
SL Unit Markup: Listing Schedule Selector’s Listing’s 💰Unit Markup \* 100%

\================================================================================  
SECTION 9: ZAT-PRICE CONFIGURATION (DATABASE)  
\================================================================================

These are global configuration values retrieved from the database:

Unused nights discount multiplier: Search for ZAT-Price Configurations:each item’s Unused Nights Discount Multiplier:last item  
Weekly Price Adj: Search for ZAT-Price Configurations:each item’s Weekly Markup:last item  
Overall Site Markup: Search for ZAT-Price Configurations:each item’s Overall Site Markup:last item  
Average days per month: Search for ZAT-Price Configurations:each item’s Avg days per month:last item  
Full Time (7 Nights): Search for ZAT-Price Configurations:each item’s full time (7 nights) Discount:last item

\================================================================================  
SECTION 10: PRICE LIST GRID (FROM DATABASE)  
\================================================================================

The pricing list grid displays pre-calculated values from the listing’s pricing\_list:

Starting nightly: G: Workflow Double Check’s Listing’s pricing\_list’s Starting Nightly Price  
Price map: G: Workflow Double Check’s Listing’s Price number (for map)  
Combined Markup: G: Workflow Double Check’s Listing’s pricing\_list’s Combined Markup  
Full Time Discount: G: Workflow Double Check’s Listing’s pricing\_list’s Full Time Discount

For each night (1-7):

- Host Compensation: pricing\_list’s Host Compensation:item \#N’s num  
- \- Unused Nights: pricing\_list’s Unused Nights:item \#N’s num  
- \- Unused Nights Discounts: pricing\_list’s Unused Nights Discount:item \#N’s num  
- \- Discounts and Markups Multiplier: pricing\_list’s Markup and Discount Multiplier:item \#N’s num  
- \- Nightly Price: pricing\_list’s Nightly Price:item \#N’s num

\================================================================================  
SECTION 11: WORKFLOW VS FORMULA CHECKS  
\================================================================================

This section compares values from workflows vs direct formulas:

4 Week Rent WF vs 4 week rent formula  
Initial Reservation Payment WF vs Initial Reservation Payment formula  
Listing Nightly Price WF vs Listing Nightly Price (Markups and Discounts’s value)  
Total Reservation Price WF vs Total Reservation Price formula

\================================================================================  
SECTION 12: DATA CHECK SCORECARD  
\================================================================================

Validation checks displayed:

- Price exists  
- \- Rental type selected  
- \- Appears in Search: “NO\!” if not searchable  
- \- Discounts are positive  
- \- Unused nights discount is not decreasing  
- \- Min and Max Nights Makes Sense  
- \- Nightly Pricing All Good

\================================================================================  
SECTION 13: KEY BACKEND WORKFLOWS  
\================================================================================

Related pricing workflows in the backend:

- CORE-Calculate\_CombinedMarkup  
- \- CORE-calculate\_price\_discounts\_r  
- \- CORE-Delete Faulty Pricinglists  
- \- CORE-Find lowest nightly price  
- \- Core-markups\_and\_discounts  
- \- CORE-save\_pricing\_robert  
- \- CORE-Set Empty Pricing (7x loop)  
- \- CORE-Set Nightly Host Comp\_Robert  
- \- CORE-Set Standardized Minimum\_nightly\_price\_for\_filter

\================================================================================  
SECTION 14: CONVERSION TO CODE CONSIDERATIONS  
\================================================================================

When converting this to code outside of Bubble, consider:

14.1 Data Structures to Create:

- Listing object with all pricing fields  
- \- PricingList object with arrays for night-based values  
- \- ZATPriceConfiguration object for global settings  
- \- RentalType enum (Monthly, Weekly, Nightly)

14.2 Key Calculations to Implement:

1. Unused Nights Calculation: 7 \- selected\_nights  
2. 2\. Unused Nights Discount: unused\_nights \* unused\_nights\_discount\_multiplier  
3. 3\. Combined Markup: overall\_site\_markup \+ unit\_markup \- unused\_nights\_discount \+ 1  
4. 4\. Prorated Nightly Rate: Based on rental type and host rates  
5. 5\. Nightly Price: base\_price \* markup\_multiplier  
6. 6\. Total Reservation Price: nightly\_price \* nights \+ fees

14.3 Validation Rules:

- Listing must have pricing\_list  
- \- Listing must have rental type  
- \- Price must be positive  
- \- Discounts must be positive  
- \- Min nights \<= Max nights

\================================================================================  
END OF DOCUMENT  
\================================================================================

\================================================================================  
\================================================================================  
SECOND PASS ANALYSIS \- DETAILED FORMULAS AND CALCULATIONS  
\================================================================================  
\================================================================================

This section provides a deeper analysis of the specific expressions, searches,   
And calculations found on the z-pricing-unit-test page.

\================================================================================  
SECTION 15: CORE PRICING FORMULAS (DETAILED)  
\================================================================================

15.1 LISTING NIGHTLY PRICE FORMULA (THE MAIN CALCULATION)  
—------------------------------------------------------  
Element: “Listing Nightly Price Formula”  
Formula: Markups and Discounts’s value \* Prorated Nightly Price (monthly)’s number

This is the CORE pricing calculation that multiplies:

1. The combined markup/discount multiplier  
2. 2\. The prorated nightly rate based on rental type

Code equivalent:  
  Listing\_nightly\_price \= markup\_discount\_multiplier \* prorated\_nightly\_rate

15.2 MARKUPS AND DISCOUNTS FORMULA  
—-------------------------------  
Element: “Markups and Discounts”  
Formula: Search for ZAT-Price Configurations:each item’s Overall Site Markup:last item 

+ Listing Schedule Selector’s Listing’s 💰Unit Markup   
+          \- Listing Schedule Selector’s Unused Nights Discount   
+          \+ 1

Code equivalent:  
  Markup\_discount\_multiplier \= (  
      Global\_config.overall\_site\_markup 

+ Listing.unit\_markup   
+       \- unused\_nights\_discount   
+       \+ 1  
+   )

Note: The “+1” is critical \- it ensures the base price is included (100% \+ markups \- discounts)

15.3 PRORATED NIGHTLY RATE \- WEEKLY RENTAL  
—---------------------------------------  
Element: “Prorated Nightly Price (Weekly Li…)”  
Formula: Listing Schedule Selector’s Listing’s 💰Weekly Host Rate /   
         Listing Schedule Selector’s Nights Number (num)

Code equivalent:  
  Prorated\_nightly\_weekly \= listing.weekly\_host\_rate / selected\_nights\_count

15.4 PRORATED NIGHTLY RATE \- MONTHLY RENTAL  
—----------------------------------------  
Element: “Prorated Nightly Price (monthly)”  
Formula: Avg Weekly Price’s value:converted to number /   
         Listing Schedule Selector’s Selected Nights (nights):count

Code equivalent:  
  Prorated\_nightly\_monthly \= avg\_weekly\_price / selected\_nights\_count

15.5 MONTHLY AVERAGE NIGHTLY PRICE  
—-------------------------------  
Element: “Monthly Avg Nightly Price”  
Formula: Listing Schedule Selector’s Listing’s 💰Monthly Host Rate /   
         Search for ZAT-Price Configurations:last item’s Avg days per month

Code equivalent:  
  Monthly\_avg\_nightly \= listing.monthly\_host\_rate / global\_config.avg\_days\_per\_month

15.6 AVERAGE WEEKLY PRICE (FOR MONTHLY LISTINGS)  
—---------------------------------------------  
Element: “Avg Weekly Price”  
Formula: Monthly Avg Nightly Price’s value:converted to number \* 7

Code equivalent:  
  Avg\_weekly\_price \= monthly\_avg\_nightly \* 7

Note: Multiplies daily rate by 7 to get weekly equivalent

\================================================================================  
SECTION 16: PRICING LIST ACCESS PATTERNS  
\================================================================================

The pricing\_list stores pre-calculated values in arrays indexed by night count (1-7).

16.1 ACCESSING NIGHTLY PRICE BY NIGHT COUNT  
—----------------------------------------  
Pattern: pricing\_list’s Nightly Price:item \#N’s num

Examples:

- 1 night: pricing\_list’s Nightly Price:item \#1’s num  
- \- 2 nights: pricing\_list’s Nightly Price:item \#2’s num  
- \- 3 nights: pricing\_list’s Nightly Price:item \#3’s num  
- \- etc.

Code equivalent:  
  Nightly\_price\_for\_n\_nights \= pricing\_list.nightly\_price\[n \- 1\].num

16.2 ACCESSING HOST COMPENSATION BY NIGHT COUNT  
—--------------------------------------------  
Pattern: pricing\_list’s Host Compensation:item \#N’s num

Code equivalent:  
  Host\_compensation\_for\_n\_nights \= pricing\_list.host\_compensation\[n \- 1\].num

16.3 ACCESSING UNUSED NIGHTS BY NIGHT COUNT  
—----------------------------------------  
Pattern: pricing\_list’s Unused Nights:item \#N’s num

Code equivalent:  
  Unused\_nights\_for\_n\_nights \= pricing\_list.unused\_nights\[n \- 1\].num

16.4 ACCESSING UNUSED NIGHTS DISCOUNT BY NIGHT COUNT  
—-------------------------------------------------  
Pattern: pricing\_list’s Unused Nights Discount:item \#N’s num

Code equivalent:  
  Unused\_nights\_discount\_for\_n\_nights \= pricing\_list.unused\_nights\_discount\[n \- 1\].num

16.5 ACCESSING MARKUP AND DISCOUNT MULTIPLIER BY NIGHT COUNT  
—---------------------------------------------------------  
Pattern: pricing\_list’s Markup and Discount Multiplier:item \#N’s num

Code equivalent:  
  Multiplier\_for\_n\_nights \= pricing\_list.markup\_discount\_multiplier\[n \- 1\].num

\================================================================================  
SECTION 17: GLOBAL CONFIGURATION SEARCHES  
\================================================================================

The ZAT-Price Configuration is accessed via searches. The pattern uses “:last item”  
To get the most recent configuration.

17.1 OVERALL SITE MARKUP  
—---------------------  
Expression: Search for ZAT-Price Configurations:each item’s Overall Site Markup:last item

Code equivalent:  
  Overall\_site\_markup \= ZATPriceConfiguration.query().order\_by(created\_date.desc()).first().overall\_site\_markup

17.2 WEEKLY MARKUP/ADJUSTMENT  
—--------------------------  
Expression: Search for ZAT-Price Configurations:each item’s Weekly Markup:last item

Code equivalent:  
  Weekly\_markup \= ZATPriceConfiguration.query().order\_by(created\_date.desc()).first().weekly\_markup

17.3 UNUSED NIGHTS DISCOUNT MULTIPLIER  
—-----------------------------------  
Expression: Search for ZAT-Price Configurations:each item’s Unused Nights Discount Multiplier:last item

Code equivalent:  
  Unused\_nights\_multiplier \= ZATPriceConfiguration.query().order\_by(created\_date.desc()).first().unused\_nights\_discount\_multiplier

17.4 AVERAGE DAYS PER MONTH  
—------------------------  
Expression: Search for ZAT-Price Configurations:each item’s Avg days per month:last item

Code equivalent:  
  Avg\_days\_per\_month \= ZATPriceConfiguration.query().order\_by(created\_date.desc()).first().avg\_days\_per\_month

17.5 FULL TIME (7 NIGHTS) DISCOUNT  
—-------------------------------  
Expression: Search for ZAT-Price Configurations:each item’s full time (7 nights) Discount:last item

Code equivalent:  
  Full\_time\_discount \= ZATPriceConfiguration.query().order\_by(created\_date.desc()).first().full\_time\_7\_nights\_discount

\================================================================================  
SECTION 18: LISTING SCHEDULE SELECTOR OUTPUTS  
\================================================================================

The Listing Schedule Selector reusable element provides these calculated values:

18.1 SELECTION DATA  
—----------------

- Selected Days (days): List of selected day objects  
- \- Selected Days (days):count: Number of selected days  
- \- Selected Nights (nights): nights between selected days  
- \- Selected Nights (nights):count: Number of nights  
- \- Nights Number (num): Selected nights as number

18.2 CALCULATED RATES  
—------------------

- Prorated Nightly Host Rate (Weekly Rental): Weekly rate / nights  
- \- Prorated Nightly Host Rate (Monthly Rental): Monthly rate / avg days per month / nights  
- \- Selected Host Rate (Nightly Model): Host rate for nightly listings  
- \- Price Multiplier @ Monthly Rental  
- \- Price Multiplier @ Weekly Rental    
- \- Price Multiplier @ Nightly Rental

18.3 DISCOUNT CALCULATIONS  
—-----------------------

- Unused Nights: 7 \- selected\_nights  
- \- Unused Nights Discount: Calculated discount amount  
- \- Unused Nights Discount Rate: Discount as percentage  
- \- Nightly Discount Rate, Weekly Model: Specific to weekly rental type

18.4 TIME PERIOD CALCULATIONS  
—--------------------------

- Reservation Span (Weeks): Total weeks in reservation  
- \- Number of Months In Reservation Span  
- \- Actual Weeks During Reservation Span  
- \- Actual Weeks During 4 Week: Weeks in a 4-week period  
- \- Guest Desired Pattern: Selected schedule pattern

18.5 PAYMENT CALCULATIONS  
—----------------------

- Initial Reservation Payment: First payment amount (typically 4-week rent \+ deposit)

\================================================================================  
SECTION 19: DATA FLOW AND CALCULATION CHAIN  
\================================================================================

19.1 INPUT CHAIN  
—-------------  
User selects:

1. Listing (from dropdown) \-\> sets Listing data  
2. 2\. Days/Pattern (in Listing Schedule Selector) \-\> calculates nights, unused nights  
3. 3\. Reservation Span (weeks dropdown) \-\> sets total duration

19.2 CALCULATION CHAIN FOR MONTHLY LISTINGS  
—----------------------------------------

1. Get 💰Monthly Host Rate from Listing  
2. 2\. Get Avg days per month from ZAT-Price Configuration  
3. 3\. Calculate: monthly\_avg\_nightly \= monthly\_host\_rate / avg\_days\_per\_month  
4. 4\. Calculate: avg\_weekly\_price \= monthly\_avg\_nightly \* 7  
5. 5\. Get selected\_nights from Listing Schedule Selector  
6. 6\. Calculate: prorated\_nightly \= avg\_weekly\_price / selected\_nights  
7. 7\. Calculate: unused\_nights \= 7 \- selected\_nights  
8. 8\. Get unused\_nights\_discount from Listing Schedule Selector  
9. 9\. Get overall\_site\_markup from ZAT-Price Configuration  
10. 10\. Get unit\_markup from Listing  
11. 11\. Calculate: multiplier \= overall\_site\_markup \+ unit\_markup \- unused\_nights\_discount \+ 1  
12. 12\. Calculate: listing\_nightly\_price \= multiplier \* prorated\_nightly

19.3 CALCULATION CHAIN FOR WEEKLY LISTINGS  
—---------------------------------------

1. Get 💰Weekly Host Rate from Listing  
2. 2\. Get selected\_nights from Listing Schedule Selector  
3. 3\. Calculate: prorated\_nightly \= weekly\_host\_rate / selected\_nights  
4. 4\. (Continue with steps 7-12 from monthly calculation)

19.4 FINAL PRICE CALCULATIONS  
—--------------------------

- Total Reservation Price \= listing\_nightly\_price \* total\_nights\_in\_reservation  
- \- 4 Week Rent \= listing\_nightly\_price \* nights\_per\_week \* 4  
- \- Initial Reservation Payment \= 4\_week\_rent \+ damage\_deposit

\================================================================================  
SECTION 20: GROUP DATA SOURCES  
\================================================================================

Key groups and their data sources:

20.1 G: Listing Selector  
—---------------------

- Type: Listing  
- \- Data source: D: listing selector’s value  
- \- Purpose: Contains the selected listing data for all child elements

20.2 G: Workflow Double Check  
—--------------------------

- Type: Listing    
- \- Data source: G: Listing Selector’s Listing  
- \- Purpose: Contains elements for comparing workflow vs formula calculations

20.3 Listing Schedule Selector (Reusable)  
—--------------------------------------

- Type: Listing  
- \- Data source: Parent group’s Listing  
- \- Purpose: Day selection UI and all pricing calculations

\================================================================================  
SECTION 21: COMPARISON ELEMENTS  
\================================================================================

The page displays side-by-side comparisons:

21.1 WORKFLOW VS FORMULA COMPARISON PAIRS  
—--------------------------------------

- Listing Nightly Price WF vs Listing Nightly Price Formula  
- \- 4 Week Rent WF vs 4 week rent calculation formula  
- \- Initial Reservation Payment WF vs Initial Reservation Payment formula  
- \- Total Reservation Price WF vs Total Reservation Price formula

21.2 DATABASE VS CALCULATED COMPARISON  
—-----------------------------------  
Price List grid shows values from:

- Pricing\_list (database stored values)  
- Vs  
- \- Listing Schedule Selector (live calculated values)

\================================================================================  
SECTION 22: COMPLETE PSEUDOCODE FOR PRICING ENGINE  
\================================================================================

\`\`\`  
Function calculateListingNightlyPrice(listing, selectedNights, globalConfig):  
      
    // Step 1: Determine rental type and base rate  
    If listing.rental\_type \== “Monthly”:  
        Avg\_nightly \= listing.monthly\_host\_rate / globalConfig.avg\_days\_per\_month  
        Avg\_weekly \= avg\_nightly \* 7  
        Prorated\_nightly \= avg\_weekly / selectedNights  
          
    Else if listing.rental\_type \== “Weekly”:  
        Prorated\_nightly \= listing.weekly\_host\_rate / selectedNights  
          
    Else if listing.rental\_type \== “Nightly”:  
        Prorated\_nightly \= getHostRateForNights(listing, selectedNights)  
      
    // Step 2: Calculate unused nights  
    unusedNights \= 7 \- selectedNights  
      
    // Step 3: Calculate unused nights discount  
    unusedNightsDiscount \= unusedNights \* globalConfig.unused\_nights\_discount\_multiplier  
      
    // Step 4: Calculate combined markup/discount multiplier  
    Multiplier \= (  
        globalConfig.overall\_site\_markup 

+ Listing.unit\_markup   
+         \- unusedNightsDiscount   
+         \+ 1  // Base 100%  
+     )  
+       
+     // Step 5: Calculate final nightly price  
+     listingNightlyPrice \= multiplier \* prorated\_nightly  
+       
+     Return listingNightlyPrice

Function getHostRateForNights(listing, nights):  
    Switch nights:  
        Case 2: return listing.nightly\_host\_rate\_2\_nights  
        Case 3: return listing.nightly\_host\_rate\_3\_nights  
        Case 4: return listing.nightly\_host\_rate\_4\_nights  
        Case 5: return listing.nightly\_host\_rate\_5\_nights  
        Default: return listing.weekly\_host\_rate / nights

Function calculateTotalReservationPrice(nightlyPrice, totalNights, listing):  
    basePrice \= nightlyPrice \* totalNights  
    Return basePrice \+ listing.damage\_deposit

Function calculateInitialPayment(nightlyPrice, nightsPerWeek, listing):  
    fourWeekRent \= nightlyPrice \* nightsPerWeek \* 4  
    Return fourWeekRent \+ listing.damage\_deposit  
\`\`\`

\================================================================================  
SECTION 23: KEY NUMBERS AND CONSTANTS  
\================================================================================

From the page analysis, these are important constants:

- Default \# of nights available: 7  
- \- Default Minimum Nights: 2  
- \- Default Minimum Weeks: 6  
- \- Default Maximum Weeks: 26  
- \- Default Unit Markup: 0  
- \- Default Damage Deposit: 0  
- \- Default Cleaning Cost: 0

Format patterns:

- Currency format: $1,028.58 (with commas and 2 decimal places)  
- \- Percentage display: value \* 100%

\================================================================================  
END OF SECOND PASS ANALYSIS  
\================================================================================