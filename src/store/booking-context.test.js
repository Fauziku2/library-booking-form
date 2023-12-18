import { useContext } from 'react'
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import BookingContextProvider, { BookingContext, InitialState } from './booking-context';
import userEvent from '@testing-library/user-event'

const TestingComponent = ({ podNum }) => {
  const {
    formStatus,
    updateForm,
    updateAllToTouched,
    resetForm
  } = useContext(BookingContext);

  const createEvent = (id, value) => {
    return {
      target: {
        id,
        value,
        validity: { valid: true },
        form: { checkValidity: () => false }
      }
    }
  };

  return (
    <>
      <div data-testid="formStatus">{JSON.stringify(formStatus)}</div>
      <input type="text" aria-label="name" onInput={() => updateForm(createEvent('name', 'John'))}/>
      <input type="text" aria-label="podNum" onInput={() => updateForm(createEvent('podNum', podNum))}/>
      <button onClick={updateAllToTouched}>Update All to Touched</button>
      <button onClick={resetForm}>Reset Form</button>
    </>
  );
};
describe('BookingContextProvider', () => {
  test('update all form fields to touched', async () => {
    render(
      <BookingContextProvider>
        <TestingComponent />
      </BookingContextProvider>
    );

    const updateAllToTouchedBtn = screen.getByText('Update All to Touched');
    act(()=> userEvent.click(updateAllToTouchedBtn));
    await waitFor(() => {
      const text = screen.getByTestId('formStatus').textContent;
      expect(text).toStrictEqual(JSON.stringify(
        {
          ...InitialState,
          form: {
            name: { ...InitialState.form.name, isTouched: true },
            nric: { ...InitialState.form.nric, isTouched: true },
            podNum: { ...InitialState.form.podNum, isTouched: true },
            podLocation: { ...InitialState.form.podLocation, isTouched: true },
            bookingDate: { ...InitialState.form.bookingDate, isTouched: true },
            bookingTime: { ...InitialState.form.bookingTime, isTouched: true },
            duration: { ...InitialState.form.duration, isTouched: true }
          },
          isTouched: true
        }
      ));
    });
  })

  test('reset form to initial state', async () => {
    render(
      <BookingContextProvider>
        <TestingComponent />
      </BookingContextProvider>
    );

    const resetFormBtn = screen.getByText('Reset Form');
    userEvent.click(resetFormBtn)
    const text = screen.getByTestId('formStatus').textContent;
    expect(text).toStrictEqual(JSON.stringify(InitialState));
  });

  test('update the name field in the form', async () => {
    render(
      <BookingContextProvider>
        <TestingComponent />
      </BookingContextProvider>
    );

    const formInput = screen.getByRole('textbox', { name: 'name' });
    act(() => userEvent.type(formInput, 'John'));
    await waitFor(() => {
      const text = screen.getByTestId('formStatus').textContent;
      expect(text).toStrictEqual(JSON.stringify(
        {
          ...InitialState,
          form: {
            ...InitialState.form,
            name: {
              value: 'John',
              isValid: true,
              isTouched: true
            }
          },
          isTouched: true
        }
      ));
    })
  });


  test('pod location is "Green Room" when pon number is 1', async () => {
    render(
      <BookingContextProvider>
        <TestingComponent podNum="1" />
      </BookingContextProvider>
    );

    const formInput = screen.getByRole('textbox', { name: 'podNum' });
    act(() => userEvent.type(formInput, '1'));
    await waitFor(() => {
      const text = screen.getByTestId('formStatus').textContent;
      expect(text).toStrictEqual(JSON.stringify(
        {
          ...InitialState,
          form: {
            ...InitialState.form,
            podNum: {
              value: '1',
              isValid: true,
              isTouched: true
            },
            podLocation: {
              value: 'Green Room',
              isValid: true,
              isTouched: true
            }
          },
          isTouched: true
        }
      ));
    })
  });

  test('pod location is "Blue Room" when pon number is 5', async () => {
    render(
      <BookingContextProvider>
        <TestingComponent podNum="5" />
      </BookingContextProvider>
    );

    const formInput = screen.getByRole('textbox', { name: 'podNum' });
    act(() => userEvent.type(formInput, '5'));
    await waitFor(() => {
      const text = screen.getByTestId('formStatus').textContent;
      expect(text).toStrictEqual(JSON.stringify(
        {
          ...InitialState,
          form: {
            ...InitialState.form,
            podNum: {
              value: '5',
              isValid: true,
              isTouched: true
            },
            podLocation: {
              value: 'Blue Room',
              isValid: true,
              isTouched: true
            }
          },
          isTouched: true
        }
      ));
    })
  });
});
