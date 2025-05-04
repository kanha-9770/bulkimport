"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ImportData } from "./import-wizard"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type StepTwoProps = {
  importData: ImportData | null
  onBack: () => void
  onNext: () => void
}

export function StepTwo({ importData, onBack, onNext }: StepTwoProps) {
  const [validationStatus, setValidationStatus] = useState<"idle" | "validating" | "valid" | "invalid">("idle")
  const [validationMessage, setValidationMessage] = useState<string | null>(null)

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

  const { entityType, language, data, fileName } = importData

  // Get the first few records for preview
  const previewData = data.slice(0, 5)

  // Get all unique keys from the data
  const allKeys = previewData.reduce((keys: string[], item: any) => {
    Object.keys(item).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key)
      }
    })
    return keys
  }, [])

  const validateData = () => {
    setValidationStatus("validating")

    // Simulate validation
    setTimeout(() => {
      // Check for required fields based on entity type
      let isValid = true
      let message = null

      if (entityType === "category" && language === "en") {
        const missingNameCount = data.filter((item) => !item.name_en).length
        if (missingNameCount > 0) {
          isValid = false
          message = `${missingNameCount} records are missing required field 'name_en'`
        }
      } else if (entityType === "product" && language === "en") {
        const missingNameCount = data.filter((item) => !item.model_name_en).length
        if (missingNameCount > 0) {
          isValid = false
          message = `${missingNameCount} records are missing required field 'model_name_en'`
        }
      }

      setValidationStatus(isValid ? "valid" : "invalid")
      setValidationMessage(message)
    }, 1500)
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Step 2: Preview Data</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Review your data before proceeding. Make sure it looks correct.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-sm">
            Type: {entityType}
          </Badge>
          <Badge variant="outline" className="text-sm">
            Language: {language.toUpperCase()}
          </Badge>
          {fileName && (
            <Badge variant="outline" className="text-sm">
              File: {fileName}
            </Badge>
          )}
          <Badge variant="outline" className="text-sm">
            Records: {data.length}
          </Badge>
        </div>

        <Card>
          <CardContent className="p-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">#</TableHead>
                  {allKeys.map((key) => (
                    <TableHead key={key}>{key}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    {allKeys.map((key) => (
                      <TableCell key={key}>
                        {typeof item[key] === "object"
                          ? JSON.stringify(item[key]).substring(0, 50) +
                            (JSON.stringify(item[key]).length > 50 ? "..." : "")
                          : String(item[key] || "").substring(0, 50) +
                            (String(item[key] || "").length > 50 ? "..." : "")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {data.length > 5 && <p className="text-sm text-gray-500 text-center">Showing 5 of {data.length} records</p>}

        {validationStatus === "valid" && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Validation Passed</AlertTitle>
            <AlertDescription>Your data looks good and is ready for import.</AlertDescription>
          </Alert>
        )}

        {validationStatus === "invalid" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Validation Failed</AlertTitle>
            <AlertDescription>{validationMessage}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <div className="space-x-2">
            {validationStatus !== "valid" && (
              <Button variant="outline" onClick={validateData} disabled={validationStatus === "validating"}>
                {validationStatus === "validating" ? "Validating..." : "Validate Data"}
              </Button>
            )}
            <Button onClick={onNext} disabled={validationStatus === "invalid" || validationStatus === "validating"}>
              Next Step
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
