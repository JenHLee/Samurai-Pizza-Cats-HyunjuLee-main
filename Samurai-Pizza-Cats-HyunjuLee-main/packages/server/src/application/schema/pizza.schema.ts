import { gql } from 'apollo-server';

// It's related to client side, there is no toppingIds.
const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    toppingIds: [String!]!
    toppings: [Topping!]!
    imgSrc: String!
    priceCents: Int
  }

  type GetPizzaResult {
    results: [Pizza!]!
    totalCount: Int
    hasNextPage: Boolean!
    cursor: ObjectID
  }

  input CursorResultsInput {
    limit: Int
    cursor: ObjectID
  }

  type Query {
    pizzas(input: CursorResultsInput): GetPizzaResult!
    getPizza: [Pizza!]!
  }

  input PizzaQueryArgs {
    id: ObjectID!
  }

  type Mutation {
    createPizza(input: CreatePizzaInput!): Pizza!
    deletePizza(input: DeletePizzaInput!): ObjectID!
    updatePizza(input: UpdatePizzaInput!): Pizza!
  }

  input CreatePizzaInput {
    name: String!
    description: String!
    imgSrc: String!
    toppingIds: [ObjectID!]!
  }

  input DeletePizzaInput {
    id: ObjectID!
  }

  input UpdatePizzaInput {
    id: ObjectID!
    name: String
    description: String
    toppingIds: [ObjectID]
    imgSrc: String
  }
`;

export { typeDefs };
