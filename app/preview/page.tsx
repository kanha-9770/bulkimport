import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PreviewWebsite } from "@/components/preview-website"
import { PreviewJson } from "@/components/preview-json"

export default function PreviewPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Content Preview</h1>

      <Tabs defaultValue="website">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="website">Website Preview</TabsTrigger>
          <TabsTrigger value="json">JSON Data</TabsTrigger>
        </TabsList>

        <TabsContent value="website">
          <PreviewWebsite />
        </TabsContent>

        <TabsContent value="json">
          <PreviewJson />
        </TabsContent>
      </Tabs>
    </div>
  )
}
