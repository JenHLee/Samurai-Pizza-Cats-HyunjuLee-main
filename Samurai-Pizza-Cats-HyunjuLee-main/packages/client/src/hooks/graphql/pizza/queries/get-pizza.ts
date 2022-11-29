import { gql } from '@apollo/client';

const GET_PIZZA = gql`
  query Get_Pizza {
    pizzas {
      id
      imgSrc
      name
      description
      toppings {
        id
        name
        priceCents
      }
      priceCents
    }
  }
`;

export { GET_PIZZA };
