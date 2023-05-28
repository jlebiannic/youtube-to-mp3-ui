export class ArrayUtil {
  static removeElement<A extends Array<any>, E = any>(
    array: A,
    elementToFind: E,
    fct: (e: E) => any
  ) {
    let newArray = [...array];
    const valueToFind = fct(elementToFind);
    const foundElementIndex = array.findIndex((el) => fct(el) === valueToFind);
    if (foundElementIndex !== -1) {
      newArray = array.slice(foundElementIndex, 1);
    }
    return newArray;
  }

  static getIndexElement<A extends Array<any>, E = any>(
    array: A,
    elementToFind: E,
    fct: (e: E) => any
  ) {
    const valueToFind = fct(elementToFind);
    return array.findIndex((el) => fct(el) === valueToFind);
  }
}
