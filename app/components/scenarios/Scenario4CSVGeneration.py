import pandas as pd
import numpy as np
from datetime import datetime, timedelta, time
import matplotlib.pyplot as plt
import seaborn as sns

# ===== Config ===== #
np.random.seed(69)
filename = "../../public/scenarios/scenario4.csv"
dayS = 10
START_DATE = datetime.combine(datetime.now(), time.min) - timedelta(days=1) - timedelta(days=dayS)
END_DATE = datetime.combine(datetime.now(), time.min) - timedelta(days=1)
BASE_CONVERSION = 0.05

device_weights = {"mobile": 0.6, "desktop": 0.4}
channel_weights = {"organic": 0.3, "paid": 0.3, "social": 0.2, "email": 0.2}
returning_user_weights = {"new": 0.8, "returning": 0.2}

device_factors = {"mobile": 1.1, "desktop": 1.5}
channel_factors = {"organic": 1.2, "paid": 0.8, "social": 0.8, "email": 1.0}
returning_user_factors = {"new": 0.5, "returning": 1.5}

sweater_base_weights = {"regular": 1}  # before fancy introduced
sweater_postfancy_weights = {"regular": 0.5, "fancy": 0.5}  # after day 8
# sweater_factors = {"none": 0.0, "regular": 1.0, "fancy": 0.6}  # fancier sweaters sell worse
sweater_revenue = {"none": 0, "regular": 20, "fancy": 40}


# ===== Helper ===== #
def generate_minute_visitors(start, end):
    minutes = pd.date_range(start=start, end=end, freq='T')[:-1]
    rows = []

    base = 100
    day_factor = [1.2, 1.1, 1.0, 1.0, 1.3, 0.8, 0.7]

    for minute in minutes:
        tod = minute.hour + minute.minute / 60
        weekday = minute.weekday()
        tf = 2 if 8 <= tod <= 20 else 0.5
        mins_since_midnight = minute.hour * 60 + minute.minute
        sin_wave = 0.5 * (1 + np.sin((2 * np.pi / 1440) * (mins_since_midnight - 840)))
        visitors = base * day_factor[weekday] * tf * (1 + sin_wave)
        count = max(0, int(visitors + np.random.normal(0, 10)))
        rows.append((minute, count))
    return pd.DataFrame(rows, columns=["minute", "visitors"])

def jitter_weights(base_weights, scale=0.2):
    keys = list(base_weights.keys())
    base = np.array(list(base_weights.values()))
    noise = np.random.normal(1.0, scale, size=len(base))
    noisy = np.clip(base * noise, 0.01, None)
    return dict(zip(keys, noisy / noisy.sum()))

def simulate_batch_sales(minute_df):
    results = []
    current_day = minute_df['minute'][0].date()

    device_weights_day = jitter_weights(device_weights, scale=0.2)
    channel_weights_day = jitter_weights(channel_weights, scale=0.2)
    returning_user_weights_day = jitter_weights(returning_user_weights, scale=0.2)

    device_keys, device_probs = zip(*device_weights_day.items())
    channel_keys, channel_probs = zip(*channel_weights_day.items())
    returning_user_keys, returning_user_probs = zip(*returning_user_weights_day.items())

    # Generate a random daily multiplier
    daily_noise = {
        day: np.clip(np.random.normal(1.0, 0.2), 0.9, 1.1)
        for day in pd.to_datetime(minute_df["minute"]).dt.date.unique()
    }

    for _, row in minute_df.iterrows():
        minute = row["minute"]
        day = minute.date()

        if day != current_day:
            # refresh jitter every day
            device_weights_day = jitter_weights(device_weights, scale=0.1)
            channel_weights_day = jitter_weights(channel_weights, scale=0.1)
            returning_user_weights_day = jitter_weights(returning_user_weights, scale=0.1)

            device_keys, device_probs = zip(*device_weights_day.items())
            channel_keys, channel_probs = zip(*channel_weights_day.items())
            returning_user_keys, returning_user_probs = zip(*returning_user_weights_day.items())
            current_day = day

        total = row["visitors"]
        if total == 0:
            continue

        device_counts = np.random.multinomial(total, device_probs)
        for device, d_count in zip(device_keys, device_counts):
            if d_count == 0:
                continue
            returning_user_counts = np.random.multinomial(d_count, returning_user_probs)
            for returning_user, ru_count in zip(returning_user_keys, returning_user_counts):
                if ru_count == 0:
                    continue
                channel_counts = np.random.multinomial(ru_count, channel_probs)
                for channel, c_count in zip(channel_keys, channel_counts):
                    if c_count == 0:
                        continue

                    # Calculate conversion rate
                    conv_rate = BASE_CONVERSION
                    conv_rate *= device_factors[device]
                    conv_rate *= channel_factors[channel]
                    conv_rate *= returning_user_factors[returning_user]
                    # conv_rate *= sweater_factors[sweater]
                    conv_rate *= daily_noise[day]
                    conv_rate *= np.random.uniform(0.7, 1.3)  # time randomness

                    conv_rate = np.clip(conv_rate, 0, 1)
                    
                    if (day - START_DATE.date()).days >= 8:
                        conv_rate *= 0.7

                    sales = np.random.binomial(c_count, conv_rate)

                    # Append results for users who did not purchase
                    results.append({
                        "minute": minute,
                        "day": day,
                        "device": device,
                        "returning_user": returning_user,
                        "sweater": "none",
                        "channel": channel,
                        "visitors": c_count - sales,
                        "sales": 0,
                        "revenue": 0
                    })
                    
                    # Determine sweater breakdown
                    if (day - START_DATE.date()).days < 8:
                        sweater_weights = sweater_base_weights
                    else:
                        sweater_weights = sweater_postfancy_weights
                    sweater_keys, sweater_probs = zip(*sweater_weights.items())
                    sweater_counts = np.random.multinomial(sales, sweater_probs)
                    
                    # Apply sweaters to conversions
                    for sweater, s_count in zip(sweater_keys, sweater_counts):
                        if s_count == 0:
                            continue
                        
                        revenue = sales * sweater_revenue[sweater]
                        results.append({
                            "minute": minute,
                            "day": day,
                            "device": device,
                            "returning_user": returning_user,
                            "sweater": sweater,
                            "channel": channel,
                            "visitors": s_count,
                            "sales": s_count,
                            "revenue": revenue
                        })
                        

                        


    return pd.DataFrame(results)

