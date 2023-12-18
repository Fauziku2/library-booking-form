import { render, screen } from '@testing-library/react'
import App from './App';
import { BookingContext, InitialState } from './store/booking-context'

describe('App component', () => {

  const defaultVal = {
    formStatus: { ...InitialState },
    updateForm: jest.fn(),
    updateAllToTouched: jest.fn(),
    resetForm: jest.fn()
  }

  test('render "Library XYZ" as a text', () => {
    render(
      <BookingContext.Provider value={defaultVal}>
        <App />
      </BookingContext.Provider>
    )

    const libraryNameElement = screen.getByText('Library XYZ');
    expect(libraryNameElement).toBeInTheDocument();
  })
});
