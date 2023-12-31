import { useState } from 'react';

const FormAndData = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);
  const [animeList, setAnimeList] = useState(
    Array.from({ length: 9 }, (_, i) => ({ id: i + 1, name: null })),
  );

  const handleUsernamechange = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log('handling submission');
    e.preventDefault();
    console.log(`Username: ${username}`);
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

    fetch(url, {
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
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.error('GraphQL Error:', data.errors);
          setError(true);
        } else if (data.data) {
          setError(false);
          data = data.data.User;
          console.log(`Username fetched: ${data.name}`);
          console.log('Anime returned:', data.favourites.anime.nodes);
          setAnimeList(data.favourites.anime.nodes.slice(0, 9));
          console.log(`Sliced animeList: ${animeList}`);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className='flex flex-col items-center justify-center align-middle'>
      <form className='my-4' onSubmit={handleSubmit} action='GET'>
        <span>
          <label htmlFor='username'>Enter username here:</label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='AniList username'
            className='border-1 ml-3 mt-2 max-w-5xl rounded-md bg-slate-200 px-2 py-1 text-slate-700 focus:border-cyan-500'
            onChange={handleUsernamechange}
            value={username}
          />
        </span>
        <input
          type='submit'
          className='ml-4 rounded-md bg-slate-300 px-3 py-1 transition-all hover:bg-slate-200'
          value={'Submit'}
        />
      </form>
      <div>
        {error ? (
          <p className='text-red-500'>Username does not exist</p>
        ) : (
          <p></p>
        )}
      </div>
      <div className='grid grid-cols-3 gap-1 sm:gap-2'>
        {animeList.map((anime, index) =>
          anime.title ? (
            <img
              className='h-24 w-24 object-cover sm:h-40 sm:w-40 md:h-64 md:w-64'
              key={anime.id}
              src={anime.coverImage.extraLarge}
              alt={`Thumbnail for ${anime.title.english}`}
            />
          ) : (
            <div
              key={index}
              className='flex h-24 w-24 items-center justify-center bg-slate-200 object-cover sm:h-40 sm:w-40 md:h-64 md:w-64'
            >
              <p className='text-slate-400' key={index}>
                no anime
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default FormAndData;
