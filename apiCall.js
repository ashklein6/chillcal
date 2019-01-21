import axios from 'axios';
import reqUrl from './serverReference';

// made an apiCall function to connect to server
export default async ({ url, method, data, params }) => {
  console.log(`in apiCall. url:${url}, method: ${method}, data: ${data}`);
  console.log('data', data);
  console.log('params', params);

  try {
    const axiosUrl = reqUrl + url;
    
    let response = await axios({
      url: axiosUrl,
      method,
      data,
      params
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