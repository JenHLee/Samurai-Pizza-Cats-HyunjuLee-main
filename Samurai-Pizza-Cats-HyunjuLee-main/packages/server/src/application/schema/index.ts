import { gql } from 'apollo-server-core';
import { typeDefs as toppingTypeDefs } from './topping.schema';
import { typeDefs as pizzaTypeDefs } from './pizza.schema';

const scalarSchema = gql`
  scalar ObjectID
  scalar Long
`;

const typeDefs = gql`
  ${scalarSchema}
  ${toppingTypeDefs}
  ${pizzaTypeDefs}
`;

export { typeDefs };
