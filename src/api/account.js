import axios from 'axios';

const signUp = async (accountInfo) => {
  const body = {
    name: accountInfo.userName,
    password: accountInfo.userPassword,
  };

  const formBody = Object.keys(body)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
    .join('&');

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: formBody,
    url: process.env.ACCOUNT_POST,
  };

  const response = await axios(options)
    .then((res) => res.data)
    .catch((err) => err);

  return response;
};

export default signUp;
