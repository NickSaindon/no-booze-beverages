import Layout from '../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from "next/image";

const OrderSuccess = () => {
  return (
    <Layout title={`Successful Order`}>
      <div className="place-order-container page-contain py-5">
        <Container className="pt-5">
          <Row>
            <Col lg={12}>
            <Card className="shadow mb-4">
              <Card.Body className="text-center">
                <Image src="/images/no-booze-logo.png" className="my-5" width={150} height={150} alt=""/>
                <h2 className="card-title text-primary">Order Completed</h2>
                <h4>Thank you for your order!</h4>
                <p>We will send an email when your order has been shipped.</p>
                <Link href="/"><button type="button" className="btn btn-link"><i className="bi bi-arrow-left"></i> Continue Shopping</button></Link>
              </Card.Body>
            </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export default OrderSuccess;