import AuthForm from "./AuthForm";
import imgPath from "../assets/login.jpg"
import getRoutes from '../routes.js';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import {
  Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';

const Login = () => {
    const { t } = useTranslation();

    return (
        <Container className="h-100" fluid>
          <Row className="justify-content-center align-content-center h-100">
            <Col className="col-12 col-md-8 col-xxl-6">
              <Card className="shadow-sm">
                <Card.Body className="p-5 row">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img
                      src={imgPath}
                      className="roundedCircle"
                      alt="Log in page"
                    />
                  </div>
                  <AuthForm />
                </Card.Body>
                <Card.Footer className="p-4">
                  <div className="text-center">
                    <span>{t('notAccount')}</span>
                    {' '}
                    <NavLink to={getRoutes.signupPagePath()}>{t('signUp')}</NavLink>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      );
}

export default Login;