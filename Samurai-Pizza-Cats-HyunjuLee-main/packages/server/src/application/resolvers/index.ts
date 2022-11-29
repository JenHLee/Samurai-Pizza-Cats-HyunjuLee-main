import { merge } from 'lodash';

import { toppingResolver } from './topping.resolver';
import { pizzaResolver } from './pizza.resolver';

const resolvers = merge(toppingResolver, pizzaResolver);

export { resolvers };
