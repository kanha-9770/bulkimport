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
    accessorKey: "model_name_en",
    header: "Model Name (EN)",
  },
  {
    accessorKey: "product_name",
    header: "Product Name",
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
    accessorKey: "status_en",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status_en") as string
      return status ? (
        <Badge variant="outline" className="capitalize">
          {status}
        </Badge>
      ) : (
        <span className="text-gray-500">-</span>
      )
    },
  },
]
