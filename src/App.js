import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import BookingForm from './pages/BookingForm';
import Acknowledge from './pages/Acknowledge';
import ErrorPage from './pages/ErrorPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/library-booking-form', element: <BookingForm />, errorElement: <ErrorPage /> },
  { path: '/acknowledge', element: <Acknowledge />},
  { path: '/*', element: <Navigate to='/library-booking-form' /> },
]);


function App() {
  return (
    <div className="App">
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Library XYZ</Navbar.Brand>
        </Container>
      </Navbar>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
