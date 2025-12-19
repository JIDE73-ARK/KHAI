import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsPage as Settings } from "@/components/settings-page"

export default function SettingsPageRoute() {
  return (
    <DashboardLayout>
      <Settings />
    </DashboardLayout>
  )
}