# ===== Run All ===== #
minute_data = generate_minute_visitors(START_DATE, END_DATE)
batched_df = simulate_batch_sales(minute_data)

# Daily aggregation
daily = batched_df.groupby(["day", "device", "returning_user", "sweater", "channel"]).agg(
    {"visitors": "sum", "sales": "sum", "revenue": "sum"}
).reset_index()

daily.to_csv(filename, index=False)

# Quick Plotting
summary = batched_df.groupby("day").agg({"visitors": "sum", "sales": "sum"}).reset_index()
summary["Sale Rate"] = summary["sales"] / summary["visitors"]

plt.figure(figsize=(10, 5))
plt.plot(summary["day"], summary["Sale Rate"], marker='o', color='teal')
plt.title("Daily Sale Rate")
plt.xlabel("day")
plt.ylabel("Sale Rate")
plt.ylim(0, summary["Sale Rate"].max() * 1.1)
plt.grid(True)
plt.tight_layout()
plt.show()

import matplotlib.dates as mdates

# Apply seaborn style
sns.set_theme(style="whitegrid")

# Summarize overall
summary = batched_df.groupby("day").agg({"visitors": "sum", "sales": "sum"}).reset_index()
summary["Sale Rate"] = summary["sales"] / summary["visitors"]

# Summarize by sweater
sweater_summary = batched_df.groupby(["day", "sweater"]).agg({"visitors": "sum", "sales": "sum"}).reset_index()
sweater_summary["Sale Rate"] = sweater_summary["sales"] / sweater_summary["visitors"]

# Create plots
fig, axes = plt.subplots(2, 1, figsize=(12, 10), sharex=True)

# ---- Plot 1: Overall Sale Rate ----
axes[0].plot(summary["day"], summary["Sale Rate"], marker='o', color='teal')
axes[0].set_title("Overall Daily Sale Rate", fontsize=16)
axes[0].set_ylabel("Sale Rate", fontsize=12)
axes[0].grid(True)
axes[0].set_ylim(0, summary["Sale Rate"].max() * 1.2)

# ---- Plot 2: Sale Rate by Sweater ----
for sweater, df_sub in sweater_summary.groupby("sweater"):
    axes[1].plot(df_sub["day"], df_sub["Sale Rate"], marker='o', label=sweater)

axes[1].set_title("Daily Sale Rate by Sweater Type", fontsize=16)
axes[1].set_ylabel("Sale Rate", fontsize=12)
axes[1].set_xlabel("Day", fontsize=12)
axes[1].grid(True)
axes[1].legend(title="Sweater", fontsize=10, title_fontsize=11)
axes[1].set_ylim(0, sweater_summary["Sale Rate"].max() * 1.2)

# Format x-axis nicely
axes[1].xaxis.set_major_formatter(mdates.DateFormatter('%b %d'))
fig.autofmt_xdate()

plt.tight_layout()
plt.show()

