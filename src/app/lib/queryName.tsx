import { gql } from "@apollo/client";

export const GET_POKEMON_NAME = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      image
      types
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      classification
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      evolutions {
        id
        name
      }
    }
  }
`;
