# [Trend, Channel&Device, CAC] 2 - 
# We have been investing in marketing and see over time more mobile users and more 
# users from paid and social channels. This comes with decreased CAC for those users, 
# but increased CAC overall as we’re cannibalizing organic and direct traffic.


import pandas as pd
import numpy as np
import itertools


# ---- Input Data ----

np.random.seed(42)

filename = '/Users/erichaavind-berman/Documents/Development/Analytics-training/public/scenarios/scenario7.csv'

data = {
  "day": [
    "2025-05-13",
    "2025-05-14",
    "2025-05-15",
    "2025-05-16",
    "2025-05-17",
    "2025-05-18",
    "2025-05-19",
    "2025-05-20",
    "2025-05-21",
    "2025-05-22",
    "2025-05-23",
    "2025-05-24",
    "2025-05-25",
    "2025-05-26",
    "2025-05-27",
    "2025-05-28",
    "2025-05-29",
    "2025-05-30",
    "2025-05-31",
    "2025-06-01",
    "2025-06-02",
    "2025-06-03",
    "2025-06-04",
    "2025-06-05",
    "2025-06-06",
    "2025-06-07",
    "2025-06-08",
    "2025-06-09",
    "2025-06-10",
    "2025-06-11",
    "2025-06-12",
    "2025-06-13",
    "2025-06-14",
    "2025-06-15",
    "2025-06-16",
    "2025-06-17",
    "2025-06-18",
    "2025-06-19",
    "2025-06-20",
    "2025-06-21",
    "2025-06-22",
    "2025-06-23",
    "2025-06-24",
    "2025-06-25",
    "2025-06-26",
    "2025-06-27",
    "2025-06-28",
    "2025-06-29",
    "2025-06-30",
    "2025-07-01",
    "2025-07-02",
    "2025-07-03",
    "2025-07-04",
    "2025-07-05",
    "2025-07-06",
    "2025-07-07",
    "2025-07-08",
    "2025-07-09",
    "2025-07-10",
    "2025-07-11",
    "2025-07-12",
    "2025-07-13",
    "2025-07-14",
    "2025-07-15",
    "2025-07-16",
    "2025-07-17",
    "2025-07-18",
    "2025-07-19",
    "2025-07-20",
    "2025-07-21",
    "2025-07-22",
    "2025-07-23",
    "2025-07-24",
    "2025-07-25",
    "2025-07-26",
    "2025-07-27",
    "2025-07-28",
    "2025-07-29",
    "2025-07-30",
    "2025-07-31",
    "2025-08-01",
    "2025-08-02",
    "2025-08-03",
    "2025-08-04",
    "2025-08-05",
    "2025-08-06",
    "2025-08-07",
    "2025-08-08",
    "2025-08-09",
    "2025-08-10"
  ],
  "visitors": [
    10298.0,
    9947.0,
    10449.0,
    11004.0,
    9980.0,
    10010.0,
    11128.0,
    10670.0,
    9958.0,
    10596.0,
    10022.0,
    10051.0,
    10505.0,
    9242.0,
    9385.0,
    10113.0,
    9872.0,
    10699.0,
    9995.0,
    9723.0,
    11479.0,
    10495.0,
    10701.0,
    9835.0,
    10393.0,
    10817.0,
    10089.0,
    11035.0,
    10480.0,
    10695.0,
    10539.0,
    12041.0,
    10952.0,
    10355.0,
    11514.0,
    10317.0,
    11205.0,
    9934.0,
    10343.0,
    11288.0,
    11643.0,
    11333.0,
    11191.0,
    11109.0,
    10433.0,
    10918.0,
    11104.0,
    12044.0,
    11646.0,
    10412.0,
    11694.0,
    11299.0,
    11154.0,
    11957.0,
    12239.0,
    12209.0,
    11176.0,
    11524.0,
    11939.0,
    12355.0,
    11512.0,
    11719.0,
    11196.0,
    11172.0,
    12408.0,
    12764.0,
    11937.0,
    12612.0,
    12257.0,
    11683.0,
    12317.0,
    13053.0,
    12139.0,
    13129.0,
    10648.0,
    12743.0,
    12332.0,
    12131.0,
    12395.0,
    11177.0,
    12268.0,
    12644.0,
    13347.0,
    12179.0,
    12035.0,
    12249.0,
    13129.0,
    12807.0,
    12322.0,
    12978.0
  ],
  "spend": [
    12116.493059217648,
    13312.373988639467,
    11457.536287347177,
    12056.805424082679,
    12129.47021624141,
    10993.782062241458,
    13255.34433247749,
    13363.266326615867,
    13206.136147970954,
    13068.495439949824,
    11801.555109539502,
    13145.225612681568,
    13388.742580167876,
    12987.267276934057,
    13906.457146000788,
    14734.861028177445,
    16663.423081452638,
    14759.493375398206,
    15009.060468867317,
    14760.6649010806,
    12697.47454164115,
    15118.18334946094,
    15372.276251929232,
    18405.890534982344,
    15369.166842262654,
    16111.856810800335,
    15858.345876353707,
    14647.586354856561,
    17571.387377418025,
    17252.31963922413,
    17449.238336451657,
    15558.735054246314,
    18483.35317312332,
    15267.778724649263,
    17804.228512560323,
    19878.546750971975,
    16211.356409843174,
    16870.442724476674,
    17819.58163810517,
    17245.82921506056,
    16139.203882720642,
    18232.275569767233,
    17025.235543528674,
    19018.310916762217,
    17496.690918919438,
    20609.921286021046,
    17960.096049196516,
    18663.526180553188,
    20176.220660843603,
    17872.962820279252,
    19772.951921524957,
    21218.571305138914,
    17871.020118526525,
    20171.560630238764,
    20411.85935309811,
    21188.18744613277,
    18915.659146946302,
    18965.45206429887,
    21326.32987874028,
    21206.381607879823,
    21300.59142041505,
    21565.73785139637,
    20483.970334105812,
    21728.704436593205,
    21951.686967958416,
    20892.778298368357,
    24138.92941337371,
    22618.599505094146,
    20770.43580335682,
    23137.864330360597,
    21330.381995727214,
    23594.50152449094,
    24190.314694808883,
    21965.181217977948,
    24256.051355093186,
    23745.3371123238,
    24386.472191993387,
    25826.151579184738,
    23405.534260796554,
    22945.51660277101,
    22932.58268444937,
    23171.027658041476,
    24207.477948703076,
    24859.38236977997,
    24932.028959196025,
    25742.61989884323,
    24915.60227025349,
    26794.24089258878,
    24882.411800114452,
    28614.202999907542
  ],
  "sales": [
    543.0,
    459.0,
    474.0,
    572.0,
    489.0,
    533.0,
    578.0,
    530.0,
    460.0,
    462.0,
    481.0,
    541.0,
    535.0,
    406.0,
    477.0,
    523.0,
    454.0,
    542.0,
    502.0,
    435.0,
    590.0,
    550.0,
    584.0,
    539.0,
    458.0,
    499.0,
    528.0,
    575.0,
    547.0,
    708.0,
    553.0,
    653.0,
    590.0,
    547.0,
    562.0,
    550.0,
    526.0,
    486.0,
    495.0,
    568.0,
    686.0,
    483.0,
    590.0,
    483.0,
    500.0,
    595.0,
    558.0,
    554.0,
    550.0,
    551.0,
    552.0,
    575.0,
    560.0,
    569.0,
    708.0,
    639.0,
    468.0,
    585.0,
    567.0,
    656.0,
    540.0,
    581.0,
    582.0,
    597.0,
    566.0,
    623.0,
    576.0,
    601.0,
    692.0,
    602.0,
    559.0,
    694.0,
    702.0,
    703.0,
    464.0,
    615.0,
    674.0,
    575.0,
    640.0,
    594.0,
    572.0,
    630.0,
    522.0,
    563.0,
    590.0,
    556.0,
    730.0,
    576.0,
    596.0,
    655.0
  ],
}

