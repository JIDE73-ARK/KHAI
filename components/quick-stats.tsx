import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

const recentSearches = [
  "Product roadmap Q1 2024",
  "Employee onboarding guide",
  "API documentation",
  "Security policies",
  "Team meeting notes",
  "Budget planning",
  "Marketing strategy",
  "Customer feedback",
]

export function QuickStats() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Search className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-foreground">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((search) => (
          <Badge key={search} variant="secondary" className="px-3 py-1.5 text-sm">
            {search}
          </Badge>
        ))}
      </div>
    </div>
  )
}
