export interface ISearchResult {
  id: string;
  link: string;
  title: string;
  imgUrl: string;
  imgUrlMin: string;
  durationInFormatIso8601: string;
  durationInSec: number;
}

export class SearchResult {
  static addSearchResultTo(searchResult: ISearchResult, searchResults: ISearchResult[]) {
    if (!SearchResult.isVideoIdIsIn(searchResult.id, searchResults)) {
      searchResults.push(searchResult);
    }
  }

  static removeSearchResultFrom(searchResult: ISearchResult, searchResults: ISearchResult[]) {
    const indexElement = searchResults.findIndex((element) => element.id === searchResult.id);
    if (indexElement !== -1) {
      searchResults.splice(indexElement, 1);
    }
  }

  static isVideoIdIsIn(videoId: string, searchResults: ISearchResult[]): boolean {
    return searchResults.find((searchResult) => searchResult.id === videoId) !== undefined;
  }
}
