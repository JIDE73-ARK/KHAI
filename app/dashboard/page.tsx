"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { RecentDocuments } from "@/components/recent-documents"
import { MostSearched } from "@/components/most-searched"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Quick access to your company knowledge</p>
        </div>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recent">Recent Documents</TabsTrigger>
            <TabsTrigger value="searched">Most Searched</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="mt-6">
            <RecentDocuments />
          </TabsContent>
          <TabsContent value="searched" className="mt-6">
            <MostSearched />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
