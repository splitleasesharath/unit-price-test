Z-PRICING-UNIT-TEST PAGE \- COMPREHENSIVE WORKFLOW GUIDE  
For Code Conversion Outside of Bubble

\============================================

1. PAGE OVERVIEW  
2. \============================================

This page (z-pricing-unit-test) serves as a pricing calculation test environment for the Split Lease application. It allows selection of a listing and calculates guest-facing prices based on different sources of truth:

- Listing Schedule Selector calculations  
- \- Pricing List structure stored data  
- \- Direct on-screen formula comparisons

The page enables comparison of pricing calculations from workflows vs. direct formulas to ensure accuracy.

\============================================

2\. DATA SCHEMA & KEY ELEMENTS  
\============================================

2.1 INPUT ELEMENTS:  
—----------------

- Search Listing: Searches by ID, host email to select a listing  
- \- Listing Schedule Selector: Core component that provides rental schedule data  
- \- Reservation Span (weeks): Input field with dropdown for reservation duration  
- \- Guest Desired Pattern: Pattern input for guest requirements

2.2 HOST PRICES INPUT:  
—-------------------

- Host Comp Style  
- \- Weeks Offered  
- \- 2/3/4/5 night Host Rate  
- \- Weekly Host Rate  
- \- Monthly Host Rate  
- \- Damage Deposit  
- \- Cleaning Deposit  
- \- Nights available  
- \- Nights/Wk available

2.3 CALCULATED OUTPUTS:  
—--------------------

- Number of Months in Reservation Span  
- \- Reservation Span (Weeks)  
- \- Required Pattern  
- \- Actual Weeks 4 Weeks  
- \- Actual Weeks During Reservation Span  
- \- Monthly/Weekly/Nightly rental type multipliers  
- \- Prorated Nightly Rates (Weekly/Monthly)

2.4 KEY DATA SOURCES:  
—------------------

- Listing Schedule Selector’s properties  
- \- ZAT-Price Configuration (database)  
- \- Listing’s Unit Markup  
- \- Overall Site Markup

\============================================

3. WORKFLOW ANALYSIS  
4. \============================================

WORKFLOW 1: “(data check) selected nightly price based on selector is clicked”  
—---------------------------------------------------------------------------  
TRIGGER: Element click on “(data check) selected nightly price based on selector”  
PURPOSE: Data validation \- stores the selected nightly price from the Listing Schedule Selector

STEP 1: Set State

- Element: (data check) selected nightly price based on selector  
- \- Custom State: number  
- \- Value: Listing Schedule Selector’s Selected Host Rate (Nightly Model)

