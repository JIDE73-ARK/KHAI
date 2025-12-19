"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { QuickStats } from "@/components/quick-stats"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText, LinkIcon, Clock, Filter } from "lucide-react"

const mockResults = [
  {
    id: "1",
    title: "Engineering Best Practices - API Design",
    type: "document",
    preview:
      "Our API design follows RESTful principles with clear versioning, authentication using JWT tokens, and comprehensive error handling...",
    source: "Google Drive",
    lastUpdated: "2 days ago",
    relevance: 98,
  },
  {
    id: "2",
    title: "Product Development Lifecycle",
    type: "document",
    preview:
      "The product development process includes ideation, design, development, testing, and deployment phases. Each phase has specific deliverables...",
    source: "Notion",
    lastUpdated: "1 week ago",
    relevance: 95,
  },
  {
    id: "3",
    title: "Customer Onboarding Guide",
    type: "link",
    preview:
      "Step-by-step guide for onboarding new customers including account setup, initial configuration, training sessions, and success metrics...",
    source: "Confluence",
    lastUpdated: "3 days ago",
    relevance: 92,
  },
  {
    id: "4",
    title: "Security Policies and Procedures",
    type: "document",
    preview:
      "Company-wide security policies covering data protection, access control, incident response, and compliance requirements...",
    source: "SharePoint",
    lastUpdated: "1 month ago",
    relevance: 88,
  },
]

export function SearchResults() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams?.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [fileType, setFileType] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Search Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Search</h1>
        <p className="text-muted-foreground">Find documents, links, and information across your knowledge base</p>
                <QuickStats />
      </div>

      {/* Search Input */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for anything..."
            className="pl-10 pr-4 h-12 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button size="lg" className="px-8">
          Search
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Filter className="size-4 text-muted-foreground" />
        <Select value={fileType} onValueChange={setFileType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="File type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="link">Links</SelectItem>
            <SelectItem value="pdf">PDFs</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All time</SelectItem>
            <SelectItem value="day">Last 24 hours</SelectItem>
            <SelectItem value="week">Last week</SelectItem>
            <SelectItem value="month">Last month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      {initialQuery && (
        <div className="text-sm text-muted-foreground">
          Found <span className="font-medium text-foreground">{mockResults.length} results</span> for "{initialQuery}"
        </div>
      )}

      {/* Results List */}
      <div className="space-y-3">
        {mockResults.map((result) => (
          <Card key={result.id} className="border-border hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="size-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  {result.type === "link" ? (
                    <LinkIcon className="size-6 text-muted-foreground" />
                  ) : (
                    <FileText className="size-6 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground mb-2">{result.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">{result.preview}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="font-medium">{result.source}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      <span>{result.lastUpdated}</span>
                    </div>
                    <span>•</span>
                    <span className="text-chart-2 font-medium">{result.relevance}% relevant</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
