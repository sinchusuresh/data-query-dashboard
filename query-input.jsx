"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useSelector } from "react-redux"

// Sample AI suggestions based on input
const getSuggestions = (input) => {
  if (!input.trim()) return []

  const suggestions = [
    "Show me sales trends for the last quarter",
    "Compare revenue by region for this year",
    "What were our top 5 products last month?",
    "Show customer acquisition cost over time",
    "Analyze marketing campaign performance",
    "What's our conversion rate by channel?",
    "Show me monthly active users trend",
    "Compare department expenses year over year",
  ]

  return suggestions.filter((s) => s.toLowerCase().includes(input.toLowerCase())).slice(0, 3)
}

export function QueryInput({ onSubmit }) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)
  const { loading } = useSelector((state) => state.query)

  useEffect(() => {
    if (query.trim()) {
      setSuggestions(getSuggestions(query))
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [query])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSubmit(query.trim())
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    onSubmit(suggestion)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask any question about your data..."
                className="h-12 pl-10 pr-24 text-base"
                disabled={loading}
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[calc(100%-2rem)] p-0" align="start" side="bottom">
            {suggestions.length > 0 && (
              <div className="py-2">
                <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">AI Suggestions</p>
                <div className="mt-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="flex w-full items-center px-3 py-1.5 text-left hover:bg-accent"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Sparkles className="mr-2 h-4 w-4 text-primary" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
        <Button type="submit" className="absolute right-1 top-1 h-10" disabled={!query.trim() || loading}>
          {loading ? <span>Processing...</span> : <span>Ask AI</span>}
        </Button>
      </form>
    </div>
  )
}

