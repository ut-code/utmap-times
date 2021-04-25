import { gql, useQuery } from "@apollo/client";
import { useInView } from "react-intersection-observer";
import { useClubBookmarks } from "../utils/hooks/clubBookmarks";
import {
  BookmarkedClubsQuery,
  BookmarkedClubsQueryVariables,
} from "../__generated__/BookmarkedClubsQuery";
import ArticleLink from "./ArticleLink";

export default function BookmarkedClubs(props: { className?: string }) {
  const { ref, inView } = useInView();
  const { bookmarkedClubIds, toggleClubBookmark } = useClubBookmarks();
  const query = useQuery<BookmarkedClubsQuery, BookmarkedClubsQueryVariables>(
    gql`
      query BookmarkedClubsQuery($clubIds: [ItemId!]!) {
        allClubs(filter: { id: { in: $clubIds } }) {
          id
          name
          category {
            id
            name
          }
          images {
            id
            url(imgixParams: { w: 1200, h: 900, auto: format })
          }
          tags {
            id
            name
          }
        }
      }
    `,
    { skip: !inView, variables: { clubIds: bookmarkedClubIds } }
  );

  return (
    <div ref={ref} className={props.className}>
      {query.loading && (
        <p className="container mx-auto p-8">読み込み中です...</p>
      )}
      {query.data?.allClubs.length === 0 && (
        <p className="container mx-auto p-8">
          お気に入りは登録されていません。
        </p>
      )}
      <ul className="md:grid md:grid-cols-2 xl:grid-cols-3">
        {query.data?.allClubs.map((club) => (
          <li key={club.id}>
            <ArticleLink
              title={club.name ?? ""}
              category={club.category?.name ?? ""}
              url={`/clubs/${club.id}`}
              imageUrl={club.images[0]?.url ?? "/images/utmap.png"}
              tags={club.tags.map((tag) => ({
                id: tag.id,
                name: tag.name ?? "",
              }))}
              className="h-full"
              isBookmarked={bookmarkedClubIds.includes(club.id)}
              onBookmarkToggled={() => {
                toggleClubBookmark(club.id);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
