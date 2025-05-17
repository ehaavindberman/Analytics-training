export function formatLabel(label: string): string {
    return label
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

export function formatValue(value: number, format: string): string {
    if (format == "pct") {
        return `${(value * 100).toFixed(2)}%`
    }

    if (format == "currency") {
        return `$${value.toFixed(2)}`
    }

    if (format == "millions") {
        return `${(value / 1_000_000).toFixed(1)}M`
    }

    if (format == "thousands") {
        return `${(value / 1000).toFixed(1)}k`
    }

    return value.toLocaleString()
}

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
}