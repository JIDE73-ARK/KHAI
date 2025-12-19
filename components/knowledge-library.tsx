"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, LinkIcon, Search, Grid3x3, List, Upload, FolderOpen } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { UploadModal } from "@/components/upload-modal"

const documents = [
  {
    id: "1",
    title: "Q4 Product Roadmap 2024",
    type: "document",
    fileType: "PDF",
    size: "2.4 MB",
    owner: "Sarah Chen",
    lastModified: "2 days ago",
    tags: ["product", "roadmap", "planning"],
  },
  {
    id: "2",
    title: "Engineering Best Practices",
    type: "document",
    fileType: "DOCX",
    size: "1.8 MB",
    owner: "Mike Johnson",
    lastModified: "5 days ago",
    tags: ["engineering", "documentation"],
  },
  {
    id: "3",
    title: "Customer Success Playbook",
    type: "link",
    fileType: "URL",
    size: "-",
    owner: "Emily Davis",
    lastModified: "1 week ago",
    tags: ["customer-success", "playbook"],
  },
  {
    id: "4",
    title: "API Documentation v2.3",
    type: "document",
    fileType: "PDF",
    size: "3.2 MB",
    owner: "Alex Kim",
    lastModified: "2 weeks ago",
    tags: ["api", "documentation", "technical"],
  },
  {
    id: "5",
    title: "Marketing Campaign Q1 2025",
    type: "document",
    fileType: "PPTX",
    size: "5.1 MB",
    owner: "Lisa Park",
    lastModified: "3 days ago",
    tags: ["marketing", "campaign"],
  },
  {
    id: "6",
    title: "Security Policies & Compliance",
    type: "document",
    fileType: "PDF",
    size: "1.5 MB",
    owner: "David Lee",
    lastModified: "1 month ago",
    tags: ["security", "compliance", "policies"],
  },
]

export function KnowledgeLibrary() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Knowledge Library</h1>
          <p className="text-muted-foreground">Browse and manage your company documents and links</p>
        </div>
        <Button className="gap-2" onClick={() => setUploadModalOpen(true)}>
          <Upload className="size-4" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search library..."
            className="pl-10 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently modified</SelectItem>
            <SelectItem value="title">Title A-Z</SelectItem>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="size">File size</SelectItem>
          </SelectContent>
        </Select>

        <Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")} className="w-auto">
          <TabsList>
            <TabsTrigger value="grid" className="gap-2">
              <Grid3x3 className="size-4" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List className="size-4" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <FolderOpen className="size-4 text-muted-foreground" />
          <span className="text-foreground font-medium">{documents.length}</span>
          <span className="text-muted-foreground">documents</span>
        </div>
      </div>

      {/* Documents Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <Link key={doc.id} href={`/document/${doc.id}`}>
              <Card className="border-border hover:bg-accent/50 transition-colors h-full cursor-pointer">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="size-12 bg-muted rounded-lg flex items-center justify-center">
                      {doc.type === "link" ? (
                        <LinkIcon className="size-6 text-muted-foreground" />
                      ) : (
                        <FileText className="size-6 text-muted-foreground" />
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {doc.fileType}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{doc.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {doc.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {doc.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{doc.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>By {doc.owner}</p>
                      <p>
                        {doc.size} • {doc.lastModified}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {documents.map((doc) => (
            <Link key={doc.id} href={`/document/${doc.id}`}>
              <Card className="border-border hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="size-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      {doc.type === "link" ? (
                        <LinkIcon className="size-5 text-muted-foreground" />
                      ) : (
                        <FileText className="size-5 text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{doc.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {doc.fileType}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{doc.owner}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.lastModified}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {doc.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </div>
  )
}
