import { Utils } from "./../../util/Utils";
import { SearchResult, type ISearchResult } from "@/model/ISearchResult";
import { useStorageForSearchResult } from "../storage/useStorageForSearchResult";
import { reactive, ref } from "vue";
import { YoutubeService } from "@/common/service/YoutubeService";

export const useDownloadAudioTrack = () => {
  const { storeSearchResult } = useStorageForSearchResult();
  const inProgressAudioTrackDownloads: ISearchResult[] = reactive([]);
  const audioTrackDownloadError = ref();

  async function downloadAudioTrack(searchResult: ISearchResult) {
    storeSearchResult(searchResult);
    SearchResult.addSearchResultTo(searchResult, inProgressAudioTrackDownloads);
    try {
      await YoutubeService.downloadAudioTrack(
        searchResult.id,
        `${Utils.encodeToValidFileName(searchResult.title)}.mp3`
      );
    } catch (error) {
      audioTrackDownloadError.value = error;
    } finally {
      SearchResult.removeSearchResultFrom(searchResult, inProgressAudioTrackDownloads);
    }
  }

  return { downloadAudioTrack, inProgressAudioTrackDownloads, audioTrackDownloadError };
};
