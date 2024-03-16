import Layout from '../components/Layout';
import { useEffect, useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';

const OrderSuccess = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
      const fetchOrderDetails = async () => {
          try {
              const response = await axios.get(`/api/orders/${orderId}`);
              setOrderDetails(response.data);
          } catch (error) {
              console.error('Error fetching order details:', error);
          }
      };

      if (orderId) {
          fetchOrderDetails();
      }
  }, [orderId]);

  return (
    <Layout title={`Successful Order`}>
      <div className="place-order-container page-contain py-5">

        <Container className="pt-5">
        {orderDetails ? (
          <Row>
            <Col lg={12}>
            <Card className="shadow mb-4">
              <Card.Body className="text-center">
                <Image src="/images/no-booze-logo.png" className="my-5" width={150} height={150} alt=""/>
                <h2 className="card-title text-primary">Order Completed</h2>
                <h4>Thank you for your order!</h4>
                <p>We will send an email when your order has been shipped.</p>
                <h2 className="card-title">Order Items</h2>
                      <table className="table text-center">
                        <thead>
                          <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Size</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {console.log(orderDetails)}
                        </tbody>
                      </table>
                <Link href="/"><button type="button" className="btn btn-link"><i className="bi bi-arrow-left"></i> Continue Shopping</button></Link>
              </Card.Body>
            </Card>
            </Col>
          </Row>
            ) : (
              <p>Loading order details...</p>
          )}
        </Container>
      </div>
    </Layout>
  )
}

export default OrderSuccess;