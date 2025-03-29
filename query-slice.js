import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Mock data generator based on query
const generateMockData = (query) => {
  // Lowercase the query for easier matching
  const q = query.toLowerCase()

  // Sales trends query
  if (q.includes("sales") || q.includes("revenue") || q.includes("trend")) {
    return {
      chartType: "line",
      chartTitle: "Sales Trends (Last 6 Months)",
      data: [
        { name: "Jan", Sales: 4000, Target: 4500 },
        { name: "Feb", Sales: 4200, Target: 4500 },
        { name: "Mar", Sales: 5800, Target: 5000 },
        { name: "Apr", Sales: 5200, Target: 5000 },
        { name: "May", Sales: 6000, Target: 5500 },
        { name: "Jun", Sales: 7200, Target: 5500 },
      ],
      insights: [
        "Sales have increased by 80% from January to June",
        "March saw the highest month-over-month growth at 38%",
        "Sales have consistently exceeded targets since March",
        "June had the highest sales at $7,200",
      ],
      tableHeaders: ["Month", "Sales", "Target", "Variance"],
      tableData: [
        ["Jan", "$4,000", "$4,500", "-$500"],
        ["Feb", "$4,200", "$4,500", "-$300"],
        ["Mar", "$5,800", "$5,000", "+$800"],
        ["Apr", "$5,200", "$5,000", "+$200"],
        ["May", "$6,000", "$5,500", "+$500"],
        ["Jun", "$7,200", "$5,500", "+$1,700"],
      ],
      summary:
        "Sales have shown a strong upward trend over the last 6 months, with a total increase of 80% from January to June. After initially missing targets in January and February, sales have consistently exceeded targets since March, with June showing the highest performance at $7,200 (31% above target).",
      recommendations: [
        "Analyze the factors that led to the March breakthrough to replicate success",
        "Consider adjusting targets for the next quarter based on the current growth trajectory",
        "Investigate the sales strategies implemented in May-June for potential scaling",
      ],
    }
  }

  // Regional comparison query
  else if (q.includes("region") || q.includes("compare")) {
    return {
      chartType: "bar",
      chartTitle: "Revenue by Region (Current Year)",
      data: [
        { name: "North", Q1: 12000, Q2: 15000, Q3: 18000, Q4: 14000 },
        { name: "South", Q1: 18000, Q2: 21000, Q3: 24000, Q4: 22000 },
        { name: "East", Q1: 14000, Q2: 16000, Q3: 19000, Q4: 18000 },
        { name: "West", Q1: 20000, Q2: 24000, Q3: 28000, Q4: 26000 },
      ],
      insights: [
        "West region has the highest overall revenue at $98,000",
        "South region shows the most consistent performance",
        "All regions show growth from Q1 to Q3, with a slight decline in Q4",
        "Q3 was the strongest quarter across all regions",
      ],
      tableHeaders: ["Region", "Q1", "Q2", "Q3", "Q4", "Total"],
      tableData: [
        ["North", "$12,000", "$15,000", "$18,000", "$14,000", "$59,000"],
        ["South", "$18,000", "$21,000", "$24,000", "$22,000", "$85,000"],
        ["East", "$14,000", "$16,000", "$19,000", "$18,000", "$67,000"],
        ["West", "$20,000", "$24,000", "$28,000", "$26,000", "$98,000"],
      ],
      summary:
        "The West region leads in revenue generation with a total of $98,000 for the year, followed by the South region at $85,000. All regions demonstrated growth from Q1 through Q3, with a slight decline in Q4, which may indicate seasonal patterns. The South region shows the most consistent performance with less variance between quarters.",
      recommendations: [
        "Investigate the successful strategies in the West region for potential application elsewhere",
        "Develop targeted plans to address Q4 decline across all regions",
        "Consider reallocating resources to support the North region, which has the lowest overall performance",
      ],
    }
  }

  // Product performance query
  else if (q.includes("product") || q.includes("top")) {
    return {
      chartType: "pie",
      chartTitle: "Top 5 Products by Revenue",
      data: [
        { name: "Product A", value: 35000 },
        { name: "Product B", value: 28000 },
        { name: "Product C", value: 22000 },
        { name: "Product D", value: 18000 },
        { name: "Product E", value: 15000 },
      ],
      insights: [
        "Product A accounts for 30% of the revenue from top products",
        "The top 2 products generate 53% of the revenue",
        "Product E has the highest profit margin at 42%",
        "Product C has shown the fastest growth at 28% year-over-year",
      ],
      tableHeaders: ["Product", "Revenue", "Units Sold", "Profit Margin", "YoY Growth"],
      tableData: [
        ["Product A", "$35,000", "1,200", "35%", "+15%"],
        ["Product B", "$28,000", "950", "32%", "+8%"],
        ["Product C", "$22,000", "720", "38%", "+28%"],
        ["Product D", "$18,000", "680", "30%", "+5%"],
        ["Product E", "$15,000", "420", "42%", "+12%"],
      ],
      summary:
        "Product A is the clear leader in revenue generation, accounting for 30% of the revenue from the top 5 products. While Products A and B dominate in terms of revenue, Product E stands out with the highest profit margin at 42%, and Product C shows the strongest year-over-year growth at 28%, indicating emerging opportunities.",
      recommendations: [
        "Increase marketing investment in Product C to capitalize on its growth momentum",
        "Consider premium positioning for Product E given its high profit margin",
        "Develop bundle strategies pairing top-selling Product A with lower-performing products",
      ],
    }
  }

  // Customer acquisition query
  else if (q.includes("customer") || q.includes("acquisition") || q.includes("cac")) {
    return {
      chartType: "line",
      chartTitle: "Customer Acquisition Cost Over Time",
      data: [
        { name: "Jan", CAC: 120, LTV: 380 },
        { name: "Feb", CAC: 125, LTV: 390 },
        { name: "Mar", CAC: 118, LTV: 400 },
        { name: "Apr", CAC: 105, LTV: 420 },
        { name: "May", CAC: 95, LTV: 440 },
        { name: "Jun", CAC: 88, LTV: 460 },
      ],
      insights: [
        "CAC has decreased by 27% from January to June",
        "LTV:CAC ratio improved from 3.2 to 5.2 over the period",
        "April saw the largest month-over-month improvement in CAC",
        "Customer lifetime value has steadily increased each month",
      ],
      tableHeaders: ["Month", "CAC", "LTV", "LTV:CAC Ratio", "New Customers"],
      tableData: [
        ["Jan", "$120", "$380", "3.2", "450"],
        ["Feb", "$125", "$390", "3.1", "480"],
        ["Mar", "$118", "$400", "3.4", "520"],
        ["Apr", "$105", "$420", "4.0", "580"],
        ["May", "$95", "$440", "4.6", "650"],
        ["Jun", "$88", "$460", "5.2", "720"],
      ],
      summary:
        "Customer acquisition cost (CAC) has shown a significant improvement, decreasing by 27% from January to June. At the same time, customer lifetime value (LTV) has steadily increased, resulting in a much healthier LTV:CAC ratio that improved from 3.2 to 5.2. This indicates that marketing and sales efforts have become more efficient while also attracting higher-value customers.",
      recommendations: [
        "Document and scale the optimization strategies implemented in April-June",
        "Consider increasing marketing spend given the favorable LTV:CAC ratio",
        "Analyze customer segments acquired in June to identify the most profitable acquisition channels",
      ],
    }
  }

  // Marketing campaign query
  else if (q.includes("marketing") || q.includes("campaign")) {
    return {
      chartType: "bar",
      chartTitle: "Marketing Campaign Performance",
      data: [
        { name: "Email", Clicks: 12500, Conversions: 1250 },
        { name: "Social", Clicks: 28000, Conversions: 1680 },
        { name: "Search", Clicks: 15000, Conversions: 1950 },
        { name: "Display", Clicks: 32000, Conversions: 960 },
        { name: "Affiliate", Clicks: 8500, Conversions: 680 },
      ],
      insights: [
        "Search has the highest conversion rate at 13%",
        "Display ads generate the most clicks but have the lowest conversion rate (3%)",
        "Email marketing has a solid 10% conversion rate with lower volume",
        "Social media drives high traffic but converts at only 6%",
      ],
      tableHeaders: ["Channel", "Spend", "Clicks", "Conversions", "Conv. Rate", "CPA"],
      tableData: [
        ["Email", "$5,000", "12,500", "1,250", "10.0%", "$4.00"],
        ["Social", "$15,000", "28,000", "1,680", "6.0%", "$8.93"],
        ["Search", "$12,000", "15,000", "1,950", "13.0%", "$6.15"],
        ["Display", "$8,000", "32,000", "960", "3.0%", "$8.33"],
        ["Affiliate", "$4,000", "8,500", "680", "8.0%", "$5.88"],
      ],
      summary:
        "Search marketing demonstrates the highest efficiency with a 13% conversion rate and a reasonable cost per acquisition (CPA) of $6.15. While display ads generate the most clicks, they have the lowest conversion rate at only 3%. Email marketing shows strong performance with a 10% conversion rate and the lowest CPA at $4.00, suggesting it may be underutilized compared to other channels.",
      recommendations: [
        "Increase budget allocation to search and email marketing channels",
        "Optimize display ad targeting to improve the conversion rate",
        "Test different creative approaches for social media to improve conversion rates",
      ],
    }
  }

  // Default response for other queries
  else {
    return {
      chartType: "line",
      chartTitle: "Monthly Active Users",
      data: [
        { name: "Jan", Users: 12500, Target: 12000 },
        { name: "Feb", Users: 13200, Target: 13000 },
        { name: "Mar", Users: 14800, Target: 14000 },
        { name: "Apr", Users: 16500, Target: 15000 },
        { name: "May", Users: 18200, Target: 16000 },
        { name: "Jun", Users: 21000, Target: 17000 },
      ],
      insights: [
        "User growth has accelerated, with a 68% increase from January to June",
        "Growth rate has increased each month, from 5.6% to 15.4%",
        "Consistently exceeding targets since January",
        "June saw the largest month-over-month increase in users",
      ],
      tableHeaders: ["Month", "Users", "Target", "Growth Rate", "Variance"],
      tableData: [
        ["Jan", "12,500", "12,000", "-", "+4.2%"],
        ["Feb", "13,200", "13,000", "+5.6%", "+1.5%"],
        ["Mar", "14,800", "14,000", "+12.1%", "+5.7%"],
        ["Apr", "16,500", "15,000", "+11.5%", "+10.0%"],
        ["May", "18,200", "16,000", "+10.3%", "+13.8%"],
        ["Jun", "21,000", "17,000", "+15.4%", "+23.5%"],
      ],
      summary:
        "Monthly active users have shown strong and accelerating growth over the six-month period, with a total increase of 68% from January to June. The platform has consistently exceeded user targets, with the gap between actual and target users widening each month. June demonstrated exceptional performance with a 15.4% month-over-month growth rate and 23.5% above the target.",
      recommendations: [
        "Analyze the factors driving the accelerated growth in recent months",
        "Revise growth targets upward based on the current trajectory",
        "Ensure infrastructure can scale to support the growing user base",
      ],
    }
  }
}

