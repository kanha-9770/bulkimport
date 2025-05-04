import { ImportWizard } from "@/components/import-wizard";

export default function ImportPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Import</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ImportWizard />
      </main>
    </div>
  )
}
