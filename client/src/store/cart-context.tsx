import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import type { ProductType } from "../types/product";

type CartItemType = ProductType & { quantity: number };

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (item: ProductType, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalQuantity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

const cartReducer = (
  prevState: CartItemType[],
  action: { type: string; payload?: any },
) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      if (payload) {
        const existingItem = prevState.find(
          (item) => item.productId === payload.productId,
        );
        if (existingItem) {
          return prevState.map((item) =>
            item.productId === payload.productId
              ? { ...item, quantity: item.quantity + payload.quantity }
              : item,
          );
        } else {
          return [...prevState, payload];
        }
      } else {
        return prevState;
      }
    case REMOVE_FROM_CART:
      if (payload) {
        return prevState.filter((item) => item.productId !== payload);
      } else {
        return prevState;
      }
    case CLEAR_CART:
      return [];
    default:
      return prevState;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  /*const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.log("failed to load local storage cart items:", error);
      return [];
    }
  });*/
  const initialCartItems: CartItemType[] = (() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.log("failed to load local storage cart items:", error);
      return [];
    }
  })();

  const [cartItems, dispatch] = useReducer(cartReducer, initialCartItems);

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, [cartItems]);

  /**
  const addToCart = (product: ProductType, quantity: number) => {
    setCartItems((prevItems) => {
      // check if product already exists in cart
      const existingItem = prevItems.find(
        (item) => item.productId === product.productId,
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        // if not then directly insert into the cart
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) =>
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId),
    );

  const clearCart = () => setCartItems([]);
*/

  const addToCart = (product: ProductType, quantity: number) => {
    dispatch({ type: ADD_TO_CART, payload: { ...product, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const totalQuantity = cartItems.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  const initialCartState: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    totalQuantity,
  };

  return (
    <CartContext.Provider value={initialCartState}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
