import { generate } from '@pdfme/generator';
import { BLANK_PDF, type Template, type Font } from '@pdfme/common';
import { text, barcodes, image, checkbox } from '@pdfme/schemas';

/**
 * Font configuration for PDF generation.
 * @private
 */
const font: Font = {
  Sarabun: {
    fallback: false,
    data: 'https://cdn.jsdelivr.net/gh/baramee0191/thai-fonts@main/THSarabunNew%20(1).ttf',
  },
  NotoSerifJP: {
    data: 'https://fonts.gstatic.com/s/pridi/v1/Ihwk-OGVFS69PINILdqAjQ.ttf',
    fallback: true,
  },
};

/**
 * Plugins for PDF generation.
 * @private
 */
const plugins = {
  text: text,
  qr: barcodes.qrcode,
  image: image,
  checkbox: checkbox,
};

/**
 * Generates a PDF using the provided template and inputs.
 *
 * @param {Template} template - The PDF template.
 * @param {any} inputs - The inputs for the PDF template.
 * @param {string | object} [basePdfPath] - The path to the base PDF.
 * @returns {Promise<string | Uint8Array>} - The generated PDF as a URL or Uint8Array.
 */
export async function usePdfMeGenerator(
  template: Template,
  inputs: any,
  basePdfPath?: string | object
) {
  let genTemplate = template;
  let basePdf: Uint8Array | undefined;
  if (!!basePdfPath) {
    if (typeof basePdfPath === 'string') {
      const response = (await $fetch(basePdfPath)) as Response;
      const arrayBuffer = await response.arrayBuffer();
      basePdf = new Uint8Array(arrayBuffer);
      genTemplate = { ...template, basePdf };
    } else {
      genTemplate = { ...template, basePdf: basePdfPath as any };
    }
  }
  const pdf = await generate({
    template: genTemplate,
    inputs,
    options: { font },
    plugins,
  });

  if (typeof basePdfPath === 'string' && basePdfPath.startsWith('/pdf_server')) {
    return pdf;
  }
  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  return url;
}
