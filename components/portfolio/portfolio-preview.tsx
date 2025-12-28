"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Printer, ArrowLeft, Loader2 } from "lucide-react"
import { MinimalistTemplate } from "@/components/templates/minimalist-template"
import { ModernTemplate } from "@/components/templates/modern-template"
import { DarkTemplate } from "@/components/templates/dark-template"

interface PortfolioPreviewProps {
  portfolio: any
  onTemplateChange?: (templateId: string) => void
  onBack?: () => void
}

export function PortfolioPreview({ portfolio, onTemplateChange, onBack }: PortfolioPreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(portfolio.templateId || "minimalist")
  const [isPrinting, setIsPrinting] = useState(false)

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    onTemplateChange?.(templateId)
  }

  const handlePrintPDF = async () => {
    setIsPrinting(true);
    try {
      // PERUBAHAN: Panggil API route yang baru
      const response = await fetch(`/api/pdf/${portfolio.id}`);
      if (!response.ok) {
        throw new Error("Gagal membuat PDF.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${portfolio.fullName}-portfolio.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsPrinting(false);
    }
  };

  const renderTemplate = () => {
    const templateProps = { portfolio: { ...portfolio, templateId: selectedTemplate } }
    switch (selectedTemplate) {
      case "modern": return <ModernTemplate {...templateProps} />
      case "dark": return <DarkTemplate {...templateProps} />
      default: return <MinimalistTemplate {...templateProps} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button onClick={onBack} variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali
                </Button>
              )}
              <div>
                <h1 className="text-xl font-semibold">Preview Portfolio</h1>
                <p className="text-sm text-muted-foreground">{portfolio.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Template:</span>
                <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handlePrintPDF} disabled={isPrinting}>
                {isPrinting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mencetak...</>
                ) : (
                  <><Printer className="mr-2 h-4 w-4" /> Cetak PDF</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">{renderTemplate()}</div>
        </div>
      </main>
    </div>
  )
}
