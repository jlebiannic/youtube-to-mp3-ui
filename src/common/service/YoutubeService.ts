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
    return response.json();
  }

  static async downloadAudioTrack(videoId: string): Promise<void> {
    return FetchManager.fetchFile({
      url: `/api/youtube/audiotrack?videoId=${videoId}`,
      defaultFileName: "fichier.mp3"
    });
  }
}
