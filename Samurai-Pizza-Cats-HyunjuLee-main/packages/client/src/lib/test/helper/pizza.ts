import { ObjectId } from 'bson';

import { Pizza } from '../../../types/schema';

export const createTestPizza = (data: Partial<Pizza> = {}): Pizza & { __typename: string } => ({
  __typename: 'Pizza',
  id: new ObjectId().toHexString(),
  name: 'A Pizza',
  description: 'Test Description',
  imgSrc: 'Test imgSrc',
  priceCents: 350,
  toppingIds: [],
  toppings: [],
  ...data,
});
