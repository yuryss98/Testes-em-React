import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../helper/renderWithRouter';
import pokemons from '../data';

describe('testando componente "FavoritePokemons"', () => {
  it(`Teste se é exibida na tela a mensagem No favorite pokemon found, caso a 
    pessoa não tenha pokémons favoritos, ou caso a pessoa tenha pokemons
    favoritados, exiba todos os cards na tela`, () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const paragraph = screen.getByText('No favorite pokemon found');
    expect(paragraph).toBeInTheDocument();

    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const pokemonsFavorites = pokemons.length;
    const cardsPokemons = screen.getAllByTestId('pokemon-name');
    expect(cardsPokemons).toHaveLength(pokemonsFavorites);
  });
});
