import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import moment from 'moment/moment'
import BookingForm from './BookingForm';
import { BookingContext, InitialState } from '../store/booking-context';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));
describe('BookingForm component', () => {

  const bookingContext = {
    formStatus: { ...InitialState },
    updateForm: jest.fn(),
    updateAllToTouched: jest.fn(),
    resetForm: jest.fn()
  }

  beforeEach(() => {
    mockUsedNavigate.mockReset();
  })

  test('render "Pod Number" as a text', () => {
    render(
      <BookingContext.Provider value={bookingContext}>
        <BookingForm />
      </BookingContext.Provider>
    )

    const textElement = screen.getByText('Pod Number');
    expect(textElement).toBeInTheDocument();
  });

  test('error message is show when input is invalid and submit button is clicked', () => {
    render(
      <BookingContext.Provider value={bookingContext}>
        <BookingForm />
      </BookingContext.Provider>
    )

    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);
    const textElement = screen.getByText('Please provide a valid name.');
    expect(textElement).toBeInTheDocument();
  });

  test('"updateForm" will be called on form input', async () => {
    render(
      <BookingContext.Provider value={bookingContext}>
        <BookingForm />
      </BookingContext.Provider>
    )

    const input = screen.getByLabelText('Name');
    userEvent.type(input, 'John');
    userEvent.tab();
    expect(input).toHaveDisplayValue('John');
    expect(bookingContext.updateForm).toHaveBeenCalled();
  });

  test('testing form input is successful',
    async () => {
    const newBookingContext = {
      ...bookingContext,
      formStatus: {
        form: {
          ...bookingContext.formStatus.form,
          podLocation: {
            value: 'Blue Room',
            isValid: true,
            isTouched: true
          },
          bookingDate: {
            value: '2023-12-19',
            isValid: true,
            isTouched: true
          }
        }
      }
    }
    render(
      <BookingContext.Provider value={newBookingContext}>
        <BookingForm />
      </BookingContext.Provider>
    )

    // Fill the form
    const nameInput = screen.getByLabelText('Name');
    userEvent.type(nameInput, 'John');
    const nricInput = screen.getByLabelText('NRIC');
    userEvent.type(nricInput, 'S1234567J');
    const podNumInput = screen.getByLabelText('Pod Number');
    await userEvent.selectOptions(podNumInput, '6');
    const bookingDateInput = screen.getByLabelText('Date of Booking');
    const podLocInput = screen.getByLabelText('Pod Location');
    fireEvent.change(bookingDateInput, { target: { value: moment().format('YYYY-MM-DD') } });
    const durationInput = screen.getByLabelText('Duration of Booking');
    await userEvent.selectOptions(durationInput, '0.5');
    const dateEvent = { target: { showPicker: jest.fn() } }
    fireEvent.focus(bookingDateInput, dateEvent);

    expect(nameInput).toHaveDisplayValue('John');
    expect(nricInput).toHaveDisplayValue('S1234567J');
    expect(podNumInput).toHaveDisplayValue('6');
    expect(bookingDateInput).toHaveDisplayValue('2023-12-19');
    expect(podLocInput).toHaveDisplayValue('Blue Room');
    expect(durationInput).toHaveDisplayValue('30 mins');
    expect(bookingContext.updateForm).toHaveBeenCalled();
    expect(dateEvent.target.showPicker).toHaveBeenCalled();
  });
});
