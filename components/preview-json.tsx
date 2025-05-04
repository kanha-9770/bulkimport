"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for different entity types
const mockData = {
  category: {
    en: [
      {
        id: 1,
        name_en: "Printing Machines",
        category_icon: "/icons/printing.svg",
        category_image: "/images/printing-category.jpg",
        category_Alt_en: "Printing machines category image",
        categoryLink_en: "/categories/printing-machines",
        specification_image: "/images/printing-spec.jpg",
        specification_image_alt: "Printing machine specifications",
      },
      {
        id: 2,
        name_en: "Packaging Solutions",
        category_icon: "/icons/packaging.svg",
        category_image: "/images/packaging-category.jpg",
        category_Alt_en: "Packaging solutions category image",
        categoryLink_en: "/categories/packaging-solutions",
        specification_image: "/images/packaging-spec.jpg",
        specification_image_alt: "Packaging solution specifications",
      },
    ],
    fr: [
      {
        id: 1,
        name: "Machines d'impression",
        iconAlt: "Image de catégorie de machines d'impression",
        categoryLink: "/fr/categories/machines-impression",
        description: "Nos machines d'impression de haute qualité",
      },
      {
        id: 2,
        name: "Solutions d'emballage",
        iconAlt: "Image de catégorie de solutions d'emballage",
        categoryLink: "/fr/categories/solutions-emballage",
        description: "Solutions d'emballage innovantes",
      },
    ],
  },
  product: {
    en: [
      {
        id: 1,
        model_name_en: "PrintMaster 3000",
        product_name: "PrintMaster 3000 Professional",
        productImage: "/images/printmaster-3000.jpg",
        productImage_Alt: "PrintMaster 3000 Professional Printer",
        status_en: "New",
        stars: 5,
        reviews: 24,
        productDescription_en: "High-speed professional printing solution for industrial use.",
        model_description: "The PrintMaster 3000 is our flagship printing solution.",
        introduction: "Introducing the next generation of industrial printing technology.",
      },
    ],
    hi: [
      {
        id: 1,
        name: "प्रिंटमास्टर 3000 प्रोफेशनल",
        imageAlt: "प्रिंटमास्टर 3000 प्रोफेशनल प्रिंटर",
        status: "नया",
        productDescription: "औद्योगिक उपयोग के लिए उच्च गति वाला पेशेवर प्रिंटिंग समाधान।",
        model_description: "प्रिंटमास्टर 3000 हमारा प्रमुख प्रिंटिंग समाधान है।",
        introduction: "औद्योगिक प्रिंटिंग प्रौद्योगिकी की अगली पीढ़ी का परिचय।",
      },
    ],
  },
}

export function PreviewJson() {
  const [entityType, setEntityType] = useState<string>("category")
  const [language, setLanguage] = useState<string>("en")
  const { toast } = useToast()

  const handleCopy = () => {
    const jsonData =
      mockData[entityType as keyof typeof mockData]?.[language as keyof (typeof mockData)[keyof typeof mockData]]
    if (jsonData) {
      navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))
      toast({
        title: "Copied to clipboard",
        description: "JSON data has been copied to your clipboard.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="grid gap-2">
            <Label htmlFor="entity-type">Entity Type</Label>
            <Select value={entityType} onValueChange={setEntityType}>
              <SelectTrigger id="entity-type" className="w-[180px]">
                <SelectValue placeholder="Select entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="advantage">Advantage</SelectItem>
                <SelectItem value="specification">Specification</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="json-language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="json-language" className="w-[180px]">
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
        </div>

        <Button variant="outline" onClick={handleCopy}>
          <Copy className="w-4 h-4 mr-2" />
          Copy JSON
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-t-lg border-b flex justify-between items-center">
            <span className="font-mono text-sm">
              {entityType}.{language}.json
            </span>
          </div>
          <pre className="p-4 overflow-auto max-h-[500px] font-mono text-sm">
            {JSON.stringify(
              mockData[entityType as keyof typeof mockData]?.[
                language as keyof (typeof mockData)[keyof typeof mockData]
              ] || { error: "No data available for this selection" },
              null,
              2,
            )}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
