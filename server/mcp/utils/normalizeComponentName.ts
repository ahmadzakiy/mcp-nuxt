/**
 * Normalizes component names by removing Mp prefixes (case-insensitive)
 *
 * @param componentName - The component name to normalize
 * @returns The normalized component name without Mp/mp- prefixes, with proper PascalCase
 *
 * @example
 * normalizeComponentName('MpButton') // 'Button'
 * normalizeComponentName('mpbutton') // 'Button'
 * normalizeComponentName('mpButton') // 'Button'
 * normalizeComponentName('MpAccordion') // 'Accordion'
 * normalizeComponentName('mp-button') // 'Button'
 * normalizeComponentName('mp-accordion') // 'Accordion'
 * normalizeComponentName('Button') // 'Button'
 * normalizeComponentName('button') // 'Button'
 */
export function normalizeComponentName(componentName: string): string {
  let normalizedName = componentName.trim();

  // Handle kebab-case with mp- prefix: mp-button -> Button
  if (normalizedName.toLowerCase().startsWith("mp-")) {
    normalizedName = normalizedName
      .slice(3)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");
  }
  // Handle any variation starting with 'mp' (case-insensitive): MpButton, mpButton, mpbutton -> Button
  else if (
    normalizedName.toLowerCase().startsWith("mp") &&
    normalizedName.length > 2
  ) {
    // Remove 'mp' prefix (2 characters) and ensure PascalCase
    const withoutPrefix = normalizedName.slice(2);
    normalizedName =
      withoutPrefix.charAt(0).toUpperCase() +
      withoutPrefix.slice(1).toLowerCase();
  }
  // Ensure PascalCase for plain names: button -> Button
  else {
    normalizedName =
      normalizedName.charAt(0).toUpperCase() +
      normalizedName.slice(1).toLowerCase();
  }

  return normalizedName;
}
