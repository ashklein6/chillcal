import axios from 'axios';

// made an apiCall function to connect to server
export default async ({ url, method, data, params }) => {
  console.log(`in apiCall. url:${url}, method: ${method}, data: ${data}`);
  console.log('data', data);
  console.log('params', params);

  try {
    const reqUrl = `http://192.168.1.18:5000${url}`; // home
    // const reqUrl = `http://10.226.90.29:5000${url}`; // coffee shop
    // const reqUrl = `http://10.100.100.122:5000${url}`; // prime
    
    let response = await axios({
      url: reqUrl,
      method: method,
      data: data,
      params: params
    });

    return response.data;

  } catch (err) {
    console.log('inside catch of apiCall');

    if (err.response && err.response.data) {
      throw new Error(err.response.data.message)
    }
    throw new Error(err.message);
  }
}