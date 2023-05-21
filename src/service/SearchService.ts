export interface ISearchResult {
  id: string;
  link: string;
  title: string;
  imgUrl: string;
}

export class SearchService {
  static async searchOnYouTube(query: string): Promise<ISearchResult[]> {
    const response = await fetch(`/api/youtube/search?query=${query}`);
    return await response.json();
  }
}
