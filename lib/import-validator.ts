import type { ImportData } from "./import-parser"

export type ValidationResult = {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

export type ValidationError = {
  row: number
  field: string
  message: string
}

export type ValidationWarning = {
  row: number
  field: string
  message: string
}

export async function validateImportData(data: ImportData): Promise<ValidationResult> {
  const { entityType, language, records } = data
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []

  // Validate entity type
  if (
    ![
      "category",
      "product",
      "advantage",
      "specification",
      "applicationData",
      "technicalSpecification",
      "relatedProduct",
      "processStep",
    ].includes(entityType)
  ) {
    errors.push({
      row: 0,
      field: "entityType",
      message: `Invalid entity type: ${entityType}`,
    })
  }

  // Validate language
  if (!["en", "fr", "hi", "ta"].includes(language)) {
    errors.push({
      row: 0,
      field: "language",
      message: `Invalid language: ${language}`,
    })
  }

  // Validate records
  records.forEach((record, index) => {
    // Validate required fields based on entity type
    if (entityType === "category") {
      if (language === "en" && !record.name_en) {
        errors.push({
          row: index + 1,
          field: "name_en",
          message: "Required field 'name_en' is missing",
        })
      } else if (language !== "en" && !record.name) {
        errors.push({
          row: index + 1,
          field: "name",
          message: "Required field 'name' is missing",
        })
      }
    } else if (entityType === "product") {
      if (language === "en" && !record.model_name_en) {
        errors.push({
          row: index + 1,
          field: "model_name_en",
          message: "Required field 'model_name_en' is missing",
        })
      } else if (language !== "en" && !record.name) {
        errors.push({
          row: index + 1,
          field: "name",
          message: "Required field 'name' is missing",
        })
      }
    }

    // Check for optional fields and add warnings
    if (entityType === "category" && language === "en" && !record.category_Alt_en) {
      warnings.push({
        row: index + 1,
        field: "category_Alt_en",
        message: "Optional field 'category_Alt_en' is missing",
      })
    }
  })

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}
