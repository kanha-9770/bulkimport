"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function PreviewWebsite() {
  const [language, setLanguage] = useState<string>("en")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="grid gap-2">
            <Label htmlFor="preview-language">Preview Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="preview-language" className="w-[180px]">
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
        <div className="flex gap-2">
          <Button variant="outline">Refresh</Button>
          <Button>Publish Content</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="category">
            <TabsList className="w-full justify-start border-b rounded-none px-4">
              <TabsTrigger value="category">Categories</TabsTrigger>
              <TabsTrigger value="product">Products</TabsTrigger>
              <TabsTrigger value="specification">Specifications</TabsTrigger>
              <TabsTrigger value="advantage">Advantages</TabsTrigger>
            </TabsList>

            <TabsContent value="category" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mock category cards */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-200 h-40 flex items-center justify-center">
                      <span className="text-gray-500">Category Image</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">Category {i + 1}</h3>
                      <p className="text-sm text-gray-500">
                        {language === "en"
                          ? "Description in English"
                          : language === "fr"
                            ? "Description en français"
                            : language === "hi"
                              ? "हिंदी में विवरण"
                              : "தமிழில் விளக்கம்"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="product" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mock product cards */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-200 h-48 flex items-center justify-center">
                      <span className="text-gray-500">Product Image</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">Product {i + 1}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {language === "en"
                          ? "Description in English"
                          : language === "fr"
                            ? "Description en français"
                            : language === "hi"
                              ? "हिंदी में विवरण"
                              : "தமிழில் விளக்கம்"}
                      </p>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Category: Sample</span>
                        <span className="text-sm font-medium">★★★★☆</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specification" className="p-6">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3">Feature</th>
                      <th className="text-left p-3">Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3 font-medium">
                          {language === "en"
                            ? `Feature ${i + 1}`
                            : language === "fr"
                              ? `Fonctionnalité ${i + 1}`
                              : language === "hi"
                                ? `विशेषता ${i + 1}`
                                : `அம்சம் ${i + 1}`}
                        </td>
                        <td className="p-3">
                          {language === "en"
                            ? "Specification details in English"
                            : language === "fr"
                              ? "Détails de spécification en français"
                              : language === "hi"
                                ? "हिंदी में विनिर्देश विवरण"
                                : "தமிழில் விவரக்குறிப்பு விவரங்கள்"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="advantage" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mock advantage cards */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {language === "en"
                        ? `Advantage ${i + 1}`
                        : language === "fr"
                          ? `Avantage ${i + 1}`
                          : language === "hi"
                            ? `लाभ ${i + 1}`
                            : `நன்மை ${i + 1}`}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {language === "en"
                        ? "Description in English"
                        : language === "fr"
                          ? "Description en français"
                          : language === "hi"
                            ? "हिंदी में विवरण"
                            : "தமிழில் விளக்கம்"}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
