import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, LinkIcon, Clock } from "lucide-react"
import Link from "next/link"

const documents = [
  {
    id: "1",
    title: "Q4 Product Roadmap 2024",
    type: "document",
    lastViewed: "2 hours ago",
    owner: "Sarah Chen",
  },
  {
    id: "2",
    title: "Engineering Best Practices",
    type: "document",
    lastViewed: "5 hours ago",
    owner: "Mike Johnson",
  },
  {
    id: "3",
    title: "Customer Success Playbook",
    type: "link",
    lastViewed: "1 day ago",
    owner: "Emily Davis",
  },
  {
    id: "4",
    title: "API Documentation v2.3",
    type: "document",
    lastViewed: "2 days ago",
    owner: "Alex Kim",
  },
]

export function RecentDocuments() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Recently Viewed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {documents.map((doc) => (
          <Link key={doc.id} href={`/document/${doc.id}`}>
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
              <div className="size-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                {doc.type === "link" ? (
                  <LinkIcon className="size-5 text-muted-foreground" />
                ) : (
                  <FileText className="size-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground mb-1">{doc.title}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{doc.owner}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="size-3" />
                    <span>{doc.lastViewed}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
