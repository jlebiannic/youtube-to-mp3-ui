export class Utils {
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
}
