import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit3, Save, Sparkles } from "lucide-react"
import Link from "next/link"
import { PortfolioForm } from "@/components/portfolio/portfolio-form"

interface EditPortfolioPageProps {
  params: {
    id: string
  }
}

export default function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const portfolioId = params.id

  return (
    <div className="min-h-screen gradient-bg-animated mesh-gradient">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 glass-strong border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="hover:bg-white/10 transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                <Edit3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Edit Portfolio</h1>
                <p className="text-xs text-muted-foreground">Perbarui informasi portfolio Anda</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                <Save className="h-3 w-3 mr-1" />
                Auto-save
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Info Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 animate-slide-up">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-amber-700 dark:text-amber-300 mb-1">Mode Edit</h3>
                <p className="text-sm text-amber-600/80 dark:text-amber-400/80">
                  Perubahan akan tersimpan setelah Anda klik tombol simpan. Preview perubahan sebelum menyimpan.
                </p>
              </div>
            </div>
          </div>

          <Card className="glass-strong border-0 shadow-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="border-b border-border/50 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                  <Edit3 className="h-3 w-3 mr-1" />
                  Editing
                </Badge>
              </div>
              <CardTitle className="text-2xl">Edit Portfolio</CardTitle>
              <CardDescription className="text-base">
                Perbarui informasi portfolio Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <PortfolioForm portfolioId={portfolioId} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
