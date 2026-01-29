/**
 * Normalizes component names by removing Mp prefixes
 *
 * @param componentName - The component name to normalize
 * @returns The normalized component name without Mp/mp- prefixes
 *
 * @example
 * normalizeComponentName('MpButton') // 'Button'
 * normalizeComponentName('MpAccordion') // 'Accordion'
 * normalizeComponentName('mp-button') // 'button'
 * normalizeComponentName('mp-accordion') // 'accordion'
 * normalizeComponentName('Button') // 'Button'
 * normalizeComponentName('Accordion') // 'Accordion'
 */
export function normalizeComponentName(componentName: string): string {
  let normalizedName = componentName

  // Check if starts with 'Mp' followed by an uppercase letter (indicating PascalCase like MpButton)
  if (
    normalizedName.startsWith('Mp') &&
    normalizedName.length > 2 &&
    normalizedName[2] === normalizedName[2]?.toUpperCase()
  ) {
    normalizedName = normalizedName.slice(2)

    // Handle mp-button -> button, mp-accordion -> accordion (kebab-case with mp- prefix)
  } else if (normalizedName.toLowerCase().startsWith('mp-')) {
    normalizedName = normalizedName.slice(3)
  }

  return normalizedName
}
