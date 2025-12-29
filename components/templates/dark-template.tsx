"use client";

import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

interface DarkTemplateProps {
  portfolio: any;
}

export function DarkTemplate({ portfolio }: DarkTemplateProps) {
  const { 
    fullName, email, phone, location, bio, profileImageUrl,
    skills, experiences, education, languages 
  } = portfolio;

  // Colors derived from the reference image
  const colors = {
    bg: '#1a1a1a',           // Dark background for whole page
    textWhite: '#FFFFFF',
    textGray: '#CCCCCC',     // For standard text
    gold: '#E3C565',         // For headers and accents
    goldTextBold: '#1a1a1a', // Text color inside gold bars
    divider: '#E3C565'       // Thin lines
  };

  const SidebarHeader = ({ title }: { title: string }) => (
    <div style={{
      backgroundColor: colors.gold,
      padding: '8px 4px',
      marginBottom: '16px',
      marginTop: '20px',
      textAlign: 'center'
    }}>
      <h3 style={{
        margin: 0,
        color: colors.goldTextBold,
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        {title}
      </h3>
    </div>
  );

  return (
    <div 
      className="portfolio-print"
      style={{
        width: '595px',
        height: '842px',
        backgroundColor: colors.bg,
        color: colors.textGray,
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        fontSize: '10px',
        lineHeight: '1.4'
      }}
    >
      {/* Decorative Curves (SVG) */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '280px', height: '140px', zIndex: 0 }}>
        <svg  viewBox="0 0 400 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
           <path d="M0,0 L400,0 L400,200 C200,100 100,50 0,0 Z" fill={colors.gold} opacity="0.8" />
           <path d="M50,0 L400,0 L400,150 C250,80 150,30 50,0 Z" fill="#b09540" opacity="0.5" />
        </svg>
      </div>

       <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '100px', zIndex: 0 }}>
        <svg viewBox="0 0 300 150" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
           <path d="M0,150 L300,150 L0,0 C10,120 50,140 0,150 Z" fill={colors.gold} opacity="0.8" />
        </svg>
      </div>


      {/* LEFT COLUMN (SIDEBAR) */}
      <div style={{
        width: '32%',
        padding: '20px 14px',
        paddingTop: '24px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1
      }}>
        {/* Profile Image */}
        <div style={{
          width: '100%',
          aspectRatio: '1/1',
          marginBottom: '20px',
          backgroundColor: '#333',
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${colors.gold}`
        }}>
           {profileImageUrl && (
            <Image
              src={profileImageUrl}
              alt="Profile"
              fill
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>

        {/* DATA DIRI Section - Removed as these fields are not in the form */}
        {/* Users can only input: name, email, phone, location, bio, skills, experience, education */}


        {/* KONTAK Section */}
        <SidebarHeader title="KONTAK" />
        <div style={{ paddingLeft: '4px', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <div style={{ color: colors.gold }}><Phone size={14} fill={colors.gold} /></div>
                 <span>{phone}</span>
              </div>
            )}
            {email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <div style={{ color: colors.gold }}><Mail size={14} fill={colors.gold} /></div>
                 <span style={{ wordBreak: 'break-all' }}>{email}</span>
              </div>
            )}
            {location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <div style={{ color: colors.gold }}><MapPin size={14} fill={colors.gold} /></div>
                 <span>{location}</span>
              </div>
            )}
        </div>

        {/* BAHASA Section */}
        {languages && languages.length > 0 && (
          <>
            <SidebarHeader title="BAHASA" />
            <div style={{ paddingLeft: '4px', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
               {languages.map((lang: any, index: number) => (
                 <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span>{lang.name}</span>
                   <span style={{ fontSize: '10px', color: colors.gold }}>{lang.level}</span>
                 </div>
               ))}
            </div>
          </>
        )}
      </div>

      {/* RIGHT COLUMN (MAIN CONTENT) */}
      <div style={{
        flex: 1,
        padding: '35px 25px',
        paddingRight: '20px',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
         {/* Name Header */}
         <div style={{ marginBottom: '25px', marginTop: '12px' }}>
           <h1 style={{
             fontSize: '24px',
             color: colors.textWhite,
             fontWeight: 'bold',
             letterSpacing: '1px',
             textTransform: 'uppercase',
             margin: 0,
             marginBottom: '8px',
             lineHeight: '1.1'
           }}>
             {(() => {
               if (!fullName) return "";
               const words = fullName.split(' ');
               // If 3+ words: first word on line 1, rest on line 2
               if (words.length >= 3) {
                 return (
                   <>
                     <div>{words[0]}</div>
                     <div>{words.slice(1).join(' ')}</div>
                   </>
                 );
               } else {
                 // 2 words or less: display inline
                 return fullName;
               }
             })()}
           </h1>
           <p style={{
             fontSize: '16px',
             color: colors.gold,
             fontStyle: 'italic',
             margin: 0
           }}>
             {experiences && experiences[0]?.title ? experiences[0].title : 'Lulusan Baru'}
           </p>
         </div>

         {/* Sections Map */}
         
         {/* DATA PRIBADI / TENTANG SAYA */}
         <div style={{ marginBottom: '20px' }}>
           <h2 style={{
             fontSize: '11px',
             color: colors.textWhite,
             fontWeight: 'bold',
             textTransform: 'uppercase',
             borderBottom: `1px solid ${colors.gold}`,
             paddingBottom: '6px',
             marginBottom: '10px',
             letterSpacing: '1px'
           }}>
             Tentang Saya
           </h2>
           <div style={{ display: 'flex', gap: '8px' }}>
             <div style={{ width: '4px', paddingTop: '4px', display: 'flex', justifyContent: 'center' }}>
               <div style={{ width: '5px', height: '5px', backgroundColor: colors.gold }} />
             </div>
             <p style={{ margin: 0, textAlign: 'justify', flex: 1 }}>
               {bio || 'Saya adalah seorang profesional yang berdedikasi tinggi dan selalu ingin belajar hal baru dalam dunia kerja.'}
             </p>
           </div>
         </div>

         {/* PENDIDIKAN */}
         {education && education.length > 0 && (
           <div style={{ marginBottom: '30px' }}>
              <h2 style={{
               fontSize: '14px',
               color: colors.textWhite,
               fontWeight: 'bold',
               textTransform: 'uppercase',
               borderBottom: `1px solid ${colors.gold}`,
               paddingBottom: '8px',
               marginBottom: '12px',
               letterSpacing: '1px'
             }}>
               PENDIDIKAN
             </h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {education.map((edu: any, i: number) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ maxWidth: '75%' }}>
                      <div style={{ color: colors.textWhite, fontSize: '12px', fontWeight: 'bold' }}>{edu.degree} {edu.institution}</div>
                    </div>
                    <div style={{ color: colors.gold, fontWeight: 'bold' }}>{edu.year}</div>
                  </div>
               ))}
             </div>
           </div>
         )}

         {/* PENGALAMAN KERJA */}
         {experiences && experiences.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{
               fontSize: '14px',
               color: colors.textWhite,
               fontWeight: 'bold',
               textTransform: 'uppercase',
               borderBottom: `1px solid ${colors.gold}`,
               paddingBottom: '8px',
               marginBottom: '12px',
               letterSpacing: '1px'
             }}>
               PENGALAMAN KERJA
             </h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {experiences.map((exp: any, i: number) => (
                  <div key={i}>
                    <div style={{ color: colors.textWhite, fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
                      {exp.company}
                    </div>
                     {exp.description && (
                       <ul style={{ margin: 0, paddingLeft: '18px', listStyleType: 'disc' }}>
                         {exp.description.split('\n').map((line: string, j: number) => (
                           line.trim() && <li key={j} style={{ marginBottom: '2px' }}>{line.trim()}</li>
                         ))}
                       </ul>
                     )}
                  </div>
                ))}
             </div>
            </div>
         )}

         {/* KEMAMPUAN */}
         {skills && skills.length > 0 && (
            <div>
              <h2 style={{
               fontSize: '14px',
               color: colors.textWhite,
               fontWeight: 'bold',
               textTransform: 'uppercase',
               borderBottom: `1px solid ${colors.gold}`,
               paddingBottom: '8px',
               marginBottom: '12px',
               letterSpacing: '1px'
             }}>
               KEMAMPUAN
             </h2>
             <ul style={{ margin: 0, paddingLeft: '18px', listStyleType: 'disc' }}>
               {skills.map((skill: string, index: number) => (
                 <li key={index} style={{ marginBottom: '2px' }}>{skill}</li>
               ))}
             </ul>
            </div>
         )}

      </div>
    </div>
  )
}
