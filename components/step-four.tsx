"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ImportData } from "./import-wizard"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type StepFourProps = {
  importData: ImportData | null
  onBack: () => void
  onConfirm: () => void
  isProcessing: boolean
}

export function StepFour({ importData, onBack, onConfirm, isProcessing }: StepFourProps) {
  if (!importData) {
    return (
      <div className="py-8 text-center">
        <p>No import data available. Please go back and select your data.</p>
        <Button onClick={onBack} className="mt-4">
          Back
        </Button>
      </div>
    )
  }

  const { entityType, language, data } = importData

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Step 4: Confirm Import</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Review your import settings and confirm to start the import process.
        </p>
      </div>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Ready to Import</AlertTitle>
        <AlertDescription>
          You are about to import {data.length} records into your database. This action cannot be undone.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="font-medium">Content Type:</div>
              <div>{entityType}</div>

              <div className="font-medium">Language:</div>
              <div>{language.toUpperCase()}</div>

              <div className="font-medium">Records:</div>
              <div>{data.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Data Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.slice(0, 6).map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="outline">Record {index + 1}</Badge>
                </div>
                <div className="space-y-1">
                  {Object.entries(item)
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium truncate">{key}:</div>
                        <div className="text-sm truncate">
                          {typeof value === "object"
                            ? JSON.stringify(value).substring(0, 20) + "..."
                            : String(value).substring(0, 20) + (String(value).length > 20 ? "..." : "")}
                        </div>
                      </div>
                    ))}
                  {Object.keys(item).length > 3 && (
                    <div className="text-sm text-gray-500">+{Object.keys(item).length - 3} more fields</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {data.length > 6 && (
            <div className="mt-4 text-center text-sm text-gray-500">Showing 6 of {data.length} records</div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isProcessing}>
          Back
        </Button>
        <Button onClick={onConfirm} disabled={isProcessing} className="min-w-[120px]">
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Importing...
            </>
          ) : (
            "Confirm Import"
          )}
        </Button>
      </div>
    </div>
  )
}
