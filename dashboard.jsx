"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Search, BarChart3, Loader2 } from "lucide-react"
import { QueryInput } from "@/components/query-input"
import { QueryHistory } from "@/components/query-history"
import { ResultsPanel } from "@/components/results-panel"
import { submitQuery } from "@/lib/store/query-slice"
import { Button } from "@/components/ui/button"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"

export function Dashboard() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.query)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleQuerySubmit = (query) => {
    dispatch(submitQuery(query))
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">AI Analytics</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <QueryHistory />
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h2 className="text-lg font-semibold">Data Query Dashboard</h2>
              </div>
            </div>
          </header>

          <main className="flex flex-1 flex-col overflow-hidden p-4">
            <div className="mb-6">
              <QueryInput onSubmit={handleQuerySubmit} />
            </div>

            {loading ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-lg text-muted-foreground">Processing your query...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-full bg-destructive/10 p-3">
                    <Search className="h-8 w-8 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold">Query Error</h3>
                  <p className="max-w-md text-muted-foreground">{error}</p>
                  <Button variant="outline" onClick={() => dispatch(submitQuery(""))}>
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <ResultsPanel />
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

