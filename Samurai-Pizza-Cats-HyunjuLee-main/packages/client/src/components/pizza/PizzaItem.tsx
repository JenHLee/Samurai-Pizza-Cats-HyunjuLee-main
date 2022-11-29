import { IconButton, Theme, Box, Card, CardContent } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import toDollars from '../../lib/format-dollars';
import { Pizza } from '../../types/schema';
import make_pizza from '../../assets/img/make-pizza.jpeg';

const useStyles = makeStyles(({ typography }: Theme) => ({
  pizzaContainer: {
    display: 'flex',
    width: '30%',
    margin: '10px',
    padding: 0,
  },

  pizzaCard: {
    display: 'flex',
    width: '40vw',
    height: '65vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
  },

  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    padding: 'auto',
    '&:hover': {
      backgroundColor: 'lightgrey',
      cursor: 'pointer',
    },
  },

  buttonDiv: {
    border: 'none',
    backgroundColor: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  cardDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    paddingTop: '20px',
  },

  pizzaImg: {
    width: '20vw',
    height: '20vw',
    objectFit: 'cover',
  },

  cardData: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  newPizzaDiv: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    backgroundImage: `url(${make_pizza})`,
    backgroundSize: '100%',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
  },

  newPizzaTitle: {
    color: 'white',
    fontSize: '2.5vw',
    paddingTop: '20px',
    flex: '1',
  },

  addButton: {
    paddingBottom: '20px',
    fontSize: '2.5vw',
    flex: '8',
    color: 'white',
    transition: '0.3s',
    cursor: 'pointer',
    '&:hover': {
      color: 'grey',
    },
  },

  editButton: {
    cursor: 'pointer',
    '&:hover': {
      color: 'white',
    },
  },
}));
export interface PizzaItemProps {
  pizza?: Pizza;
  handleOpen: (pizza?: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, handleOpen, ...props }) => {
  const classes = useStyles();

  return (
    <Box className={classes.pizzaContainer}>
      <Card className={classes.pizzaCard} {...props}>
        {pizza ? (
          <CardContent style={{ padding: '0', width: '100%', height: '100%' }} className={classes.cardContent}>
            <div className={classes.cardDiv}>
              <p data-testid={`pizza-imgSrc-${pizza?.id}`}>
                {/* <button edge="end" aria-label="modify" type="button" onClick={(): void => handleOpen(pizza)}> */}
                <button type="button" className={classes.buttonDiv} onClick={(): void => handleOpen(pizza)}>
                  <img src={pizza?.imgSrc} className={classes.pizzaImg} />
                </button>
              </p>
            </div>
            <div className={classes.cardData}>
              <h2 data-testid={`pizza-name-${pizza?.id}`} style={{ fontSize: '2vw', paddingBottom: '0.5vw' }}>
                {pizza?.name}
              </h2>
              <span
                data-testid={`pizza-description-${pizza?.id}`}
                style={{ fontSize: '1.2vw', paddingBottom: '0.5vw' }}
              >
                {' '}
                {pizza?.description}
              </span>
              <p data-testid={`pizza-priceCents-${pizza?.id}`} style={{ fontSize: '1.2vw' }}>
                {pizza?.priceCents ? toDollars(pizza.priceCents) : ''}
              </p>
            </div>
          </CardContent>
        ) : (
          <CardContent style={{ padding: '0', width: '100%', height: '100%' }}>
            <div className={classes.newPizzaDiv}>
              <h2 className={classes.newPizzaTitle}>Make a New Pizza</h2>
              <IconButton
                edge="end"
                aria-label="modify"
                type="button"
                onClick={(): void => handleOpen(pizza)}
                style={{ cursor: 'none' }}
              >
                <AddCircle className={classes.addButton} />
              </IconButton>
            </div>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default PizzaItem;
