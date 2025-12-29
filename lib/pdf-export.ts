import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import type { Portfolio } from './portfolio';

/**
 * PDFExporter - Utility untuk mengekspor portfolio ke PDF file dari HTML preview
 */
export class PDFExporter {
  static async generatePDF(portfolio: Portfolio): Promise<void> {
    try {
      const previewElement = document.getElementById('portfolio-preview');
      
      if (!previewElement) {
        throw new Error('Preview element not found.');
      }

      const portfolioTemplate = previewElement.querySelector('.portfolio-print') as HTMLElement;
      
      if (!portfolioTemplate) {
        throw new Error('Portfolio template not found.');
      }

      const canvas = await html2canvas(portfolioTemplate, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);

      const fileName = portfolio.full_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      pdf.save(`portfolio-${fileName}.pdf`);
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error('Failed to generate PDF.');
    }
  }
}
