// This is a server component, optimized for Puppeteer
import { portfolioService } from "@/lib/portfolio";
import { MinimalistTemplate } from "@/components/templates/minimalist-template";
import { ModernTemplate } from "@/components/templates/modern-template";
import { DarkTemplate } from "@/components/templates/dark-template";
import '../../styles/print.css'; // PERBAIKAN: Menggunakan path relatif yang benar
// Function to render the correct template
const renderTemplate = (portfolio: any) => {
  const templateProps = { portfolio };
  switch (portfolio.templateId) {
    case "modern":
      return <ModernTemplate {...templateProps} />;
    case "dark":
      return <DarkTemplate {...templateProps} />;
    default:
      return <MinimalistTemplate {...templateProps} />;
  }
};

export default async function PrintPage({ params }: { params: { id: string } }) {
  const portfolioData = await portfolioService.getById(params.id);

  if (!portfolioData) {
    return <div>Portfolio not found.</div>;
  }

  // Map data from snake_case to camelCase for the templates
  const mappedPortfolio = {
    id: portfolioData.id,
    title: portfolioData.title,
    fullName: portfolioData.full_name,
    email: portfolioData.email,
    phone: portfolioData.phone,
    location: portfolioData.location,
    bio: portfolioData.bio,
    profileImageUrl: portfolioData.profile_image_url,
    skills: portfolioData.skills,
    experiences: portfolioData.experiences,
    education: portfolioData.education,
    projects: portfolioData.projects,
    socialLinks: portfolioData.social_links,
    certifications: portfolioData.certifications,
    languages: portfolioData.languages,
    testimonials: portfolioData.testimonials,
    templateId: portfolioData.template_id,
    isPublic: portfolioData.is_public,
  };

  return (
    <div className="a4-container">
      {renderTemplate(mappedPortfolio)}
    </div>
  );
}
