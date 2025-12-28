import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Zap, Clock, Sparkles } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { QuickGenerateForm } from "@/components/quick-generate-form"

export default function QuickGeneratePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/50 to-blue-50 dark:from-gray-950 dark:via-indigo-950/30 dark:to-blue-950/30 overflow-y-auto">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-400/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-indigo-200/50 dark:border-indigo-500/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-indigo-500/10 text-gray-700 dark:text-gray-300 transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-9" iconClassName="h-5 w-5" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Generate Portfolio</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Buat portfolio dalam hitungan menit</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                <Clock className="h-3 w-3 mr-1" />
                ~5 menit
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Info Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 animate-slide-up">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/25">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-indigo-700 dark:text-indigo-300 mb-1">Mode Quick Generate</h3>
                <p className="text-sm text-indigo-600/80 dark:text-indigo-400/80">
                  Buat portfolio tanpa perlu daftar akun. Isi form, pilih template, dan langsung download!
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-indigo-100 dark:border-indigo-500/10 shadow-xl shadow-indigo-500/5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="border-b border-indigo-100 dark:border-indigo-500/10 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-0">
                  <Zap className="h-3 w-3 mr-1" />
                  Quick Mode
                </Badge>
              </div>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Buat Portfolio Anda</CardTitle>
              <CardDescription className="text-base">
                Isi informasi di bawah ini untuk membuat portfolio profesional Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <QuickGenerateForm />
            </CardContent>
          </Card>

          {/* Help Section */}
          {/* Footer */}
          <div className="mt-8 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Portfolio Generator. Dibuat oleh <a href="https://achmadarha.site" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Achmad Arif Hidayat</a> untuk membantu pengembangan karier.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
