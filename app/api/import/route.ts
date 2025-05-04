import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { entityType, language, data } = body

    if (!entityType) {
      return NextResponse.json({ error: "No entity type provided" }, { status: 400 })
    }

    if (!language) {
      return NextResponse.json({ error: "No language specified" }, { status: 400 })
    }

    if (!data || !Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    let result

    // Process data based on entity type
    switch (entityType) {
      case "category":
        result = await importCategories(data, language)
        break
      case "product":
        result = await importProducts(data, language)
        break
      // Add other entity types as needed
      default:
        return NextResponse.json({ error: `Unsupported entity type: ${entityType}` }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (error) {
    console.error("Error processing import:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process import" },
      { status: 500 },
    )
  }
}

async function importCategories(data: any[], language: string) {
  let created = 0
  let updated = 0
  const errors: any[] = []

  for (const item of data) {
    try {
      if (language === "en") {
        // For English, we create or update the main Category record
        if (!item.name_en) {
          errors.push({ item, error: "Missing required field: name_en" })
          continue
        }

        // Check if category exists
        const existingCategory = await prisma.category.findUnique({
          where: { name_en: item.name_en },
        })

        if (existingCategory) {
          // Update existing category
          await prisma.category.update({
            where: { id: existingCategory.id },
            data: {
              name_en: item.name_en,
              category_icon: item.category_icon || existingCategory.category_icon,
              category_image: item.category_image || existingCategory.category_image,
              category_Alt_en: item.category_Alt_en || existingCategory.category_Alt_en,
              categoryLink_en: item.categoryLink_en || existingCategory.categoryLink_en,
              specification_image: item.specification_image || existingCategory.specification_image,
              specification_image_alt: item.specification_image_alt || existingCategory.specification_image_alt,
            },
          })
          updated++
        } else {
          // Create new category
          await prisma.category.create({
            data: {
              name_en: item.name_en,
              category_icon: item.category_icon,
              category_image: item.category_image,
              category_Alt_en: item.category_Alt_en,
              categoryLink_en: item.categoryLink_en,
              specification_image: item.specification_image,
              specification_image_alt: item.specification_image_alt,
            },
          })
          created++
        }
      } else {
        // For other languages, we create or update CategoryTranslation
        if (!item.name) {
          errors.push({ item, error: "Missing required field: name" })
          continue
        }

        // We need to find the parent category by some identifier
        let categoryId: number

        if (item.categoryId) {
          categoryId = item.categoryId
        } else if (item.name_en) {
          const category = await prisma.category.findUnique({
            where: { name_en: item.name_en },
          })

          if (!category) {
            errors.push({ item, error: "Parent category not found" })
            continue
          }

          categoryId = category.id
        } else {
          errors.push({ item, error: "Cannot identify parent category" })
          continue
        }

        // Check if translation exists
        const existingTranslation = await prisma.categoryTranslation.findUnique({
          where: {
            categoryId_language: {
              categoryId,
              language: language as any,
            },
          },
        })

        if (existingTranslation) {
          // Update existing translation
          await prisma.categoryTranslation.update({
            where: { id: existingTranslation.id },
            data: {
              name: item.name,
              iconAlt: item.iconAlt || existingTranslation.iconAlt,
              categoryLink: item.categoryLink || existingTranslation.categoryLink,
              description: item.description || existingTranslation.description,
            },
          })
          updated++
        } else {
          // Create new translation
          await prisma.categoryTranslation.create({
            data: {
              language: language as any,
              name: item.name,
              iconAlt: item.iconAlt,
              categoryLink: item.categoryLink,
              description: item.description,
              categoryId,
            },
          })
          created++
        }
      }
    } catch (error) {
      console.error("Error importing category:", error)
      errors.push({ item, error: error instanceof Error ? error.message : "Unknown error" })
    }
  }

  return { created, updated, errors }
}

async function importProducts(data: any[], language: string) {
  let created = 0
  let updated = 0
  const errors: any[] = []

  for (const item of data) {
    try {
      if (language === "en") {
        // For English, we create or update the main Product record
        if (!item.model_name_en) {
          errors.push({ item, error: "Missing required field: model_name_en" })
          continue
        }

        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
          where: { model_name_en: item.model_name_en },
        })

        if (existingProduct) {
          // Update existing product
          await prisma.product.update({
            where: { id: existingProduct.id },
            data: {
              model_name_en: item.model_name_en,
              product_name: item.product_name || existingProduct.product_name,
              productImage: item.productImage || existingProduct.productImage,
              productImage_Alt: item.productImage_Alt || existingProduct.productImage_Alt,
              status_en: item.status_en || existingProduct.status_en,
              stars: item.stars || existingProduct.stars,
              reviews: item.reviews || existingProduct.reviews,
              productDescription_en: item.productDescription_en || existingProduct.productDescription_en,
              model_description: item.model_description || existingProduct.model_description,
              introduction: item.introduction || existingProduct.introduction,
            },
          })
          updated++
        } else {
          // Create new product
          await prisma.product.create({
            data: {
              model_name_en: item.model_name_en,
              product_name: item.product_name,
              productImage: item.productImage,
              productImage_Alt: item.productImage_Alt,
              status_en: item.status_en,
              stars: item.stars,
              reviews: item.reviews,
              productDescription_en: item.productDescription_en,
              model_description: item.model_description,
              introduction: item.introduction,
            },
          })
          created++
        }
      } else {
        // For other languages, we create or update ProductTranslation
        if (!item.name) {
          errors.push({ item, error: "Missing required field: name" })
          continue
        }

        // We need to find the parent product by some identifier
        let productId: number

        if (item.productId) {
          productId = item.productId
        } else if (item.model_name_en) {
          const product = await prisma.product.findUnique({
            where: { model_name_en: item.model_name_en },
          })

          if (!product) {
            errors.push({ item, error: "Parent product not found" })
            continue
          }

          productId = product.id
        } else {
          errors.push({ item, error: "Cannot identify parent product" })
          continue
        }

        // Check if translation exists
        const existingTranslation = await prisma.productTranslation.findUnique({
          where: {
            productId_language: {
              productId,
              language: language as any,
            },
          },
        })

        if (existingTranslation) {
          // Update existing translation
          await prisma.productTranslation.update({
            where: { id: existingTranslation.id },
            data: {
              name: item.name,
              imageAlt: item.imageAlt || existingTranslation.imageAlt,
              status: item.status || existingTranslation.status,
              productDescription: item.productDescription || existingTranslation.productDescription,
              model_description: item.model_description || existingTranslation.model_description,
              introduction: item.introduction || existingTranslation.introduction,
            },
          })
          updated++
        } else {
          // Create new translation
          await prisma.productTranslation.create({
            data: {
              language: language as any,
              name: item.name,
              imageAlt: item.imageAlt,
              status: item.status,
              productDescription: item.productDescription,
              model_description: item.model_description,
              introduction: item.introduction,
              productId,
            },
          })
          created++
        }
      }
    } catch (error) {
      console.error("Error importing product:", error)
      errors.push({ item, error: error instanceof Error ? error.message : "Unknown error" })
    }
  }

  return { created, updated, errors }
}
