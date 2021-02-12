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
      page(id: "5y6UcQ6pGhAoIwfQIHkWRG", preview: ${preview}) {
        title
        slug
        sys {
          id
        }
        pageType {
          title
          isParticleBackground
        }
        sectionsCollection(limit: 4) {
          items {
            title
            description {
              json
            }
            sectionType {
              __typename
              ... on SectionIntroduction {
                ...sectionIntroductionFields
              }
              ... on SectionProject {
                ...sectionProjectFields
              }
              ... on SectionClient {
                ...sectionClientFields
              }
            }
          }
        }
      }
    }

    fragment sectionIntroductionFields on SectionIntroduction {
      title
      logoImagesCollection(limit: 3) {
        items {
          ...imageFields
        }
      }
      description {
        json
      }
      descriptionMobile {
        json
      }
    }

    fragment sectionProjectFields on SectionProject {
      title
      gridList {
        title
        gridListTilesCollection(limit: 50) {
          items {
            title
            desktopRows
            desktopColumns
            tabletRows
            tabletColumns
            mobileRows
            mobileColumns
            types
            tileImage {
              ...imageFields
            }
          }
        }
      }
    }

    fragment sectionClientFields on SectionClient {
      clientsCollection(limit: 2) {
        items {
          title
          description {
            json
          }
          image {
            ...imageFields
          }
          hoverImage {
            ...imageFields
          }
          linksCollection(limit: 2) {
            items {
              title
              url
              name
              icon {
                ...imageFields
              }
            }
          }
        }
      }
    }

    fragment imageFields on Image {
      image {
        sys {
          id
        }
        url
        description
      }
      device
      title
      quality
      width
      height
      layout
      objectFit
      objectPosition
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
