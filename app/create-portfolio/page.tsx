import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, FolderOpen, Sparkles } from "lucide-react"
import Link from "next/link"
import { PortfolioForm } from "@/components/portfolio/portfolio-form"

export default function CreatePortfolioPage() {
  return (
    <div className="min-h-screen gradient-bg-animated mesh-gradient">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
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
              <div className="h-9 w-9 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
                <Plus className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Buat Portfolio Baru</h1>
                <p className="text-xs text-muted-foreground">Tambah portfolio ke koleksi Anda</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Badge variant="secondary" className="bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20">
                <FolderOpen className="h-3 w-3 mr-1" />
                Mode Lengkap
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Info Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 animate-slide-up">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-violet-700 dark:text-violet-300 mb-1">Mode Lengkap</h3>
                <p className="text-sm text-violet-600/80 dark:text-violet-400/80">
                  Portfolio akan tersimpan di akun Anda. Anda bisa edit, preview, dan bagikan kapan saja.
                </p>
              </div>
            </div>
          </div>

          <Card className="glass-strong border-0 shadow-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="border-b border-border/50 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0">
                  <Plus className="h-3 w-3 mr-1" />
                  Baru
                </Badge>
              </div>
              <CardTitle className="text-2xl">Informasi Portfolio</CardTitle>
              <CardDescription className="text-base">
                Lengkapi informasi di bawah ini untuk membuat portfolio profesional Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <PortfolioForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
