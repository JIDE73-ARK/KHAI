import { DashboardLayout } from "@/components/dashboard-layout"
import { DocumentDetail } from "@/components/document-detail"

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <DashboardLayout>
      <DocumentDetail documentId={id} />
    </DashboardLayout>
  )
}
