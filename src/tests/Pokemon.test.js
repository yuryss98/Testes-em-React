import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../helper/renderWithRouter';
import pokemons from '../data';

describe('Testando o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokemons[0] }
      showDetailsLink
    />);

    const pokemonName = screen.getByText('Pikachu');
    const pokemonType = screen.getByText('Electric');
    const pokemonPeso = screen.getByText('Average weight: 6.0 kg');
    const pokemonImage = screen.getByRole('img', { name: 'Pikachu sprite' });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonPeso).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do pokémon na Pokédex tem um link de mais detalhes', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokemons[0] }
      showDetailsLink
    />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkMoreDetails).toBeInTheDocument();
    expect(linkMoreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it('teste se ao clicar em More details, vai para a pagina de detalhes ', () => {
    const { history } = renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokemons[0] }
      showDetailsLink
    />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokemons[0] }
      showDetailsLink
    />);

    const favoriteIcon = screen.getByRole('img', { name: /Pikachu is marked/i });

    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
