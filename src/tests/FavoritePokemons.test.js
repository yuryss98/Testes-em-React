import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../helper/renderWithRouter';

describe('testando componente "FavoritePokemons"', () => {
  it(`Teste se é exibida na tela a mensagem No favorite pokemon found, caso a 
    pessoa não tenha pokémons favoritos, ou caso a pessoa tenha pokemons
    favoritados, exiba todos os cards na tela`, () => {
    const favorites = JSON.parse(localStorage.getItem('favoritePokemonIds')) || [];

    renderWithRouter(<FavoritePokemons />);

    if (!favorites.length) {
      const paragraph = screen.getByText('No favorite pokemon found');
      expect(paragraph).toBeInTheDocument();
    } else {
      const pokemonsFavorites = favorites.length;
      const cardsPokemons = screen.getAllByTestId('pokemon-name');
      expect(cardsPokemons).toHaveLength(pokemonsFavorites);
    }
  });
});
