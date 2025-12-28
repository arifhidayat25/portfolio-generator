"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, X, Save, Eye, Loader2, Upload, Linkedin, Github, Globe, Instagram, Award, Languages, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { portfolioService, type Portfolio, type Experience, type Education, type Project, type SocialLinks, type Certification, type Language, type Testimonial } from "@/lib/portfolio"
import { authService } from "@/lib/auth"
import { supabase } from "@/lib/supabaseClient"

// Tipe data untuk state form (camelCase)
type PortfolioFormData = {
  title: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profileImageUrl: string;
  skills: string[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  socialLinks: SocialLinks;
  certifications: Certification[];
  languages: Language[];
  testimonials: Testimonial[];
  templateId: string;
  isPublic: boolean;
}

interface PortfolioFormProps {
  portfolioId?: string
}

export function PortfolioForm({ portfolioId }: PortfolioFormProps) {
  const [portfolioData, setPortfolioData] = useState<Partial<PortfolioFormData>>({
    title: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    profileImageUrl: "",
    skills: [],
    experiences: [],
    education: [],
    projects: [],
    socialLinks: { linkedin: "", github: "", website: "", instagram: "" },
    certifications: [],
    languages: [],
    testimonials: [],
    templateId: "minimalist",
    isPublic: false,
  })

  const [newSkill, setNewSkill] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (portfolioId) {
          const portfolio: Portfolio | null = await portfolioService.getById(portfolioId);
          if (portfolio) {
            setPortfolioData({
              title: portfolio.title,
              fullName: portfolio.full_name,
              email: portfolio.email,
              phone: portfolio.phone || "",
              location: portfolio.location || "",
              bio: portfolio.bio || "",
              profileImageUrl: portfolio.profile_image_url || "",
              skills: portfolio.skills || [],
              experiences: portfolio.experiences || [],
              education: portfolio.education || [],
              projects: portfolio.projects || [],
              socialLinks: portfolio.social_links || { linkedin: "", github: "", website: "", instagram: "" },
              certifications: portfolio.certifications || [],
              languages: portfolio.languages || [],
              testimonials: portfolio.testimonials || [],
              templateId: portfolio.template_id,
              isPublic: portfolio.is_public,
            });
          } else {
            setError("Portfolio tidak ditemukan.");
          }
        } else {
          const user = await authService.getCurrentUser();
          if (user) {
            setPortfolioData(prev => ({
              ...prev,
              fullName: user.user_metadata?.full_name || '',
              email: user.email || '',
            }));
          }
        }
      } catch (err) {
        setError("Gagal memuat data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [portfolioId]);
  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");
    try {
      const user = await authService.getCurrentUser();
      if (!user) throw new Error("User not authenticated for upload");

      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);
      
      setPortfolioData(prev => ({ ...prev, profileImageUrl: data.publicUrl }));

    } catch (err: any) {
      setError(err.message || "Gagal mengunggah gambar.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !portfolioData.skills?.includes(newSkill.trim())) {
      setPortfolioData((prev) => ({ ...prev, skills: [...(prev.skills || []), newSkill.trim()] }))
      setNewSkill("")
    }
  }
  const removeSkill = (skillToRemove: string) => {
    setPortfolioData((prev) => ({ ...prev, skills: prev.skills?.filter((skill) => skill !== skillToRemove) || [] }))
  }

  const handleDynamicChange = (section: keyof PortfolioFormData, index: number, field: string, value: string) => {
    setPortfolioData(prev => {
      const list = (prev[section] as any[] || []).map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prev, [section]: list };
    });
  };

  const addDynamicItem = (section: keyof PortfolioFormData, newItem: any) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: [...(prev[section] as any[] || []), newItem]
    }));
  };

  const removeDynamicItem = (section: keyof PortfolioFormData, index: number) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: (prev[section] as any[] || []).filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    setSuccess("");

    if (!portfolioData.title || !portfolioData.fullName || !portfolioData.email) {
      setError("Judul, Nama Lengkap, dan Email wajib diisi.");
      setIsSaving(false);
      return;
    }

    const cleanedData = {
      ...portfolioData,
      experiences: portfolioData.experiences?.filter(exp => exp.title.trim() !== "" || exp.company.trim() !== ""),
      education: portfolioData.education?.filter(edu => edu.degree.trim() !== "" || edu.institution.trim() !== ""),
      projects: portfolioData.projects?.filter(proj => proj.name.trim() !== ""),
      certifications: portfolioData.certifications?.filter(cert => cert.name.trim() !== ""),
      languages: portfolioData.languages?.filter(lang => lang.name.trim() !== ""),
      testimonials: portfolioData.testimonials?.filter(t => t.name.trim() !== "" && t.content.trim() !== ""),
    };

    try {
      if (portfolioId) {
        await portfolioService.update(portfolioId, cleanedData);
        setSuccess("Portfolio berhasil diperbarui!");
      } else {
        const newPortfolio = await portfolioService.create(cleanedData);
        setSuccess("Portfolio berhasil dibuat!");
        setTimeout(() => {
          router.push(`/edit-portfolio/${newPortfolio.id}`);
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan portfolio. Silakan coba lagi.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (portfolioId) {
      router.push(`/preview/${portfolioId}`);
    } else {
      alert("Harap simpan portfolio terlebih dahulu untuk melihat preview.");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-8">
      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      {success && <Alert><AlertDescription>{success}</AlertDescription></Alert>}

      <Card>
        <CardHeader><CardTitle>Informasi Dasar</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative shrink-0">
              <Image
                src={portfolioData.profileImageUrl || "/placeholder-user.jpg"}
                alt="Foto Profil"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover border"
              />
              <Label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer border shadow-sm hover:bg-gray-100">
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              </Label>
              <Input id="profileImage" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={isUploading} />
            </div>
            <div className="w-full space-y-2">
              <div>
                <Label htmlFor="title">Judul Portfolio *</Label>
                <Input id="title" value={portfolioData.title || ""} onChange={(e) => setPortfolioData(prev => ({ ...prev, title: e.target.value }))} placeholder="Portfolio Frontend Developer" />
              </div>
               <div>
                <Label htmlFor="fullName">Nama Lengkap *</Label>
                <Input id="fullName" value={portfolioData.fullName || ""} onChange={(e) => setPortfolioData(prev => ({ ...prev, fullName: e.target.value }))} placeholder="John Doe" />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={portfolioData.email || ""} onChange={(e) => setPortfolioData(prev => ({ ...prev, email: e.target.value }))} placeholder="john@example.com" />
            </div>
            <div>
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input id="phone" value={portfolioData.phone || ""} onChange={(e) => setPortfolioData(prev => ({ ...prev, phone: e.target.value }))} placeholder="+62 812 3456 7890" />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Lokasi</Label>
            <Input id="location" value={portfolioData.location || ""} onChange={(e) => setPortfolioData(prev => ({ ...prev, location: e.target.value }))} placeholder="Jakarta, Indonesia" />
          </div>
          <div>
            <Label htmlFor="bio">Bio/Deskripsi Singkat</Label>
            <Textarea id="bio" value={portfolioData.bio || ""} onChange={(e) => setPortfolioData(prev => ({ ...prev, bio: e.target.value }))} placeholder="Ceritakan tentang diri Anda..." rows={3} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Media Sosial & Tautan</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Linkedin className="h-5 w-5 text-gray-400" />
            <Input placeholder="URL Profil LinkedIn" value={portfolioData.socialLinks?.linkedin || ""} onChange={e => setPortfolioData(prev => ({...prev, socialLinks: {...prev.socialLinks, linkedin: e.target.value}}))} />
          </div>
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5 text-gray-400" />
            <Input placeholder="URL Profil GitHub" value={portfolioData.socialLinks?.github || ""} onChange={e => setPortfolioData(prev => ({...prev, socialLinks: {...prev.socialLinks, github: e.target.value}}))} />
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-gray-400" />
            <Input placeholder="URL Website Pribadi" value={portfolioData.socialLinks?.website || ""} onChange={e => setPortfolioData(prev => ({...prev, socialLinks: {...prev.socialLinks, website: e.target.value}}))} />
          </div>
          <div className="flex items-center gap-2">
            <Instagram className="h-5 w-5 text-gray-400" />
            <Input placeholder="URL Profil Instagram" value={portfolioData.socialLinks?.instagram || ""} onChange={e => setPortfolioData(prev => ({...prev, socialLinks: {...prev.socialLinks, instagram: e.target.value}}))} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Keahlian</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Tambahkan keahlian..." onKeyPress={(e) => e.key === 'Enter' && addSkill()} />
            <Button onClick={addSkill} size="sm"><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {portfolioData.skills?.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><div className="flex items-center justify-between"><CardTitle>Pengalaman Kerja</CardTitle><Button onClick={() => addDynamicItem('experiences', { title: '', company: '', duration: '', description: '' })} size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />Tambah</Button></div></CardHeader>
        <CardContent className="space-y-4">
          {portfolioData.experiences?.map((exp, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2 relative">
              <Button onClick={() => removeDynamicItem('experiences', index)} size="sm" variant="ghost" className="absolute top-2 right-2 h-6 w-6 p-0"><X className="h-4 w-4" /></Button>
              <div className="grid md:grid-cols-2 gap-2">
                <Input placeholder="Posisi" value={exp.title} onChange={(e) => handleDynamicChange('experiences', index, 'title', e.target.value)} />
                <Input placeholder="Perusahaan" value={exp.company} onChange={(e) => handleDynamicChange('experiences', index, 'company', e.target.value)} />
              </div>
              <Input placeholder="Durasi (Contoh: Jan 2022 - Sekarang)" value={exp.duration} onChange={(e) => handleDynamicChange('experiences', index, 'duration', e.target.value)} />
              <Textarea placeholder="Deskripsi pekerjaan..." value={exp.description} onChange={(e) => handleDynamicChange('experiences', index, 'description', e.target.value)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><div className="flex items-center justify-between"><CardTitle>Pendidikan</CardTitle><Button onClick={() => addDynamicItem('education', { degree: '', institution: '', year: '' })} size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />Tambah</Button></div></CardHeader>
        <CardContent className="space-y-4">
          {portfolioData.education?.map((edu, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2 relative">
              <Button onClick={() => removeDynamicItem('education', index)} size="sm" variant="ghost" className="absolute top-2 right-2 h-6 w-6 p-0"><X className="h-4 w-4" /></Button>
              <Input placeholder="Gelar/Jurusan" value={edu.degree} onChange={e => handleDynamicChange('education', index, 'degree', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Nama Institusi" value={edu.institution} onChange={e => handleDynamicChange('education', index, 'institution', e.target.value)} />
                <Input placeholder="Tahun (Contoh: 2018 - 2022)" value={edu.year} onChange={e => handleDynamicChange('education', index, 'year', e.target.value)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><div className="flex items-center justify-between"><CardTitle>Proyek</CardTitle><Button onClick={() => addDynamicItem('projects', { name: '', description: '', technologies: '', link: '' })} size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />Tambah</Button></div></CardHeader>
        <CardContent className="space-y-4">
          {portfolioData.projects?.map((project, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2 relative">
              <Button onClick={() => removeDynamicItem('projects', index)} size="sm" variant="ghost" className="absolute top-2 right-2 h-6 w-6 p-0"><X className="h-4 w-4" /></Button>
              <Input placeholder="Nama Proyek" value={project.name} onChange={e => handleDynamicChange('projects', index, 'name', e.target.value)} />
              <Input placeholder="Teknologi (Contoh: React, Next.js, Supabase)" value={project.technologies} onChange={e => handleDynamicChange('projects', index, 'technologies', e.target.value)} />
              <Input placeholder="URL Proyek" value={project.link} onChange={e => handleDynamicChange('projects', index, 'link', e.target.value)} />
              <Textarea placeholder="Deskripsi proyek..." value={project.description} onChange={e => handleDynamicChange('projects', index, 'description', e.target.value)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><div className="flex items-center justify-between"><CardTitle>Sertifikasi & Penghargaan</CardTitle><Button onClick={() => addDynamicItem('certifications', { name: '', issuer: '', year: '' })} size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />Tambah</Button></div></CardHeader>
        <CardContent className="space-y-4">
          {portfolioData.certifications?.map((cert, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2 relative">
              <Button onClick={() => removeDynamicItem('certifications', index)} size="sm" variant="ghost" className="absolute top-2 right-2 h-6 w-6 p-0"><X className="h-4 w-4" /></Button>
              <Input placeholder="Nama Sertifikat" value={cert.name} onChange={e => handleDynamicChange('certifications', index, 'name', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Penerbit" value={cert.issuer} onChange={e => handleDynamicChange('certifications', index, 'issuer', e.target.value)} />
                <Input placeholder="Tahun" value={cert.year} onChange={e => handleDynamicChange('certifications', index, 'year', e.target.value)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><div className="flex items-center justify-between"><CardTitle>Bahasa</CardTitle><Button onClick={() => addDynamicItem('languages', { name: '', level: '' })} size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />Tambah</Button></div></CardHeader>
        <CardContent className="space-y-4">
          {portfolioData.languages?.map((lang, index) => (
            <div key={index} className="border rounded-lg p-4 grid grid-cols-2 gap-2 relative">
              <Button onClick={() => removeDynamicItem('languages', index)} size="sm" variant="ghost" className="absolute top-2 right-2 h-6 w-6 p-0"><X className="h-4 w-4" /></Button>
              <Input placeholder="Bahasa (Contoh: Inggris)" value={lang.name} onChange={e => handleDynamicChange('languages', index, 'name', e.target.value)} />
              <Input placeholder="Level (Contoh: Mahir)" value={lang.level} onChange={e => handleDynamicChange('languages', index, 'level', e.target.value)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><div className="flex items-center justify-between"><CardTitle>Testimoni</CardTitle><Button onClick={() => addDynamicItem('testimonials', { name: '', title: '', content: '' })} size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />Tambah</Button></div></CardHeader>
        <CardContent className="space-y-4">
          {portfolioData.testimonials?.map((testi, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2 relative">
              <Button onClick={() => removeDynamicItem('testimonials', index)} size="sm" variant="ghost" className="absolute top-2 right-2 h-6 w-6 p-0"><X className="h-4 w-4" /></Button>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Nama Pemberi Testimoni" value={testi.name} onChange={e => handleDynamicChange('testimonials', index, 'name', e.target.value)} />
                <Input placeholder="Jabatan" value={testi.title} onChange={e => handleDynamicChange('testimonials', index, 'title', e.target.value)} />
              </div>
              <Textarea placeholder="Isi testimoni..." value={testi.content} onChange={e => handleDynamicChange('testimonials', index, 'content', e.target.value)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Pengaturan Portfolio</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="template">Template</Label>
            <Select value={portfolioData.templateId || "minimalist"} onValueChange={(value) => setPortfolioData(prev => ({ ...prev, templateId: value }))}>
              <SelectTrigger><SelectValue placeholder="Pilih template" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="minimalist">Minimalist</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="dark">Dark Mode</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="isPublic" checked={portfolioData.isPublic || false} onCheckedChange={(checked) => setPortfolioData(prev => ({ ...prev, isPublic: !!checked }))} />
            <Label htmlFor="isPublic">Publikasikan portfolio</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button onClick={handlePreview} size="lg" variant="outline"><Eye className="mr-2 h-5 w-5" />Preview</Button>
        <Button onClick={handleSave} size="lg" disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-5 w-5" />
          {isSaving ? "Menyimpan..." : portfolioId ? "Update Portfolio" : "Simpan Portfolio"}
        </Button>
      </div>
    </div>
  )
}
