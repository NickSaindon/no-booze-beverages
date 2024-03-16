import nodemailer from 'nodemailer';

export default async (req, res) => {
  require('dotenv').config();

  const { orderData, orderId } = req.body;

  // Function to generate HTML for order items
  const generateOrderItemsHTML = (items) => {
    let itemsHTML = '';
    items.forEach((item) => {
      itemsHTML += `
        <tr>
          <td>
            <img src="${item.imageOne}" alt="${item.name}" class="item-image">
          </td>
          <td>
            <div class="item-name">${item.name}<br></br> ${item.flavor}</div>
          </td>
          <td>
            <div class="item-quantity">${item.packSizeSelected}</div>
          </td>
          <td>
            <div class="item-quantity">${item.quantity}</div>
          </td>
          <td>
            <div class="item-price">$${item.price.toFixed(2)}</div>
          </td>
        </tr>
      `;
    });
    return itemsHTML;
  };

  // Generate HTML for order items
  const orderItemsHTML = generateOrderItemsHTML(orderData.orderItems);

  // HTML email template
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Receipt</title>
      <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        p {
            margin: 5px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
        }
        .header {
            text-align: center;
            width: 100%;
            margin-bottom: 20px;
        }
        
        .header img {
            text-align: center;
            margin: 0 auto 20px auto;
        }

        .header h2 {
            color: #333;
            margin: 0;
        }
        .order-details {
            margin-bottom: 20px;
        }

        .order-details p {
            margin: 5px 0;
        }
        .order-items {
            margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f2f2f2;
        }
        td img {
          max-width: 50px;
          height: auto;
        }
        .item {
            border-bottom: 1px solid #ccc;
            padding: 10px 0;
            display: flex;
            align-items: center;
        }
        .total {
            text-align: right;
            margin-bottom: 20px;
        }
        .address {
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        @media (max-width: 600px) {
            .item-details {
                flex-direction: column;
            }
        }
    </style>
    </head>
    <body>
      <div class="container">
      <div class="header">
        <img src="https://github.com/NickSaindon/no-booze-beverages/blob/main/public/images/no-booze-logo.png?raw=true" alt="No Booze Beverages" width="70" height="70" border="0" style="border: none; display: block; text-align: center; -ms-interpolation-mode: bicubic;">
        <h2>Order Receipt</h2>
      </div>
        <div class="order-details">
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <div class="order-items">
          <h3>Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Pack Size</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${orderItemsHTML}
            </tbody>
          </table>
        </div>
        <div class="total">
            <p><strong>Subtotal:</strong> $${orderData.itemsPrice.toFixed(2)}</p>
            <p><strong>Shipping Fee:</strong> $${orderData.shippingPrice.toFixed(2)}</p>
            <p><strong>Taxes:</strong> $${orderData.taxPrice.toFixed(2)}</p>
            <p><strong>Total:</strong> $${orderData.totalPrice.toFixed(2)}</p>
        </div>

        <div class="address">
            <div class="address-left">
                <h3>Shipping Address</h3>
                <p>${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}</p>
                <p>${orderData.shippingAddress.address}</p>
                <p>City: ${orderData.shippingAddress.city}</p>
                <p>State: ${orderData.shippingAddress.state}</p>
                <p>Zip: ${orderData.shippingAddress.zipCode}</p>
            </div>
        </div>
    </body>
    </html>
  `;

  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.user,
      pass: process.env.password,
    },
  });

  try {
    console.log(orderData.shippingAddress.email)
    // Send email with HTML template
    const emailRes = await transporter.sendMail({
      from: '"No Booze Beverages" <info@noboozebev.com>',
      to: orderData.shippingAddress.email,
      subject: `No Booze Beverages Receipt`,
      html: htmlTemplate,
    });

    console.log('Message Sent');
  } catch (err) {
    console.log(err);
  }

  res.status(200).json(req.body);
};