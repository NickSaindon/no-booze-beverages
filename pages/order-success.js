import Layout from '../components/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';
import { getError } from '../utils/error';
import { ToastContainer, toast, Slide } from "react-toastify";

const OrderSuccess = () => {

  const router = useRouter();
  const { orderId } = router.query;
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
      const fetchOrderDetails = async () => {
          try {
            const response = await axios.get(`/api/orders/${orderId}`);
            setOrderDetails(response.data);
          } catch (err) {
            toast.error(getError(err), {
              theme: "colored"
            });
          }
      };
      if (orderId) {
          fetchOrderDetails();
      }
  }, [orderId]);

  return (
    <Layout title={`Successful Order`}>
      <div className="place-order-container page-contain py-5">
        <ToastContainer 
          position="top-center" 
          draggable={false} 
          transition={Slide} 
          autoClose={5000}
          hideProgressBar={true}
          className="toast-alert"
        />
        <Container className="pt-5">
          <Row>
            <Col lg={12}>
              <Card className="shadow mb-4">
                <Card.Body className="text-center">
                  <Image src="/images/no-booze-logo.png" className="my-5" width={150} height={150} alt=""/>
                  <h2 className="card-title text-primary">Order Completed</h2>
                  <h3 className="card-title text-primary">Order Id {orderId}</h3>

                  <h4>Thank you for your order!</h4>
                  <p>A reciept has been sent to the email provided.</p>
                  <p>We will send an email when your order has been shipped.</p>
                  <Link href="/"><button type="button" className="btn btn-link"><i className="bi bi-arrow-left"></i> Continue Shopping</button></Link>
                  <h2 className="card-title pt-4">Order Items</h2>
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Pack Size</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    {orderDetails && orderDetails.orderItems.map((item) => (
                        <tr key={`${item._id}-${item.packSizeSelected}`}>
                          <td>
                            <Link href={`/product/${item.slug}`}>
                                <Image src={item.imageOne} width={80} height={60} alt={`Image of ${item.name} ${item.flavor}`} />
                            </Link>
                          </td>
                          <td className="align-middle">{item.name}<br/> {item.flavor}</td>
                          <td className="align-middle">{item.packSizeSelected}</td>
                          <td className="align-middle">{item.quantity}</td>
                          <td className="align-middle">${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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