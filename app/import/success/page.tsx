import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Import Successful!</CardTitle>
          <CardDescription>Your data has been successfully imported into the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Content Type:</div>
                <div className="text-sm">Category</div>

                <div className="text-sm font-medium">Language:</div>
                <div className="text-sm">English</div>

                <div className="text-sm font-medium">Records Created:</div>
                <div className="text-sm">24</div>

                <div className="text-sm font-medium">Records Updated:</div>
                <div className="text-sm">3</div>

                <div className="text-sm font-medium">Import Date:</div>
                <div className="text-sm">{new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="outline">
            <Link href="/import">New Import</Link>
          </Button>
          <Button asChild>
            <Link href="/data">
              View Data
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
