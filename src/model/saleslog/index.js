
export const postSalesLogCall = async (data) => {

  let formData = new FormData();
  for (let key in data) {
    console.log(key, data[key]);
    formData.append(key, data[key]);
  }
  console.log(formData);
  const response = await fetch('https://backend.saleslog.co/saleslog/regi_saleslog', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 4bc575e0807ba9b4191e8500b430981a377eb5d5'
    },
    body: formData
  })
    .then(res => res.json())
    .then(json => { return json; })
  return response;
}