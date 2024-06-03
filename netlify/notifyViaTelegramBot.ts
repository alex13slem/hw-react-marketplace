import axios, { AxiosError } from 'axios';

async function notifyViaTelegramBot({
  htmlMessage,
  apiToken,
  chatId,
}: {
  htmlMessage: string;
  apiToken: string;
  chatId: string;
}) {
  try {
    return await axios.post(
      `https://api.telegram.org/bot${apiToken}/sendMessage`,
      {
        chat_id: chatId,
        text: htmlMessage,
      },
      {
        params: {
          parse_mode: 'HTML',
        },
      }
    );
  } catch (error) {
    let status: number;
    let errorText: string;
    if (error instanceof AxiosError) {
      if (error.response) {
        const { error_code, description } = error.response.data;
        errorText = `Telegram server error: ${description}`;
        status = error_code;
      } else {
        errorText = `No Telegram response received`;
        status = 500;
      }
    } else {
      errorText = `Error setting up telegram response: ${error.message}`;
      status = 400;
    }

    return Promise.reject({ status, statusText: errorText });
  }
}

export default notifyViaTelegramBot;
