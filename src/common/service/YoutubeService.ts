import type { ISearchResult } from "@/model/ISearchResult";
import { Utils } from "./../util/Utils";
import { FetchManager } from "@/common/manager/FetchManager";

export class YoutubeService {
  static async searchOnYouTube(query: string): Promise<ISearchResult[]> {
    const response = await fetch(`/api/youtube/search?query=${query}`);
    const searchResults: ISearchResult[] = await response.json();

    return YoutubeService.decodeTitles(searchResults);
  }

  private static decodeTitles(searchResults: ISearchResult[]): ISearchResult[] {
    return searchResults.map((searchResult) => ({
      ...searchResult,
      title: Utils.decodeHTMString(searchResult.title)
    }));
  }

  static async downloadAudioTrack(videoId: string): Promise<void> {
    return FetchManager.fetchFile({
      url: `/api/youtube/audiotrack?videoId=${videoId}`,
      defaultFileName: "fichier.mp3"
    });
  }
}
