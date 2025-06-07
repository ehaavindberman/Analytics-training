# [Trend, location, visitors] 4 - 
# over the past 3 months the share of users from the central has slowly increased and 
# share from others has slowly dropped, the users from central signup at a lower rate 
# so the overall signup rate decreases over time.


import pandas as pd
import numpy as np
import itertools


# ---- Input Data ----

np.random.seed(42)

filename = '/Users/erichaavind-berman/Documents/Development/Analytics-training/public/scenarios/scenario6.csv'

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
    10646.0,
    9900.0,
    11002.0,
    12220.0,
    10016.0,
    10096.0,
    12533.0,
    11558.0,
    10030.0,
    11425.0,
    10198.0,
    10275.0,
    11275.0,
    8553.0,
    8878.0,
    10469.0,
    9963.0,
    11769.0,
    10260.0,
    9684.0,
    13505.0,
    11386.0,
    11848.0,
    9988.0,
    11212.0,
    12144.0,
    10584.0,
    12648.0,
    11459.0,
    11941.0,
    11618.0,
    14888.0,
    12542.0,
    11265.0,
    13789.0,
    11213.0,
    13152.0,
    10412.0,
    11313.0,
    13376.0,
    14160.0,
    13503.0,
    13210.0,
    13049.0,
    11598.0,
    12664.0,
    13081.0,
    15134.0,
    14287.0,
    11628.0,
    14421.0,
    13579.0,
    13280.0,
    15035.0,
    15660.0,
    15611.0,
    13389.0,
    14158.0,
    15071.0,
    15988.0,
    14177.0,
    14639.0,
    13522.0,
    13485.0,
    16176.0,
    16963.0,
    15186.0,
    16665.0,
    15910.0,
    14681.0,
    16070.0,
    17679.0,
    15713.0,
    17874.0,
    12514.0,
    17068.0,
    16193.0,
    15771.0,
    16359.0,
    13736.0,
    16114.0,
    16944.0,
    18481.0,
    15966.0,
    15669.0,
    16148.0,
    18070.0,
    17387.0,
    16351.0,
    17787.0
  ],
  "signups": [
    536.0,
    529.0,
    519.0,
    591.0,
    477.0,
    439.0,
    621.0,
    570.0,
    484.0,
    540.0,
    434.0,
    473.0,
    521.0,
    373.0,
    410.0,
    504.0,
    533.0,
    550.0,
    482.0,
    441.0,
    544.0,
    515.0,
    537.0,
    540.0,
    494.0,
    551.0,
    467.0,
    513.0,
    544.0,
    548.0,
    533.0,
    608.0,
    590.0,
    428.0,
    607.0,
    555.0,
    515.0,
    414.0,
    474.0,
    534.0,
    524.0,
    555.0,
    498.0,
    545.0,
    432.0,
    564.0,
    491.0,
    587.0,
    592.0,
    409.0,
    569.0,
    574.0,
    451.0,
    582.0,
    605.0,
    619.0,
    457.0,
    479.0,
    579.0,
    601.0,
    529.0,
    546.0,
    464.0,
    494.0,
    590.0,
    576.0,
    606.0,
    603.0,
    511.0,
    533.0,
    517.0,
    634.0,
    577.0,
    573.0,
    456.0,
    584.0,
    567.0,
    589.0,
    525.0,
    418.0,
    486.0,
    512.0,
    584.0,
    517.0,
    501.0,
    533.0,
    559.0,
    587.0,
    488.0,
    639.0
  ]
}

static_weights = {
    "device": {"mobile": 0.6, "desktop": 0.3, "tablet": 0.1},
    "browser": {"chrome": 0.5, "firefox": 0.3, "safari": 0.2},
    "channel": {"organic": 0.7, "paid": 0.3},
}

interpolated_weights = {
    "location": {
        "start": {"northern": 0.4, "southern": 0.2, "eastern": 0.10, "western": 0.2, "central": 0.1},
        "end":   {"northern": 0.15, "southern": 0.15, "eastern": 0.05, "western": 0.1, "central": 0.40}
    }
}

signup_factors = {
    "device": {"mobile": 1.0, "desktop": 1.2, "tablet": 0.8},
    "browser": {"chrome": 1.0, "firefox": 0.9, "safari": 1.1},
    "channel": {"organic": 1.0, "paid": 1.3},
    "location": {"northern": 1.4, "southern": 1.3, "eastern": 0.8, "western": 1.05, "central": 0.7},
}

