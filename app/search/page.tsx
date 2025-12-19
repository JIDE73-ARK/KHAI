"use client"

import { Suspense } from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { SearchResults } from "@/components/search-results"

function SearchContent() {
  return <SearchResults />
}

export default function SearchPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
      
        <SearchContent />
      </Suspense>
    </DashboardLayout>
  )
}
