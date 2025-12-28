"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { PortfolioPreview } from "@/components/portfolio/portfolio-preview"
import { portfolioService, type Portfolio } from "@/lib/portfolio"
import { Loader2 } from "lucide-react"

// Tipe data untuk props komponen template (camelCase)
type MappedPortfolio = {
  id: string;
  title: string;
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  profileImageUrl?: string;
  skills: string[];
  experiences: any[];
  education: any[];
  projects: any[];
  socialLinks?: any;
  certifications?: any[];
  languages?: any[];
  testimonials?: any[];
  templateId: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PreviewPage() {
  const [portfolio, setPortfolio] = useState<MappedPortfolio | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()
  
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    if (!id) return;

    const loadPortfolio = async () => {
      try {
        const data: Portfolio | null = await portfolioService.getById(id)
        if (data) {
          // PERBAIKAN: Lengkapi pemetaan untuk semua data baru
          const mappedData: MappedPortfolio = {
            id: data.id,
            title: data.title,
            fullName: data.full_name,
            email: data.email,
            phone: data.phone,
            location: data.location,
            bio: data.bio,
            profileImageUrl: data.profile_image_url,
            skills: data.skills,
            experiences: data.experiences,
            education: data.education,
            projects: data.projects,
            socialLinks: data.social_links,
            certifications: data.certifications,
            languages: data.languages,
            testimonials: data.testimonials,
            templateId: data.template_id,
            isPublic: data.is_public,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };
          setPortfolio(mappedData);
        } else {
          setError("Portfolio tidak ditemukan")
        }
      } catch (err) {
        setError("Gagal memuat portfolio")
        console.error(err);
      } finally {
        setIsLoading(false)
      }
    }
    
    loadPortfolio()
  }, [id])

  const handleTemplateChange = async (templateId: string) => {
    if (!portfolio) return
    try {
      const updatedPortfolio = await portfolioService.update(portfolio.id, { templateId })
      setPortfolio(prev => prev ? { ...prev, templateId: updatedPortfolio.template_id } : null);
    } catch (err) {
      console.error("[v0] Failed to update template:", err)
    }
  }

  const handleBack = () => {
    router.push("/dashboard")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Memuat pratinjau...</span>
        </div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gagal Memuat Pratinjau</h1>
          <p className="text-gray-600 mb-4">{error || "Portfolio yang Anda cari tidak tersedia."}</p>
          <button onClick={handleBack} className="text-blue-600 hover:text-blue-800 underline">
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <PortfolioPreview
      portfolio={portfolio}
      onTemplateChange={handleTemplateChange}
      onBack={handleBack}
    />
  )
}
