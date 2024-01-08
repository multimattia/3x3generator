import { useState, useEffect } from 'react';
import { getAnimeData, getUserNames } from '../api/anilistFetcher.js';
import { useDebounce } from '../hooks/useDebounce.js';

const FormAndData = () => {
  const [username, setUsername] = useState('');
  const debouncedUsername = useDebounce(username, 500);
  const [error, setError] = useState(false);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dropPosition, setDropPosition] = useState(-1);
  const [autoCompleteResults, setAutocompleteResults] = useState([]);

  const [animeList, setAnimeList] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: `placeholder-${i}` + 1,
      name: null,
    })),
  );

  useEffect(() => {
    if (draggedItem !== null && dropPosition !== -1) {
      setAnimeList((prevState) => {
        let data = [...prevState];
        const temp = data[dropPosition];
        data[dropPosition] = data[draggedItem];
        data[draggedItem] = temp;
        return data;
      });
      setDraggedItem(null);
      setDropPosition(-1);
    }
  }, [draggedItem, dropPosition]);

  useEffect(() => {
    if (debouncedUsername) {
      getUserNames(debouncedUsername).then(setAutocompleteResults);
      console.log(`${debouncedUsername}`);
    } else {
      setAutocompleteResults([]);
    }
  }, [debouncedUsername]);

  const handleUsernamechange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedData = await getAnimeData(username);
      console.log(await getUserNames(username));
      const animeData = Array.from(
        { length: 9 },
        (_, i) => fetchedData[i] || { id: `placeholder-${i}`, title: null },
      );
      setAnimeList(animeData);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  const submitUsername = async (username) => {
    setUsername(username);
    try {
      const fetchedData = await getAnimeData(username);
      console.log(await getUserNames(username));
      const animeData = Array.from(
        { length: 9 },
        (_, i) => fetchedData[i] || { id: `placeholder-${i}`, title: null },
      );
      setAnimeList(animeData);
      setError(false);
      setAutocompleteResults([]);
    } catch (error) {
      setError(true);
    }
  };

  const handleDragStart = (e, id) => {
    e.preventDefault();
    setTimeout(() => {
      setDraggedItem(id);
    }, 200);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDropPosition(index);
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
            autoComplete='off'
            placeholder='AniList username'
            list='usernames'
            className='border-1 ml-3 mt-2 max-w-5xl rounded-md bg-slate-200 px-2 py-1 text-slate-700 focus:border-cyan-500'
            onChange={handleUsernamechange}
            value={username}
          />
          <datalist id='usernames'>
            {autoCompleteResults.map((username) => (
              <option key={username.id} value={username.name}></option>
            ))}
          </datalist>
        </span>
        <input
          type='submit'
          className='ml-4 rounded-md bg-slate-300 px-3 py-1 transition-all hover:bg-slate-200'
          value={'Submit'}
        />
      </form>
      <ul></ul>
      <div>
        {error ? <p className='text-red-500'>Username does not exist</p> : null}
      </div>
      <div
        className='grid grid-cols-3 gap-1 sm:gap-2'
        onDragOver={(e) => e.preventDefault()}
      >
        {animeList.map((anime, index) =>
          anime.title ? (
            <div
              key={anime.id}
              className='image'
              draggable='true'
              onPointerDown={(e) => handleDragStart(e, index)}
              onPointerUp={(e) => handleDrop(e, index)}
            >
              <img
                className='h-24 w-24 object-cover sm:h-40 sm:w-40 md:h-64 md:w-64'
                src={anime.coverImage.extraLarge}
                alt={`Thumbnail for ${anime.title.english}`}
              />
            </div>
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
