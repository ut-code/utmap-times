import { gql, FieldPolicy } from "@apollo/client";
import { ResponsiveImageType } from "react-datocms";
import { ResponsiveImageFragment } from "../__generated__/ResponsiveImageFragment";

// https://www.datocms.com/docs/content-delivery-api/pagination
export const datoCmsPaginationOffsetField = "skip";
export const datoCmsPaginationLimitField = "first";
export const datoCmsPaginationDefaultLimit = 20;
export const datoCmsPaginationFieldNames = [
  datoCmsPaginationOffsetField,
  datoCmsPaginationLimitField,
];

export const datoCmsPagination: FieldPolicy<unknown[], unknown[]> = {
  keyArgs: (_, context) =>
    context.field?.arguments
      ?.map((argument) => argument.name.value)
      .filter(
        (argumentName) => !datoCmsPaginationFieldNames.includes(argumentName)
      ),
  // https://github.com/apollographql/apollo-client/blob/35d3247ccb05220d45ebf456c7c4ff5f7a1d4a9c/src/utilities/policies/pagination.ts
  merge(existing, incoming, options) {
    const merged = existing ? existing.slice(0) : [];
    const offset: number = options.args?.[datoCmsPaginationOffsetField] ?? 0;
    const limit: number =
      options.args?.[datoCmsPaginationLimitField] ??
      datoCmsPaginationDefaultLimit;
    for (let i = 0; i < limit; i += 1) {
      merged[offset + i] = incoming[i];
    }
    return merged;
  },
  // https://github.com/apollographql/apollo-client/blob/35d3247ccb05220d45ebf456c7c4ff5f7a1d4a9c/docs/source/pagination/core-api.mdx#paginated-read-functions
  read(existing, options) {
    const offset: number = options.args?.[datoCmsPaginationOffsetField] ?? 0;
    const limit: number =
      options.args?.[datoCmsPaginationLimitField] ??
      datoCmsPaginationDefaultLimit;
    const slicedCache = existing?.slice(offset, offset + limit);
    return slicedCache?.reduce<number>((i) => i + 1, 0) === limit
      ? slicedCache.filter((slicedCacheItem) => slicedCacheItem !== undefined)
      : undefined;
  },
};

export const responsiveImageFragment = gql`
  fragment ResponsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`;

export function normalizeResponsiveImage(
  fragment: ResponsiveImageFragment
): ResponsiveImageType {
  return {
    srcSet: fragment.srcSet,
    webpSrcSet: fragment.webpSrcSet,
    sizes: fragment.sizes,
    src: fragment.src,
    width: fragment.width,
    height: fragment.height,
    aspectRatio: fragment.aspectRatio,
    alt: fragment.alt ?? undefined,
    title: fragment.title ?? undefined,
    bgColor: fragment.bgColor ?? undefined,
    base64: fragment.base64 ?? undefined,
  };
}
