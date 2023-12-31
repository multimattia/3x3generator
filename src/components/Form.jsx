import { useState } from 'react';
import fetchAnimeData from '../api/anilistFetcher.js';

const FormAndData = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);
  const [animeList, setAnimeList] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: `placeholder-${i}` + 1,
      name: null,
    })),
  );

  const handleUsernamechange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const animeData = await fetchAnimeData(username);
      setAnimeList(animeData.data.User.favourites.anime.nodes.slice(0, 9));
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center align-middle'>
      <form
        className='my-4'
        onSubmit={handleSubmit}
        autoComplete='off'
        action='GET'
      >
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
        {error ? <p className='text-red-500'>Username does not exist</p> : null}
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
              key={anime.id}
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
