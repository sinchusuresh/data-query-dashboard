"use client"

import { useDispatch, useSelector } from "react-redux"
import { Clock, Search, Trash2 } from "lucide-react"
import { submitQuery, clearHistory } from "@/lib/store/query-slice"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function QueryHistory() {
  const dispatch = useDispatch()
  const { history } = useSelector((state) => state.query)

  const handleQueryClick = (query) => {
    dispatch(submitQuery(query))
  }

  const handleClearHistory = () => {
    dispatch(clearHistory())
  }

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-2">
        <SidebarGroupLabel className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Query History</span>
        </SidebarGroupLabel>
        {history.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleClearHistory}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear history</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <SidebarGroupContent>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <SidebarMenu>
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Search className="mb-2 h-10 w-10 text-muted-foreground opacity-20" />
                <p className="text-sm text-muted-foreground">No queries yet. Start by asking a question above.</p>
              </div>
            ) : (
              history.map((query, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton onClick={() => handleQueryClick(query)} className="text-left">
                    <Search className="h-4 w-4" />
                    <span className="line-clamp-1">{query}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            )}
          </SidebarMenu>
        </ScrollArea>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

