const apiRoot = `${process.env.NEXT_PUBLIC_APP_URL}/api`;

const getData = async (endpoint: string) => {
  const response = await fetch(`${apiRoot}/${endpoint}`);
  const res = await response.json();
  return res;
};

export default getData;
