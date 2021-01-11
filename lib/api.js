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
  return data?.[contentTypeId];
}

export async function getDataForIndex(preview) {
  const query = gql`
    query {
      pageHome(id: "${pages.home.id}", preview: ${preview}) {
        title
        sys {
          id
        }
        introduction {
          json
        }
        projectsCollection {
          items {
            type
            projectImagesCollection (limit:3) {
              items {
                image {
                  sys {
                    id
                  }
                  url
                  description
                }
                rows
                columns
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
