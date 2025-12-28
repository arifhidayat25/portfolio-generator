import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen gradient-bg-animated mesh-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <div className="mb-6 animate-slide-up">
          <Link href="/">
            <Button variant="ghost" size="sm" className="glass hover:bg-white/20 transition-all duration-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>

        {/* Register Card */}
        <Card className="glass-strong border-0 shadow-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Buat Akun Baru</CardTitle>
            <CardDescription className="text-base">
              Daftar gratis untuk menyimpan dan mengelola portfolio Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Benefits */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-2">
                Keuntungan mendaftar:
              </p>
              <ul className="text-sm text-emerald-600 dark:text-emerald-400 space-y-1.5">
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 shrink-0" />
                  Simpan portfolio tanpa batas
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 shrink-0" />
                  Dapatkan link portfolio publik
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 shrink-0" />
                  Edit kapan saja
                </li>
              </ul>
            </div>

            <RegisterForm />
            
            <div className="mt-8 pt-6 border-t border-border/50 text-center">
              <p className="text-sm text-muted-foreground">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-violet-600 dark:text-violet-400 hover:underline font-medium transition-colors">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
