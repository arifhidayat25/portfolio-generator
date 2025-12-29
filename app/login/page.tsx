// DISABLED - Static version (no login functionality)
// This page redirects to home page since auth is disabled

import { redirect } from 'next/navigation'

export default function LoginPage() {
  redirect('/')
}

/* ORIGINAL LOGIN PAGE - COMMENTED OUT FOR STATIC VERSION
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen gradient-bg-animated mesh-gradient flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6 animate-slide-up">
          <Link href="/">
            <Button variant="ghost" size="sm" className="glass hover:bg-white/20 transition-all duration-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>

        <Card className="glass-strong border-0 shadow-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Selamat Datang Kembali</CardTitle>
            <CardDescription className="text-base">
              Masuk untuk mengakses dashboard dan mengelola portfolio Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <LoginForm />
            <div className="mt-8 pt-6 border-t border-border/50 text-center">
              <p className="text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <Link href="/register" className="text-violet-600 dark:text-violet-400 hover:underline font-medium transition-colors">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Dengan masuk, Anda menyetujui{" "}
          <Link href="#" className="text-violet-600 dark:text-violet-400 hover:underline">
            Syarat & Ketentuan
          </Link>
        </p>
      </div>
    </div>
  )
}
*/
