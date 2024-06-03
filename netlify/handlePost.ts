function handlePost<T>(fn: (data: T) => Promise<Response>) {
  return async (request: Request) => {
    try {
      if (request.method.toUpperCase() !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
          status: 405,
        });
      }

      const data = await request.json();

      await fn(data);

      return new Response(JSON.stringify({ data }));
    } catch (error) {
      if (error.status) {
        const { status, statusText } = error;

        console.error(new Error(statusText));

        return new Response(JSON.stringify({ error: statusText }), {
          status,
          statusText,
        });
      }

      console.error(new Error('Unknown error on server'));
      return new Response(
        JSON.stringify({ error: 'Unknown error on server' }),
        {
          status: 500,
          statusText: error.message || error,
        }
      );
    }
  };
}

export default handlePost;
