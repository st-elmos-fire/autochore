const apiRoot = process.env.API_ROOT;

const getData = async (endpoint: string) => {
  const response = await fetch(`${apiRoot}/${endpoint}`);
  const res = await response.json();
  return res;
};

export default getData;
