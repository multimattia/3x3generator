const getAnimeData = async (username) => {
  const url = 'https://graphql.anilist.co';
  const query = `
      query ($username: String) {
        User (name: $username) {
          id
          name
          favourites {
            anime {
              nodes {
                id
                title {
                  english
                }
                coverImage {
                    extraLarge
                }
              }
            }
            manga {
              nodes {
                id
                title {
                  english
                }
                coverImage {
                    extraLarge
                }
              }
            }
          }
        }
      }
    `;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        username: username,
      },
    }),
  }).then((response) => response.json());
};

export default getAnimeData;
