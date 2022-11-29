export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Long: any;
  ObjectID: any;
};

export type CreatePizzaInput = {
  description: Scalars['String'];
  imgSrc: Scalars['String'];
  name: Scalars['String'];
  toppingIds: Array<Scalars['ObjectID']>;
};

export type CreateToppingInput = {
  name: Scalars['String'];
  priceCents: Scalars['Int'];
};

export type CursorResultsInput = {
  cursor?: InputMaybe<Scalars['ObjectID']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type DeletePizzaInput = {
  id: Scalars['ObjectID'];
};

export type DeleteToppingInput = {
  id: Scalars['ObjectID'];
};

export type GetPizzaResult = {
  __typename?: 'GetPizzaResult';
  cursor?: Maybe<Scalars['ObjectID']>;
  hasNextPage: Scalars['Boolean'];
  results: Array<Pizza>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPizza: Pizza;
  createTopping: Topping;
  deletePizza: Scalars['ObjectID'];
  deleteTopping: Scalars['ObjectID'];
  updatePizza: Pizza;
  updateTopping: Topping;
};

export type MutationCreatePizzaArgs = {
  input: CreatePizzaInput;
};

export type MutationCreateToppingArgs = {
  input: CreateToppingInput;
};

export type MutationDeletePizzaArgs = {
  input: DeletePizzaInput;
};

export type MutationDeleteToppingArgs = {
  input: DeleteToppingInput;
};

export type MutationUpdatePizzaArgs = {
  input: UpdatePizzaInput;
};

export type MutationUpdateToppingArgs = {
  input: UpdateToppingInput;
};

export type Pizza = {
  __typename?: 'Pizza';
  description: Scalars['String'];
  id: Scalars['ObjectID'];
  imgSrc: Scalars['String'];
  name: Scalars['String'];
  priceCents?: Maybe<Scalars['Int']>;
  toppingIds: Array<Scalars['String']>;
  toppings: Array<Topping>;
};

export type PizzaQueryArgs = {
  id: Scalars['ObjectID'];
};

export type Query = {
  __typename?: 'Query';
  getPizza: Array<Pizza>;
  pizzas: GetPizzaResult;
  toppings: Array<Topping>;
};

export type QueryPizzasArgs = {
  input?: InputMaybe<CursorResultsInput>;
};

export type Topping = {
  __typename?: 'Topping';
  id: Scalars['ObjectID'];
  name: Scalars['String'];
  priceCents: Scalars['Int'];
};

export type ToppingQueryArgs = {
  id: Scalars['ObjectID'];
};

export type UpdatePizzaInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ObjectID'];
  imgSrc?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  toppingIds?: InputMaybe<Array<InputMaybe<Scalars['ObjectID']>>>;
};

export type UpdateToppingInput = {
  id: Scalars['ObjectID'];
  name?: InputMaybe<Scalars['String']>;
  priceCents?: InputMaybe<Scalars['Int']>;
};
