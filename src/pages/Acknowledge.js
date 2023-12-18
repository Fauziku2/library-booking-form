import { useEffect, useContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { BookingContext } from '../store/booking-context'

const Acknowledge = () => {
  const navigate = useNavigate();
  const bookingContext = useContext(BookingContext);
  const [bookingTiming, setBookingTiming] = useState([]);

  useEffect(() => {
    if (!bookingContext.formStatus.form.name.value) {
      navigate('/');
    }
  }, [bookingContext.formStatus.form.name.value, navigate, bookingContext]);

  const getStartEndTime = useCallback(() => {
    const durationTime = bookingContext.formStatus.form.bookingTime.value;
    const durationVal = Number(bookingContext.formStatus.form.duration.value);
    let duration;
    if (durationVal === 0.5) duration = { hours: 0, minutes: 30 };
    if (durationVal === 1) duration = { hours: 1, minutes: 0 };
    if (durationVal === 1.5) duration = { hours: 1, minutes: 30 };
    if (durationVal === 2) duration = { hours: 2, minutes: 0 };
    return [
      moment(durationTime, ['HH:mm']).format('hh:mm a'),
      moment(durationTime, ['HH:mm']).add(duration).format('hh:mm a')
    ]
  }, [bookingContext.formStatus.form.bookingTime.value, bookingContext.formStatus.form.duration.value]);

  useEffect(() => {
    const timing = getStartEndTime();
    setBookingTiming(timing)
  }, [getStartEndTime]);

  const formatDate = () => {
    if (!bookingContext.formStatus.form.bookingDate.value) {
      return null;
    }
    const savedDate = new Date(bookingContext.formStatus.form.bookingDate.value)
    const date = savedDate.getDate();
    const month = savedDate.getMonth() + 1;
    const year = savedDate.getFullYear();
    return `${date} / ${month} / ${year}`;
  }

  const goToForm = () => {
    navigate('/');
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Booking Confirmation</h1>
          <div className="mb-3">
            <strong>Name: </strong>{bookingContext.formStatus.form.name.value}
          </div>
          <div className="mb-3">
            <strong>NRIC: </strong>{bookingContext.formStatus.form.nric.value}
          </div>
          <div className="mb-3">
            <strong>Pod Number: </strong>{bookingContext.formStatus.form.podNum.value}
          </div>
          <div className="mb-3">
            <strong>Pod Location: </strong>{bookingContext.formStatus.form.podLocation.value}
          </div>
          <div className="mb-3">
            <strong>Date of Booking: </strong>{formatDate()}
          </div>
          {
            bookingTiming.length && (
              <div className="mb-3">
                <strong>Timing of Booking: </strong>{ `${bookingTiming[0]} - ${bookingTiming[1]}` }
              </div>
            )
          }
          <div>
            <Button
              variant="outline-primary"
              onClick={goToForm}
            >
              Go back to form
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Acknowledge;
