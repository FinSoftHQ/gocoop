/**
 * Injection key for PDF print configuration.
 * @private
 */
const _KEY_PDF_PRINT_KEY = Symbol('pdf_print_key') as InjectionKey<{
  templatePath: string;
  basePdfPath?: string;
  blankBasePdf?: object;
  dataTransformer?: (data: any) => any;
}>;

/**
 * Provides or injects PDF print configuration.
 *
 * This composable function either provides a PDF print configuration if a valid
 * configuration object with a `templatePath` is passed, or injects an existing
 * configuration if no valid configuration is provided.
 *
 * @param {Object} [config] - The PDF print configuration object.
 * @param {string} [config.templatePath] - The path to the PDF template.
 * @param {string} [config.basePdfPath] - The base path for the PDF.
 * @param {Object} [config.blankBasePdf] - The default blank base PDF configuration.
 * @param {number} [config.blankBasePdf.width=210] - The width of the blank base PDF.
 * @param {number} [config.blankBasePdf.height=297] - The height of the blank base PDF.
 * @param {Array<number>} [config.blankBasePdf.padding=[0, 5, 5, 5]] - The padding of the blank base PDF.
 *
 * @returns {Object|undefined} - Returns the provided configuration if a valid configuration is passed,
 * or the injected configuration if no valid configuration is provided.
 */
export function usePdfPrint(config?: {
  templatePath?: string;
  basePdfPath?: string;
  blankBasePdf?: object;
  dataTransformer?: (data: any) => any;
}) {
  if (config && config.templatePath) {
    const mergedConfig = Object.assign({}, config, {
      blankBasePdf: config.blankBasePdf ?? {
        width: 210,
        height: 297,
        padding: [0, 5, 5, 5],
      },
    }) as {
      templatePath: string;
      basePdfPath?: string;
      blankBasePdf?: object;
      dataTransformer?: (data: any) => any;
    };
    provide(_KEY_PDF_PRINT_KEY, mergedConfig);
    return mergedConfig;
  }

  return inject(_KEY_PDF_PRINT_KEY) as {
    templatePath: string;
    basePdfPath?: string;
    blankBasePdf?: object;
    dataTransformer?: (data: any) => any;
  };
}

/**
 * Injection key for PDF path.
 * @private
 */
const _KEY_PDF_PATH = Symbol('pdf_path') as InjectionKey<string>;

/**
 * Injection key for PDF print path.
 * @private
 */
const _KEY_PDF_PRINT_PATH = Symbol('pdf_print_path') as InjectionKey<string>;

/**
 * Provides or injects PDF path and print path.
 *
 * @param {any} [path] - The path to the PDF.
 * @param {any} [print] - The print path.
 * @returns {object} - The provided or injected PDF path and print path.
 */
export function usePdf(path?: any, print?: any) {
  if (!!path) {
    provide(_KEY_PDF_PATH, path);
  }
  path = inject(_KEY_PDF_PATH);

  if (!!print) {
    provide(_KEY_PDF_PRINT_PATH, print);
  }
  print = inject(_KEY_PDF_PRINT_PATH);

  return { path, print };
}
