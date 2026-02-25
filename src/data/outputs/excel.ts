type OutputMap = Record<string, [string, string, string]>;

const outputs: OutputMap = {
  'excel-0': [ // Formula
    `=AVERAGE(B2:B100)

Result: $42,350`,

    `Revenue Analysis - Column B (B2:B100)

=AVERAGE(B2:B100)     --> $42,350 (mean)
=MEDIAN(B2:B100)      --> $38,200 (median)
=STDEV(B2:B100)       --> $12,450 (std dev)
=MAX(B2:B100)         --> $89,400 (peak: Row 34)
=MIN(B2:B100)         --> $8,200  (low: Row 71)

[!] High variance detected - consider segmented analysis`,

    `Comprehensive Revenue Analysis - Q4 Dataset

DESCRIPTIVE STATISTICS
+-------------------------------------+
| Mean:     $42,350  | Median:  $38,200 |
| Std Dev:  $12,450  | CV:      29.4%   |
| Skewness: 0.82     | Kurtosis: 2.1    |
| Range:    $81,200  | IQR:     $15,800 |
|-------------------------------------+

REGRESSION MODEL
Revenue = 1.2\u00D7AdSpend + 0.8\u00D7HeadCount - 15,200
R\u00B2 = 0.84 | p < 0.001

ANOMALIES DETECTED (3 entries)
--> Row 23: $89,400 (3.8\u03C3 above mean)
--> Row 71: $8,200 (2.7\u03C3 below mean)
--> Row 45: $0 (likely data entry error)

FORMULAS GENERATED:
=AVERAGE(B2:B100)
=MEDIAN(B2:B100)
=STDEV(B2:B100)
=PERCENTILE(B2:B100, 0.25)
=PERCENTILE(B2:B100, 0.75)`,
  ],

  'excel-1': [ // Chart
    `Recommended: Bar chart for revenue comparison.`,

    `CHART RECOMMENDATION:

Best fit: Grouped Bar Chart
* X-axis: Month (Jan\u2013Dec)
* Y-axis: Revenue ($)
* Series: By Region (NE, SW, MW, SE)

Alternative: Line chart if showing trend over time
Avoid: Pie chart (too many categories)

Colors: Use sequential blue palette for regions`,

    `SMART CHART ANALYSIS

DATA PROFILE:
* Type: Time series + categorical
* Rows: 99 data points
* Columns: Date, Revenue, Region, Category

RECOMMENDED CHARTS (ranked):

1. [*] GROUPED BAR CHART (Score: 95)
   Best for comparing revenue across regions
   X: Month | Y: Revenue | Color: Region

2. LINE CHART WITH MARKERS (Score: 88)
   Best for showing revenue trend over time
   X: Date | Y: Revenue | Lines: Region

3. STACKED AREA CHART (Score: 75)
   Shows cumulative and individual contributions
   Good for seeing total + breakdown

AVOID:
[X] Pie chart - Too many categories (4 regions)
[X] 3D charts - Distorts perception
[X] Dual axis - Misleading scale differences

FORMATTING SPEC:
* Title: "Q4 Revenue by Region"
* Palette: #2563EB, #7C3AED, #059669, #D97706
* Grid: Horizontal only, #F0F0F0
* Legend: Bottom, horizontal
* Axis labels: $0K - $100K
* Annotations: Mark anomalies at Row 23, 71

Chart generated and inserted at Sheet1!D2.`,
  ],

  'excel-2': [ // Clean
    `Cleaned: Removed 3 duplicates, trimmed whitespace in column A.`,

    `DATA CLEANING REPORT:

[OK] Removed 3 duplicate rows (rows 15, 42, 88)
[OK] Trimmed whitespace in Column A (12 cells)
[OK] Standardized date format to YYYY-MM-DD
[!] Found 2 empty cells in Column B (rows 45, 71)
[!] Currency formatting inconsistent (fixed)

Before: 102 rows | After: 99 rows (3 removed)`,

    `DATA CLEANING - COMPREHENSIVE REPORT

ORIGINAL DATA: 102 rows \u00D7 8 columns
CLEANED DATA:  99 rows \u00D7 8 columns

ISSUES FOUND & FIXED:

DUPLICATES (3 removed):
[OK] Row 15: Exact duplicate of Row 14
[OK] Row 42: Exact duplicate of Row 41
[OK] Row 88: Duplicate ID with different date

FORMATTING (47 fixes):
[OK] Column A: Trimmed leading/trailing spaces (12 cells)
[OK] Column C: Standardized dates to YYYY-MM-DD (22 cells)
[OK] Column B: Unified currency format $#,##0 (8 cells)
[OK] Column D: Title case for region names (5 cells)

MISSING DATA (3 flagged):
[!] B45: Empty revenue cell - filled with AVERAGE of B44:B46
[!] B71: Value $0 - likely error, flagged yellow
[!] E23: Missing category - inferred "Enterprise" from pattern

DATA TYPES CORRECTED:
[OK] Column B: Text --> Currency (was stored as string)
[OK] Column C: Text --> Date
[OK] Column F: Mixed --> Number

VALIDATION RULES ADDED:
* Column B: Must be > 0 and < 200000
* Column C: Must be valid date in 2024-2026
* Column D: Must match region list

Data quality score: 64% --> 97%`,
  ],

  'excel-3': [ // Analyze
    `Average: $42,350 | Median: $38,200 | Std Dev: $12,450`,

    `STATISTICAL ANALYSIS - Revenue Data

Central Tendency:
  Mean:   $42,350
  Median: $38,200 (right-skewed)
  Mode:   $35,000 (appeared 4 times)

Dispersion:
  Std Dev: $12,450
  Range:   $81,200
  IQR:     $15,800

Distribution: Right-skewed (skewness = 0.82)
Correlation with Ad Spend: r = 0.87 (strong positive)`,

    `COMPREHENSIVE STATISTICAL ANALYSIS

DATASET: Revenue (B2:B100) - 99 observations

DESCRIPTIVE STATISTICS:
  Mean:      $42,350    Median:    $38,200
  Std Dev:   $12,450    Variance:  155,002,500
  Skewness:  0.82       Kurtosis:  2.1
  Range:     $81,200    IQR:       $15,800
  CV:        29.4%      SE Mean:   $1,251

DISTRIBUTION ANALYSIS:
  Shape: Right-skewed, platykurtic
  Normality test (Shapiro-Wilk): p = 0.023 [X]
  --> Data is NOT normally distributed
  --> Use non-parametric tests for inference

CORRELATION MATRIX:
              Revenue  AdSpend  HeadCount
  Revenue     1.000    0.872    0.645
  AdSpend     0.872    1.000    0.523
  HeadCount   0.645    0.523    1.000

REGRESSION:
  Revenue = 1.2\u00D7AdSpend + 0.8\u00D7HeadCount - 15,200
  R\u00B2 = 0.84 | Adj R\u00B2 = 0.83 | p < 0.001
  F-statistic: 248.3 (df: 2, 96)

SEGMENTED ANALYSIS:
  NE Region: $67,200 avg (+58% above mean)
  SW Region: $52,100 avg (+23%)
  MW Region: $31,400 avg (-26%)
  SE Region: $28,700 avg (-32%)

OUTLIERS (Z-score > 2):
  Row 23: $89,400 (z = 3.78)
  Row 71: $8,200 (z = -2.74)`,
  ],

  'excel-4': [ // Pivot
    `Pivot table created: Revenue by Region (sum).`,

    `PIVOT TABLE GENERATED:

         | Q1      | Q2      | Q3      | Q4      | Total
---------|---------|---------|---------|---------|--------
NE       | $48,200 | $52,100 | $67,200 | $71,300 | $238,800
SW       | $38,900 | $42,300 | $52,100 | $48,700 | $182,000
MW       | $28,100 | $31,400 | $29,800 | $33,200 | $122,500
SE       | $24,500 | $28,700 | $26,900 | $30,100 | $110,200

Insight: NE region leads all quarters (+58% above avg)`,

    `PIVOT TABLE ANALYSIS

REVENUE BY REGION \u00D7 QUARTER
+--------+---------+---------+---------+---------+
| Region | Q1      | Q2      | Q3      | Q4      |
|--------+---------+---------+---------+---------+
| NE     | $48,200 | $52,100 | $67,200 | $71,300 |
| SW     | $38,900 | $42,300 | $52,100 | $48,700 |
| MW     | $28,100 | $31,400 | $29,800 | $33,200 |
| SE     | $24,500 | $28,700 | $26,900 | $30,100 |
|--------+---------+---------+---------+---------+

ADDITIONAL PIVOTS GENERATED:

2. Revenue by Category (avg):
   Enterprise: $58,400 | SMB: $32,100 | Startup: $24,800

3. Revenue by Month (trend):
   Upward trend: +2.3% MoM average growth

KEY INSIGHTS:
* NE dominates every quarter (36% of total revenue)
* Q3-->Q4 growth strongest in NE (+6.1%) and SE (+11.9%)
* MW shows flat performance (needs investigation)
* Seasonal pattern: Q1 dip, Q3-Q4 surge

CALCULATED FIELDS ADDED:
* YoY Growth %
* Running Total
* % of Grand Total
* Rank by Quarter`,
  ],

  'excel-5': [ // Predict
    `Forecast: $45,200 next month (+6.7% from current).`,

    `TREND FORECAST:

Current: $42,350/month
Next 3 months:
  Month +1: $45,200 (+6.7%)
  Month +2: $47,800 (+5.8%)
  Month +3: $49,100 (+2.7%)

Model: Linear regression (R\u00B2 = 0.84)
Confidence interval: \u00B1$4,200 (95%)

[!] Assumes current growth rate continues`,

    `PREDICTIVE ANALYSIS - Revenue Forecast

MODEL: ARIMA(1,1,1) with seasonal decomposition
Training data: 24 months | Test accuracy: 91.2%

12-MONTH FORECAST:
  Month 1:  $45,200  [\u00B1$3,800]
  Month 2:  $47,800  [\u00B1$4,200]
  Month 3:  $49,100  [\u00B1$4,800]
  Month 4:  $46,200  [\u00B1$5,100]  (seasonal dip)
  Month 5:  $48,900  [\u00B1$5,500]
  Month 6:  $52,300  [\u00B1$5,900]
  Month 7:  $54,100  [\u00B1$6,200]
  Month 8:  $56,800  [\u00B1$6,800]
  Month 9:  $59,200  [\u00B1$7,100]
  Month 10: $57,400  [\u00B1$7,500]  (seasonal dip)
  Month 11: $61,300  [\u00B1$7,900]
  Month 12: $64,700  [\u00B1$8,200]

ANNUAL PROJECTION: $643,000 (+18.4% YoY)

SCENARIOS:
  Optimistic (+1\u03C3): $712,000 (+31%)
  Base case:        $643,000 (+18%)
  Pessimistic (-1\u03C3): $574,000 (+5.7%)

KEY DRIVERS:
  Ad spend: 42% of variance explained
  Seasonality: Q3-Q4 peak, Q1 trough
  Headcount: Moderate positive effect

RISK FACTORS:
[!] Model assumes no market disruption
[!] Confidence intervals widen over time
[!] MW region stagnation may worsen`,
  ],

  'excel-6': [ // Anomaly
    `[!] 1 anomaly: Row 23 ($89,400) is 3.8\u03C3 above mean.`,

    `ANOMALY DETECTION:

[R] HIGH (>3\u03C3):
  Row 23: $89,400 (3.8\u03C3 above mean) - verify this entry

[Y] MEDIUM (>2\u03C3):
  Row 71: $8,200 (2.7\u03C3 below mean) - unusually low

[G] LOW:
  Row 45: $0 (likely data entry error)

3 anomalies found in 99 data points (3.0%)`,

    `ANOMALY DETECTION REPORT

Method: Z-score + IQR + Isolation Forest ensemble
Dataset: 99 revenue entries

CRITICAL ANOMALIES (action required):
===========================

[R] Row 45: $0.00 | Score: 99/100
   Type: Data entry error (zero value)
   Evidence: All other entries > $5,000
   Suggestion: Check source system, likely missing data

[R] Row 23: $89,400 | Score: 92/100
   Type: Statistical outlier (z = 3.78)
   Evidence: 3.8\u03C3 above mean, highest in dataset
   Suggestion: Verify - could be one-time large deal

[Y] Row 71: $8,200 | Score: 78/100
   Type: Statistical outlier (z = -2.74)
   Evidence: 2.7\u03C3 below mean, Region SE
   Suggestion: Check for partial month or refund

[Y] Row 34: $82,100 | Score: 65/100
   Type: Moderate outlier (z = 3.19)
   Evidence: NE Region, could be legitimate

[G] Row 12: $67,500 | Score: 45/100
   Type: Borderline (z = 2.02)
   Evidence: Within Q1 seasonal range - likely OK

SUMMARY:
  Total anomalies: 5 of 99 entries (5.1%)
  Critical: 2 (need immediate review)
  Moderate: 2 (verify when convenient)
  Borderline: 1 (likely legitimate)

Impact on analysis:
  With anomalies:    Mean = $42,350
  Without anomalies: Mean = $41,820 (\u0394 -1.3%)
  Recommendation: Remove Row 45 before analysis`,
  ],

  'excel-7': [ // Merge
    `Merged: 2 sheets joined on Column A (ID). 99 matched rows.`,

    `DATA MERGE REPORT:

Source 1: Revenue.xlsx (99 rows, 5 columns)
Source 2: Customers.xlsx (112 rows, 4 columns)

Join: LEFT JOIN on Column A (CustomerID)
Matched: 99/99 rows (100%)
New columns added: Company, Segment, Region

[!] 13 customer records had no matching revenue
(orphan records kept in separate tab)`,

    `COMPREHENSIVE DATA MERGE

SOURCES:
  1. Revenue.xlsx - 99 rows \u00D7 5 cols
  2. Customers.xlsx - 112 rows \u00D7 4 cols
  3. AdSpend.xlsx - 89 rows \u00D7 3 cols

MERGE STRATEGY: Multi-join on CustomerID

RESULTS:
+------------+--------+---------+---------+
|            | Source | Matched | Orphans |
|------------+--------+---------+---------+
| Revenue    | 99     | 99      | 0       |
| Customers  | 112    | 99      | 13      |
| AdSpend    | 89     | 85      | 4       |
|------------+--------+---------+---------+

OUTPUT: Merged.xlsx
  Rows: 99 | Columns: 10 (was 5+4+3 minus keys)

DATA QUALITY:
  [OK] ID format consistent across sources
  [OK] No duplicate IDs in merged output
  [!] 14 rows have NULL in AdSpend columns
  [!] 13 customer records have no revenue

ORPHAN RECORDS (separate tab):
  Customers without revenue: 13 (new/inactive)
  Revenue without ad data: 14 (organic/referral)

COLUMNS IN OUTPUT:
  A: CustomerID | B: Revenue | C: Date
  D: Company | E: Segment | F: Region
  G: AdSpend | H: Campaign | I: Channel
  J: Match_Quality (0-100)`,
  ],

  'excel-8': [ // Report
    `Q4 Revenue: $653,500. Top region: NE ($238,800).`,

    `Q4 REVENUE REPORT

Total Revenue: $653,500
YoY Growth: +14.2%

By Region:
  NE: $238,800 (36.5%) ^ +18%
  SW: $182,000 (27.9%) ^ +12%
  MW: $122,500 (18.7%) -->  +2%
  SE: $110,200 (16.9%) ^  +8%

Top performer: NE Region (+$36,200 vs Q3)
Concern: MW Region showing flat growth`,

    `QUARTERLY REVENUE REPORT - Q4 2025

EXECUTIVE SUMMARY
Total Revenue: $653,500
vs Q3: +$72,400 (+12.5%)
vs Q4 2024: +$81,200 (+14.2%)
Annual Revenue: $2,341,000

REGIONAL BREAKDOWN
+--------+----------+-------+--------+---------+
| Region | Revenue  | Share | QoQ    | YoY     |
|--------+----------+-------+--------+---------+
| NE     | $238,800 | 36.5% | +6.1%  | +18.2%  |
| SW     | $182,000 | 27.9% | -6.5%  | +12.1%  |
| MW     | $122,500 | 18.7% | +11.4% | +2.3%   |
| SE     | $110,200 | 16.9% | +11.9% | +8.4%   |
|--------+----------+-------+--------+---------+

KEY METRICS:
  Average deal size: $42,350
  Largest deal: $89,400 (NE, Enterprise)
  Customer count: 99 active accounts
  New customers (Q4): 12

HIGHLIGHTS:
[OK] NE Region exceeded target by 18%
[OK] SE Region showing strong acceleration
[!] MW Region growth stalled (2.3% YoY)
[!] SW Region QoQ decline needs attention

RECOMMENDATIONS:
1. Investigate MW stagnation - sales team review
2. Double down on NE strategy (working)
3. Address SW Q4 dip - seasonal or structural?
4. Plan SE expansion (high growth trajectory)

Report auto-generated from Sheet1 data.
Charts inserted in Sheet2.`,
  ],

};

export default outputs;
