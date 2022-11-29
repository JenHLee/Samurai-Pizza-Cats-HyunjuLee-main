import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query getPizzas($input: CursorResultsInput!) {
    pizzas(input: $input) {
      results {
        id
        imgSrc
        name
        description
        toppingIds
        toppings {
          id
          name
        }
        priceCents
      }
      totalCount
      hasNextPage
      cursor
    }
  }
`;

export { GET_PIZZAS };
