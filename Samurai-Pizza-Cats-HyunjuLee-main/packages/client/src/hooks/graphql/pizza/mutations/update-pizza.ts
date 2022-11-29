import { gql } from '@apollo/client';

export const UPDATE_PIZZA = gql`
  mutation ($updatePizzaInput: UpdatePizzaInput!) {
    updatePizza(input: $updatePizzaInput) {
      id
      name
      imgSrc
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
