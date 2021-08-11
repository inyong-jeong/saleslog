const fetchConfig = (_method, _body = null, token, userId, headers) => {
  let config = {
    method: _method,
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": token,
      "UserId": userId
    }
  }
  if (headers)
    config.headers = headers;
  if (_body) {
    config.body = JSON.stringify(_body);
  }
  return config;
};

const fetchconfig = (_method, _body = null, token, headers) => {
  const Bearer = 'Bearer ';
  let formBody = [];
  for (let property in _body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(_body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  let config = {
    method: _method,
    headers: {
      "Accept": "application/json",
      "Content-Type": 'application/x-www-form-urlencoded',
      "Authorization": Bearer + token,
    }
  }
  if (headers)
    config.headers = headers;
  if (_body) {
    config.body = formBody
  }
  return config;
};

const fetchConfigFile = (method, body) => {
  return {
    method: method,
    body: body,
    headers: {}
  }
}

const passArgs = (...args) => {
  let endpoint = args[0];
  let matched = endpoint.match(/{[A-z0-9]+}/g);
  if (matched === null)
    matched = [];

  let index = 1;
  for (const match of matched) {
    endpoint = endpoint.replace(match, args[index]);
    index += 1;
  }

  return endpoint;
}

const passQueryString = (uri, args) => {
  let passUri = uri + '?';
  let argList = Object.keys(args);
  argList.map((v, i) => {
    if (args[v] !== undefined && args[v] !== null) {
      if (typeof (args[v]) === "object" && args[v].length === 0)
        return null;
      else if (typeof (args[v] === "object") && args[v].length > 0)
        passUri += `${v}=${JSON.stringify(args[v])}`;
      else
        passUri += `${v}=${args[v]}`;
      if (argList[i + 1]) passUri += '&';
    }
    return null;
  });

  return passUri;
}

module.exports.fetchConfig = fetchConfig;
module.exports.fetchConfigFile = fetchConfigFile;
module.exports.passArgs = passArgs;
module.exports.passQueryString = passQueryString;

