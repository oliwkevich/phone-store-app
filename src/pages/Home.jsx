//TODO: Сделать оформление для корзины и её функционал



import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

export const Home = () => {
  const { items, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    console.log(item)
    dispatch(addToCart(item));
  };

  return (
    <div className="home-conteiner">
      {isLoading ? (
        <p>LOADING...</p>
      ) : (
        <>
          <h2>Новые товары:</h2>
          <div className="products">
            {items?.map((item) => (
              <div key={item.id} className="product">
                <h3>{item.name}</h3>
                <img src={item.image} alt={item.name} />
                <div className="details">
                  <span>{item.desc}</span>
                  <span className="price">{item.price}</span>
                </div>
                <button onClick={() => handleAddToCart(item)}>Add to cart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
