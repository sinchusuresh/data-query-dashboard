"use client"

import { useSelector } from "react-redux"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { Search } from "lucide-react"

export function ResultsPanel() {
  const { currentQuery, currentResult } = useSelector((state) => state.query)

  // If no query has been submitted yet, show empty state
  if (!currentQuery) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-primary/10 p-3">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Ask anything about your data</h3>
          <p className="max-w-md text-muted-foreground">
            Type a question in natural language to get instant insights from your data.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Query Results</CardTitle>
          <CardDescription>
            Results for: <span className="font-medium">{currentQuery}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {currentResult?.chartTitle || "Data Visualization"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {currentResult?.chartType === "bar" ? (
                      <BarChart data={currentResult.data} />
                    ) : currentResult?.chartType === "pie" ? (
                      <PieChart data={currentResult.data} />
                    ) : (
                      <LineChart data={currentResult.data} />
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {currentResult?.insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1 flex h-2 w-2 rounded-full bg-primary" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="table">
              <Card>
                <CardContent className="p-4">
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          {currentResult?.tableHeaders.map((header, index) => (
                            <th key={index} className="px-4 py-2 text-left text-sm font-medium">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentResult?.tableData.map((row, rowIndex) => (
                          <tr key={rowIndex} className="border-b transition-colors hover:bg-muted/50">
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="px-4 py-2 text-sm">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="summary">
              <Card>
                <CardContent className="p-4">
                  <div className="prose max-w-none">
                    <h3>Summary</h3>
                    <p>{currentResult?.summary}</p>

                    <h4>Recommendations</h4>
                    <ul>
                      {currentResult?.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

