import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import type { Portfolio } from './portfolio';

/**
 * PDFExporter - Utility untuk mengekspor portfolio ke PDF file dari HTML preview
 * Menghasilkan PDF full page seperti export Canva
 */
export class PDFExporter {
  /**
   * Generate dan download PDF dari portfolio data dengan capture preview HTML
   * Full page A4 tanpa margin - seperti export dari Canva
   */
  static async generatePDF(portfolio: Portfolio): Promise<void> {
    try {
      // Find the preview container element by ID
      const previewElement = document.getElementById('portfolio-preview');
      
      if (!previewElement) {
        throw new Error('Preview element not found. Please show preview first.');
      }

      // Find the actual portfolio template inside preview (has class portfolio-print)
      const portfolioTemplate = previewElement.querySelector('.portfolio-print') as HTMLElement;
      
      if (!portfolioTemplate) {
        throw new Error('Portfolio template not found.');
      }

      // A4 dimensions in mm
      const a4WidthMM = 210;
      const a4HeightMM = 297;

      // Get actual element dimensions
      const elementWidth = portfolioTemplate.offsetWidth;
      const elementHeight = portfolioTemplate.offsetHeight;

      // Capture with high quality - use element's actual size
      const canvas = await html2canvas(portfolioTemplate, {
        scale: 2, // High quality for crisp PDF
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        // Use actual element dimensions
        width: elementWidth,
        height: elementHeight,
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Add image to fill the entire page (no margins)
      pdf.addImage(
        imgData,
        'JPEG',
        0, // x position: start from edge
        0, // y position: start from edge
        a4WidthMM, // full width
        a4HeightMM // full height
      );

      // Download PDF with proper filename
      const fileName = this.generateFileName(portfolio);
      
      // Create blob from PDF
      const pdfBlob = pdf.output('blob');
      
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.style.display = 'none';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error('Failed to generate PDF. Please ensure preview is visible.');
    }
  }

  /**
   * Generate file name untuk export
   */
  static generateFileName(portfolio: Portfolio): string {
    const name = portfolio.full_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    return `portfolio-${name}.pdf`;
  }
}
