import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';

import { Container, createStyles, Theme } from '@material-ui/core';
import { Pizza } from '../../types/schema';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import PageHeader from '../common/PageHeader';
import PizzaModal from './PizzaModal';
import PizzaItem from './PizzaItem';

const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    header: {
      paddingLeft: '70px',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    skeleton: {
      display: 'flex',
      justifyContent: 'center',
      verticalAlign: 'center',
    },
    morePizzaButton: {
      display: 'flex',
      paddingLeft: '80px',
      cursor: 'pointer',
      border: 'none',
      color: 'Black',
      background: 'none',
      fontWeight: 'bold',
      fontSize: '1.2vw',
      '&:hover': {
        color: 'grey',
      },
    },

    clickButtonDiv: {
      paddingTop: '20px',
      paddingBottom: '50px',
      cursor: 'pointer',
    },
  })
);

const PizzaList: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState<Partial<Pizza>>();

  const [limit, setLimit] = useState(5);
  const { loading, error, data } = useQuery(GET_PIZZAS, {
    variables: {
      input: {
        cursor: 'default',
        limit,
      },
    },
  });

  const onNextPageClick = () => setLimit((current) => current + 3);

  const handleOpen = (pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setOpen(true);
  };

  if (loading) {
    return (
      <div data-testid={`pizza-list-loading`} className={classes.skeleton}>
        Loading ...
      </div>
    );
  }

  const pizzaItemList = data?.pizzas.results.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} handleOpen={handleOpen} pizza={pizza} />
  ));

  return (
    <>
      <div data-testid={`pizza-item-test`}></div>
      <div className={classes.header}>
        <PageHeader pageHeader={'Pizzas'} />
      </div>
      <Container maxWidth="xl" className={classes.container}>
        {error ? error.graphQLErrors : <PizzaItem key="add-pizza" handleOpen={handleOpen} />}
        {pizzaItemList}
        <PizzaModal selectedPizza={selectedPizza} setSelectedPizza={setSelectedPizza} open={open} setOpen={setOpen} />
      </Container>
      <div className={classes.clickButtonDiv}>
        <button onClick={onNextPageClick} className={classes.morePizzaButton}>
          See More Pizzas...
        </button>
      </div>
    </>
  );
};

export default PizzaList;
