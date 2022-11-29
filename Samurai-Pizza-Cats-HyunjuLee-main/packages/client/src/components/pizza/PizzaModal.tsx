import React from 'react';
import { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Backdrop, createStyles, Fade, makeStyles, Modal, Paper, Theme } from '@material-ui/core';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import { useQuery } from '@apollo/client';
import usePizzaMutations from '../../hooks/pizza/use-pizza-mutations';
import default_pizza from '../../assets/img/default-pizza.jpeg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 2, 2, 2),
    },
    root: {
      width: theme.typography.pxToRem(380),
    },

    img: {
      display: 'flex',
      magin: '0',
      paddingTop: '10px',
      justifyContent: 'center',
      alignItems: 'center',
      width: theme.typography.pxToRem(350),
      height: theme.typography.pxToRem(350),
      objectFit: 'cover',
    },
    h2Title1: {
      paddingTop: '10px',
      fontSize: '1.7vw',
    },
    h2Title2: {
      paddingTop: '10px',
      paddingBottom: '10px',
      fontSize: '1.7vw',
    },
    divPizzaInfo: {
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '10px',
    },
    divPizza: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    divDefault: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      display: 'flex',
      fontSize: '2vw',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      display: 'inline-block',
      textAlign: 'left',
      width: '7vw',
      fontSize: '1vw',
      gap: '5px',
    },
    input: {
      border: 'solid white',
      fontSize: '1vw',
      cursor: 'cursor',
      padding: '1px',
      width: '18vw',
      '&:hover': {
        border: 'solid #FF9BD7',
        borderRadius: '3px',
      },
    },
    divButton: {
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '15px',
    },

    divButtons: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      gap: '30px',
    },

    buttons: {
      border: 'none',
      backgroundColor: 'white',
      fontSize: '1.3vw',
      color: '#4B4B4B',
      fontWeight: 'bold',
      margin: '3px',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'lightGrey',
        borderRadius: '3px',
        margin: '3px',
      },
    },
  })
);

interface PizzaModalProps {
  selectedPizza?: any;
  setSelectedPizza: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ItoppingNameList {
  id: string;
  value: string;
  label: string;
}

const PizzaModal = ({ selectedPizza, setSelectedPizza, open, setOpen }: PizzaModalProps): JSX.Element => {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { onCreatePizza, onDeletePizza, onUpdatePizza } = usePizzaMutations();

  const validationSchema = yup.object({
    name: yup.string().required('Required'),
    description: yup.string().required('Required'),
    imgSrc: yup.string().required('Required'),
    toppingIds: yup.array().of(
      yup.object().shape({
        id: yup.string().required('Required'),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      id: selectedPizza?.id,
      name: selectedPizza?.name,
      description: selectedPizza?.description,
      imgSrc: selectedPizza?.imgSrc,
      toppingIds: selectedPizza?.toppingIds ? selectedPizza?.toppingIds : [],
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      let ids = values.toppingIds.map((topping: any) => topping.id);
      let newPizza = {};
      if (selectedPizza) {
        newPizza = {
          id: selectedPizza.id,
          name: values.name,
          description: values.description,
          imgSrc: values.imgSrc,
          toppingIds: ids,
        };
        onUpdatePizza(newPizza);
      } else {
        newPizza = {
          name: values.name,
          description: values.description,
          imgSrc: values.imgSrc,
          toppingIds: ids,
        };
        onCreatePizza(newPizza);
      }
      setOpen(false);
    },
  });

  const animatedComponents = makeAnimated();

  const { loading, data } = useQuery(GET_TOPPINGS);
  if (loading) {
    return <div>Loading ...</div>;
  }

  let toppingNameList: ItoppingNameList[] = [];

  data?.toppings.forEach((topping: any) => {
    toppingNameList.push({
      id: topping.id,
      value: topping.name,
      label: topping.name,
    });
  });

  const handleChange = (options: any) => {
    const toppingIds = options.map((option: any) => option.id.toString());
    setSelectedOptions(toppingIds.id);
    formik.values.toppingIds = options;
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={(): void => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          {selectedPizza ? (
            <div className={classes.divPizza}>
              {/* <h1 className={classes.title}>{selectedPizza.name}</h1> */}
              <h1 className={classes.title}>{formik.values.name}</h1>
              <img src={selectedPizza.imgSrc} className={classes.img} />
            </div>
          ) : (
            <div className={classes.divDefault}>
              <img src={default_pizza} className={classes.img} />
            </div>
          )}

          <form className={classes.root} noValidate autoComplete="off">
            <div className={classes.divPizzaInfo}>
              <h2 className={classes.h2Title1}> Detail</h2>
              <div>
                <label className={classes.label}>Name: </label>
                <input
                  className={classes.input}
                  id="name"
                  defaultValue={selectedPizza?.name ? selectedPizza.name : 'Name'}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label className={classes.label}>Description: </label>
                <input
                  className={classes.input}
                  id="description"
                  type="text"
                  defaultValue={selectedPizza?.description ? selectedPizza.description : 'Description'}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label className={classes.label}>Image URL: </label>
                <input
                  className={classes.input}
                  id="imgSrc"
                  type="text"
                  defaultValue={selectedPizza?.imgSrc ? selectedPizza.imgSrc : 'Image Url'}
                  onChange={formik.handleChange}
                />
              </div>
              <h2 className={classes.h2Title2}>Toppings</h2>
              <Select
                isMulti
                options={toppingNameList}
                components={animatedComponents}
                placeholder={
                  selectedPizza ? selectedPizza.toppings.map((topping: any) => topping.name + ' ') : 'Select...'
                }
                closeMenuOnSelect={false}
                onChange={handleChange}
                menuPlacement="top"
              />
            </div>
            {selectedPizza ? (
              <div className={classes.divButtons}>
                <button
                  className={classes.buttons}
                  aria-label="update"
                  onClick={(): void => {
                    formik.handleSubmit();
                    setOpen(false);
                  }}
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className={classes.buttons}
                  aria-label="delete"
                  onClick={(): void => {
                    onDeletePizza(selectedPizza);
                    setOpen(false);
                  }}
                  type="submit"
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className={classes.divButton}>
                <button
                  className={classes.buttons}
                  aria-label="create"
                  onClick={(): void => {
                    formik.handleSubmit();
                    setOpen(false);
                  }}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default PizzaModal;
