import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/Link';
import axios from 'axios';

const pokemon = ({ pokeman, id }) => {
  const paddedIndex = ('00' + id).slice(-3);
  return (
    <Layout title={pokeman.name}>
      <h1 className='text-4xl mb-2 text-center capitalize'>{pokeman.name}</h1>
      <img
        className='mx-auto'
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`}
        alt={pokeman.name}
      />
      <p>
        <span className='font-bold mr-2'>Weight: </span>
        {pokeman.weight}
      </p>
      <p>
        <span className='font-bold mr-2'>Height: </span>
        {pokeman.height}
      </p>
      <h2 className='text-2xl mt-6 mb-2'>Types: </h2>
      {pokeman.types.map((type, index) => (
        <p className='' key={index}>
          {type.type.name}
        </p>
      ))}
      <p className='mt-10 text-center'>
        <Link href='/'>
          <a className='text-2xl underline'>Home</a>
        </Link>
      </p>
    </Layout>
  );
};

export default pokemon;
export const getServerSideProps = async ({ query }) => {
  try {
    const { data: pokeman } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${query.id}`
    );
    const id = query.id;
    return {
      props: { pokeman, id },
    };
  } catch (err) {
    console.error(err);
  }
};
