const BASE_URL = () =>
  window.BASE_URL ||
  'http://localhost:1337'; // eslint-disable-line

const buildHeaders = (authToken = null, auth0 = false) => {
  const key = localStorage.getItem('SESSION_TOKEN');
  const returnValue = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (authToken) {
    returnValue['Authorization'] = `Bearer ${authToken}`;
  }
  if (key && !auth0) {
    returnValue['x-session-id'] = key;
  }
  return returnValue;
};

export const buildQuery = queryObject => {
  const keys = Object.keys(queryObject);
  return keys
    .map(key => {
      let value = queryObject[key];
      if (value === undefined) {
        return '';
      }
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return '';
        }
        value = value.map(item => encodeURIComponent(item)).join(',');
      } else {
        value = encodeURIComponent(value);
      }
      return `${encodeURIComponent(key)}=${value}`;
    })
    .filter(has => !!has)
    .join('&');
};

const jsonFetch = async (url, options = {}, authToken = '', auth0 = false) => {
  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(authToken, auth0),
  });
  try {
    const jsonResponse = await response.json();
    if (response.status >= 400) {
      return {
        ...jsonResponse,
        success: false,
      };
    }
    return Array.isArray(jsonResponse)
      ? jsonResponse
      : {
          ...jsonResponse,
          success: true,
        };
  } catch (error) {
    if (response.status === 200) {
      return {
        success: true,
      };
    }
    return {
      success: false,
      message: 'Server Error!',
    };
  }
};