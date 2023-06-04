export class Utils {
  static decodeHTMString(str: string): string {
    return str.replace(/&#([0-9]{1,3});/gi, (match, numStr) => {
      return String.fromCharCode(parseInt(numStr, 10));
    });
  }
}
