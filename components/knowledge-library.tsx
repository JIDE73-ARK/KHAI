"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Search,
  Grid3x3,
  List,
  Upload,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { UploadModal } from "@/components/upload-modal";
import { request } from "@/lib/req";

type ApiDocument = {
  id: string;
  title: string;
  source: string;
  content: string;
  content_sha: string;
  profile_id: string;
  file_size: number;
  created_at: string;
  profile?: {
    id: string;
    name?: string;
    created_at?: string;
    permissions?: string;
  };
};

type LibraryDocument = {
  id: string;
  title: string;
  fileType: string;
  size: string;
  owner: string;
  lastModified: string;
};

const formatFileSize = (bytes?: number) => {
  if (!bytes || Number.isNaN(bytes)) return "-";
  const sizes = ["B", "KB", "MB", "GB"];
  let i = 0;
  let value = bytes;
  while (value >= 1024 && i < sizes.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value.toFixed(1)} ${sizes[i]}`;
};

const formatMimeType = (mime?: string) => {
  if (!mime) return "-";
  const [, subtype] = mime.split("/");
  return (subtype ?? mime).toUpperCase();
};

const formatDate = (date?: string) => {
  if (!date) return "-";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "-" : parsed.toLocaleDateString();
};

const normalizeDocuments = (docs: ApiDocument[]): LibraryDocument[] =>
  docs.map((doc) => ({
    id: doc.id,
    title: doc.title || "Documento sin título",
    fileType: formatMimeType(doc.source),
    size: formatFileSize(doc.file_size),
    owner: doc.profile?.name ?? doc.profile_id ?? "N/A",
    lastModified: formatDate(doc.created_at),
  }));

export function KnowledgeLibrary() {
  const [documents, setDocuments] = useState<LibraryDocument[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      const userId = localStorage.getItem("user_id");

      setLoading(true);
      try {
        const response = await request(
          `/docs/myDocuments/${userId}`,
          "GET",
          {}
        );
        console.log(response);
        const docs = Array.isArray(response.document) ? response.document : [];
        setDocuments(normalizeDocuments(docs));
      } catch (error) {
        console.error("Error loading documents", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const filteredDocuments = documents
    .filter((doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "owner") return a.owner.localeCompare(b.owner);
      if (sortBy === "size") return a.size.localeCompare(b.size);
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Knowledge Library
          </h1>
          <p className="text-muted-foreground">
            Browse and manage your company documents and links
          </p>
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

        <Tabs
          value={view}
          onValueChange={(v) => setView(v as "grid" | "list")}
          className="w-auto"
        >
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
          <span className="text-foreground font-medium">
            {documents.length}
          </span>
          <span className="text-muted-foreground">documents</span>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando documentos...</p>
      ) : null}

      {/* Documents Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <Link key={doc.id} href={`/document/${doc.id}`}>
              <Card className="border-border hover:bg-accent/50 transition-colors h-full cursor-pointer">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="size-12 bg-muted rounded-lg flex items-center justify-center">
                      <FileText className="size-6 text-muted-foreground" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {doc.fileType}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {doc.title}
                    </h3>
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
          {filteredDocuments.map((doc) => (
            <Link key={doc.id} href={`/document/${doc.id}`}>
              <Card className="border-border hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="size-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="size-5 text-muted-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {doc.title}
                        </h3>
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
  );
}
