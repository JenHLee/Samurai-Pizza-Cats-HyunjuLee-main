import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { GET_PIZZA } from './../graphql/pizza/queries/get-pizza';
import { CREATE_PIZZA } from './../graphql/pizza/mutations/create-pizza';
import { DELETE_PIZZA } from './../graphql/pizza/mutations/delete-pizza';
import { UPDATE_PIZZA } from './../graphql/pizza/mutations/update-pizza';

interface UsePizzaMutationsOutput {
  onCreatePizza: (selectedPizza: any) => void;
  onDeletePizza: (selectedPizza: any) => Promise<void>;
  onUpdatePizza: (selectedPizza: any) => void;
}

const usePizzaMutations = (): UsePizzaMutationsOutput => {
  const [createPizza] = useMutation(CREATE_PIZZA, { refetchQueries: [GET_PIZZA, 'Toppings'] });
  const [deletePizza] = useMutation(DELETE_PIZZA, { refetchQueries: [GET_PIZZA, 'Toppings'] });
  const [updatePizza] = useMutation(UPDATE_PIZZA);

  const onCreatePizza = useCallback(
    (selectedPizza) => {
      try {
        createPizza({
          variables: {
            createPizzaInput: {
              name: selectedPizza.name,
              description: selectedPizza.description,
              imgSrc: selectedPizza.imgSrc,
              toppingIds: selectedPizza.toppingIds,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [createPizza]
  );

  const onDeletePizza = useCallback(
    async (selectedPizza) => {
      try {
        await deletePizza({
          variables: {
            deletePizzaInput: {
              id: selectedPizza.id,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [deletePizza]
  );

  const onUpdatePizza = useCallback(
    (selectedPizza) => {
      try {
        updatePizza({
          variables: {
            updatePizzaInput: {
              id: selectedPizza.id,
              name: selectedPizza?.name,
              imgSrc: selectedPizza?.imgSrc,
              description: selectedPizza?.description,
              toppingIds: selectedPizza?.toppingIds,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [updatePizza]
  );
  return { onCreatePizza, onDeletePizza, onUpdatePizza };
};

export default usePizzaMutations;
