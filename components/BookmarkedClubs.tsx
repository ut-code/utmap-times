import { gql, useQuery } from "@apollo/client";
import { useInView } from "react-intersection-observer";
import { responsiveImageFragment } from "../utils/datocms";
import { useClubBookmarks } from "../utils/hooks/clubBookmarks";
import {
  BookmarkedClubsQuery,
  BookmarkedClubsQueryVariables,
} from "../__generated__/BookmarkedClubsQuery";
import ArticleLink from "./ArticleLink";
import ResponsiveImageWithFallback from "./ResponsiveImageWithFallback";

export default function BookmarkedClubs(props: { className?: string }) {
  const { ref, inView } = useInView();
  const { bookmarkedClubIds, toggleClubBookmark } = useClubBookmarks();
  const query = useQuery<BookmarkedClubsQuery, BookmarkedClubsQueryVariables>(
    gql`
      ${responsiveImageFragment}
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
            responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
              ...ResponsiveImageFragment
            }
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
              media={
                <ResponsiveImageWithFallback
                  aspectRatio={16 / 9}
                  data={club.images[0]?.responsiveImage}
                />
              }
              isFramed
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
