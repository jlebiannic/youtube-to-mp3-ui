export class Utils {
  private static MAX_LENGTH = 100;
  static decodeHTMString(str: string): string {
    return str
      .replace(/&#([0-9]{1,3});/gi, (match, numStr) => {
        return String.fromCharCode(parseInt(numStr, 10));
      })
      .replace(/&quot;/gi, '"')
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">");
  }

  static encodeToValidFileName(inputString: string): string {
    // Replace invalid characters with an underscore
    const sanitizedString = inputString.replace(/[\\/?:*"<>|]/g, "_");
    const truncatedString = sanitizedString.slice(0, Utils.MAX_LENGTH);
    return truncatedString.toLowerCase();
  }
}