visitor_weights = {
    "location": {
        "start": {"northern": 0.3, "southern": 0.3, "eastern": 0.2, "western": 0.2, "central": 0.1},
        "end": {"northern": 0.3, "southern": 0.3, "eastern": 0.2, "western": 0.2, "central": 0.1},
    },
    "browser": {
        "start": {"chrome": 0.5, "firefox": 0.3, "safari": 0.2},
        "end": {"chrome": 0.5, "firefox": 0.3, "safari": 0.2},
    },
    "device": {
        "start": {"mobile": 0.4, "desktop": 0.4, "tablet": 0.2},
        "end":   {"mobile": 0.5, "desktop": 0.35, "tablet": 0.15},
    },
    "channel": {
        "start": {"organic": 0.4, "paid_search": 0.2, "paid_social": 0.2, "direct": 0.2},
        "end": {"organic": 0.2, "paid_search": 0.4, "paid_social": 0.3, "direct": 0.1},
    },
    "returning_user": {
        "start": {"new": 0.5, "returning": 0.5},
        "end": {"new": 0.7, "returning": 0.3},
    }
}

spend_weights = {
    "location": {
        "start": {"northern": 0.3, "southern": 0.3, "eastern": 0.2, "western": 0.2, "central": 0.1},
        "end": {"northern": 0.3, "southern": 0.3, "eastern": 0.2, "western": 0.2, "central": 0.1},
    },
    "browser": {
        "start": {"chrome": 0.5, "firefox": 0.3, "safari": 0.2},
        "end": {"chrome": 0.5, "firefox": 0.3, "safari": 0.2},
    },
    "device": {
        "start": {"mobile": 0.4, "desktop": 0.4, "tablet": 0.2},
        "end":   {"mobile": 0.6, "desktop": 0.3, "tablet": 0.1},
    },
    "channel": {
        "start": {"organic": 0, "paid_search": 0.7, "paid_social": 0.3, "direct": 0},
        "end": {"organic": 0, "paid_search": 0.7, "paid_social": 0.3, "direct": 0},
    },
    "returning_user": {
        "start": {"new": 0.5, "returning": 0.5},
        "end": {"new": 0.7, "returning": 0.3},
    },
}

