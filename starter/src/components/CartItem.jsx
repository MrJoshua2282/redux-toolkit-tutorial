import { useDispatch } from "react-redux";

import { ChevronDown, ChevronUp } from "../icons";
import { removeItem, increase, decrease } from "../features/cart/cartSlice";



export const CartItem = ({id, img, title, price, amount}) => {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
      <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>Remove</button>
      </div>
      <div>
        <button className="amount-btn" onClick={() => dispatch(increase({id: id}))}><ChevronUp /></button>
        <p className="amount">{amount}</p>
        <button className="amount-btn" onClick={() => dispatch(decrease({id: id}))}><ChevronDown /></button>
      </div>
    </article>
  )
}