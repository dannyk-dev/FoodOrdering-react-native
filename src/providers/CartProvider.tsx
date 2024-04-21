import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, InsertTables, Product } from "@/src/types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { Tables } from "../database.types";
import { useInsertOrderItems } from "../api/order-items";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, quantity: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: InsertOrder } = useInsertOrder();
  const { mutate: InsertOrderItems } = useInsertOrderItems();
  const router = useRouter();

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, quantity: -1 | 1) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = items.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity;
  }, 0);

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    InsertOrder(
      {
        total,
      },
      {
        onSuccess: saveOrderItems,
      }
    );
  };

  const saveOrderItems = (data: Tables<"orders">) => {
    const orderItems = items.map((item) => {
      return {
        order_id: data.id,
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.size,
      };
    }) satisfies InsertTables<"order_items">[];

    InsertOrderItems(orderItems, {
      onSuccess: () => {
        clearCart();
        router.push(`/(user)/orders/${data.id}`);
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, checkout, updateQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
