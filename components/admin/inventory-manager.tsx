"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AlertTriangle,
  Package,
  Plus,
  Minus,
  Edit2,
  Trash2,
  X,
  Check,
} from "lucide-react"

interface InventoryItem {
  id: string
  item_name: string
  category: "Internal Supply" | "Retail Counter"
  quantity: number
  min_threshold: number
  unit_price_ksh: number
}

export default function InventoryManager() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  // New Item Form State
  const [newItemName, setNewItemName] = useState("")
  const [newItemCategory, setNewItemCategory] = useState<
    "Internal Supply" | "Retail Counter"
  >("Internal Supply")
  const [newItemQuantity, setNewItemQuantity] = useState(0)
  const [newItemMinThreshold, setNewItemMinThreshold] = useState(5)
  const [newItemUnitPrice, setNewItemUnitPrice] = useState(0)

  // Edit Item Form State
  const [editItemName, setEditItemName] = useState("")
  const [editItemCategory, setEditItemCategory] = useState<
    "Internal Supply" | "Retail Counter"
  >("Internal Supply")
  const [editItemQuantity, setEditItemQuantity] = useState(0)
  const [editItemMinThreshold, setEditItemMinThreshold] = useState(5)
  const [editItemUnitPrice, setEditItemUnitPrice] = useState(0)

  useEffect(() => {
    fetchInventory()
  }, [])

  // READ: Fetch all items from Supabase
  async function fetchInventory() {
    setLoading(true)
    setErrorMessage("")
    try {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .order("item_name", { ascending: true })
        
      if (error) {
        setErrorMessage(error.message)
      } else if (data) {
        setItems(data as InventoryItem[])
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to load inventory.")
    } finally {
      setLoading(false)
    }
  }

  // CREATE: Add new item
  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage("")

    if (!newItemName) {
      setErrorMessage("Please enter an item name.")
      return
    }

    try {
      const { data, error } = await supabase
        .from("inventory")
        .insert({
          item_name: newItemName,
          category: newItemCategory,
          quantity: newItemQuantity,
          min_threshold: newItemMinThreshold,
          unit_price_ksh: newItemUnitPrice,
        })
        .select()

      if (error) {
        setErrorMessage(error.message)
      } else {
        setNewItemName("")
        setNewItemQuantity(0)
        setNewItemMinThreshold(5)
        setNewItemUnitPrice(0)
        setShowAddForm(false)
        fetchInventory()
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to add item.")
    }
  }

  // UPDATE: Adjust quantity with +/- buttons
  async function updateQuantity(id: string, currentQty: number, delta: number) {
    const updatedQty = Math.max(0, currentQty + delta)

    // Optimistic UI update
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: updatedQty } : item
      )
    )

    try {
      const { error } = await supabase
        .from("inventory")
        .update({ quantity: updatedQty, updated_at: new Date().toISOString() })
        .eq("id", id)

      if (error) {
        setErrorMessage(error.message)
        fetchInventory() // Rollback on fail
      }
    } catch (err) {
      fetchInventory()
    }
  }

  // UPDATE: Edit Full Item Details
  function startEditing(item: InventoryItem) {
    setEditingId(item.id)
    setEditItemName(item.item_name)
    setEditItemCategory(item.category)
    setEditItemQuantity(item.quantity)
    setEditItemMinThreshold(item.min_threshold)
    setEditItemUnitPrice(item.unit_price_ksh)
  }

  async function handleSaveEdit(id: string) {
    try {
      const { error } = await supabase
        .from("inventory")
        .update({
          item_name: editItemName,
          category: editItemCategory,
          quantity: editItemQuantity,
          min_threshold: editItemMinThreshold,
          unit_price_ksh: editItemUnitPrice,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) {
        setErrorMessage(error.message)
      } else {
        setEditingId(null)
        fetchInventory()
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save item details.")
    }
  }

  // DELETE: Remove item
  async function handleDeleteItem(id: string) {
    if (!confirm("Are you sure you want to delete this inventory item?")) return

    try {
      const { error } = await supabase.from("inventory").delete().eq("id", id)

      if (error) {
        setErrorMessage(error.message)
      } else {
        fetchInventory()
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to delete item.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl text-[#1E1D1B]">
            Inventory & Consumables
          </h2>
          <p className="text-xs text-[#7A756C]">
            Track salon supplies and counter retail products.
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#55624C] text-[#F3EFE6] hover:bg-[#2C2B28] rounded-xl text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {errorMessage && (
        <div className="bg-red-100 border border-red-300 text-red-800 text-xs p-3 rounded-xl flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ADD ITEM FORM */}
      {showAddForm && (
        <Card className="bg-[#F3EFE6] border-[#E3DDD1] rounded-[1.75rem] p-5 shadow-sm">
          <h3 className="font-serif text-sm text-[#1E1D1B] mb-3">
            Add New Inventory Item
          </h3>
          <form onSubmit={handleAddItem} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <Input
                placeholder="Item Name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="bg-[#FBF9F5] border-[#E3DDD1] text-xs lg:col-span-2"
              />
              <select
                value={newItemCategory}
                onChange={(e) =>
                  setNewItemCategory(e.target.value as any)
                }
                className="bg-[#FBF9F5] border border-[#E3DDD1] text-xs rounded-xl px-3 py-2 text-[#1E1D1B] outline-none"
              >
                <option value="Internal Supply">Internal Supply</option>
                <option value="Retail Counter">Retail Counter</option>
              </select>
              <Input
                type="number"
                placeholder="Stock Quantity"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                className="bg-[#FBF9F5] border-[#E3DDD1] text-xs"
              />
              <Input
                type="number"
                placeholder="Unit Price (KSh)"
                value={newItemUnitPrice}
                onChange={(e) => setNewItemUnitPrice(Number(e.target.value))}
                className="bg-[#FBF9F5] border-[#E3DDD1] text-xs"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
                className="border-[#D5CEC2] rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#55624C] hover:bg-[#2C2B28] text-[#F3EFE6] rounded-xl text-xs"
              >
                Save Product
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* TABLE DATA */}
      <div className="bg-[#F3EFE6] border border-[#E3DDD1] rounded-[2rem] p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E3DDD1] text-[11px] text-[#7A756C] uppercase tracking-wider">
                <th className="pb-3 font-medium">Item Name</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Stock Level</th>
                <th className="pb-3 font-medium">Unit Price</th>
                <th className="pb-3 font-medium text-center">Adjust Stock</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3DDD1]/60 text-sm text-[#1E1D1B]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-xs text-[#7A756C]">
                    Loading inventory data...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-xs text-[#7A756C]">
                    No inventory items found. Click "Add Product" above to create your first item.
                  </td>
                </tr>
              ) : (
                items.map((item) => {
                  const isLow = item.quantity <= item.min_threshold
                  const isEditing = editingId === item.id

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#E8E3D8]/40 transition-colors"
                    >
                      {isEditing ? (
                        <>
                          <td className="py-3">
                            <Input
                              value={editItemName}
                              onChange={(e) => setEditItemName(e.target.value)}
                              className="bg-[#FBF9F5] border-[#E3DDD1] text-xs"
                            />
                          </td>
                          <td className="py-3">
                            <select
                              value={editItemCategory}
                              onChange={(e) =>
                                setEditItemCategory(e.target.value as any)
                              }
                              className="bg-[#FBF9F5] border border-[#E3DDD1] text-xs rounded-xl px-2 py-1"
                            >
                              <option value="Internal Supply">Internal Supply</option>
                              <option value="Retail Counter">Retail Counter</option>
                            </select>
                          </td>
                          <td className="py-3">
                            <Input
                              type="number"
                              value={editItemQuantity}
                              onChange={(e) =>
                                setEditItemQuantity(Number(e.target.value))
                              }
                              className="bg-[#FBF9F5] border-[#E3DDD1] text-xs w-20"
                            />
                          </td>
                          <td className="py-3">
                            <Input
                              type="number"
                              value={editItemUnitPrice}
                              onChange={(e) =>
                                setEditItemUnitPrice(Number(e.target.value))
                              }
                              className="bg-[#FBF9F5] border-[#E3DDD1] text-xs w-24"
                            />
                          </td>
                          <td className="py-3 text-center">-</td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleSaveEdit(item.id)}
                                className="p-1.5 bg-[#55624C] text-[#F3EFE6] hover:bg-[#2C2B28] rounded-lg transition-colors"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="p-1.5 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-4 font-medium flex items-center gap-2">
                            <Package className="w-4 h-4 text-[#55624C] shrink-0" />
                            <span>{item.item_name}</span>
                            {isLow && (
                              <span className="flex items-center gap-1 text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-normal shrink-0">
                                <AlertTriangle className="w-3 h-3" /> Low Stock
                              </span>
                            )}
                          </td>
                          <td className="py-4 text-xs text-[#7A756C]">
                            {item.category}
                          </td>
                          <td className="py-4 font-serif text-base">
                            {item.quantity} units
                          </td>
                          <td className="py-4 text-xs font-medium">
                            KSh {item.unit_price_ksh.toLocaleString()}
                          </td>
                          <td className="py-4 text-center">
                            <div className="inline-flex items-center gap-1 bg-[#E8E3D8] p-1 rounded-xl border border-[#D5CEC2]">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity, -1)
                                }
                                className="p-1 hover:bg-[#F3EFE6] rounded-lg transition-colors text-[#1E1D1B]"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2 text-xs font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity, 1)
                                }
                                className="p-1 hover:bg-[#F3EFE6] rounded-lg transition-colors text-[#1E1D1B]"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => startEditing(item)}
                                className="p-1.5 text-[#7A756C] hover:text-[#1E1D1B] hover:bg-[#E8E3D8] rounded-lg transition-colors"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}