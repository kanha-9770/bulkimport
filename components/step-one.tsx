"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./file-uploader"
import type { ImportData } from "./import-wizard"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type StepOneProps = {
  onNext: (data: ImportData) => void
}

export function StepOne({ onNext }: StepOneProps) {
  const [inputMethod, setInputMethod] = useState("paste")
  const [entityType, setEntityType] = useState("category")
  const [language, setLanguage] = useState("en")
  const [pastedData, setPastedData] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleNext = async () => {
    setError(null)

    try {
      let parsedData: any[] = []

      if (inputMethod === "paste") {
        if (!pastedData.trim()) {
          setError("Please enter some data")
          return
        }

        try {
          parsedData = JSON.parse(pastedData)
          if (!Array.isArray(parsedData)) {
            parsedData = [parsedData]
          }
        } catch (e) {
          setError("Invalid JSON format. Please check your data.")
          return
        }
      } else if (inputMethod === "file") {
        if (!file) {
          setError("Please select a file")
          return
        }

        // For JSON files, parse the content
        if (file.type === "application/json") {
          const text = await file.text()
          try {
            parsedData = JSON.parse(text)
            if (!Array.isArray(parsedData)) {
              parsedData = [parsedData]
            }
          } catch (e) {
            setError("Invalid JSON file. Please check your file.")
            return
          }
        } else {
          // For CSV/Excel, we'll handle this on the server
          // Just pass an empty array for now
          parsedData = []
        }
      }

      onNext({
        entityType,
        language,
        data: parsedData,
        fileName: file?.name,
        fileType: file?.type,
      })
    } catch (error) {
      setError("An error occurred while processing your data. Please try again.")
    }
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Step 1: Select Data Source</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Choose how you want to import your data and select the content type and language.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="entity-type">Content Type</Label>
          <Select value={entityType} onValueChange={setEntityType}>
            <SelectTrigger id="entity-type">
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="advantage">Advantage</SelectItem>
              <SelectItem value="specification">Specification</SelectItem>
              <SelectItem value="applicationData">Application Data</SelectItem>
              <SelectItem value="technicalSpecification">Technical Specification</SelectItem>
              <SelectItem value="relatedProduct">Related Product</SelectItem>
              <SelectItem value="processStep">Process Step</SelectItem>
              <SelectItem value="cta">CTA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
              <SelectItem value="ta">Tamil</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs value={inputMethod} onValueChange={setInputMethod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="paste">Paste Data</TabsTrigger>
                <TabsTrigger value="file">Upload File</TabsTrigger>
              </TabsList>

              <TabsContent value="paste" className="pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="data">Paste JSON Data</Label>
                  <Textarea
                    id="data"
                    placeholder="Paste your JSON data here..."
                    className="min-h-[300px] font-mono"
                    value={pastedData}
                    onChange={(e) => setPastedData(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Paste your JSON data in the format appropriate for the selected content type.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="file" className="pt-4">
                <FileUploader onFileSelected={setFile} selectedFile={file} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end">
          <Button onClick={handleNext}>Next Step</Button>
        </div>
      </div>
    </div>
  )
}
