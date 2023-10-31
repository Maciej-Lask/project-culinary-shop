import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './ContactPage.module.scss';

const ContactPage = () => (
  <div className={styles.contactPage}>
    <Container>
      <h1>Contact Us</h1>
      <Row>
        <Col lg={6}>
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>
              <strong>Address:</strong> 123 Main St, City, Country
            </p>
            <p>
              <strong>Email:</strong> info@example.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
          </div>
        </Col>
        <Col lg={6}>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter your message"
              />
            </Form.Group>

            <Button variant="warning" type="submit" className={styles.submit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  </div>
);

export default ContactPage;
