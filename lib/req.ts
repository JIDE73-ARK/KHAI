const baseUrl = process.env.NEXT_PUBLIC_URL;

const request = async (url: string, method: string, body: any) => {
  const response = await fetch(`${baseUrl}${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
};

export { request };
