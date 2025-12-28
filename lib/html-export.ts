import type { Portfolio } from './portfolio';

/**
 * HTMLExporter - Utility untuk mengekspor portfolio ke HTML file
 */
export class HTMLExporter {
  /**
   * Generate complete HTML document dari portfolio data
   */
  static generateHTML(portfolio: Portfolio): string {
    // Import template components - kita akan render manual sesuai template_id
    const templateHTML = this.renderTemplate(portfolio);
    
    // Generate complete HTML document
    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portfolio ${portfolio.full_name}">
  <title>${portfolio.title || `Portfolio ${portfolio.full_name}`}</title>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
  </style>
</head>
<body>
  ${templateHTML}
</body>
</html>`;
  }

  /**
   * Render template sesuai template_id
   */
  private static renderTemplate(portfolio: Portfolio): string {
    const templateId = portfolio.template_id || 'minimalist';
    
    switch (templateId) {
      case 'modern':
        return this.renderModernTemplate(portfolio);
      case 'dark':
        return this.renderDarkTemplate(portfolio);
      case 'minimalist':
      default:
        return this.renderMinimalistTemplate(portfolio);
    }
  }

  /**
   * Render Minimalist Template
   */
  private static renderMinimalistTemplate(portfolio: Portfolio): string {
    const skills = portfolio.skills || [];
    const experiences = portfolio.experiences || [];
    const education = portfolio.education || [];
    const projects = portfolio.projects || [];
    const socialLinks = portfolio.social_links || {};

    return `
<div class="min-h-screen bg-white">
  <!-- Header -->
  <header class="bg-gray-50 border-b py-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">${this.escapeHtml(portfolio.full_name)}</h1>
      <p class="text-lg text-gray-600 mb-4">${this.escapeHtml(portfolio.bio || '')}</p>
      <div class="flex flex-wrap gap-4 text-sm text-gray-600">
        ${portfolio.email ? `<div class="flex items-center gap-2">📧 ${this.escapeHtml(portfolio.email)}</div>` : ''}
        ${portfolio.phone ? `<div class="flex items-center gap-2">📱 ${this.escapeHtml(portfolio.phone)}</div>` : ''}
        ${portfolio.location ? `<div class="flex items-center gap-2">📍 ${this.escapeHtml(portfolio.location)}</div>` : ''}
      </div>
      ${this.renderSocialLinks(socialLinks)}
    </div>
  </header>

  <main class="container mx-auto px-4 py-12 max-w-4xl">
    ${skills.length > 0 ? `
    <!-- Skills Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Keahlian</h2>
      <div class="flex flex-wrap gap-2">
        ${skills.map(skill => `<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">${this.escapeHtml(skill)}</span>`).join('')}
      </div>
    </section>
    ` : ''}

    ${experiences.length > 0 ? `
    <!-- Experience Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Pengalaman Kerja</h2>
      <div class="space-y-6">
        ${experiences.map(exp => `
        <div class="border-l-2 border-gray-200 pl-4">
          <h3 class="font-semibold text-lg text-gray-900">${this.escapeHtml(exp.title)}</h3>
          <p class="text-gray-600">${this.escapeHtml(exp.company)} • ${this.escapeHtml(exp.duration)}</p>
          <p class="text-gray-700 mt-2">${this.escapeHtml(exp.description)}</p>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    ${education.length > 0 ? `
    <!-- Education Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Pendidikan</h2>
      <div class="space-y-4">
        ${education.map(edu => `
        <div>
          <h3 class="font-semibold text-gray-900">${this.escapeHtml(edu.degree)}</h3>
          <p class="text-gray-600">${this.escapeHtml(edu.institution)} • ${this.escapeHtml(edu.year)}</p>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    ${projects.length > 0 ? `
    <!-- Projects Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Proyek</h2>
      <div class="grid gap-6">
        ${projects.map(project => `
        <div class="border rounded-lg p-6">
          <h3 class="font-semibold text-lg text-gray-900 mb-2">${this.escapeHtml(project.name)}</h3>
          <p class="text-sm text-gray-600 mb-2">${this.escapeHtml(project.technologies)}</p>
          <p class="text-gray-700 mb-2">${this.escapeHtml(project.description)}</p>
          ${project.link ? `<a href="${this.escapeHtml(project.link)}" target="_blank" class="text-blue-600 hover:underline text-sm">Lihat Proyek →</a>` : ''}
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}
  </main>

  <footer class="bg-gray-50 border-t py-8">
    <div class="container mx-auto px-4 text-center text-gray-600 text-sm">
      © ${new Date().getFullYear()} ${this.escapeHtml(portfolio.full_name)}. Dibuat dengan Portfolio Generator.
    </div>
  </footer>
</div>`;
  }

  /**
   * Render Modern Template
   */
  private static renderModernTemplate(portfolio: Portfolio): string {
    const skills = portfolio.skills || [];
    const experiences = portfolio.experiences || [];
    const education = portfolio.education || [];
    const projects = portfolio.projects || [];
    const socialLinks = portfolio.social_links || {};

    return `
<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
  <!-- Header -->
  <header class="bg-white shadow-sm py-16">
    <div class="container mx-auto px-4 max-w-5xl text-center">
      <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">${this.escapeHtml(portfolio.full_name)}</h1>
      <p class="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">${this.escapeHtml(portfolio.bio || '')}</p>
      <div class="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
        ${portfolio.email ? `<div class="flex items-center gap-2">📧 ${this.escapeHtml(portfolio.email)}</div>` : ''}
        ${portfolio.phone ? `<div class="flex items-center gap-2">📱 ${this.escapeHtml(portfolio.phone)}</div>` : ''}
        ${portfolio.location ? `<div class="flex items-center gap-2">📍 ${this.escapeHtml(portfolio.location)}</div>` : ''}
      </div>
      ${this.renderSocialLinks(socialLinks, 'justify-center')}
    </div>
  </header>

  <main class="container mx-auto px-4 py-12 max-w-5xl">
    ${skills.length > 0 ? `
    <!-- Skills Section -->
    <section class="mb-12 bg-white rounded-xl shadow-sm p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Keahlian</h2>
      <div class="flex flex-wrap gap-3">
        ${skills.map(skill => `<span class="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-medium">${this.escapeHtml(skill)}</span>`).join('')}
      </div>
    </section>
    ` : ''}

    ${experiences.length > 0 ? `
    <!-- Experience Section -->
    <section class="mb-12 bg-white rounded-xl shadow-sm p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Pengalaman Kerja</h2>
      <div class="space-y-8">
        ${experiences.map(exp => `
        <div class="border-l-4 border-blue-500 pl-6">
          <h3 class="font-bold text-xl text-gray-900">${this.escapeHtml(exp.title)}</h3>
          <p class="text-blue-600 font-medium">${this.escapeHtml(exp.company)} • ${this.escapeHtml(exp.duration)}</p>
          <p class="text-gray-700 mt-3">${this.escapeHtml(exp.description)}</p>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    ${education.length > 0 ? `
    <!-- Education Section -->
    <section class="mb-12 bg-white rounded-xl shadow-sm p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Pendidikan</h2>
      <div class="space-y-6">
        ${education.map(edu => `
        <div>
          <h3 class="font-bold text-lg text-gray-900">${this.escapeHtml(edu.degree)}</h3>
          <p class="text-gray-600">${this.escapeHtml(edu.institution)} • ${this.escapeHtml(edu.year)}</p>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    ${projects.length > 0 ? `
    <!-- Projects Section -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Proyek</h2>
      <div class="grid md:grid-cols-2 gap-6">
        ${projects.map(project => `
        <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
          <h3 class="font-bold text-xl text-gray-900 mb-2">${this.escapeHtml(project.name)}</h3>
          <p class="text-sm text-blue-600 font-medium mb-3">${this.escapeHtml(project.technologies)}</p>
          <p class="text-gray-700 mb-4">${this.escapeHtml(project.description)}</p>
          ${project.link ? `<a href="${this.escapeHtml(project.link)}" target="_blank" class="text-blue-600 hover:text-blue-700 font-medium text-sm">Lihat Proyek →</a>` : ''}
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}
  </main>

  <footer class="bg-white border-t py-8">
    <div class="container mx-auto px-4 text-center text-gray-600">
      © ${new Date().getFullYear()} ${this.escapeHtml(portfolio.full_name)}. Dibuat dengan Portfolio Generator.
    </div>
  </footer>
</div>`;
  }

  /**
   * Render Dark Template
   */
  private static renderDarkTemplate(portfolio: Portfolio): string {
    const skills = portfolio.skills || [];
    const experiences = portfolio.experiences || [];
    const education = portfolio.education || [];
    const projects = portfolio.projects || [];
    const socialLinks = portfolio.social_links || {};

    return `
<div class="min-h-screen bg-gray-900 text-white">
  <!-- Header -->
  <header class="bg-gray-800 border-b border-gray-700 py-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-4xl font-bold text-white mb-2">${this.escapeHtml(portfolio.full_name)}</h1>
      <p class="text-lg text-gray-300 mb-4">${this.escapeHtml(portfolio.bio || '')}</p>
      <div class="flex flex-wrap gap-4 text-sm text-gray-400">
        ${portfolio.email ? `<div class="flex items-center gap-2">📧 ${this.escapeHtml(portfolio.email)}</div>` : ''}
        ${portfolio.phone ? `<div class="flex items-center gap-2">📱 ${this.escapeHtml(portfolio.phone)}</div>` : ''}
        ${portfolio.location ? `<div class="flex items-center gap-2">📍 ${this.escapeHtml(portfolio.location)}</div>` : ''}
      </div>
      ${this.renderSocialLinks(socialLinks, undefined, true)}
    </div>
  </header>

  <main class="container mx-auto px-4 py-12 max-w-4xl">
    ${skills.length > 0 ? `
    <!-- Skills Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-white mb-4">Keahlian</h2>
      <div class="flex flex-wrap gap-2">
        ${skills.map(skill => `<span class="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700">${this.escapeHtml(skill)}</span>`).join('')}
      </div>
    </section>
    ` : ''}

    ${experiences.length > 0 ? `
    <!-- Experience Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-white mb-4">Pengalaman Kerja</h2>
      <div class="space-y-6">
        ${experiences.map(exp => `
        <div class="border-l-2 border-gray-700 pl-4">
          <h3 class="font-semibold text-lg text-white">${this.escapeHtml(exp.title)}</h3>
          <p class="text-gray-400">${this.escapeHtml(exp.company)} • ${this.escapeHtml(exp.duration)}</p>
          <p class="text-gray-300 mt-2">${this.escapeHtml(exp.description)}</p>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    ${education.length > 0 ? `
    <!-- Education Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-white mb-4">Pendidikan</h2>
      <div class="space-y-4">
        ${education.map(edu => `
        <div>
          <h3 class="font-semibold text-white">${this.escapeHtml(edu.degree)}</h3>
          <p class="text-gray-400">${this.escapeHtml(edu.institution)} • ${this.escapeHtml(edu.year)}</p>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    ${projects.length > 0 ? `
    <!-- Projects Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-white mb-4">Proyek</h2>
      <div class="grid gap-6">
        ${projects.map(project => `
        <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 class="font-semibold text-lg text-white mb-2">${this.escapeHtml(project.name)}</h3>
          <p class="text-sm text-gray-400 mb-2">${this.escapeHtml(project.technologies)}</p>
          <p class="text-gray-300 mb-2">${this.escapeHtml(project.description)}</p>
          ${project.link ? `<a href="${this.escapeHtml(project.link)}" target="_blank" class="text-blue-400 hover:underline text-sm">Lihat Proyek →</a>` : ''}
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}
  </main>

  <footer class="bg-gray-800 border-t border-gray-700 py-8">
    <div class="container mx-auto px-4 text-center text-gray-400 text-sm">
      © ${new Date().getFullYear()} ${this.escapeHtml(portfolio.full_name)}. Dibuat dengan Portfolio Generator.
    </div>
  </footer>
</div>`;
  }

  /**
   * Render social links
   */
  private static renderSocialLinks(socialLinks: any, alignClass: string = '', isDark: boolean = false): string {
    const links = [];
    const linkClass = isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900';
    
    if (socialLinks.linkedin) {
      links.push(`<a href="${this.escapeHtml(socialLinks.linkedin)}" target="_blank" class="${linkClass}">LinkedIn</a>`);
    }
    if (socialLinks.github) {
      links.push(`<a href="${this.escapeHtml(socialLinks.github)}" target="_blank" class="${linkClass}">GitHub</a>`);
    }
    if (socialLinks.website) {
      links.push(`<a href="${this.escapeHtml(socialLinks.website)}" target="_blank" class="${linkClass}">Website</a>`);
    }
    if (socialLinks.instagram) {
      links.push(`<a href="${this.escapeHtml(socialLinks.instagram)}" target="_blank" class="${linkClass}">Instagram</a>`);
    }

    if (links.length === 0) return '';

    return `
      <div class="flex flex-wrap gap-4 mt-4 ${alignClass}">
        ${links.join(' • ')}
      </div>
    `;
  }

  /**
   * Generate file name untuk export
   */
  static generateFileName(portfolio: Portfolio): string {
    const name = portfolio.full_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    return `portfolio-${name}.html`;
  }

  /**
   * Escape HTML untuk keamanan
   */
  private static escapeHtml(text: string): string {
    const div = typeof document !== 'undefined' ? document.createElement('div') : null;
    if (div) {
      div.textContent = text;
      return div.innerHTML;
    }
    // Fallback untuk server-side
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
