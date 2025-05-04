"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

export function ImportSettings() {
  const [settings, setSettings] = useState({
    batchSize: 100,
    timeoutSeconds: 300,
    retryCount: 3,
    logLevel: "info",
    enableNotifications: true,
    enableAutoTranslation: false,
  })
  const { toast } = useToast()

  const handleSave = () => {
    // In a real app, this would save to the backend
    toast({
      title: "Settings saved",
      description: "Your import settings have been updated.",
    })
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Import Settings</CardTitle>
          <CardDescription>Configure how the bulk import process works</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="batchSize">Batch Size</Label>
              <div className="grid gap-4">
                <Slider
                  id="batchSize"
                  min={10}
                  max={500}
                  step={10}
                  value={[settings.batchSize]}
                  onValueChange={(value) => setSettings({ ...settings, batchSize: value[0] })}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10</span>
                  <span>{settings.batchSize}</span>
                  <span>500</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Number of records to process in each batch</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="timeout">Request Timeout (seconds)</Label>
              <Input
                id="timeout"
                type="number"
                value={settings.timeoutSeconds}
                onChange={(e) => setSettings({ ...settings, timeoutSeconds: Number.parseInt(e.target.value) })}
              />
              <p className="text-sm text-muted-foreground">Maximum time allowed for each import request</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="retryCount">Retry Count</Label>
              <Input
                id="retryCount"
                type="number"
                value={settings.retryCount}
                onChange={(e) => setSettings({ ...settings, retryCount: Number.parseInt(e.target.value) })}
              />
              <p className="text-sm text-muted-foreground">Number of times to retry failed imports</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="logLevel">Log Level</Label>
              <Input
                id="logLevel"
                value={settings.logLevel}
                onChange={(e) => setSettings({ ...settings, logLevel: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">Logging detail level (debug, info, warn, error)</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications for import results</p>
              </div>
              <Switch
                id="notifications"
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoTranslation">Auto Translation</Label>
                <p className="text-sm text-muted-foreground">Automatically translate content to other languages</p>
              </div>
              <Switch
                id="autoTranslation"
                checked={settings.enableAutoTranslation}
                onCheckedChange={(checked) => setSettings({ ...settings, enableAutoTranslation: checked })}
              />
            </div>

            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