// Simulate API call with a delay
const simulateQueryProcessing = (query) => {
  return new Promise((resolve, reject) => {
    // Random delay between 1-3 seconds to simulate processing
    const delay = Math.floor(Math.random() * 2000) + 1000

    setTimeout(() => {
      // 5% chance of error for realism
      if (Math.random() < 0.05) {
        reject(new Error("Failed to process query. Please try again."))
      } else {
        resolve(generateMockData(query))
      }
    }, delay)
  })
}

// Create the async thunk for submitting queries
export const submitQuery = createAsyncThunk("query/submit", async (query, { rejectWithValue }) => {
  try {
    // If query is empty, just clear the current result
    if (!query) {
      return { query: "", result: null }
    }

    const result = await simulateQueryProcessing(query)
    return { query, result }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Initial state
const initialState = {
  currentQuery: "",
  history: [],
  loading: false,
  error: null,
  currentResult: null,
}

// Create the slice
const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    clearHistory: (state) => {
      state.history = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuery.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(submitQuery.fulfilled, (state, action) => {
        state.loading = false
        state.currentQuery = action.payload.query
        state.currentResult = action.payload.result

        // Only add to history if query is not empty and not already in history
        if (action.payload.query && !state.history.includes(action.payload.query)) {
          state.history.unshift(action.payload.query)
          // Keep history limited to last 20 queries
          if (state.history.length > 20) {
            state.history = state.history.slice(0, 20)
          }
        }
      })
      .addCase(submitQuery.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearHistory } = querySlice.actions
export default querySlice.reducer

