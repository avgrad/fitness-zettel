/**
 * formats a filesize to a human readable size with metric suffix (base10)
 * @param {number} bytes file size in bytes to be formatted
 * @returns {string} human readable file-size string
 */
export function formatSize(bytes: number) {
    const prefixes = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];
    // Math.max(0, ...) to fix bytes=0 resulting in -Infinity
    // Math.min(prefixes.length - 1, ...) to cap prefix at highest available
    const prefixIndex = Math.min(
        prefixes.length - 1,
        Math.max(0, Math.floor(Math.log10(bytes) / 3))
    );
    const prefix = prefixes[prefixIndex] ?? "??";
    const prefixedSize = bytes / (10 ** 3) ** prefixIndex;
    const prefixedRoundedSize =
        prefixIndex > 1 ? prefixedSize.toFixed(2) : Math.round(prefixedSize);
    return prefixedRoundedSize + " " + prefix + "B";
}
