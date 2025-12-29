"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, X, Eye, Download, Loader2 } from "lucide-react"  
import type { Portfolio, Experience, Education, Project, SocialLinks, Language } from "@/lib/portfolio"
import { PDFExporter } from "@/lib/pdf-export"

// Import template components
import { MinimalistTemplate } from "@/components/templates/minimalist-template"
import { ModernTemplate } from "@/components/templates/modern-template"
import { DarkTemplate } from "@/components/templates/dark-template"
import { PhotoUpload } from "@/components/photo-upload"


type QuickFormData = {
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
  languages: Language[];
  templateId: string;
}

export function QuickGenerateForm() {
  const [formData, setFormData] = useState<QuickFormData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    profileImageUrl: "", // Tidak ada upload di quick generate, jadi ini akan kosong
    skills: [],
    experiences: [],
    education: [],
    projects: [],
    socialLinks: { linkedin: "", github: "", website: "", instagram: "" },
    languages: [],
    templateId: "minimalist",
  })

  const [newSkill, setNewSkill] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // ... (Fungsi add/remove/update item tetap sama)
  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
      setNewSkill("")
    }
  }
  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill !== skillToRemove) }))
  }
  const handleDynamicChange = (section: keyof QuickFormData, index: number, field: string, value: string) => {
    setFormData(prev => {
      const list = (prev[section] as any[] || []).map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prev, [section]: list };
    });
  };
  const addDynamicItem = (section: keyof QuickFormData, newItem: any) => {
    setFormData(prev => ({ ...prev, [section]: [...(prev[section] as any[] || []), newItem] }));
  };
  const removeDynamicItem = (section: keyof QuickFormData, index: number) => {
    setFormData(prev => ({ ...prev, [section]: (prev[section] as any[] || []).filter((_, i) => i !== index) }));
  };

  const handlePreviewToggle = () => {
    setShowPreview(!showPreview)
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      // Pastikan preview sudah ditampilkan
      if (!showPreview) {
        setShowPreview(true)
        // Tunggu sebentar untuk render
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      const portfolioForExport: Portfolio = {
        id: "quick-generate",
        user_id: "anonymous",
        title: `Portfolio ${formData.fullName}`,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        profile_image_url: formData.profileImageUrl,
        skills: formData.skills,
        experiences: formData.experiences.filter(exp => exp.title.trim() !== "" || exp.company.trim() !== ""),
        education: formData.education.filter(edu => edu.degree.trim() !== "" || edu.institution.trim() !== ""),
        projects: formData.projects.filter(proj => proj.name.trim() !== ""),
        social_links: formData.socialLinks,
        certifications: [], // Tidak ada di quick generate
        languages: [], // Tidak ada di quick generate
        testimonials: [], // Tidak ada di quick generate
        template_id: formData.templateId,
        is_public: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      await PDFExporter.generatePDF(portfolioForExport)
    } catch (error) {
      console.error("[v0] Export failed:", error)
      alert("Gagal mengekspor portfolio. Silakan coba lagi.")
    } finally {
      setIsExporting(false)
    }
  }

  const renderPreview = () => {
    const portfolioProps = {
      ...formData,
      // Quick generate tidak punya fitur ini, jadi kita isi array kosong
      certifications: [],
      testimonials: [],
    };
    
    switch (formData.templateId) {
      case "modern":
        return <ModernTemplate portfolio={portfolioProps} />;
      case "dark":
        return <DarkTemplate portfolio={portfolioProps} />;
      default:
        return <MinimalistTemplate portfolio={portfolioProps} />;
    }
  }

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-l-primary/50">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">👤</span>
            Informasi Pribadi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2 group">
              <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-1">
                Nama Lengkap <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="fullName" 
                value={formData.fullName} 
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))} 
                placeholder="John Doe" 
                className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
              />
            </div>
            <div className="space-y-2 group">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} 
                placeholder="john@example.com" 
                className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
              />
            </div>
            <div className="space-y-2 group">
              <Label htmlFor="phone" className="text-sm font-medium">Nomor Telepon</Label>
              <Input 
                id="phone" 
                value={formData.phone} 
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} 
                placeholder="+62 812 3456 7890" 
                className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
              />
            </div>
            <div className="space-y-2 group">
              <Label htmlFor="location" className="text-sm font-medium">Lokasi</Label>
              <Input 
                id="location" 
                value={formData.location} 
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} 
                placeholder="Jakarta, Indonesia" 
                className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">Bio/Deskripsi Singkat</Label>
            <Textarea 
              id="bio" 
              value={formData.bio} 
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))} 
              placeholder="Ceritakan tentang diri Anda..." 
              rows={3} 
              className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
            />
          </div>
          <div className="space-y-2">
            <PhotoUpload
              value={formData.profileImageUrl || null}
              onChange={(url) => setFormData(prev => ({ ...prev, profileImageUrl: url || "" }))}
              label="Foto Profil"
              description="Upload foto profil untuk ditampilkan di portfolio (opsional)"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-l-blue-500/50">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/20">
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            Keahlian
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex gap-2">
            <Input 
              value={newSkill} 
              onChange={(e) => setNewSkill(e.target.value)} 
              placeholder="Tambahkan keahlian (tekan Enter)..." 
              onKeyPress={(e) => e.key === 'Enter' && addSkill()} 
              className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
            />
            <Button 
              onClick={addSkill} 
              size="sm" 
              className="transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="flex items-center gap-1 transition-all duration-200 hover:scale-105 hover:shadow-md animate-in fade-in-0 slide-in-from-bottom-2"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 hover:text-destructive transition-colors focus:outline-none"
                  aria-label="Remove skill"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-l-green-500/50">
        <CardHeader className="bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/20">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">💼</span>
              Pengalaman Kerja
            </CardTitle>
            <Button 
              onClick={() => addDynamicItem('experiences', { title: '', company: '', duration: '', description: '' })} 
              size="sm" 
              variant="outline"
              className="transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4 mr-2" />Tambah
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {formData.experiences.map((exp, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2 relative bg-gradient-to-br from-background to-muted/20 transition-all duration-300 hover:shadow-md animate-in fade-in-0 slide-in-from-bottom-2">
              <Button 
                onClick={() => removeDynamicItem('experiences', index)} 
                size="sm" 
                variant="ghost" 
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive transition-all"
              >
                <X className="h-4 w-4" />
              </Button>
              <Input 
                placeholder="Posisi" 
                value={exp.title} 
                onChange={(e) => handleDynamicChange('experiences', index, 'title', e.target.value)} 
                className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
              />
              <Input 
                placeholder="Perusahaan" 
                value={exp.company} 
                onChange={(e) => handleDynamicChange('experiences', index, 'company', e.target.value)} 
                className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                 <Label className="text-xs">Tahun Mulai</Label>
                  <Input 
                    type="number"
                    placeholder="Contoh: 2020" 
                    value={(() => {
                      const parts = exp.duration.split(' - ');
                      return parts[0] && !isNaN(parseInt(parts[0])) ? parts[0] : '';
                    })()} 
                    onChange={(e) => {
                      const start = e.target.value;
                      const parts = exp.duration.split(' - ');
                      const end = parts[1] || '';
                      
                      let newDuration = start;
                      if (end) newDuration += ` - ${end}`;
                      
                      handleDynamicChange('experiences', index, 'duration', newDuration);
                    }} 
                    className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Tahun Selesai</Label>
                  <div className="flex flex-col gap-2">
                    <Input 
                      type="number"
                      placeholder="Contoh: 2022" 
                      value={(() => {
                        const parts = exp.duration.split(' - ');
                        return parts[1] && parts[1] !== 'Saat Ini' && !isNaN(parseInt(parts[1])) ? parts[1] : '';
                      })()} 
                      disabled={exp.duration.includes('Saat Ini')}
                      onChange={(e) => {
                        const end = e.target.value;
                        const parts = exp.duration.split(' - ');
                        const start = parts[0] || '';
                        
                        let newDuration = start;
                        if (end) newDuration += ` - ${end}`;
                        
                        handleDynamicChange('experiences', index, 'duration', newDuration);
                      }} 
                      className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`exp-present-${index}`} 
                        checked={exp.duration.includes('Saat Ini')}
                        onCheckedChange={(checked) => {
                          const parts = exp.duration.split(' - ');
                          const start = parts[0] || '';
                          
                          let newDuration = start;
                          if (checked) {
                            newDuration += ' - Saat Ini';
                          } else {
                            // If unchecking, clear the end part or leave it empty to be filled
                          }
                          
                          handleDynamicChange('experiences', index, 'duration', newDuration);
                        }}
                      />
                      <label
                        htmlFor={`exp-present-${index}`}
                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Sampai Saat Ini
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <Textarea 
                placeholder="Deskripsi pekerjaan dan pencapaian..." 
                value={exp.description} 
                onChange={(e) => handleDynamicChange('experiences', index, 'description', e.target.value)} 
                className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-l-purple-500/50">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/20">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              Pendidikan
            </CardTitle>
            <Button 
              onClick={() => addDynamicItem('education', { degree: '', institution: '', year: '' })} 
              size="sm" 
              variant="outline"
              className="transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4 mr-2" />Tambah
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {formData.education.map((edu, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2 relative bg-gradient-to-br from-background to-muted/20 transition-all duration-300 hover:shadow-md animate-in fade-in-0 slide-in-from-bottom-2">
              <Button 
                onClick={() => removeDynamicItem('education', index)} 
                size="sm" 
                variant="ghost" 
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive transition-all"
              >
                <X className="h-4 w-4" />
              </Button>
              <Input 
                placeholder="Gelar/Jurusan" 
                value={edu.degree} 
                onChange={e => handleDynamicChange('education', index, 'degree', e.target.value)} 
                className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
              />
              <Input 
                placeholder="Institusi" 
                value={edu.institution} 
                onChange={e => handleDynamicChange('education', index, 'institution', e.target.value)} 
                className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                 <Label className="text-xs">Tahun Mulai</Label>
                  <Input 
                    type="number"
                    placeholder="Contoh: 2018" 
                    value={(() => {
                      const parts = edu.year.split(' - ');
                      return parts[0] && !isNaN(parseInt(parts[0])) ? parts[0] : '';
                    })()} 
                    onChange={(e) => {
                      const start = e.target.value;
                      const parts = edu.year.split(' - ');
                      const end = parts[1] || '';
                      
                      let newDuration = start;
                      if (end) newDuration += ` - ${end}`;
                      
                      handleDynamicChange('education', index, 'year', newDuration);
                    }} 
                    className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Tahun Selesai</Label>
                  <div className="flex flex-col gap-2">
                    <Input 
                      type="number"
                      placeholder="Contoh: 2022" 
                      value={(() => {
                        const parts = edu.year.split(' - ');
                        return parts[1] && parts[1] !== 'Saat Ini' && !isNaN(parseInt(parts[1])) ? parts[1] : '';
                      })()} 
                      disabled={edu.year.includes('Saat Ini')}
                      onChange={(e) => {
                        const end = e.target.value;
                        const parts = edu.year.split(' - ');
                        const start = parts[0] || '';
                        
                        let newDuration = start;
                        if (end) newDuration += ` - ${end}`;
                        
                        handleDynamicChange('education', index, 'year', newDuration);
                      }} 
                      className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`edu-present-${index}`} 
                        checked={edu.year.includes('Saat Ini')}
                        onCheckedChange={(checked) => {
                          const parts = edu.year.split(' - ');
                          const start = parts[0] || '';
                          
                          let newDuration = start;
                          if (checked) {
                            newDuration += ' - Saat Ini';
                          } else {
                             // If uncheck, just keep start year or standard logic
                             newDuration = start;
                          }
                          handleDynamicChange('education', index, 'year', newDuration);
                        }}
                      />
                      <label
                        htmlFor={`edu-present-${index}`}
                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Sampai Saat Ini
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-l-orange-500/50">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-950/20">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🛠️</span>
              Proyek
            </CardTitle>
            <Button 
              onClick={() => addDynamicItem('projects', { name: '', description: '', technologies: '', link: '' })} 
              size="sm" 
              variant="outline"
              className="transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4 mr-2" />Tambah
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {formData.projects.map((project, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2 relative bg-gradient-to-br from-background to-muted/20 transition-all duration-300 hover:shadow-md animate-in fade-in-0 slide-in-from-bottom-2">
              <Button 
                onClick={() => removeDynamicItem('projects', index)} 
                size="sm" 
                variant="ghost" 
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive transition-all"
              >
                <X className="h-4 w-4" />
              </Button>
              <Input 
                placeholder="Nama Proyek" 
                value={project.name} 
                onChange={e => handleDynamicChange('projects', index, 'name', e.target.value)} 
                className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
              />
              <Input 
                placeholder="Teknologi (pisahkan dengan koma)" 
                value={project.technologies} 
                onChange={e => handleDynamicChange('projects', index, 'technologies', e.target.value)} 
                className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
              />
              <Input 
                placeholder="URL Proyek (opsional)" 
                value={project.link} 
                onChange={e => handleDynamicChange('projects', index, 'link', e.target.value)} 
                className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
              />
              <Textarea 
                placeholder="Deskripsi proyek..." 
                value={project.description} 
                onChange={e => handleDynamicChange('projects', index, 'description', e.target.value)} 
                className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
              />
            </div>
          ))}
        </CardContent>
      </Card>


      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-l-pink-500/50">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-transparent dark:from-pink-950/20">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              Bahasa
            </CardTitle>
            <Button 
              onClick={() => addDynamicItem('languages', { name: '', level: 'Menengah' })} 
              size="sm" 
              variant="outline"
              className="transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4 mr-2" />Tambah
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {formData.languages.map((lang, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4 relative bg-gradient-to-br from-background to-muted/20 transition-all duration-300 hover:shadow-md animate-in fade-in-0 slide-in-from-bottom-2">
              <Button 
                onClick={() => removeDynamicItem('languages', index)} 
                size="sm" 
                variant="ghost" 
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive transition-all"
              >
                <X className="h-4 w-4" />
              </Button>
              <Input 
                placeholder="Nama Bahasa (contoh: Indonesia, Inggris)" 
                value={lang.name} 
                onChange={e => handleDynamicChange('languages', index, 'name', e.target.value)} 
                className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
              />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Tingkat Kemahiran</Label>
                  <span className="font-bold text-primary text-sm px-3 py-1 bg-primary/10 rounded-full transition-all">{lang.level}</span>
                </div>
                <Slider
                  value={[
                    lang.level === 'Basic' ? 1 :
                    lang.level === 'Intermediate' ? 2 :
                    lang.level === 'Advanced' ? 3 : 4
                  ]}
                  onValueChange={(value) => {
                    const newLevel = 
                      value[0] === 1 ? 'Basic' :
                      value[0] === 2 ? 'Intermediate' :
                      value[0] === 3 ? 'Advanced' : 'Native/Fluent';
                    handleDynamicChange('languages', index, 'level', newLevel);
                  }}
                  min={1}
                  max={4}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Basic</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Native/Fluent</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Pilih Template</CardTitle></CardHeader>
        <CardContent>
          <Select value={formData.templateId} onValueChange={(value) => setFormData(prev => ({ ...prev, templateId: value }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="minimalist">Minimalist</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="dark">Dark Mode</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center flex-wrap">
        <Button 
          onClick={handlePreviewToggle} 
          size="lg" 
          variant="outline"
          className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
        >
          <Eye className="mr-2 h-5 w-5" />
          {showPreview ? "Sembunyikan Preview" : "Tampilkan Preview"}
        </Button>
        <Button 
          onClick={handleExportPDF} 
          size="lg" 
          disabled={isExporting}
          className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg disabled:hover:scale-100"
        >
          {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
          {isExporting ? "Mengekspor..." : "Export PDF"}
        </Button>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-[850px] h-[95vh] p-0 flex flex-col overflow-hidden">
          <DialogHeader className="p-4 pb-2 shrink-0">
            <DialogTitle>Preview Portfolio</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto w-full">
            <div id="portfolio-preview" className="flex justify-center pb-4 min-h-min">
              {renderPreview()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
