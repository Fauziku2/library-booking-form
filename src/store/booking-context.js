import { createContext, useState } from 'react';

const room = {
  Green: [1, 2, 3],
  Blue: [4, 5, 6],
  Red: [7, 8]
}

export const BookingContext = createContext({
  formStatus: {},
  updateForm: () => {},
  updateAllToTouched: () => {},
  resetForm: () => {}
});

export const InitialState = {
  form: {
    name: {
      value: '',
      isValid: false,
      isTouched: false
    },
    nric: {
      value: '',
      isValid: false,
      isTouched: false
    },
    podNum: {
      value: '',
      isValid: false,
      isTouched: false
    },
    podLocation: {
      value: '',
      isValid: false,
      isTouched: false
    },
    bookingDate: {
      value: '',
      isValid: false,
      isTouched: false
    },
    bookingTime: {
      value: '',
      isValid: false,
      isTouched: false
    },
    duration: {
      value: '',
      isValid: false,
      isTouched: false
    }
  },
  isTouched: false,
  isValid: false
}

const BookingContextProvider = ({children}) => {
  const [formStatus, setFormStatus] = useState(InitialState);

  const onUpdate = (evt) => {
    setFormStatus(prevVal => {
      let newVal = { ...prevVal };
      let field = newVal.form[evt.target.id];
      field.value = evt.target.value;
      field.isValid = evt.target.validity.valid;
      field.isTouched = true;
      if (evt.target.id === 'podNum') {
        for (const key in room) {
          if (room[key].includes(Number(evt.target.value))) {
            newVal.form.podLocation.value = `${key} Room`;
            newVal.form.podLocation.isValid = true;
            newVal.form.podLocation.isTouched = true;
            break;
          }
        }
      }
      return {
        form: { ...newVal.form },
        isTouched: true,
        isValid: evt.target.form.checkValidity()
      }
    });
  };

  const updateToTouched = () => {
    setFormStatus(prevState => {
      let newState = { ...prevState };
      for (const key in newState.form) {
        newState.form[key].isTouched = true;
      }
      newState.isTouched = true;
      return newState;
    });
  };

  const resetForm = () => {
    setFormStatus(InitialState);
  }

  const defaultVal = {
    formStatus,
    updateForm: onUpdate,
    updateAllToTouched: updateToTouched,
    resetForm
  }

  return (
    <BookingContext.Provider value={defaultVal}>{children}</BookingContext.Provider>
  )
};

export default BookingContextProvider;
