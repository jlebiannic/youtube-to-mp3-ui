import type { ISearchResult } from "@/model/ISearchResult";
import { useStorage } from "./useStorage";

export const useStorageForSearchResult = () => {
  const [searchResultsInStorage, setSearchResultsInStorage] = useStorage<ISearchResult[]>("ytSH");

  function storeSearchResult(searchResult: ISearchResult) {
    try {
      if (!searchResultExistInStorage(searchResult)) {
        if (searchResultsInStorage.value) {
          setSearchResultsInStorage([...searchResultsInStorage.value, searchResult]);
        } else {
          setSearchResultsInStorage([searchResult]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function searchResultExistInStorage(searchResult: ISearchResult) {
    return searchResultsInStorage.value?.find(
      (currentSearchResult) => currentSearchResult.id === searchResult.id
    );
  }

  return { searchResults: searchResultsInStorage, searchResultsInStorage, storeSearchResult };
};
