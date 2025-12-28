"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { portfolioService, type Portfolio } from "@/lib/portfolio"
import { MinimalistTemplate } from "@/components/templates/minimalist-template"
import { ModernTemplate } from "@/components/templates/modern-template"
import { DarkTemplate } from "@/components/templates/dark-template"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

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
}

export default function PublicPortfolioPage() {
  const [portfolio, setPortfolio] = useState<MappedPortfolio | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    if (!id) return;

    const loadPortfolio = async () => {
      try {
        const data = await portfolioService.getById(id)
        
        if (data && data.is_public) {
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
          };
          setPortfolio(mappedData)
        } else {
          setError("Portfolio tidak ditemukan atau tidak untuk publik.")
        }
      } catch (err) {
        setError("Gagal memuat portfolio.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPortfolio()
  }, [id])

  const renderTemplate = () => {
    if (!portfolio) return null
    const templateProps = { portfolio };

    switch (portfolio.templateId) {
      case "modern":
        return <ModernTemplate {...templateProps} />
      case "dark":
        return <DarkTemplate {...templateProps} />
      default:
        return <MinimalistTemplate {...templateProps} />
    }
  }

  // PERUBAHAN: Tentukan kelas latar belakang berdasarkan template
  const getBackgroundColorClass = () => {
    if (!portfolio) return "bg-gray-100"; // Default background
    switch (portfolio.templateId) {
      case "dark":
        return "bg-gray-900";
      case "modern":
        return "bg-gray-50";
      case "minimalist":
      default:
        return "bg-white";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Memuat portfolio...</span>
        </div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Portfolio Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-4">{error || "Portfolio yang Anda cari tidak tersedia."}</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${getBackgroundColorClass()}`}>
      <title>{portfolio.fullName} - Portfolio</title>
      
      <div>
        <div className="p-4 sm:p-8">{renderTemplate()}</div>
      </div>

      <footer className="bg-gray-50 border-t py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            Dibuat dengan{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Portfolio Generator
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
