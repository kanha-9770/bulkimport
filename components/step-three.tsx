"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ImportData } from "./import-wizard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type StepThreeProps = {
  importData: ImportData | null
  onBack: () => void
  onNext: () => void
}

export function StepThree({ importData, onBack, onNext }: StepThreeProps) {
  const [mappingOptions, setMappingOptions] = useState({
    skipMissingFields: true,
    createRelations: true,
    updateExisting: true,
  })

  const [sourceFields, setSourceFields] = useState<string[]>([])
  const [targetFields, setTargetFields] = useState<string[]>([])
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({})

  useEffect(() => {
    if (importData) {
      const { entityType, language, data } = importData

      // Get all unique keys from the data
      const newSourceFields = data.reduce((keys: string[], item: any) => {
        Object.keys(item).forEach((key) => {
          if (!keys.includes(key)) {
            keys.push(key)
          }
        })
        return keys
      }, [])
      setSourceFields(newSourceFields)

      // Define target fields based on entity type and language
      const getTargetFields = () => {
        if (entityType === "category") {
          if (language === "en") {
            return [
              "name_en",
              "category_icon",
              "category_image",
              "category_Alt_en",
              "categoryLink_en",
              "specification_image",
              "specification_image_alt",
            ]
          } else {
            return ["name", "iconAlt", "categoryLink", "description"]
          }
        } else if (entityType === "product") {
          if (language === "en") {
            return [
              "model_name_en",
              "product_name",
              "productImage",
              "productImage_Alt",
              "status_en",
              "stars",
              "reviews",
              "productDescription_en",
              "model_description",
              "introduction",
            ]
          } else {
            return ["name", "imageAlt", "status", "productDescription", "model_description", "introduction"]
          }
        }

        // Default fields
        return ["id", "name", "description"]
      }

      const newTargetFields = getTargetFields()
      setTargetFields(newTargetFields)

      // Initial field mapping
      const initialMapping: Record<string, string> = {}

      // Try to auto-map fields with the same name
      newSourceFields.forEach((sourceField) => {
        const matchingTargetField = newTargetFields.find(
          (targetField) => targetField.toLowerCase() === sourceField.toLowerCase(),
        )

        if (matchingTargetField) {
          initialMapping[sourceField] = matchingTargetField
        }
      })

      setFieldMapping(initialMapping)
    }
  }, [importData])

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

  const handleMappingChange = (sourceField: string, targetField: string) => {
    setFieldMapping((prev) => ({
      ...prev,
      [sourceField]: targetField,
    }))
  }

  const handleOptionChange = (option: keyof typeof mappingOptions) => {
    setMappingOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Step 3: Map Fields</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Map your source fields to the database fields. This helps ensure your data is imported correctly.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="skip-missing">Skip missing fields</Label>
              <Switch
                id="skip-missing"
                checked={mappingOptions.skipMissingFields}
                onCheckedChange={() => handleOptionChange("skipMissingFields")}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="create-relations">Create relations automatically</Label>
              <Switch
                id="create-relations"
                checked={mappingOptions.createRelations}
                onCheckedChange={() => handleOptionChange("createRelations")}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="update-existing">Update existing records</Label>
              <Switch
                id="update-existing"
                checked={mappingOptions.updateExisting}
                onCheckedChange={() => handleOptionChange("updateExisting")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 font-medium">
              <div>Source Field</div>
              <div>Target Field</div>
            </div>

            {sourceFields.map((sourceField) => (
              <div key={sourceField} className="grid grid-cols-2 gap-4 items-center">
                <div>{sourceField}</div>
                <Select
                  value={fieldMapping[sourceField] || ""}
                  onValueChange={(value) => handleMappingChange(sourceField, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Do not import</SelectItem>
                    {targetFields.map((targetField) => (
                      <SelectItem key={targetField} value={targetField}>
                        {targetField}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next Step</Button>
      </div>
    </div>
  )
}
