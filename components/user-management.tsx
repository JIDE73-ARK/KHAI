"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, UserPlus, MoreVertical, Shield, UsersIcon, Mail } from "lucide-react"

const users = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@acme.com",
    role: "Admin",
    status: "active",
    lastActive: "2 hours ago",
    documentsShared: 45,
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike@acme.com",
    role: "Editor",
    status: "active",
    lastActive: "1 day ago",
    documentsShared: 32,
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@acme.com",
    role: "Viewer",
    status: "active",
    lastActive: "3 hours ago",
    documentsShared: 18,
  },
  {
    id: "4",
    name: "Alex Kim",
    email: "alex@acme.com",
    role: "Editor",
    status: "active",
    lastActive: "5 days ago",
    documentsShared: 67,
  },
  {
    id: "5",
    name: "Lisa Park",
    email: "lisa@acme.com",
    role: "Viewer",
    status: "inactive",
    lastActive: "2 weeks ago",
    documentsShared: 12,
  },
]

const roleColors = {
  Admin: "default",
  Editor: "secondary",
  Viewer: "outline",
}

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage team members and their permissions</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-10 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users List */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {users.map((user) => (
              <div key={user.id} className="p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar className="size-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <Badge variant={roleColors[user.role as keyof typeof roleColors]} className="text-xs">
                        {user.role}
                      </Badge>
                      {user.status === "inactive" && (
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{user.email}</span>
                      <span>•</span>
                      <span>Last active {user.lastActive}</span>
                      <span>•</span>
                      <span>{user.documentsShared} documents shared</span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Change role</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Remove user</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
