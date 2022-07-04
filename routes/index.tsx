/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Coins {
  coins: [Coin];
}

interface Coin {
  id: string;
  name: string;
  icon: string;
  price: number;
  symbol: string;
}

export const handler: Handlers<Coins | null> = {
  async GET(_, ctx) {
    const resp = await fetch(`https://api.coinstats.app/public/v1/coins?skip=0`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const coins: Coins = await resp.json();
    return ctx.render(coins);
  },
};

export default function Home({ data }: PageProps<Coins | null>) {
  if (!data?.coins) {
    return <h1>Coin not found</h1>;
  }

  return (
    <div>
      {data.coins.map(coin => {
          return <div>
            <h1>Name: {coin.name}</h1>
            <img src={coin.icon} alt={coin.name} width="100" height="100"/>
            <h3>Price: {coin.price}</h3>
            <h3>Symbol: {coin.symbol} </h3>
          </div>
        })}
    </div>
  )
}
