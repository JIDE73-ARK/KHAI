import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

const searches = [
  { query: "onboarding process", count: 47 },
  { query: "API authentication", count: 38 },
  { query: "deployment guide", count: 32 },
  { query: "security policies", count: 28 },
  { query: "expense reports", count: 24 },
]

export function MostSearched() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Most Searched This Week</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {searches.map((search, index) => (
          <Link key={search.query} href={`/search?q=${encodeURIComponent(search.query)}`}>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground w-6">{index + 1}</span>
                <span className="text-sm text-foreground">{search.query}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{search.count} searches</span>
                <TrendingUp className="size-4 text-chart-2" />
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
