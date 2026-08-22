import AdminHeader from "@/components/admin/admin-header"
import InventoryManager from "@/components/admin/inventory-manager"

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Inventory" subtitle="Track products and stock levels" />
      <InventoryManager />
    </div>
  )
}