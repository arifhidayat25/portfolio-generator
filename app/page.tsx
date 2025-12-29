import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, User, Download, Eye, Palette, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/50 to-blue-50 dark:from-gray-950 dark:via-indigo-950/30 dark:to-blue-950/30 overflow-hidden">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-indigo-200/50 dark:border-indigo-500/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo />
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#5a7cfd] to-[#1a2350] bg-clip-text text-transparent">Portfolio Generator</h1>
            </div>
            {/* <nav className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-indigo-500/10 text-gray-700 dark:text-gray-300 transition-all duration-300">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300">
                  Daftar
                </Button>
              </Link>
            </nav> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-24 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-slide-up">
            <Badge className="mb-6 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300 px-4 py-2">
              <Star className="h-3.5 w-3.5 mr-2 fill-indigo-500 text-indigo-500" />
              Gratis & Mudah Digunakan
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Buat Portfolio
            <span className="block mt-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Anda
            </span>
            <span className="block text-4xl md:text-5xl mt-4 text-gray-600 dark:text-gray-300 font-medium">
              dalam Hitungan Menit
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Generate portofolio otomatis dengan tampilan modern dan responsif. Cukup isi data, portofolio langsung dibuat.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/quick-generate">
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 px-8 py-6 text-lg group">
                <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Quick Generate
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            {/* <Link href="/register">
              <Button size="lg" variant="outline" className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-indigo-300 dark:border-indigo-500/30 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-300 px-8 py-6 text-lg text-gray-700 dark:text-gray-300">
                <User className="mr-2 h-5 w-5" />
                Mode Lengkap (Gratis)
              </Button>
            </Link> */}
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl hover-lift text-left border border-indigo-100 dark:border-indigo-500/10 shadow-lg shadow-indigo-500/5 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <div className="h-14 w-14 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/25">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Quick Generate</CardTitle>
                <CardDescription className="text-base">Buat portfolio instan tanpa perlu daftar akun</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-indigo-500 rounded-full mr-3" />
                    Isi form sederhana
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-indigo-500 rounded-full mr-3" />
                    Pilih template
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-indigo-500 rounded-full mr-3" />
                    Download PDF langsung
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl hover-lift text-left border border-indigo-100 dark:border-indigo-500/10 shadow-lg shadow-indigo-500/5 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <div className="h-14 w-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
                  <Eye className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Live Preview</CardTitle>
                <CardDescription className="text-base">Lihat hasil portfolio secara real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-3" />
                    Preview langsung
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-3" />
                    Edit dan update instan
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-3" />
                    Responsive design
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl hover-lift text-left border border-indigo-100 dark:border-indigo-500/10 shadow-lg shadow-indigo-500/5 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <div className="h-14 w-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/25">
                  <Download className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Export PDF</CardTitle>
                <CardDescription className="text-base">Download portfolio sebagai file PDF siap pakai</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-purple-500 rounded-full mr-3" />
                    File PDF lengkap
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-purple-500 rounded-full mr-3" />
                    Siap dicetak / dilamar
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-purple-500 rounded-full mr-3" />
                    Desain profesional
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
              <Palette className="h-3.5 w-3.5 mr-2" />
              Template Collection
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Template Portfolio <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">Modern</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Pilih dari berbagai template profesional yang sudah dioptimasi untuk berbagai industri
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl overflow-hidden border border-indigo-100 dark:border-indigo-500/10 hover-lift group shadow-lg">
              <div className="h-52 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Palette className="h-14 w-14 text-gray-400 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
                  Minimalist
                  <Badge variant="secondary" className="text-xs">Popular</Badge>
                </CardTitle>
                <CardDescription>Clean dan sederhana, fokus pada konten</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl overflow-hidden border-0 hover-lift group ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-950 shadow-xl">
              <div className="h-52 bg-gradient-to-br from-indigo-100 to-blue-200 dark:from-indigo-900/50 dark:to-blue-900/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Palette className="h-14 w-14 text-indigo-500 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-0">
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    Best
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
                  Modern
                  <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 text-xs">Recommended</Badge>
                </CardTitle>
                <CardDescription>Desain kontemporer dengan aksen warna</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl overflow-hidden border border-indigo-100 dark:border-indigo-500/10 hover-lift group shadow-lg">
              <div className="h-52 bg-gradient-to-br from-gray-800 to-gray-950 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Palette className="h-14 w-14 text-gray-300 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
                  Dark Mode
                  <Badge variant="outline" className="text-xs">Elegant</Badge>
                </CardTitle>
                <CardDescription>Elegan dengan tema gelap yang modern</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-indigo-200/50 dark:border-indigo-500/10 py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-8 w-8 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Portfolio Generator</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Portfolio Generator. Dibuat oleh <a href="https://achmadarha.site" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Achmad Arif Hidayat</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
