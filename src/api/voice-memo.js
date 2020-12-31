import axios from 'axios';

export const getVoiceMemo = async () => {
  const response = await axios
    .get(process.env.API_URL)
    .then((res) => res.data)
    .catch((err) => err);

  return response;
};

export const postVoiceMemo = async (body) => {
  const formBody = Object.keys(body)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
    .join('&');
  console.log(formBody);

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: formBody,
    url: process.env.VOICEMEMO_POST,
  };

  const response = await axios(options)
    .then((res) => res)
    .catch((err) => err);

  return response;
};
