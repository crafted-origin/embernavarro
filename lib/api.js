import { GraphQLClient, gql } from 'graphql-request';

import { pages } from 'lib/constants';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

export async function fetchGraphQL(query, preview = false) {
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${
        preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
      }`,
    },
  });

  return client.request(query);
}

function extractPageData(data, contentTypeId) {
  return data?.page;
}

export async function getDataForIndex(preview) {
  const query = gql`
    {
      page(id: "5y6UcQ6pGhAoIwfQIHkWRG", preview: true) {
        title
        slug
        sys {
          id
        }
        pageType {
          title
        }
        sectionsCollection(limit: 3) {
          items {
            title
            description
            sectionType {
              __typename
              ... on SectionIntroduction {
                ...sectionIntroductionFields
              }
              ... on SectionProject {
                ...sectionProjectFields
              }
            }
          }
        }
      }
    }

    fragment sectionIntroductionFields on SectionIntroduction {
      title
      description {
        json
      }
    }

    fragment sectionProjectFields on SectionProject {
      title
      gridList {
        heightsCollection(limit: 2) {
          items {
            title
            mobilePx
            tabletPx
            desktopPx
          }
        }
        gridListTypesCollection(limit: 3) {
          items {
            type
            gridListTilesCollection(limit: 10) {
              items {
                title
                rows
                columns
                tileImage {
                  image {
                    sys {
                      id
                    }
                    url
                    description
                  }
                  title
                  quality
                  width
                  height
                  layout
                  objectFit
                  objectPosition
                }
              }
            }
          }
        }
      }
    }
  `;

  let data = null;
  let error = null;
  try {
    const entry = await fetchGraphQL(query, preview);

    data = extractPageData(entry, pages.home.contentTypeId);
  } catch (err) {
    error = err?.response?.errors[0]?.message;
  }

  return { data, error };
}
