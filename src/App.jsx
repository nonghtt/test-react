import MenuAlert from "./components/MenuAlert";
import Section from "./components/Section";
import Card from "./components/Card";
import Badge from "./components/Badge";
import CartItems from "./components/CartItems";
import Form from "./components/Form";
import { useState } from "react";

import { menu } from "./data/menu";

export default function App() {
  const [cart, setCart] = useState({});
  const totalCartCount = Object.values(cart).reduce((sum, item) => {
    return sum + item.qty;
  }, 0);

  const totalPay = Object.values(cart).reduce((sum, item) => {
    return sum + item.qty * item.price;
  }, 0);
  let [alert, setAlert] = useState(false);
  const [alertMenus, setAlertMenus] = useState({ qty: "", pay: 0 });

  function addToCart(item) {
    setCart((prev) => ({
      ...prev,
      [item.id]: {
        id: item.id,
        qty: (prev[item.id]?.qty ?? 0) + 1,
        price: item.price,
        name: item.name,
      },
    }));
  }

  function addItem(item) {
    addToCart(item);
  }

  function deleteItem(item) {
    setCart((prev) => {
      const newQty = (prev[item.id]?.qty ?? 0) - 1;
      if (newQty <= 0) {
        const { [item.id]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [item.id]: {
          id: item.id,
          qty: newQty,
          price: item.price,
          name: item.name,
        },
      };
    });
  }

  function initializeCart() {
    setAlertMenus({
      qty: totalCartCount,
      pay: totalPay,
    });
    setCart({});
    setAlert(!alert);
  }

  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>카페 주문</h1>
      </header>
      {alert && <MenuAlert alertMenus={alertMenus}></MenuAlert>}
      <Section title="메뉴">
        <div className="grid">
          {menu.map((item) => {
            return <Card key={item.id} menu={item} onSelect={addToCart}></Card>;
          })}
        </div>
      </Section>
      <hr className="divider" />
      <Section title="장바구니" count={totalCartCount}>
        <CartItems
          cart={cart}
          addItem={addItem}
          deleteItem={deleteItem}
        ></CartItems>
        <Form cart={cart} initializeCart={initializeCart}></Form>
      </Section>
    </div>
  );
}