sales_factors = {
    "location": {"northern": 1.4, "southern": 1.3, "eastern": 0.8, "western": 1.05, "central": 0.7},
    "browser": {"chrome": 1.0, "firefox": 0.9, "safari": 1.1},
    "device": {"mobile": 1.0, "desktop": 1.2, "tablet": 0.8},
    "channel": {"organic": 1.2, "paid_search": 0.8, "paid_social": 0.8, "direct": 1.0},
    "returning_user": {"new": 0.7, "returning": 1.7},
}

jitter_levels = {
    "location": 0.03,
    "browser": 0.05,
    "device": 0.02,
    "channel": 0.03,
    "returning_user": 0.05,
}


# ---- Helpers ----

def jitter_weights(weights, noise_level=0.05):
    noisy = {k: max(v + np.random.normal(0, noise_level * v), 0.001) for k, v in weights.items()}
    total = sum(noisy.values())
    return {k: v / total for k, v in noisy.items()}

def interpolate_weights(start_weights, end_weights, progress):
    weights = {k: (1 - progress) * start_weights[k] + progress * end_weights[k] for k in start_weights}
    total = sum(weights.values())
    return {k: v / total for k, v in weights.items()}


# ---- Generator ----

def generate_combinations(dimension_weights):
    dimensions = list(dimension_weights.keys())
    values = list(dimension_weights.values())
    all_combos = list(itertools.product(*[list(v.keys()) for v in values]))
    return dimensions, all_combos

def compute_combo_weights(combo, dim_weights_dict):
    return np.prod([dim_weights_dict[dim][val] for dim, val in zip(dim_weights_dict.keys(), combo)])

def compute_sale_multiplier(combo, sales_factors):
    return np.prod([sales_factors[dim][val] for dim, val in zip(sales_factors.keys(), combo)])

