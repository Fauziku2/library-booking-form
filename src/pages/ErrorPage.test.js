import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage';
import { BookingContext } from '../store/booking-context';

describe('ErrorPage component', () => {

  const defaultVal = {
    formStatus: {},
    updateForm: jest.fn(),
    updateAllToTouched: jest.fn(),
    resetForm: jest.fn()
  }

  test('render "An error occurred!" as a text', () => {
    render(
      <BrowserRouter>
        <BookingContext.Provider value={defaultVal}>
          <ErrorPage />
        </BookingContext.Provider>
      </BrowserRouter>
    );

    const textElement = screen.getByText('An error occurred!');
    expect(textElement).toBeInTheDocument();
  });
});
