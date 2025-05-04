"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name_en",
    header: "Name (EN)",
  },
  {
    accessorKey: "translations",
    header: "Translations",
    cell: ({ row }) => {
      const translations = row.getValue("translations") as any[]
      return (
        <div className="flex flex-wrap gap-1">
          {translations && translations.length > 0 ? (
            translations.map((translation) => (
              <Badge key={translation.id} variant="outline">
                {translation.language}
              </Badge>
            ))
          ) : (
            <span className="text-gray-500">No translations</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "category_icon",
    header: "Icon",
    cell: ({ row }) => {
      const icon = row.getValue("category_icon") as string
      return icon ? (
        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
          <img src={icon || "/placeholder.svg"} alt="Icon" className="max-w-full max-h-full" />
        </div>
      ) : (
        <span className="text-gray-500">No icon</span>
      )
    },
  },
]
