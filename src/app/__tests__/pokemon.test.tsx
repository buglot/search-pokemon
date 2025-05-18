interface Pokemon {
  name: string;
  types: string[];
}

const bulbasaur: Pokemon = { name: 'Bulbasaur', types: [ 'Poison','Grass'] };
const charmander: Pokemon = { name: 'Charmander', types: ['Fire'] };
const squirtle: Pokemon = { name: 'Squirtle', types: ['Water'] };

describe('Pokemon Type Tests', () => {
  it('Bulbasaur is Grass type', () => {
    expect(bulbasaur.types).toContain('Grass');
  });

  it('Charmander is Fire type', () => {
    expect(charmander.types).toContain('Fire');
  });

  it('Squirtle is Water type', () => {
    expect(squirtle.types).toContain('Water');
  });
});