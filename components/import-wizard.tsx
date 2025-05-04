"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StepOne } from "./step-one"
import { StepTwo } from "./step-two"
import { StepThree } from "./step-three"
import { StepFour } from "./step-four"
import { useRouter } from "next/navigation"
import { useToast } from "@/lib/use-toast"

export type ImportData = {
  entityType: string
  language: string
  data: any[]
  fileName?: string
  fileType?: string
}

export function ImportWizard() {
  const [currentStep, setCurrentStep] = useState("step1")
  const [importData, setImportData] = useState<ImportData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleDataInput = (data: ImportData) => {
    setImportData(data)
    setCurrentStep("step2")
  }

  const handlePreviewConfirm = () => {
    setCurrentStep("step3")
  }

  const handleMappingConfirm = () => {
    setCurrentStep("step4")
  }

  const handleImportConfirm = async () => {
    if (!importData) return

    setIsProcessing(true)

    try {
      const response = await fetch("/api/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(importData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to import data")
      }

      const result = await response.json()

      toast({
        title: "Import successful",
        description: `Successfully imported ${result.created} records.`,
      })

      // Redirect to dashboard or success page
      router.push("/import/success")
    } catch (error) {
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "An error occurred during import",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="p-6">
      <Tabs value={currentStep} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="step1" disabled={currentStep !== "step1"}>
            1. Select Data
          </TabsTrigger>
          <TabsTrigger value="step2" disabled={currentStep !== "step2" && currentStep !== "step1"}>
            2. Preview Data
          </TabsTrigger>
          <TabsTrigger value="step3" disabled={currentStep !== "step3" && currentStep !== "step2"}>
            3. Map Fields
          </TabsTrigger>
          <TabsTrigger value="step4" disabled={currentStep !== "step4" && currentStep !== "step3"}>
            4. Confirm Import
          </TabsTrigger>
        </TabsList>

        <TabsContent value="step1">
          <StepOne onNext={handleDataInput} />
        </TabsContent>

        <TabsContent value="step2">
          <StepTwo importData={importData} onBack={() => setCurrentStep("step1")} onNext={handlePreviewConfirm} />
        </TabsContent>

        <TabsContent value="step3">
          <StepThree importData={importData} onBack={() => setCurrentStep("step2")} onNext={handleMappingConfirm} />
        </TabsContent>

        <TabsContent value="step4">
          <StepFour
            importData={importData}
            onBack={() => setCurrentStep("step3")}
            onConfirm={handleImportConfirm}
            isProcessing={isProcessing}
          />
        </TabsContent>
      </Tabs>
    </Card>
  )
}
