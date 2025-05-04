import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Database, FileUp, LayoutDashboard } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Import System</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileUp className="h-5 w-5" />
                Import Content
              </CardTitle>
              <CardDescription>Import content in bulk from CSV, JSON, or by pasting data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Upload files or paste data to import content into your database. Preview and validate before confirming.
              </p>
              <Button asChild className="w-full">
                <Link href="/import">Start Import</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                View Data
              </CardTitle>
              <CardDescription>Browse and manage your existing content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                View, edit, and manage your existing content across all categories and languages.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/data">Browse Data</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </CardTitle>
              <CardDescription>View import history and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                See your import history, success rates, and content statistics.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
