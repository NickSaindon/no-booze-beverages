const https = require('https');
const querystring = require('querystring');

class DirectPost {
  constructor(security_key) {
    this.security_key = security_key;
    this.endpointUrl = '/api/allaypay'; // Update to use the new API route
  }

  setBilling(billingInformation) {
    // Validate that passed in information contains valid keys
    const validBillingKeys = ['first_name', 'last_name', 'address1', 'city', 'state', 'zip'];

    for (let key in billingInformation) {
      if (!validBillingKeys.includes(key)) {
        throw new Error(`Invalid key provided in billingInformation. '${key}'
            is not a valid billing parameter.`)
      }
    };

    this.billing = billingInformation;
  }

  doSale(amount, ccNum, ccExp, cvv) {
    let requestOptions = {
      'type': 'sale',
      'amount': amount,
      'ccnumber': ccNum,
      'ccexp': ccExp,
      'cvv': cvv
    };

    // Merge together all request options into one object
    Object.assign(requestOptions, this.billing, this.shipping);

    // Make request
    this._doRequest(requestOptions);
  }

  _doRequest(postData) {
    const hostName = 'allaypay.transactiongateway.com';
    const path = '/api/transact.php';

    postData.security_key = this.security_key;
    postData = querystring.stringify(postData);

    console.log("postData", postData);

    const options = {
      hostname: hostName,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    // Make request to Payment API
    const req = https.request(options, (response) => {
      console.log(`STATUS: ${response.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      response.on('end', () => {
        console.log('No more data in response.');
      });
    });

    req.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
    });

    // Write post data to request body
    req.write(postData);
    req.end();
  }
}

export default DirectPost;