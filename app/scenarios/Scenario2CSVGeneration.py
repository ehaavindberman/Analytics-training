# we have data for the last 10 days, after the 8th day, 
# visitors on the social channel drops by half

import pandas as pd
import numpy as np
from datetime import datetime, timedelta, time
import matplotlib.pyplot as plt
import seaborn as sns

# ===== Config ===== #
np.random.seed(5)
filename = '../../public/scenariosscenario2.csv'
dayS = 10
START_DATE = datetime.combine(datetime.now(), time.min) - timedelta(days=1) - timedelta(days=dayS)
END_DATE = datetime.combine(datetime.now(), time.min) - timedelta(days=1)
BASE_CONVERSION = 0.05

device_weights = {"mobile": 0.5, "desktop": 0.4, "tablet": 0.1}
browser_weights = {"chrome": 0.4, "firefox": 0.2, "safari": 0.2, "edge": 0.1, "opera": 0.1}
channel_weights = {"organic": 0.1, "paid": 0.3, "social": 0.5, "email": 0.1}

device_factors = {"mobile": 1.1, "desktop": 1.5, "tablet": 1.3}
browser_factors = {"chrome": 1.2, "firefox": 1.0, "safari": 1.1, "edge": 0.9, "opera": 0.8}
channel_factors = {"organic": 1.2, "paid": 0.8, "social": 1.3, "email": 0.8}


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
    noise = np.random.normal(1.0, scale, size=len(base))  # Add noise per category
    noisy = np.clip(base * noise, 0.01, None)  # Avoid zeros
    return dict(zip(keys, noisy / noisy.sum()))  # Normalize


def simulate_batch_signups(minute_df):
    results = []
    two_days_ago = datetime.combine(datetime.now(), time.min) - timedelta(days=3)

    # In your outer day loop (or even minute loop if you want more chaos)
    device_weights_day = jitter_weights(device_weights, scale=0.3)
    browser_weights_day = jitter_weights(browser_weights, scale=0.3)
    channel_weights_day = jitter_weights(channel_weights, scale=0.05)
    
    device_keys, device_probs = zip(*device_weights_day.items())
    browser_keys, browser_probs = zip(*browser_weights_day.items())
    channel_keys, channel_probs = zip(*channel_weights_day.items())

    # Generate a random daily multiplier for each day
    daily_noise = {
        day: np.clip(np.random.normal(1.0, 0.2), 0.8, 1.2)
        for day in pd.to_datetime(minute_df["minute"]).dt.date.unique()
    }

    current_day =  minute_df['minute'][0].date()

    for _, row in minute_df.iterrows():
        minute = row["minute"]
        day = minute.date()
        
        # reset the jitter weights for each factor every day
        if day != current_day:
            device_weights_day = jitter_weights(device_weights, scale=0.3)
            browser_weights_day = jitter_weights(browser_weights, scale=0.3)
            channel_weights_day = jitter_weights(channel_weights, scale=0.05)
            current_day = day
            
            device_keys, device_probs = zip(*device_weights_day.items())
            browser_keys, browser_probs = zip(*browser_weights_day.items())
            channel_keys, channel_probs = zip(*channel_weights_day.items())
        
        total = row["visitors"]

        if total == 0:
            continue

        # Multinomial sampling for breakdowns
        device_counts = np.random.multinomial(total, device_probs)
        for device, d_count in zip(device_keys, device_counts):
            if d_count == 0:
                continue
            browser_counts = np.random.multinomial(d_count, browser_probs)
            for browser, b_count in zip(browser_keys, browser_counts):
                if b_count == 0:
                    continue
                channel_counts = np.random.multinomial(b_count, channel_probs)
                for channel, c_count in zip(channel_keys, channel_counts):
                    if c_count == 0:
                        continue

                    # Main conversion rate with multiple noise factors
                    conv_rate = BASE_CONVERSION
                    conv_rate *= device_factors[device]
                    conv_rate *= browser_factors[browser]
                    conv_rate *= channel_factors[channel]

                    # Apply big noise
                    conv_rate *= np.clip(np.random.normal(1.0, 0.3), 0.5, 1.5)  # Individual batch noise
                    conv_rate *= daily_noise[day]  # Daily noise
                    conv_rate *= np.random.uniform(0.7, 1.3)  # Time-of-day randomness

                    if (minute > two_days_ago and channel == "social"):
                        c_count = round(c_count/5)

                    conv_rate = np.clip(conv_rate, 0, 1)  # Valid probability range
                    signups = np.random.binomial(c_count, conv_rate)

                    results.append({
                        "minute": minute,
                        "day": day,
                        "device": device,
                        "browser": browser,
                        "channel": channel,
                        "visitors": c_count,
                        "signups": signups
                    })

    return pd.DataFrame(results)



