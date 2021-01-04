import axios from 'axios';

export const getVoiceMemo = async () => {
  const response = await axios
    .get(process.env.ALL_VOICEMEMO)
    .then((res) => res.data)
    .catch((err) => err);

  return response;
};

export const postVoiceMemo = async (body) => {
  let formBody = Object.keys(body)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
    .join('&');
  formBody += '&categories=c02';
  console.log(formBody);

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: formBody,
    url: process.env.VOICEMEMO_API,
  };

  const response = await axios(options)
    .then((res) => res)
    .catch((err) => err);

  return response;
};
