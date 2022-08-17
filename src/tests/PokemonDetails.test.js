import React from 'react';
import { screen } from '@testing-library/react';
import PokemonDetails from '../pages/PokemonDetails';
import renderWithRouter from '../helper/renderWithRouter';
import pokemons from '../data';

describe('testando componente PokemonDetails', () => {
  it('As informações detalhadas do pokémon devem ser mostradas na tela', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
      match={ { params: { id: '25' } } }
    />);

    const nomeDatail = screen.getByRole('heading', { level: 2, name: /Pikachu Detail/i });
    expect(nomeDatail).toBeInTheDocument();

    const linkMoreDetails = screen.queryByRole('link', { name: 'More details' });
    expect(linkMoreDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(summary).toBeInTheDocument();

    const resumoPokemons = screen.getByText(/This intelligent Pokémon roasts hard/i);
    expect(resumoPokemons).toBeInTheDocument();
  });

  it('testando os mapas de localização do pokemon', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
      match={ { params: { id: '25' } } }
    />);

    const locations = screen.getByRole('heading', { level: 2, name: /Game Locations/i });
    expect(locations).toBeInTheDocument();

    const mapaLocation1 = screen.getByText('Kanto Viridian Forest');
    const mapaLocation2 = screen.getByText('Kanto Power Plant');
    expect(mapaLocation1).toBeInTheDocument();
    expect(mapaLocation2).toBeInTheDocument();

    const mapaLocationImage = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(mapaLocationImage).toHaveLength(2);
    expect(mapaLocationImage[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapaLocationImage[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Teste se o usuário pode favoritar um pokémon', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
      match={ { params: { id: '25' } } }
    />);

    const checkBox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    const checkBoxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkBox).toBeInTheDocument();
    expect(checkBoxLabel).toBeInTheDocument();
  });
});
