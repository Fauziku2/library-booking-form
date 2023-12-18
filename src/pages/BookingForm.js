import { useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { BookingContext } from '../store/booking-context'
import moment from 'moment'

const BookingForm = () => {
  const navigate = useNavigate();
  const bookingContext = useContext(BookingContext);

  useEffect(() => {
    getMinDate();
    bookingContext.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateDurationList = (bookingTime) => {
    const list = [
      { value: 0.5, text: '30 mins'},
      { value: 1, text: '1 hr'},
      { value: 1.5, text: '1.5 hrs'},
      { value: 2, text: '2 hrs'}
    ];
    if (bookingTime === '19:30') list.splice(-3);
    if (bookingTime === '19:00') list.splice(-2);
    if (bookingTime === '18:30') list.splice(-1);
    return list;
  };

  const timeList = useMemo(() => {
    const timeArr = [
      '12:00', '12:30', '13:00', '13.30', '14:00', '14:30', '15:00', '15:30', '16:00',
      '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
    ]
    if (bookingContext.formStatus.form.bookingDate.value === moment().format('YYYY-MM-DD')) {
      return timeArr.filter(time => {
        const formattedTime = time.split(':').join('');
        return Number(formattedTime) > Number(moment().format('Hmm'));
      })
    }
    return timeArr
  }, [bookingContext.formStatus.form.bookingDate.value])

  const durationList = useMemo(() =>{
    return updateDurationList(bookingContext.formStatus.form.bookingTime.value);
  }, [bookingContext.formStatus.form.bookingTime.value]);

  const onInputHandle = (evt) => {
    bookingContext.updateForm(evt);
  };

  const onSubmitForm = (evt) => {
    evt.preventDefault();
    const isValidate = evt.currentTarget.checkValidity();
    if (isValidate) {
      navigate('/acknowledge');
      evt.currentTarget.reset();
      return;
    }
    bookingContext.updateAllToTouched();
  };

  const getMinDate = () => {
    const todayDate = new Date()
    const date = todayDate.getDate();
    const month = todayDate.getMonth() + 1;
    const year = todayDate.getFullYear();
    return `${year}-${month}-${date}`;
  };

  const isInvalid = (field) => {
    return !bookingContext.formStatus.form[field].isValid && bookingContext.formStatus.form[field].isTouched;
  };

  return (
    <Container>
      <Row className="my-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Form noValidate onSubmit={onSubmitForm}>
            <Form.Group
              className="mb-3"
              controlId="name"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="Text"
                onBlur={onInputHandle}
                required
                isInvalid={isInvalid('name')}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="nric"
            >
              <Form.Label>NRIC</Form.Label>
              <Form.Control
                type="Text"
                onBlur={onInputHandle}
                isInvalid={isInvalid('nric')}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid NRIC.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="podNum"
            >
              <Form.Label>Pod Number</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={onInputHandle}
                onBlur={onInputHandle}
                placeholder="Select Pod"
                isInvalid={isInvalid('podNum')}
                required
              >
                <option value="">Select Pod</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a pod number.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="podLocation"
            >
              <Form.Label>Pod Location</Form.Label>
              <Form.Control
                type="Text"
                value={bookingContext.formStatus.form.podLocation.value}
                required
                readOnly
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="bookingDate"
            >
              <Form.Label>Date of Booking</Form.Label>
              <Form.Control
                type="date"
                min={getMinDate()}
                onBlur={onInputHandle}
                onChange={onInputHandle}
                onFocus={(evt) => evt.target.showPicker()}
                isInvalid={isInvalid('bookingDate')}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please select a date.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="bookingTime"
            >
              <Form.Label>Timing of Booking</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onBlur={onInputHandle}
                onChange={onInputHandle}
                isInvalid={isInvalid('bookingTime')}
                required
              >
                <option value="">Select Timing</option>
                {
                  timeList.map(time => (
                    <option key={time} value={time}>
                      { moment(time, ['HH:mm']).format('hh:mm a') }
                    </option>
                  ))
                }
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select timing.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="duration"
            >
              <Form.Label>Duration of Booking</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onBlur={onInputHandle}
                onChange={onInputHandle}
                isInvalid={isInvalid('duration')}
                required
              >
                <option value="">Select Duration</option>
                { durationList.map(duration => (
                  <option key={duration.value} value={duration.value}>{duration.text}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select duration.
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              className="float-end"
              variant="outline-primary"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;