def generate_data_top_down(data, visitor_weights, spend_weights, sales_factors, jitter_levels):
    df_input = pd.DataFrame(data)
    num_days = len(df_input)
    all_rows = []

    for i, (_, row) in enumerate(df_input.iterrows()):
        date = row["day"]
        visitors = row["visitors"]
        spend = row["spend"]
        target_sales = row["sales"]
        progress = i / (num_days - 1) if num_days > 1 else 0

        # Interpolated visitor weights with jitter
        interpolated_visitor_day_weights = {
            dim: jitter_weights(
                interpolate_weights(w["start"], w["end"], progress),
                jitter_levels.get(dim, 0.0)
            )
            for dim, w in visitor_weights.items()
        }

        # Interpolated spend weights with jitter
        interpolated_spend_day_weights = {
            dim: jitter_weights(
                interpolate_weights(w["start"], w["end"], progress),
                jitter_levels.get(dim, 0.0)
            )
            for dim, w in spend_weights.items()
        }

        # Generate all combinations
        dimensions, all_combos = generate_combinations(interpolated_visitor_day_weights)

        # Compute combo probabilities for visitors
        visitor_combo_weights = [compute_combo_weights(combo, interpolated_visitor_day_weights) for combo in all_combos]
        visitor_combo_probs = np.array(visitor_combo_weights) / sum(visitor_combo_weights)

        # Sample visitors per combo
        visitors_per_combo = np.random.multinomial(visitors, visitor_combo_probs)

        # Compute sales
        sale_multipliers = [compute_sale_multiplier(combo, sales_factors) for combo in all_combos]
        sale_rates = np.array(sale_multipliers)
        scaled_rates = target_sales / sum(visitors_per_combo * sale_rates) * sale_rates
        sales_per_combo = [
            np.random.binomial(v, min(rate, 1)) if v > 0 else 0
            for v, rate in zip(visitors_per_combo, scaled_rates)
        ]

        # Compute combo probabilities for spend
        spend_combo_weights = [compute_combo_weights(combo, interpolated_spend_day_weights) for combo in all_combos]
        spend_combo_probs = np.array(spend_combo_weights) / sum(spend_combo_weights)
        spend_per_combo = np.round(spend_combo_probs * spend).astype(int)
        spend_per_combo[-1] += spend - spend_per_combo.sum()  # ensure total spend matches exactly

        # Build output rows
        for combo, v, s, spend_amt in zip(all_combos, visitors_per_combo, sales_per_combo, spend_per_combo):
            row_out = {"day": date}
            for dim, val in zip(dimensions, combo):
                row_out[dim] = val
            row_out["visitors"] = v
            row_out["sales"] = s
            row_out["spend"] = spend_amt
            all_rows.append(row_out)

    return pd.DataFrame(all_rows)


# ---- Run It ----

df = generate_data_top_down(data, visitor_weights, spend_weights, sales_factors, jitter_levels)

df.to_csv(filename, index=False)

print("Data generated")


import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

def visualize_data_seaborn(df, breakdown_columns):
    df = df.copy()

    # Calculate derived metrics
    df["Sale Rate"] = df["sales"] / df["visitors"]
    df["CAC"] = df.apply(lambda row: row["spend"] / row["sales"] if row["sales"] > 0 else np.nan, axis=1)

    # Standardize column names for display
    df.rename(columns={"visitors": "Visitors", "sales": "Sales", "spend": "Spend", "day": "Date"}, inplace=True)

    # Set plot style
    sns.set_theme(style="whitegrid")

    # --- Overall Trends ---
    overall = df.groupby("Date")[["Visitors", "Sales", "Spend"]].sum().reset_index()
    overall["Sale Rate"] = overall["Sales"] / overall["Visitors"]
    overall["CAC"] = overall.apply(lambda row: row["Spend"] / row["Sales"] if row["Sales"] > 0 else np.nan, axis=1)

    metrics = ["Visitors", "Sales", "Spend", "Sale Rate", "CAC"]
    colors = ["blue", "green", "purple", "orange", "red"]

    for metric, color in zip(metrics, colors):
        plt.figure(figsize=(10, 5))
        ax = sns.lineplot(data=overall, x="Date", y=metric, color=color, errorbar=None)
        ax.set_title(f"Overall {metric} Trend")
        ax.set_ylabel(metric)
        ax.set_ylim(bottom=0)
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()

    # --- Breakdowns ---
    for breakdown in breakdown_columns:
        # Group by Date + breakdown and compute sums
        grouped = df.groupby(["Date", breakdown])[["Visitors", "Sales", "Spend"]].sum().reset_index()
        grouped["Sale Rate"] = grouped["Sales"] / grouped["Visitors"]
        grouped["CAC"] = grouped.apply(lambda row: row["Spend"] / row["Sales"] if row["Sales"] > 0 else np.nan, axis=1)

        fig, axes = plt.subplots(nrows=len(metrics), ncols=1, figsize=(12, 4 * len(metrics)), sharex=True)
        fig.suptitle(f"Breakdown by {breakdown}", fontsize=18)

        for idx, metric in enumerate(metrics):
            sns.lineplot(
                data=grouped,
                x="Date",
                y=metric,
                hue=breakdown,
                ax=axes[idx],
                errorbar=None,
            )
            axes[idx].set_title(metric)
            axes[idx].set_ylim(bottom=0)
            axes[idx].legend(title=breakdown, bbox_to_anchor=(1.05, 1), loc='upper left')
            axes[idx].tick_params(axis='x', rotation=45)

        plt.tight_layout(rect=[0, 0, 0.85, 0.96])
        plt.show()
        
visualize_data_seaborn(df, breakdown_columns=["device", "browser", "channel", "location", "returning_user"])
