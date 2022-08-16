import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../helper/renderWithRouter';
import pokemons from '../data';

describe('testando o componente Pokedex', () => {
  it(`Teste se a página contém um heading h2 com o texto
    Encountered pokémons`, () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ { 25: true } }
      pokemons={ pokemons }
    />);

    const title = screen.getByRole('heading', { level: 2, name: /Encountered/i });
    expect(title).toBeInTheDocument();
  });

  it(`teste se ao clicar no botão de proximo pokemon
    é exibido o proximo pokemon da lista`, () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ { 25: true } }
      pokemons={ pokemons }
    />);

    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNextPokemon).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    });
  });

  it('teste se a pokedex tem os botões de filtrar por tipo', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ { 25: true } }
      pokemons={ pokemons }
    />);

    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();

    const btnPokemonsType = screen.getAllByTestId('pokemon-type-button');

    btnPokemonsType.forEach((btn) => {
      const btnType = btn.textContent;
      const btnName = screen.getByRole('button', { name: btnType });
      expect(btnName).toBeInTheDocument();
    });

    userEvent.click(btnPokemonsType[1]);

    const pokemonName = screen.getByText('Charmander');
    expect(pokemonName).toBeInTheDocument();

    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnNextPokemon);

    const nextPokemonName = screen.getByText('Rapidash');
    expect(nextPokemonName).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ { 25: true } }
      pokemons={ pokemons }
    />);

    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnAll);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNextPokemon).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      const pokemonName = screen.getByText(name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    });
  });
});
