import { prisma } from "@/lib/prisma"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table"
import { columns as categoryColumns } from "@/components/data/category-columns"
import { columns as productColumns } from "@/components/data/product-columns"

export default async function DataPage() {
  // Fetch data from the database
  const categories = await prisma.category.findMany({
    include: {
      translations: true,
    },
  })

  const products = await prisma.product.findMany({
    include: {
      translations: true,
    },
  })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Database Content</h1>

      <Tabs defaultValue="categories">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <DataTable columns={categoryColumns} data={categories} />
        </TabsContent>

        <TabsContent value="products">
          <DataTable columns={productColumns} data={products} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
