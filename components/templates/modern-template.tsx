"use client";

import Image from "next/image"
import { Mail, Phone, MapPin, Globe, Star } from "lucide-react"

interface ModernTemplateProps {
  portfolio: any;
}

export function ModernTemplate({ portfolio }: ModernTemplateProps) {
  const { 
    fullName, email, phone, location, bio, profileImageUrl, 
    skills, experiences, education, projects, 
    socialLinks, certifications, languages 
  } = portfolio;

  // Colors from the image
  const colors = {
    darkNavy: '#1a2350', // Sidebar & Text
    lightBlue: '#dfe6fe', // Top Header Background
    accentBlue: '#5a7cfd', // Buttons / Bars
    lightAccent: '#8ca1fc', // Light parts
    white: '#ffffff',
    textGrey: '#4b5563'
  };

  const pageWidth = 595;
  const pageHeight = 842;
  const sidebarWidth = 200;

  return (
    <div 
      className="portfolio-print font-sans"
      style={{
        width: `${pageWidth}px`,
        height: `${pageHeight}px`,
        margin: '0 auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: colors.white,
        display: 'flex', // Use flexbox for layout stability
      }}
    >
      {/* ==================== LAYOUT STRUCTURE ==================== */}
      
      {/* 1. LEFT COLUMN (SIDEBAR) */}
      <aside 
        style={{
          width: `${sidebarWidth}px`,
          backgroundColor: colors.darkNavy,
          height: '100%',
          position: 'relative',
          zIndex: 20, // Above main content background
          borderTopRightRadius: '100px', // The curve
          // We need a wrapper for the content to ensure it respects the curve if needed, 
          // or just padding. 
          marginTop: '0px',
        }}
      >
        {/* Profile Picture Overlay - Positioned relative to Sidebar */}
        <div 
          style={{
            position: 'absolute',
            top: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            width: '130px',
            height: '130px',
          }}
        >
          {/* Decorative Ring segments */}
           <div 
             style={{
               position: 'absolute',
               inset: '-6px',
               borderRadius: '50%',
               border: `6px solid ${colors.accentBlue}`,
               borderBottomColor: 'transparent',
               borderLeftColor: 'transparent',
               transform: 'rotate(-45deg)',
               zIndex: 29
             }}
           />

          <div 
            className="rounded-full overflow-hidden bg-white"
            style={{ 
              width: '100%', 
              height: '100%',
              border: '6px solid white',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            }}
          >
            <Image
              src={profileImageUrl || "/placeholder-user.jpg"}
              alt="Foto Profil"
              width={130}
              height={130}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Sidebar Content */}
        <div style={{ paddingTop: '200px', paddingLeft: '20px', paddingRight: '15px', color: 'white' }}>
          
           {/* HUBUNGI SAYA */}
           <div className="mb-6">
              <div 
                style={{ 
                  backgroundColor: colors.accentBlue,
                  padding: '5px 15px',
                  borderTopRightRadius: '15px',
                  borderBottomRightRadius: '15px',
                  display: 'inline-block',
                  marginBottom: '10px',
                  fontWeight: 'bold',
                  fontSize: '9px',
                  letterSpacing: '1px',
                  color: 'white',
                  width: '90%'
                }}
              >
                HUBUNGI SAYA
              </div>
              
              <div style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={10} className="shrink-0 text-white" />
                    <span style={{ fontSize: '8px' }}>{phone}</span>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-2">
                    <Mail size={10} className="shrink-0 text-white" />
                    <span style={{ fontSize: '8px', wordBreak: 'break-all' }}>{email}</span>
                  </div>
                )}
                {socialLinks?.website && (
                  <div className="flex items-center gap-2">
                    <Globe size={10} className="shrink-0 text-white" />
                    <span style={{ fontSize: '8px', wordBreak: 'break-all' }}>{socialLinks.website.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={10} className="shrink-0 text-white" />
                    <span style={{ fontSize: '8px' }}>{location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* BAHASA */}
            {languages && languages.length > 0 && (
              <div className="mb-6">
                <div 
                  style={{ 
                    backgroundColor: colors.accentBlue,
                    padding: '5px 15px',
                    borderTopRightRadius: '15px',
                    borderBottomRightRadius: '15px',
                    display: 'inline-block',
                    marginBottom: '10px',
                    fontWeight: 'bold',
                    fontSize: '9px',
                    letterSpacing: '1px',
                    color: 'white',
                    width: '90%'
                  }}
                >
                  BAHASA
                </div>
                <div style={{ paddingLeft: '10px', paddingRight: '5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {languages.slice(0, 3).map((lang: any, index: number) => (
                    <div key={index}>
                      <span style={{ fontSize: '8px', display: 'block', marginBottom: '2px' }}>{lang.name}</span>
                      <div style={{ width: '100%', height: '4px', backgroundColor: '#1e3a8a', borderRadius: '10px', overflow: 'hidden' }}>
                        <div 
                          style={{ 
                            height: '100%', 
                            width: lang.level === 'Native/Fluent' || lang.level === 'Native' || lang.level === 'Fasih' ? '95%' : 
                                   lang.level === 'Advanced' || lang.level === 'Mahir' ? '75%' : 
                                   lang.level === 'Intermediate' || lang.level === 'Menengah' ? '50%' : '25%',
                            background: 'linear-gradient(90deg, #dbeafe 0%, #bfdbfe 50%, #ffffff 100%)',
                            borderRadius: '10px'
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* KEMAMPUAN / SKILLS */}
            {skills && skills.length > 0 && (
              <div className="mb-6">
                 <div 
                  style={{ 
                    backgroundColor: colors.accentBlue,
                    padding: '5px 15px',
                    borderTopRightRadius: '15px',
                    borderBottomRightRadius: '15px',
                    display: 'inline-block',
                    marginBottom: '10px',
                    fontWeight: 'bold',
                    fontSize: '9px',
                    letterSpacing: '1px',
                    color: 'white',
                    width: '90%'
                  }}
                >
                  KEMAMPUAN
                </div>
                <div style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {skills.slice(0, 8).map((skill: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                       <div style={{ width: '4px', height: '4px', backgroundColor: colors.accentBlue, flexShrink: 0 }} />
                       <span style={{ fontSize: '8px' }}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </aside>

      {/* 2. RIGHT COLUMN (MAIN CONTENT) */}
      <main className="flex-1 flex flex-col relative z-10">
        
        {/* Header Background Bar */}
        <div 
          style={{
             height: '200px',
             backgroundColor: colors.lightBlue,
             width: '100%',
             position: 'absolute',
             top: 0,
             left: 0,
             zIndex: -1,
          }} 
        />

        {/* Name Header Section */}
        <div style={{ paddingTop: '60px', paddingLeft: '30px', paddingRight: '20px', minHeight: '180px' }}>
           <h1 
              style={{ 
                color: colors.darkNavy, 
                fontSize: '34px', 
                fontWeight: '900', 
                lineHeight: '1.2',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {fullName?.toUpperCase() || 'NAMA LENGKAP'}
            </h1>
        </div>

        {/* Title Bar - Full Width relative to Right Column */}
        <div 
           style={{ 
              backgroundColor: colors.accentBlue,
              width: '100%',
              padding: '10px 0 10px 30px', 
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: '3px',
              fontSize: '10px',
              textTransform: 'uppercase',
              marginBottom: '30px',
            }}
          >
            {experiences && experiences.length > 0 && experiences[0]?.title 
              ? experiences[0].title 
              : 'LULUSAN BARU'}
        </div>

        {/* Main Content Sections */}
        <div style={{ paddingLeft: '30px', paddingRight: '25px', flex: 1 }}>
             
             {/* DATA PRIBADI */}
             <section className="mb-6">
                <div 
                   style={{ 
                     display: 'inline-flex',
                     backgroundColor: colors.darkNavy,
                     color: 'white',
                     padding: '6px 25px 6px 15px',
                     fontWeight: 'bold',
                     fontSize: '9px',
                     textTransform: 'uppercase',
                     borderTopRightRadius: '15px',
                     borderBottomRightRadius: '15px',
                     borderBottomLeftRadius: '4px',
                     marginBottom: '10px'
                   }}
                >
                  Tentang Saya
                </div>
                <div className="flex gap-3">
                   <div style={{ width: '4px', paddingTop: '6px', display: 'flex', justifyContent: 'center' }}>
                      <div style={{ width: '6px', height: '6px', backgroundColor: colors.accentBlue }} />
                   </div>
                   <p style={{ fontSize: '9px', lineHeight: '1.5', color: colors.textGrey, flex: 1 }}>
                      {bio || 'Saya adalah seorang profesional yang berdedikasi tinggi dan selalu ingin belajar hal baru dalam dunia kerja.'}
                   </p>
                </div>
             </section>

             {/* PENDIDIKAN */}
             {education && education.length > 0 && (
               <section className="mb-6">
                 <div 
                   style={{ 
                     display: 'inline-flex',
                     backgroundColor: colors.darkNavy,
                     color: 'white',
                     padding: '6px 25px 6px 15px',
                     fontWeight: 'bold',
                     fontSize: '9px',
                     textTransform: 'uppercase',
                     borderTopRightRadius: '15px',
                     borderBottomRightRadius: '15px',
                     borderBottomLeftRadius: '4px',
                     marginBottom: '10px'
                   }}
                  >
                    PENDIDIKAN
                  </div>
                  <div className="flex flex-col gap-4">
                     {education.slice(0, 2).map((edu: any, index: number) => (
                        <div key={index} className="flex gap-3">
                           {/* Marker */}
                           <div style={{ paddingTop: '5px' }}>
                              <div style={{ width: '6px', height: '6px', backgroundColor: colors.accentBlue }} />
                           </div>
                           <div style={{ flex: 1 }}>
                              <h3 style={{ color: colors.darkNavy, fontWeight: 'bold', fontSize: '9px' }}>{edu.institution}</h3>
                              <p style={{ color: colors.darkNavy, fontSize: '8px', fontWeight: 'bold', marginBottom: '3px' }}>
                                 {edu.year} | {edu.degree}
                              </p>
                              {edu.description && (
                                 <div style={{ fontSize: '8px', color: colors.textGrey }}>
                                    {edu.description.split('\n').filter((l: string) => l.trim()).slice(0, 2).map((item: string, i: number) => (
                                       <div key={i} className="mb-0.5">• {item.trim()}</div>
                                    ))}
                                 </div>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </section>
             )}

             {/* PENGALAMAN KERJA */}
             {experiences && experiences.length > 0 && (
               <section className="mb-1">
                 <div 
                   style={{ 
                     display: 'inline-flex',
                     backgroundColor: colors.darkNavy,
                     color: 'white',
                     padding: '6px 25px 6px 15px',
                     fontWeight: 'bold',
                     fontSize: '9px',
                     textTransform: 'uppercase',
                     borderTopRightRadius: '15px',
                     borderBottomRightRadius: '15px',
                     borderBottomLeftRadius: '4px',
                     marginBottom: '10px'
                   }}
                  >
                    PENGALAMAN KERJA
                  </div>
                  <div className="flex flex-col gap-4">
                     {experiences.slice(0, 2).map((exp: any, index: number) => (
                        <div key={index} className="flex gap-3">
                           <div style={{ paddingTop: '5px' }}>
                              <div style={{ width: '6px', height: '6px', backgroundColor: colors.accentBlue }} />
                           </div>
                           <div style={{ flex: 1 }}>
                              <h3 style={{ color: colors.darkNavy, fontWeight: 'bold', fontSize: '9px' }}>{exp.duration} | {exp.company}</h3>
                              <p style={{ color: colors.darkNavy, fontSize: '8px', fontWeight: 'bold', marginBottom: '3px' }}>
                                 {exp.title}
                              </p>
                              {exp.description && (
                                  <div style={{ fontSize: '8px', color: colors.textGrey }}>
                                    {exp.description.split('\n').filter((l: string) => l.trim()).slice(0, 3).map((item: string, i: number) => (
                                       <div key={i} className="mb-0.5">• {item.trim()}</div>
                                    ))}
                                 </div>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </section>
             )}
        </div>
        
        {/* Bottom Bar Pattern - Just a color accent at bottom */}
         <div 
          style={{
            height: '25px',
            backgroundColor: colors.accentBlue,
            width: '100%',
            marginTop: 'auto'
          }}
        />

      </main>
    </div>
  )
}
