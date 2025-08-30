import jsPDF from 'jspdf';
import { PersonalManual, FiveVoiceProfile, ManualCategory } from '@pentara/shared';

export function generatePersonalManualPDF(profile: FiveVoiceProfile): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12): number => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * lineHeight);
  };

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Personal Manual', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Created for: ${profile.userEmail}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date(profile.createdAt).toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Personal Manual Sections
  const manual = profile.personalManual;
  const valuesSections = manual.sections.filter(s => s.category === ManualCategory.VALUES);
  
  if (valuesSections.length > 0) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Core Values', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    valuesSections.forEach(section => {
      yPosition = addWrappedText(section.content, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 5;
    });
    yPosition += 10;
  }

  // Goals Section
  const goalsSections = manual.sections.filter(s => s.category === ManualCategory.GOALS);
  if (goalsSections.length > 0) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Goals & Aspirations', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    goalsSections.forEach(section => {
      yPosition = addWrappedText(section.content, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 5;
    });
    yPosition += 10;
  }

  // Strengths Section
  const strengthsSections = manual.sections.filter(s => s.category === ManualCategory.STRENGTHS);
  if (strengthsSections.length > 0) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Strengths & Superpowers', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    strengthsSections.forEach(section => {
      yPosition = addWrappedText(`• ${section.content}`, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 5;
    });
    yPosition += 10;
  }

  // Challenges Section
  const challengesSections = manual.sections.filter(s => s.category === ManualCategory.CHALLENGES);
  if (challengesSections.length > 0) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Areas for Growth', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    challengesSections.forEach(section => {
      yPosition = addWrappedText(`• ${section.content}`, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 5;
    });
    yPosition += 10;
  }

  // Preferences Section
  const preferencesSections = manual.sections.filter(s => s.category === ManualCategory.PREFERENCES);
  if (preferencesSections.length > 0) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Preferences & Style', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    preferencesSections.forEach(section => {
      yPosition = addWrappedText(section.content, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 5;
    });
    yPosition += 10;
  }

  // Check if we need a new page
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = margin;
  }

  // Five Voices Section
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Five Voices', margin, yPosition);
  yPosition += 15;

  profile.voices.forEach((voice, index) => {
    // Check if we need a new page for this voice
    if (yPosition > pageHeight - 80) {
      doc.addPage();
      yPosition = margin;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${voice.name}`, margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    yPosition = addWrappedText(`Description: ${voice.description}`, margin, yPosition, pageWidth - 2 * margin, 10);
    yPosition += 5;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition = addWrappedText(`Personality: ${voice.personality}`, margin, yPosition, pageWidth - 2 * margin, 10);
    yPosition += 5;

    yPosition = addWrappedText(`Tone: ${voice.tone}`, margin, yPosition, pageWidth - 2 * margin, 10);
    yPosition += 5;

    if (voice.expertise && voice.expertise.length > 0) {
      yPosition = addWrappedText(`Expertise: ${voice.expertise.join(', ')}`, margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;
    }

    if (voice.inspirationSource) {
      yPosition = addWrappedText(`Inspired by: ${voice.inspirationSource}`, margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;
    }

    yPosition += 10;
  });

  // Welcome Message
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = margin;
  }

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Welcome Message', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  yPosition = addWrappedText(`"${profile.welcomeMessage}"`, margin, yPosition, pageWidth - 2 * margin);
  yPosition += 15;

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Generated by Pentara - Your Personal Council', pageWidth / 2, pageHeight - 10, { align: 'center' });

  return doc;
}

export function downloadPersonalManualPDF(profile: FiveVoiceProfile): void {
  const doc = generatePersonalManualPDF(profile);
  const filename = `pentara-manual-${profile.userEmail.replace('@', '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}
