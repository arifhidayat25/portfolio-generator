"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2, Mail, Lock, User, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/auth"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter")
      setIsLoading(false)
      return
    }

    if (!formData.agreeToTerms) {
      setError("Anda harus menyetujui syarat dan ketentuan")
      setIsLoading(false)
      return
    }


    try {
      console.log('[Register] Starting registration...');
      
      // Use Supabase authService for user registration
      const signUpResult = await authService.signUp(formData.email, formData.password, formData.fullName);
      console.log('[Register] SignUp result:', signUpResult);

      // Auto-login after successful registration (no email confirmation needed)
      console.log('[Register] Attempting auto-login...');
      const signInResult = await authService.signIn(formData.email, formData.password);
      console.log('[Register] SignIn result:', signInResult);
      
      // Short delay to ensure session is set
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redirect to dashboard
      console.log('[Register] Redirecting to dashboard...');
      router.push("/dashboard");
      router.refresh(); // Force refresh to update session
    } catch (err: any) {
      // Display error from Supabase
      console.error('[Register] Error:', err);
      setError(err.message || "Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 animate-slide-up">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium">Nama Lengkap</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
            placeholder="John Doe"
            required
            disabled={isLoading}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="nama@example.com"
            required
            disabled={isLoading}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Minimal 6 karakter"
            required
            disabled={isLoading}
            className="pl-10 pr-12 h-12 bg-background/50 border-border/50 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">Konfirmasi Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Ulangi password"
            required
            disabled={isLoading}
            className="pl-10 pr-12 h-12 bg-background/50 border-border/50 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex items-start space-x-3 p-4 rounded-xl bg-muted/50 border border-border/50">
        <Checkbox
          id="terms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: !!checked }))}
          disabled={isLoading}
          className="mt-0.5 border-border data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
        />
        <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
          Saya setuju dengan{" "}
          <Button variant="link" className="p-0 h-auto text-sm text-blue-600 dark:text-blue-400 hover:underline">
            syarat dan ketentuan
          </Button>{" "}
          serta{" "}
          <Button variant="link" className="p-0 h-auto text-sm text-blue-600 dark:text-blue-400 hover:underline">
            kebijakan privasi
          </Button>
        </Label>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 text-base font-medium" 
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Mendaftar..." : "Buat Akun"}
      </Button>
    </form>
  )
}
