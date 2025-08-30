import jsPDF from 'jspdf';
import { PersonalManual, FiveVoiceProfile } from '@pentara/shared';

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
  doc.text(`Created for: ${profile.userId}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date(profile.createdAt).toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Values Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Core Values', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const valuesText = profile.manual.values.join(', ');
  yPosition = addWrappedText(valuesText, margin, yPosition, pageWidth - 2 * margin);
  yPosition += 10;

  // Drivers Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Drivers', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const driversText = profile.manual.drivers.join(', ');
  yPosition = addWrappedText(driversText, margin, yPosition, pageWidth - 2 * margin);
  yPosition += 10;

  // Strengths Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Strengths & Superpowers', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  profile.manual.strengths.forEach(strength => {
    yPosition = addWrappedText(`• ${strength}`, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 5;
  });
  yPosition += 5;

  // Reset Protocol Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Reset Protocol', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  yPosition = addWrappedText('When you need to reset, try these actions:', margin, yPosition, pageWidth - 2 * margin);
  yPosition += 5;

  profile.manual.resets.forEach(reset => {
    yPosition = addWrappedText(`• ${reset}`, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 5;
  });
  yPosition += 10;

  // Belief Shifts Section
  if (profile.manual.beliefs.length > 0) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Belief Transformation', margin, yPosition);
    yPosition += 10;

    profile.manual.beliefs.forEach(belief => {
      if (belief.old && belief.new) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        yPosition = addWrappedText(`Old belief: "${belief.old}"`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 5;
        yPosition = addWrappedText(`New belief: "${belief.new}"`, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 10;
      }
    });
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
    yPosition = addWrappedText(`Archetype: ${voice.archetype}`, margin, yPosition, pageWidth - 2 * margin, 10);
    yPosition += 5;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition = addWrappedText(`Focus: ${voice.domainFocus}`, margin, yPosition, pageWidth - 2 * margin, 10);
    yPosition += 5;

    yPosition = addWrappedText(`Tone: ${voice.tone}`, margin, yPosition, pageWidth - 2 * margin, 10);
    yPosition += 5;

    if (voice.inspiredBy.length > 0) {
      yPosition = addWrappedText(`Inspired by: ${voice.inspiredBy.join(', ')}`, margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;
    }

    // Sample lines
    if (voice.sampleLines.length > 0) {
      doc.setFont('helvetica', 'italic');
      yPosition = addWrappedText('Sample guidance:', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 3;
      
      voice.sampleLines.forEach(line => {
        yPosition = addWrappedText(`"${line}"`, margin + 10, yPosition, pageWidth - 2 * margin - 10, 9);
        yPosition += 3;
      });
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
  const filename = `pentara-manual-${profile.userId}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}
