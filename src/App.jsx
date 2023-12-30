import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('A username');

  const handleUsernamechange = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log('handling submission');
    e.preventDefault();
    console.log(`Username: ${username}`);
  };

  return (
    <>
      <div className='flex flex-col justify-center'>
        <h1 className='text-3xl font-bold'>Test</h1>
        <br />
        <div className='mt-4 flex flex-col justify-center'>
          <form onSubmit={handleSubmit} action='GET'>
            <span>
              <label htmlFor='username'>Enter username here:</label>
              <input
                type='text'
                name='username'
                id='username'
                className='ml-3 max-w-5xl rounded-sm bg-slate-200 text-slate-700'
                onChange={handleUsernamechange}
                value={username}
              />
            </span>
            <input
              type='submit'
              className='transition-all hover:bg-slate-200'
              value={'Submit'}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
