import { FetchManager } from "@/common/manager/FetchManager";

export interface ISearchResult {
  id: string;
  link: string;
  title: string;
  imgUrl: string;
}

export class YoutubeService {
  static async searchOnYouTube(query: string): Promise<ISearchResult[]> {
    const response = await fetch(`/api/youtube/search?query=${query}`);
    return await response.json();
  }

  static async downloadAudioTrack(videoId: string) {
    FetchManager.fetchFile({
      url: `/api/youtube/audiotrack?videoId=${videoId}`,
      defaultFileName: "fichier.mp3"
    });
  }
}
