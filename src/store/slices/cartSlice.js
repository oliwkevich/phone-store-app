import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("Cart Items")
    ? JSON.parse(localStorage.getItem("Cart Items"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(
          `Количество ( ${state.cartItems[itemIndex].name} ) было изменено (+1)`,
          {
            position: "bottom-left",
          }
        );
      } else {
        const tempItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempItem);
        toast.info(`${action.payload.name} добавлен в корзину`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("Cart Items", JSON.stringify(state.cartItems));
      
    },
    removeFromCart(state, action) {
      const nextCartItem = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItem;
      localStorage.setItem("Cart Items", JSON.stringify(state.cartItems));
      toast.error(`Телефон ( ${action.payload.name} ) был удален из корзины`, {
        position: "bottom-left",
      });
    },
    decrementCartITem(state, action) {
      const itemId = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (state.cartItems[itemId].cartQuantity > 1) {
        state.cartItems[itemId].cartQuantity -= 1;
        toast.info(
          `Вы удалили одну штуку ( ${action.payload.name} ) из заказа.`,
          {
            position: "bottom-left",
          }
        );
      } else if (state.cartItems[itemId].cartQuantity === 1) {
        const nextCartItem = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItem;
        toast.error(
          `Телефон ( ${action.payload.name} ) был удален из корзины`,
          {
            position: "bottom-left",
          }
        );
      }
      localStorage.setItem("Cart Items", JSON.stringify(state.cartItems));
    },
    incrementCartITem(state, action) {
      const itemId = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      state.cartItems[itemId].cartQuantity += 1;
      toast.info(
        `Вы добавили одну штуку ( ${action.payload.name} ) к заказу.`,
        {
          position: "bottom-left",
        }
      );
      localStorage.setItem("Cart Items", JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      toast.error(`Вы очистили всю корзину.`, {
        position: "bottom-left",
      });
      localStorage.setItem("Cart Items", JSON.stringify(state.cartItems));
    },
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decrementCartITem,
  incrementCartITem,
  clearCart,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