jitter_levels = {
    "device": 0.02,
    "browser": 0.05,
    "channel": 0.10,
    "location": 0.03
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

def compute_signup_multiplier(combo, signup_factors):
    return np.prod([signup_factors[dim][val] for dim, val in zip(signup_factors.keys(), combo)])

def generate_data_top_down(data, static_weights, interpolated_weights, signup_factors, jitter_levels):
    df_input = pd.DataFrame(data)
    num_days = len(df_input)
    all_rows = []

    for i, (_, row) in enumerate(df_input.iterrows()):
        date = row["day"]
        visitors = row["visitors"]
        target_signups = row["signups"]
        progress = i / (num_days - 1) if num_days > 1 else 0

        # Interpolated weights with jitter
        interpolated_day_weights = {
            dim: jitter_weights(
                interpolate_weights(w["start"], w["end"], progress),
                jitter_levels.get(dim, 0.0)
            )
            for dim, w in interpolated_weights.items()
        }

        # Static weights with jitter
        static_day_weights = {
            dim: jitter_weights(weights, jitter_levels.get(dim, 0.0))
            for dim, weights in static_weights.items()
        }

        # Combine
        full_weights = {**static_day_weights, **interpolated_day_weights}
        dimensions, all_combos = generate_combinations(full_weights)

        # Compute combo probabilities
        combo_weights = [compute_combo_weights(combo, full_weights) for combo in all_combos]
        combo_probs = np.array(combo_weights) / sum(combo_weights)

        # Sample visitors using multinomial
        visitors_per_combo = np.random.multinomial(visitors, combo_probs)

        # Compute signups
        signup_multipliers = [compute_signup_multiplier(combo, signup_factors) for combo in all_combos]
        signup_rates = np.array(signup_multipliers)
        scaled_rates = target_signups / sum(visitors_per_combo * signup_rates) * signup_rates
        signups_per_combo = [
            np.random.binomial(v, min(rate, 1)) if v > 0 else 0
            for v, rate in zip(visitors_per_combo, scaled_rates)
        ]

        # Build output
        for combo, v, s in zip(all_combos, visitors_per_combo, signups_per_combo):
            row_out = {"day": date}
            for dim, val in zip(dimensions, combo):
                row_out[dim] = val
            row_out["visitors"] = v
            row_out["signups"] = s
            all_rows.append(row_out)

    return pd.DataFrame(all_rows)

# ---- Run It ----

df = generate_data_top_down(data, static_weights, interpolated_weights, signup_factors, jitter_levels)

df.to_csv(filename, index=False)

print("Data generated")


# import matplotlib.pyplot as plt
# import seaborn as sns


# def visualize_data_seaborn(df, breakdown_columns):
#     df = df.copy()
#     df["Signup Rate"] = df["Signups"] / df["Visitors"]

#     # Set plot style
#     sns.set_theme(style="whitegrid")

#     # --- Overall Trends ---
#     overall = df.groupby("Date")[["Visitors", "Signups"]].sum().reset_index()
#     overall["Signup Rate"] = overall["Signups"] / overall["Visitors"]

#     fig, ax1 = plt.subplots(figsize=(10, 5))
#     ax2 = ax1.twinx()

#     sns.lineplot(data=overall, x="Date", y="Visitors", ax=ax1, label="Visitors", color="blue",ci=None)
#     sns.lineplot(data=overall, x="Date", y="Signups", ax=ax1, label="Signups", color="green",ci=None)
#     sns.lineplot(data=overall, x="Date", y="Signup Rate", ax=ax2, label="Signup Rate", color="orange", linestyle="--",ci=None)

#     ax1.set_ylabel("Visitors / Signups")
#     ax2.set_ylabel("Signup Rate")
#     ax1.set_title("Overall Trends")
#     ax1.legend(loc="upper left")
#     ax2.legend(loc="upper right")
#     plt.xticks(rotation=45)
#     plt.tight_layout()
#     plt.show()

#     # --- Breakdowns ---
#     metrics = ["Visitors", "Signups", "Signup Rate"]

#     for breakdown in breakdown_columns:
#         fig, axes = plt.subplots(nrows=3, ncols=1, figsize=(10, 12), sharex=True)
#         fig.suptitle(f"Breakdown by {breakdown}", fontsize=16)

#         for idx, metric in enumerate(metrics):
#             sns.lineplot(
#                 data=df,
#                 x="Date",
#                 y=metric,
#                 hue=breakdown,
#                 ax=axes[idx],
#                 ci=None,
#             )
#             axes[idx].set_title(metric)
#             axes[idx].legend(title=breakdown, bbox_to_anchor=(1.05, 1), loc='upper left')
#             axes[idx].tick_params(axis='x', rotation=45)

#         plt.tight_layout(rect=[0, 0, 0.85, 0.96])
#         plt.show()

# visualize_data_seaborn(df, breakdown_columns=["Device", "Browser", "Channel", "Location"])
