import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCart,
  decrementCartITem,
  getTotals,
  incrementCartITem,
  removeFromCart,
} from "../store/slices/cartSlice";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecrementItem = (cartItem) => {
    dispatch(decrementCartITem(cartItem));
  };

  const handleIncrementItem = (cartItem) => {
    dispatch(incrementCartITem(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h2>Корзина</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Ваша корзина ещё пустая, добавьте в нее что нибудь</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Добавить что-то</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Телефон</h3>
            <h3 className="price">Цена</h3>
            <h3 className="quantity">Кол-во</h3>
            <h3 className="total">Общее кол-во</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-product">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <button onClick={() => handleRemoveFromCart(item)}>
                      Удалить
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">{item.price}$</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecrementItem(item)}>-</button>
                  <div className="count">{item.cartQuantity}</div>
                  <button onClick={() => handleIncrementItem(item)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  ${ Number(item.price) * item.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button onClick={handleClearCart} className="clear-btn">
              Очистить корзину
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Общая сумма: </span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>Все налоги и ПДВ уже внесены в сумму заказа</p>
              <button>Оплатить</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Продолжить покупки</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
