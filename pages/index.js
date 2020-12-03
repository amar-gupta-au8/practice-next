import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import axios from 'axios';

const Home = ({ results }) => {
  const [search, setSearch] = useState('');
  let allPokemon = results.filter((pokeman) => {
    return pokeman.name.indexOf(search) !== -1;
  });
  return (
    <Layout title='Pokemon app'>
      <h1 className='text-4xl mb-8 text-center'>nextjs</h1>
      <div className='p-8'>
        <div className='bg-white flex items-center rounded-full shadow-xl'>
          <input
            className='rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none'
            id='search'
            type='text'
            placeholder='Search Pokemon'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className='p-4'>
            <button className='bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center'>
              <svg
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                viewBox='0 0 24 24'
                className='w-6 h-6'
              >
                <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ul>
        {allPokemon.map((pokeman, index) => {
          const paddedIndex = ('00' + pokeman.id).slice(-3);
          return (
            <li key={pokeman.id}>
              <Link href={`pokemon?id=${pokeman.id}`}>
                <a className='border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md'>
                  <img
                    className='w-20 h-20 mr-3'
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`}
                    alt={pokeman.name}
                  />
                  <span className='mr-2 font-bold'>{index + 1}.</span>
                  {pokeman.name}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};
export default Home;
export const getStaticProps = async (context) => {
  try {
    let {
      data: { results },
    } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    results = results.map((data, index) => ({ ...data, id: index + 1 }));
    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
};