# ===== Run All ===== #
minute_data = generate_minute_visitors(START_DATE, END_DATE)
batched_df = simulate_batch_signups(minute_data)

# Daily aggregation
daily = batched_df.groupby(["day", "device", "browser", "channel"]).agg(
    {"visitors": "sum", "signups": "sum"}
).reset_index()

daily.to_csv(filename, index=False)

# Plot daily signup rate
summary = batched_df.groupby("day").agg({"visitors": "sum", "signups": "sum"}).reset_index()
summary["Signup Rate"] = summary["signups"] / summary["visitors"]

plt.figure(figsize=(10, 5))
plt.plot(summary["day"], summary["Signup Rate"], marker='o', color='teal')
plt.title("Daily Signup Rate")
plt.xlabel("day")
plt.ylabel("Signup Rate")
plt.ylim(0, summary["Signup Rate"].max() * 1.1)
plt.grid(True)
plt.tight_layout()
plt.show()


plt.figure(figsize=(10, 5))
plt.plot(summary["day"], summary["signups"], marker='o', color='teal')
plt.title("Daily signups")
plt.xlabel("day")
plt.ylabel("signups")
plt.ylim(0, summary["signups"].max() * 1.1)
plt.grid(True)
plt.tight_layout()
plt.show()


sns.set(style="whitegrid")

# Make sure signup rate exists
def plot_breakdowns(df, breakdown_col, axes, row):
    unique_values = df[breakdown_col].unique()

    # Plot: visitors
    for val in unique_values:
        subset = df[df[breakdown_col] == val]
        axes[row, 0].plot(subset["day"], subset["visitors"], marker='o', label=val)
    
    axes[row, 0].set_title(f"{breakdown_col} - visitors")
    axes[row, 0].set_ylabel("visitors")
    axes[row, 0].set_ylim(bottom=0)
    axes[row, 0].legend(title=breakdown_col)
    
    # Plot: Signup Rate
    for val in unique_values:
        subset = df[df[breakdown_col] == val]
        axes[row, 1].plot(subset["day"], subset["Signup Rate"], marker='o', label=val)
    
    axes[row, 1].set_title(f"{breakdown_col} - Signup Rate")
    axes[row, 1].set_ylabel("Signup Rate")
    axes[row, 1].set_ylim(bottom=0)
    axes[row, 1].legend(title=breakdown_col)

# Set up the figure with 3 rows and 2 columns for the breakdowns
fig, axes = plt.subplots(nrows=3, ncols=2, figsize=(16, 12), sharex='col')
fig.suptitle("visitors and Signup Rates by Breakdown", fontsize=18, y=1.02)

# Prepare and plot for device breakdown
bkdn = batched_df.groupby(["day", "device"]).agg({"visitors": "sum", "signups": "sum"}).reset_index()
bkdn["Signup Rate"] = bkdn["signups"] / bkdn["visitors"]
plot_breakdowns(bkdn, "device", axes, 0)

# Prepare and plot for browser breakdown
bkdn = batched_df.groupby(["day", "browser"]).agg({"visitors": "sum", "signups": "sum"}).reset_index()
bkdn["Signup Rate"] = bkdn["signups"] / bkdn["visitors"]
plot_breakdowns(bkdn, "browser", axes, 1)

# Prepare and plot for channel breakdown
bkdn = batched_df.groupby(["day", "channel"]).agg({"visitors": "sum", "signups": "sum"}).reset_index()
bkdn["Signup Rate"] = bkdn["signups"] / bkdn["visitors"]
plot_breakdowns(bkdn, "channel", axes, 2)

# Rotate x-axis labels for better visibility
for ax in axes[-1]:  # Only on the bottom row
    ax.set_xlabel("day")
    for label in ax.get_xticklabels():
        label.set_rotation(45)

plt.tight_layout()
plt.subplots_adjust(top=0.92)  # Make room for the main title
plt.show()
