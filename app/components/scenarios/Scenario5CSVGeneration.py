import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# ===== Config ===== #
np.random.seed(420)

FILENAME = "../../public/scenarios/scenario5.csv"
DAYS = 120  # ~4 months
START_DATE = datetime.now().date() - timedelta(days=DAYS)
CHANNELS = ["organic", "paid", "referral", "social"]
DEVICES = ["mobile", "desktop", "tablet"]

# Base probabilities
channel_weights_start = {"organic": 0.4, "paid": 0.2, "referral": 0.3, "social": 0.1}
channel_weights_end = {"organic": 0.15, "paid": 0.7, "referral": 0.1, "social": 0.05}
device_weights = {"mobile": 0.6, "desktop": 0.3, "tablet": 0.1}

# Retention base rates by channel
retention_rates = {
    # "organic": [0.50, 0.30, 0.20],   # 1 week, 1 month, 2 months
    # "paid": [0.20, 0.15, 0.08],
    # "referral": [0.55, 0.35, 0.25],
    # "social": [0.40, 0.20, 0.10]
    "organic": [0.50, 0.80, 0.90],   # 1 week, 1 month, 2 months
    "paid": [0.10, 0.30, 0.40],
    "referral": [0.55, 0.85, 0.80],
    "social": [0.40, 0.90, 0.80]
}

# ===== Helper Functions ===== #
def interpolate_weights(start_weights, end_weights, progress):
    """Linearly interpolate between start and end weights."""
    weights = {k: (1 - progress) * start_weights[k] + progress * end_weights[k] for k in start_weights}
    total = sum(weights.values())
    return {k: v / total for k, v in weights.items()}

def simulate_day(day_num, date, total_visitors):
    """Simulate one day's visitors, signups, and retention."""
    days_since_signup = (datetime.now().date() - date).days
    
    # Interpolate channel weights
    progress = day_num / DAYS
    channel_weights = interpolate_weights(channel_weights_start, channel_weights_end, progress)
    
    # Sample visitors by channel and device
    channel_visitors = np.random.multinomial(total_visitors, list(channel_weights.values()))
    # device_visitors = np.random.multinomial(total_visitors, list(device_weights.values()))
    
    data = []
    for channel, c_visitors in zip(channel_weights.keys(), channel_visitors):
        if c_visitors == 0:
            continue
        for device, d_prob in device_weights.items():
            d_visitors = int(c_visitors * d_prob)
            if d_visitors == 0:
                continue
            
            # Signups based on a simple base rate
            base_signup_rate = 0.5
            signup_rate = base_signup_rate * (0.8 + np.random.rand() * 0.05)  # small noise
            signups = np.random.binomial(d_visitors, signup_rate)
            
            # Retention based on signups
            week_rate, month_rate, two_month_rate = retention_rates[channel]
            retained_1_week = np.nan
            retained_1_month = np.nan
            retained_2_months = np.nan
            
            if days_since_signup >= 7:
                retained_1_week = np.random.binomial(signups, week_rate) if signups > 0 else 0
            if days_since_signup >= 30:
                retained_1_month = np.random.binomial(retained_1_week, month_rate) if retained_1_week > 0 else 0
            if days_since_signup >= 60:
                retained_2_months = np.random.binomial(retained_1_month, two_month_rate) if retained_1_month > 0 else 0
        
            
            data.append({
                "day": date,
                "device": device,
                "channel": channel,
                "visitors": d_visitors,
                "signups": signups,
                "retained_1_week": retained_1_week,
                "retained_1_month": retained_1_month,
                "retained_2_months": retained_2_months
            })
    return data

# ===== Main Simulation ===== #
all_data = []
for i in range(DAYS):
    date = START_DATE + timedelta(days=i)
    base_visitors = 400 + 50 * np.sin(i / 15)  # smooth waves over time
    total_visitors = int(base_visitors + np.random.normal(0, 30))  # small random noise
    total_visitors = max(total_visitors, 100)  # never negative
    daily_data = simulate_day(i, date, total_visitors)
    all_data.extend(daily_data)

df = pd.DataFrame(all_data)
df.to_csv(FILENAME, index=False)

# ===== Visualization ===== #
# Prepare daily summaries
daily_summary = df.groupby("day").agg({
    "signups": "sum",
    "retained_1_week": "sum",
    "retained_1_month": "sum",
    "retained_2_months": "sum"
}).reset_index()

# Calculate retention rates
daily_summary["retention_1_week"] = daily_summary["retained_1_week"] / daily_summary["signups"]
daily_summary["retention_1_month"] = daily_summary["retained_1_month"] / daily_summary["signups"]
daily_summary["retention_2_months"] = daily_summary["retained_2_months"] / daily_summary["signups"]

# Calculate channel signup shares
channel_summary = df.groupby(["day", "channel"]).agg({
    "signups": "sum"
}).reset_index()

channel_pivot = channel_summary.pivot(index="day", columns="channel", values="signups").fillna(0)
channel_share = channel_pivot.div(channel_pivot.sum(axis=1), axis=0)

# ===== Plotting ===== #
sns.set(style="whitegrid")

# Retention over time
plt.figure(figsize=(14, 6))
plt.plot(daily_summary["day"], daily_summary["retention_1_week"], label="1 Week Retention")
plt.plot(daily_summary["day"], daily_summary["retention_1_month"], label="1 Month Retention")
plt.plot(daily_summary["day"], daily_summary["retention_2_months"], label="2 Months Retention")
plt.title("Retention Rates Over Time")
plt.xlabel("Day")
plt.ylabel("Retention Rate")
plt.legend()
plt.ylim(0, 0.6)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# Channel signup share over time
channel_share.plot.area(figsize=(14, 6), cmap="Set2", stacked=True)
plt.title("Signup Share by Channel Over Time")
plt.xlabel("Day")
plt.ylabel("Signup Share")
plt.legend(title="Channel", bbox_to_anchor=(1.05, 1), loc='upper left')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
