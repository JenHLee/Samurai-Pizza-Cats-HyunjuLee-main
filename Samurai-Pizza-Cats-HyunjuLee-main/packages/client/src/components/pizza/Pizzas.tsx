import React from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { Container, createStyles, List, ListItem, Theme } from '@material-ui/core';

// import { Topping } from '../../types';
// import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import PageHeader from '../common/PageHeader';

const Pizzas: React.FC = () => {
  return (
    // <Container maxWidth="md">
    <Container maxWidth="xl">
      <PageHeader pageHeader={'Under construction'} />
      <img alt="under-construction" src="./codingcat.jpeg" />
    </Container>
  );
};

export default Pizzas;
