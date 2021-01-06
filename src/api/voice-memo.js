import axios from 'axios';

export const getVoiceMemo = async () => {
  const response = await axios
    .get(process.env.ALL_VOICEMEMO)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });

  return response;
};

export const postVoiceMemo = async (body) => {
  const formBody = body.map((obj) => {
    const key = Object.keys(obj);
    return `${encodeURIComponent(key.toString())}=${encodeURIComponent(obj[key])}`;
  }).join('&');

  console.log(formBody);

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: formBody,
    url: process.env.VOICEMEMO_API,
  };

  const response = await axios(options)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });

  return response;
};
