// const getAnimeData = () => {
//     const url = 'https://graphql.anilist.co';
//     const query = `
//       query ($username: String) {
//         User (name: $username) {
//           id
//           name
//           favourites {
//             anime {
//               nodes {
//                 id
//                 title {
//                   english
//                 }
//                 coverImage {
//                     extraLarge
//                 }
//               }
//             }
//             manga {
//               nodes {
//                 id
//                 title {
//                   english
//                 }
//                 coverImage {
//                     extraLarge
//                 }
//               }
//             }
//           }
//         }
//       }
//     `;

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify({
//         query,
//         variables: {
//           username: username,
//         },
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         data = data.data.User;
//         console.log(`Username fetched: ${data.name}`);
//         console.log('Anime returned:', data.favourites.anime.nodes);
//         console.log(animeList);
//       })
//       .catch((error) => console.error('Error:', error));
// }
