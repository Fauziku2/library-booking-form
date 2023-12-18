import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Acknowledge from './Acknowledge';
import { BookingContext } from '../store/booking-context';

const defaultVal = {
  formStatus: {
    form: {
      name: {
        value: 'John',
        isValid: true,
        isTouched: true
      },
      nric: {
        value: 'S1234567J',
        isValid: true,
        isTouched: true
      },
      podNum: {
        value: '2',
        isValid: true,
        isTouched: true
      },
      podLocation: {
        value: 'Green Room',
        isValid: true,
        isTouched: true
      },
      bookingDate: {
        value: '2023-12-19',
        isValid: true,
        isTouched: true
      },
      bookingTime: {
        value: '14:00',
        isValid: true,
        isTouched: true
      },
      duration: {
        value: '1',
        isValid: true,
        isTouched:  true
      }
    },
    isTouched: true,
    isValid: true
  }
}

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('Acknowledge component', () => {

  beforeEach(() => {
    mockUsedNavigate.mockReset();
  })

  test('render "Booking Confirmation" as a text', () => {
    render(
      <BookingContext.Provider value={defaultVal}>
        <Acknowledge />
      </BookingContext.Provider>
    );
    const bookingConfirmationElement = screen.getByText('Booking Confirmation');
    expect(bookingConfirmationElement).toBeInTheDocument();
  });

  test('navigate to have been called when button is click', () => {
    render(
      <BookingContext.Provider value={defaultVal}>
        <Acknowledge />
      </BookingContext.Provider>
    );
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);
    expect(mockUsedNavigate).toHaveBeenCalledWith('/');
  });

  test('navigate to have been called when form name value is empty', () => {
    const emptyForm = {
      ...defaultVal,
      formStatus: {
        form: {
          ...defaultVal.formStatus.form,
          name: {
            value: '',
            isValid: false,
            isTouched: false
          }
        }
      }
    };
    render(
      <BookingContext.Provider value={emptyForm}>
        <Acknowledge />
      </BookingContext.Provider>
    );
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);
    expect(mockUsedNavigate).toHaveBeenCalledWith('/');
  });

  test('check booking end time to be correct when duration is 0.5hrs', async () => {
    const newFormStatus = {
      ...defaultVal,
      formStatus: {
        form: {
          ...defaultVal.formStatus.form,
          duration: {
            value: '0.5',
            isValid: true,
            isTouched:  true
          }
        }
      }
    };
    render(
      <BookingContext.Provider value={newFormStatus}>
        <Acknowledge />
      </BookingContext.Provider>
    );
    const textEl = await screen.findByText('02:30 pm', { exact: false });
    expect(textEl).toBeInTheDocument();
  });

  test('check booking end time to be correct when duration is 1.5hrs', async () => {
    const newFormStatus = {
      ...defaultVal,
      formStatus: {
        form: {
          ...defaultVal.formStatus.form,
          duration: {
            value: '1.5',
            isValid: true,
            isTouched:  true
          }
        }
      }
    };
    render(
      <BookingContext.Provider value={newFormStatus}>
        <Acknowledge />
      </BookingContext.Provider>
    );
    const textEl = await screen.findByText('03:30 pm', { exact: false });
    expect(textEl).toBeInTheDocument();
  });

  test('check booking end time to be correct when duration is 2hrs', async () => {
    const newFormStatus = {
      ...defaultVal,
      formStatus: {
        form: {
          ...defaultVal.formStatus.form,
          duration: {
            value: '2',
            isValid: true,
            isTouched:  true
          }
        }
      }
    };
    render(
      <BookingContext.Provider value={newFormStatus}>
        <Acknowledge />
      </BookingContext.Provider>
    );
    const textEl = await screen.findByText('04:00 pm', { exact: false });
    expect(textEl).toBeInTheDocument();
  });
});