LOGIC FOR CODE CONVERSION:  
\`\`\`  
selectedNightlyPrice \= listingScheduleSelector.selectedHostRate.nightlyModel  
\`\`\`

—

WORKFLOW 2: “4 week rent calculation forumula is clicked”  
—------------------------------------------------------  
TRIGGER: Element click on “4 week rent calculation forumula”  
PURPOSE: Calculate 4-week rent price based on formula

STEP 1: Set State

- Element: 4 week rent calculation forumula  
- \- Custom State: number  
- \- Value: Listing Nightly Price Formula’s value (converted to number) \* Listing Schedule Selector’s Nights Number (num) \* Listing Schedule Selector’s Actual Weeks During 4 Week

LOGIC FOR CODE CONVERSION:  
\`\`\`  
fourWeekRent \= parseFloat(listingNightlyPriceFormula.value) 

* listingScheduleSelector.nightsNumber   
*                \* listingScheduleSelector.actualWeeksDuring4Week  
* \`\`\`

—

WORKFLOW 3: “B: Run Price List is clicked”  
—---------------------------------------  
TRIGGER: Button click “B: Run Price List”  
PURPOSE: Executes backend API to save/update pricing data

STEP 1: Schedule API Workflow

- API Workflow: CORE-save\_pricing\_robert  
- \- listing parameter: G: Workflow Double Check’s Listing  
- \- Scheduled date: Current date/time \+ 1 second  
- \- Ignore privacy rules: Yes

STEP 2: Add Pause

- Pause length: 10000ms (10 seconds)  
- \- Purpose: Wait for API to complete

STEP 3: AirAlert \- Standard

- Shows alert notification to user

LOGIC FOR CODE CONVERSION:  
\`\`\`  
Async function runPriceList(listing) {  
    Await schedulePricingAPI({  
        Listing: listing,  
        scheduledDate: new Date(Date.now() \+ 1000\)  
    });  
    Await delay(10000);  // 10 second pause  
    showAlert(“Pricing updated”);  
}  
\`\`\`

—

WORKFLOW 4: “B: Run Starting Nightly Price is clicked”  
—---------------------------------------------------  
TRIGGER: Button click “B: Run Starting Nightly Price”  
PURPOSE: Finds and sets the lowest nightly price

STEP 1: Schedule API Workflow

- API Workflow: CORE-Find lowest nightly price  
- \- listing parameter: (from element context)

STEP 2: AirAlert \- Standard

- Shows notification

LOGIC FOR CODE CONVERSION:  
\`\`\`  
Async function runStartingNightlyPrice(listing) {  
    Await findLowestNightlyPrice(listing);  
    showAlert(“Starting nightly price calculated”);  
}  
\`\`\`

—

WORKFLOW 5: “B: Run Starting Nightly Price is clicked” (Duplicate)  
—---------------------------------------------------------------  
Same as Workflow 4 \- appears to be a duplicate workflow

—

WORKFLOW 6: “Button Run Checks is clicked”  
—---------------------------------------  
TRIGGER: Button click “Button Run Checks”  
PURPOSE: Master workflow that runs all pricing calculations for comparison

STEP 1: Set markups and discounts nightly

- Element: Markup and Discounts for Nightly Listings  
- \- Custom State: number  
- \- Value: Search for ZAT-Price Configurations:each item’s Overall Site Markup:last item   
-          \+ Listing Schedule Selector’s Listing’s Unit Markup \+ 1

STEP 2: Set markups and discounts weekly

- Element: Markup and Discounts for Weekly Listings  
- \- Custom State: number  
- \- Value: (Similar formula for weekly)

STEP 3: Set markups and discounts monthly

- Element: Markup and Discounts for Monthly Listings  
- \- Custom State: number  
- \- Value: (Similar formula for monthly)

STEP 4: Set prorated nightly price monthly

- Element: Prorated Nightly Price (monthly)  
- \- Custom State: number  
- \- Value: Prorated nightly calculation for monthly rentals

STEP 5: Set prorated nightly price weekly

- Element: Prorated Nightly Price (Weekly Listing)  
- \- Custom State: number  
- \- Value: Prorated nightly calculation for weekly rentals

STEP 6: Set datacheck selected nightly price

- Element: Data check display element  
- \- Value: Selected nightly price from selector

STEP 7: Set 4 week rent calculation formula

- Element: 4 week rent calculation forumula  
- \- Value: Formula-based 4 week rent calculation

LOGIC FOR CODE CONVERSION:  
\`\`\`  
Function runChecks(listingScheduleSelector, zatPriceConfig) {  
    // Step 1: Calculate nightly markup  
    Const nightlyMarkup \= zatPriceConfig.overallSiteMarkup 

+ listingScheduleSelector.listing.unitMarkup \+ 1;  
+       
+     // Step 2: Calculate weekly markup  
+     Const weeklyMarkup \= zatPriceConfig.overallSiteMarkup   
+                         \+ listingScheduleSelector.listing.unitMarkup \+ 1;  
+       
+     // Step 3: Calculate monthly markup  
+     Const monthlyMarkup \= zatPriceConfig.overallSiteMarkup   
+                          \+ listingScheduleSelector.listing.unitMarkup \+ 1;  
+       
+     // Step 4: Prorated nightly (monthly)  
+     Const proratedNightlyMonthly \= calculateProratedNightly(‘monthly’);  
+       
+     // Step 5: Prorated nightly (weekly)  
+     Const proratedNightlyWeekly \= calculateProratedNightly(‘weekly’);  
+       
+     // Step 6: Selected nightly price  
+     Const selectedNightlyPrice \= listingScheduleSelector.selectedHostRate;  
+       
+     // Step 7: 4 week rent formula  
+     Const fourWeekRent \= calculateFourWeekRent();  
+       
+     Return {  
+         nightlyMarkup,  
+         weeklyMarkup,  
+         monthlyMarkup,  
+         proratedNightlyMonthly,  
+         proratedNightlyWeekly,  
+         selectedNightlyPrice,  
+         fourWeekRent  
+     };  
+ }  
+ \`\`\`

—

WORKFLOW 7: “Button Set required pattern is clicked”  
—-------------------------------------------------  
TRIGGER: Button click “Button Set required pattern”  
PURPOSE: Sets the required pattern based on input

—

WORKFLOW 8: “Button Set Reservation Span is clicked”  
—-------------------------------------------------  
TRIGGER: Button click “Button Set Reservation Span”  
PURPOSE: Sets the reservation span duration in weeks

—

WORKFLOW 9: “G: Workflow Double Check is clicked”  
—----------------------------------------------  
TRIGGER: Element click “G: Workflow Double Check”  
PURPOSE: Reference element for storing listing data used by other workflows  
NOTE: This element stores the current listing selection

—

WORKFLOW 10: “I: Remove is clicked \- Reset Inputs”  
—-----------------------------------------------  
TRIGGER: Element click  
PURPOSE: Resets all input fields to default values

—

WORKFLOW 11: “Markup and Discounts for Nightly Listings is clicked”  
—----------------------------------------------------------------  
TRIGGER: Element click  
PURPOSE: Calculates and displays markup/discount multiplier for nightly listings

Formula components:

- ZAT-Price Configuration’s Overall Site Markup (last item)  
- \- Listing’s Unit Markup  
- \- Base value of 1

—

WORKFLOW 12: “Markup and Discounts for Weekly Listings is clicked”  
—---------------------------------------------------------------  
TRIGGER: Element click  
PURPOSE: Calculates markup/discount multiplier for weekly listings

—

WORKFLOW 13: “Markups and Discounts is clicked”  
—--------------------------------------------  
TRIGGER: Element click  
PURPOSE: General markup/discount calculation

—

WORKFLOW 14: “Prorated Nightly Price (monthly) is clicked”  
—-------------------------------------------------------  
TRIGGER: Element click  
PURPOSE: Calculates prorated nightly rate for monthly rental type

—

WORKFLOW 15: “Prorated Nightly Price (Weekly Listing) is clicked”  
—--------------------------------------------------------------  
TRIGGER: Element click  
PURPOSE: Calculates prorated nightly rate for weekly rental type

—

WORKFLOW 16: “purple alert (copy)”  
—-------------------------------  
TRIGGER: (Alert element)  
PURPOSE: Display alert/notification

\============================================

4\. KEY PRICING FORMULAS  
\============================================

4.1 MARKUP CALCULATION:  
—--------------------  
totalMarkup \= zatPriceConfig.overallSiteMarkup \+ listing.unitMarkup \+ 1

Where:

- overallSiteMarkup: Site-wide markup percentage from ZAT-Price Configuration  
- \- unitMarkup: Individual listing markup percentage  
- \- \+1: Base multiplier

4.2 FOUR WEEK RENT CALCULATION:  
—----------------------------  
fourWeekRent \= listingNightlyPriceFormula \* nightsNumber \* actualWeeksDuring4Week

Where:

- listingNightlyPriceFormula: Base nightly price from formula  
- \- nightsNumber: Number of nights per week  
- \- actualWeeksDuring4Week: Actual weeks in the 4-week period

4.3 PRORATED NIGHTLY PRICE:  
—------------------------  
For monthly: Uses monthly rental type multiplier  
For weekly: Uses weekly rental type multiplier

\============================================

5. DATA SOURCES REFERENCE  
6. \============================================

5.1 LISTING SCHEDULE SELECTOR PROPERTIES:  
—--------------------------------------

- Selected Host Rate (Nightly Model)  
- \- Nights Number (num)  
- \- Actual Weeks During 4 Week  
- \- Actual Weeks During Reservation Span  
- \- Listing (reference to Listing object)  
- \- Monthly/Weekly/Nightly rental type multipliers

5.2 ZAT-PRICE CONFIGURATION:  
—-------------------------

- Unused nights discount multiplier  
- \- Weekly Price Adjustment  
- \- Overall Site Markup  
- \- Average days per month  
- \- Full Time (7 Nights)

5.3 LISTING PROPERTIES:  
—--------------------

- Unit Markup  
- \- Minimum/Maximum Nights Desired by Host  
- \- Minimum/Maximum Days Desired by Host  
- \- Unused Nights settings  
- \- SL Unit Markup  
- \- Price Override  
- \- Nightly Discount Rate  
- \- Unused Nights Discount Rate

\============================================

6\. WORKFLOW VS FORMULA CHECK COMPARISON  
\============================================

The page includes a “Workflow vs Formula Checks” section that compares:

| Workflow Calculation | Formula Calculation |  
|---------------------|---------------------|  
| 4 Week Rent WF | 4 week rent (direct formula) |  
| Initial Reservation Payment WF | Initial Reservation Payment |  
| Listing Nightly Price WF | Listing Nightly Price |

Purpose: Verify that workflow calculations match direct formula calculations

\============================================

7. CODE CONVERSION RECOMMENDATIONS  
8. \============================================

When converting to external code:

1. Create separate functions for each calculation type  
2. 2\. Use a configuration object for ZAT-Price settings  
3. 3\. Create a ListingScheduleSelector class/object with all properties  
4. 4\. Implement async functions for API calls with proper error handling  
5. 5\. Use a state management pattern for storing calculated values  
6. 6\. Implement the comparison logic between workflow and formula results

Example structure:  
\`\`\`javascript  
Class PricingCalculator {  
    constructor(zatConfig, listingData) {  
        this.zatConfig \= zatConfig;  
        This.listing \= listingData;  
    }  
      
    calculateMarkup(rentalType) {  
        Return this.zatConfig.overallSiteMarkup 

+ this.listing.unitMarkup \+ 1;  
+     }  
+       
+     calculateFourWeekRent(nightlyPrice, nightsPerWeek, weeks) {  
+         Return nightlyPrice \* nightsPerWeek \* weeks;  
+     }  
+       
+     calculateProratedNightly(rentalType, basePrice) {  
+         Const multiplier \= this.getRentalTypeMultiplier(rentalType);  
+         Return basePrice \* multiplier;  
+     }  
+       
+     runAllChecks() {  
+         Return {  
+             markupNightly: this.calculateMarkup(‘nightly’),  
+             markupWeekly: this.calculateMarkup(‘weekly’),  
+             markupMonthly: this.calculateMarkup(‘monthly’),  
+             fourWeekRent: this.calculateFourWeekRent(...),  
+             proratedMonthly: this.calculateProratedNightly(‘monthly’, …),  
+             proratedWeekly: this.calculateProratedNightly(‘weekly’, …)  
+         };  
+     }  
+ }  
+ \`\`\`

\============================================

END OF DOCUMENT  
\============================================