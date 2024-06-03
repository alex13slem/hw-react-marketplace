const { TG_BOT_API_TOKEN, TG_BOT_CHAT_ID } = process.env;
import type { BasketProduct } from '../../../src/store/basket';
import handlePost from '../../handlePost';
import notifyViaTelegramBot from '../../notifyViaTelegramBot';

async function sendProductsBasket(data: BasketProduct[]) {
  console.log(data);

  let htmlMessage = '';
  for (const product of data) {
    htmlMessage += `<b>${product.title}</b>: ${product.quantity} шт.
		<i>цена</i>: ${product.price} руб.
		<i>сумма</i>: ${product.total} руб.
		<i>скидка</i>: ${product.discount} руб.
		<i>всего со скидкой</i>: ${product.discountedTotal} руб.
		<i>изображение</i>: <a href="${product.thumbnail}">${product.thumbnail}</a>
		<br/>
		`;
  }

  const { status } = await notifyViaTelegramBot({
    htmlMessage,
    apiToken: TG_BOT_API_TOKEN!,
    chatId: TG_BOT_CHAT_ID!,
  });

  return new Response(JSON.stringify({ data }), { status });
}

export default handlePost(sendProductsBasket);
