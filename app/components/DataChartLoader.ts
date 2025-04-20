"use client"

import { useEffect, useState } from "react"

type DeviceType = "desktop" | "mobile" | "tablet"
type BrowserType = "chrome" | "firefox" | "safari" | "edge"
type ChannelType = "organic" | "paid" | "social" | "email"

type VisitorData = {
  day: string
  device: DeviceType
  browser: BrowserType
  channel: ChannelType
  visitors: number
  signups: number
}

type Props = {
  scenario: number
}

// Strictly typed CSV parser
function parseCSV(csvText: string): VisitorData[] {
  const lines = csvText.trim().split("\n")
  const headers = lines[0].split(",")

  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim())

    const row: VisitorData = {
      day: values[headers.indexOf("Day")],
      device: values[headers.indexOf("Device")] as DeviceType,
      browser: values[headers.indexOf("Browser")] as BrowserType,
      channel: values[headers.indexOf("Channel")] as ChannelType,
      visitors: parseInt(values[headers.indexOf("Visitors")], 10),
      signups: parseInt(values[headers.indexOf("Signups")], 10),
    }

    return row
  })
}

export default function DataChartLoader({scenario}: Props) {
  const [data, setData] = useState<VisitorData[]>([])
  const csvUrl = `/scenarios/scenario${scenario}.csv`


  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from:", csvUrl)
      try {
        const response = await fetch(csvUrl)
        console.log("Response status:", response.status)
        const text = await response.text()
        console.log("Raw CSV text:", text.slice(0, 200)) // first 200 chars
  
        const parsedData = parseCSV(text)
        // console.log("Parsed CSV data:", parsedData)
  
        setData(parsedData)
      } catch (error) {
        console.error("Error loading data:", error)
      } 
    }
  
    fetchData()
  }, [csvUrl])
//   useEffect(() => {
//     fetch(csvUrl)
//       .then((res) => res.text())
//       .then((csvText) => {
//         const parsed = parseCSV(csvText)
//         setData(parsed)
//       })
//       .catch((err) => {
//         console.error("Error loading CSV:", err)
//       })
//   }, [csvUrl])

  return data
}


