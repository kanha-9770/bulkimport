"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DownloadCloud, Eye, RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react"

// Mock data for import history
const mockImports = [
  {
    id: 1,
    filename: "products-catalog-2023.csv",
    language: "en",
    status: "completed",
    records: 156,
    errors: 0,
    date: new Date(2023, 4, 15),
  },
  {
    id: 2,
    filename: "categories-french.json",
    language: "fr",
    status: "completed",
    records: 42,
    errors: 3,
    date: new Date(2023, 4, 10),
  },
  {
    id: 3,
    filename: "technical-specs-hindi.xlsx",
    language: "hi",
    status: "failed",
    records: 0,
    errors: 12,
    date: new Date(2023, 4, 5),
  },
  {
    id: 4,
    filename: "product-advantages.json",
    language: "en",
    status: "processing",
    records: 78,
    errors: 0,
    date: new Date(2023, 4, 1),
  },
]

export function ImportHistory() {
  const [imports, setImports] = useState(mockImports)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="w-3 h-3 mr-1 animate-spin" />
            Processing
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Imports</h2>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Filename</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Records</TableHead>
              <TableHead>Errors</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {imports.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.filename}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.language.toUpperCase()}</Badge>
                </TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{item.records}</TableCell>
                <TableCell>{item.errors}</TableCell>
                <TableCell>{format(item.date, "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <DownloadCloud className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
