/**
 * Format a number to Indonesian Rupiah currency string.
 *
 * @param value - The number to format
 * @returns Formatted string like "Rp 15.000"
 *
 * @example
 * formatRupiah(15000)    // "Rp 15.000"
 * formatRupiah(1500000)  // "Rp 1.500.000"
 * formatRupiah(0)        // "Rp 0"
 * formatRupiah(2500.50)  // "Rp 2.501" (rounded)
 */
export function formatRupiah(value: number): string {
    if (value === null || value === undefined || isNaN(value)) {
        return 'Rp 0';
    }

    const formatted = new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(Math.round(value));

    return `Rp ${formatted}`;
}

/**
 * Format a number to Indonesian Rupiah with decimal places.
 *
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string like "Rp 15.000,50"
 *
 * @example
 * formatRupiahDecimal(15000.5)  // "Rp 15.000,50"
 * formatRupiahDecimal(2500)     // "Rp 2.500,00"
 */
export function formatRupiahDecimal(value: number, decimals: number = 2): string {
    if (value === null || value === undefined || isNaN(value)) {
        return 'Rp 0,00';
    }

    const formatted = new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);

    return `Rp ${formatted}`;
}

/**
 * Parse a Rupiah formatted string back to a number.
 *
 * @param formatted - The formatted Rupiah string
 * @returns The numeric value
 *
 * @example
 * parseRupiah("Rp 15.000")     // 15000
 * parseRupiah("Rp 1.500.000")  // 1500000
 */
export function parseRupiah(formatted: string): number {
    if (!formatted) return 0;

    // Remove "Rp", spaces, and dots, then replace comma with dot for decimal
    const cleaned = formatted
        .replace(/Rp\s?/g, '')
        .replace(/\./g, '')
        .replace(',', '.');

    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
}
