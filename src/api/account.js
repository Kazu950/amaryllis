import axios from 'axios';

export const signUp = async (accountInfo) => {
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
    url: process.env.ACCOUNT_API,
  };

  const response = await axios(options)
    .then((res) => res.data)
    .catch((err) => err);

  return response;
};

export const signIn = async (accountInfo) => {
  const body = {
    name: accountInfo.userName,
    password: accountInfo.userPassword,
  };

  const formBody = Object.keys(body)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
    .join('&');

  const options = {
    method: 'PUT',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: formBody,
    url: process.env.ACCOUNT_API,
  };

  const response = await axios(options)
    .then((res) => res.data)
    .catch((err) => err);

  return response;
};
