import { useCallback, useMemo } from "react";
import { createLocalStorageStateHook } from "use-local-storage-state";
import * as s from "superstruct";

const localStorageKey = "CLUB_BOOKMARK";
const useClubBookmarksLocalStorage = createLocalStorageStateHook<unknown>(
  localStorageKey
);

const bookmarkedClubIdsType = s.array(s.string());

export type BookmarkedClubIds = s.Infer<typeof bookmarkedClubIdsType>;

export function useClubBookmarks() {
  const [rawData, set] = useClubBookmarksLocalStorage();
  const bookmarkedClubIds = useMemo(
    () => (bookmarkedClubIdsType.is(rawData) ? rawData : []),
    [rawData]
  );
  const toggleClubBookmark = useCallback(
    (id: string) => {
      if (bookmarkedClubIds.includes(id)) {
        set(bookmarkedClubIds.filter((clubId) => clubId !== id));
      } else {
        set([...bookmarkedClubIds, id]);
      }
    },
    [bookmarkedClubIds, set]
  );
  return { bookmarkedClubIds, toggleClubBookmark };
}
