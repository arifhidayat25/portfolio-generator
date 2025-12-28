"use client";

import { Mail, Phone, MapPin } from "lucide-react"

interface MinimalistTemplateProps {
  portfolio: any;
}

export function MinimalistTemplate({ portfolio }: MinimalistTemplateProps) {
  const { 
    fullName, email, phone, location, bio, 
    skills, experiences, education, projects, 
    certifications, languages 
  } = portfolio;

  // Colors from reference image
  const colors = {
    navy: '#2D3E7E',      // Dark navy blue for headers
    purple: '#7B68EE',    // Purple accent for lines
    text: '#000000',      // Black for content
    lightGray: '#666666'  // Gray for secondary text
  };

  return (
    <div 
      id="portfolio-preview"
      style={{
        width: '794px',
        minHeight: '1123px',
        backgroundColor: 'white',
        padding: '48px 60px',
        fontFamily: 'Arial, sans-serif',
        color: colors.text,
        position: 'relative'
      }}
    >


      {/* Header Section */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: colors.navy,
            margin: 0,
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {fullName || 'NAMA LENGKAP'}
          </h1>
          <p style={{
            fontSize: '14px',
            color: colors.text,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {experiences && experiences[0]?.title ? experiences[0].title : 'POSISI/JABATAN'}
          </p>
        </div>
        
        {/* Contact Info */}
        <div style={{ 
          textAlign: 'right', 
          fontSize: '11px',
          color: colors.text,
          lineHeight: '1.6',
          paddingLeft: '24px',
          borderLeft: `1px solid ${colors.lightGray}`
        }}>
          {email && <div>{email}</div>}
          {phone && <div>{phone}</div>}
          {location && <div>{location}</div>}
        </div>
      </div>

      {/* Bio / Ringkasan */}
      {bio && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: colors.navy,
            textTransform: 'uppercase',
            marginBottom: '8px',
            letterSpacing: '1px'
          }}>
            RINGKASAN
          </h2>
          <div style={{ 
            height: '2px', 
            backgroundColor: colors.purple, 
            marginBottom: '12px',
            width: '100%'
          }} />
          <p style={{
            fontSize: '11px',
            lineHeight: '1.8',
            color: colors.text,
            margin: 0,
            textAlign: 'justify'
          }}>
            {bio}
          </p>
        </section>
      )}

      {/* Pengalaman */}
      {experiences && experiences.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: colors.navy,
            textTransform: 'uppercase',
            marginBottom: '8px',
            letterSpacing: '1px'
          }}>
            PENGALAMAN
          </h2>
          <div style={{ 
            height: '2px', 
            backgroundColor: colors.purple, 
            marginBottom: '12px',
            width: '100%'
          }} />
          {experiences.map((exp: any, index: number) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '4px' }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: colors.text,
                  margin: 0,
                  textTransform: 'uppercase'
                }}>
                  {exp.company}
                </h3>
                <p style={{
                  fontSize: '11px',
                  color: colors.text,
                  margin: 0,
                  marginBottom: '6px'
                }}>
                  {exp.title} ({exp.duration})
                </p>
              </div>
              {exp.description && (
                <ul style={{
                  margin: 0,
                  paddingLeft: '18px',
                  fontSize: '11px',
                  lineHeight: '1.6',
                  color: colors.text
                }}>
                  {exp.description.split('\n').filter((line: string) => line.trim()).map((line: string, i: number) => (
                    <li key={i} style={{ marginBottom: '2px' }}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Pendidikan */}
      {education && education.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: colors.navy,
            textTransform: 'uppercase',
            marginBottom: '8px',
            letterSpacing: '1px'
          }}>
            PENDIDIKAN
          </h2>
          <div style={{ 
            height: '2px', 
            backgroundColor: colors.purple, 
            marginBottom: '12px',
            width: '100%'
          }} />
          {education.map((edu: any, index: number) => (
            <div key={index} style={{ marginBottom: '12px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: 'bold',
                color: colors.text,
                margin: 0,
                textTransform: 'uppercase'
              }}>
                {edu.institution} ({edu.year})
              </h3>
              <p style={{
                fontSize: '11px',
                color: colors.text,
                margin: 0
              }}>
                {edu.degree}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Sertifikasi */}
      {certifications && certifications.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: colors.navy,
            textTransform: 'uppercase',
            marginBottom: '8px',
            letterSpacing: '1px'
          }}>
            SERTIFIKASI
          </h2>
          <div style={{ 
            height: '2px', 
            backgroundColor: colors.purple, 
            marginBottom: '12px',
            width: '100%'
          }} />
          <ul style={{
            margin: 0,
            paddingLeft: '18px',
            fontSize: '11px',
            lineHeight: '1.8',
            color: colors.text
          }}>
            {certifications.map((cert: any, index: number) => (
              <li key={index} style={{ marginBottom: '4px' }}>
                {cert.name} - {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Kemampuan / Skills */}
      {skills && skills.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: colors.navy,
            textTransform: 'uppercase',
            marginBottom: '8px',
            letterSpacing: '1px'
          }}>
            KEMAMPUAN
          </h2>
          <div style={{ 
            height: '2px', 
            backgroundColor: colors.purple, 
            marginBottom: '12px',
            width: '100%'
          }} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            fontSize: '11px',
            color: colors.text
          }}>
            {skills.map((skill: string, index: number) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '6px' }}>●</span>
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: colors.navy,
            textTransform: 'uppercase',
            marginBottom: '8px',
            letterSpacing: '1px'
          }}>
            BAHASA
          </h2>
          <div style={{ 
            height: '2px', 
            backgroundColor: colors.purple, 
            marginBottom: '12px',
            width: '100%'
          }} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            fontSize: '11px',
            color: colors.text
          }}>
            {languages.map((lang: any, index: number) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '6px' }}>●</span>
                {lang.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: colors.navy,
            textTransform: 'uppercase',
            marginBottom: '8px',
            letterSpacing: '1px'
          }}>
            PROYEK
          </h2>
          <div style={{ 
            height: '2px', 
            backgroundColor: colors.purple, 
            marginBottom: '12px',
            width: '100%'
          }} />
          <ul style={{
            margin: 0,
            paddingLeft: '18px',
            fontSize: '11px',
            lineHeight: '1.8',
            color: colors.text
          }}>
            {projects.map((project: any, index: number) => (
              <li key={index} style={{ marginBottom: '6px' }}>
                <strong>{project.name}</strong>
                {project.technologies && ` - ${project.technologies}`}
                {project.description && (
                  <div style={{ marginTop: '4px', marginLeft: 0 }}>
                    {project.description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
