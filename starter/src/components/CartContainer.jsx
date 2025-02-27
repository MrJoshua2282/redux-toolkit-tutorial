import { CartItem } from "./CartItem"
import { useDispatch, useSelector } from "react-redux"
import {openModal } from '../features/modal/modalSlice'

export const CartContainer = () => {
  const dispatch = useDispatch()
  const {cartItems, total, amount} = useSelector(store => store.cart);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your Bag</h2>
          <h4 className="empty-cart">is empty</h4>
        </header>
      </section>
    )
  }

  return (
    <section className="cart">
      <header>
        <h2>Your Bag</h2>
      </header>
        <div>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} />
          })}
        </div>
        <footer>
          <div className="cart-total">
            <hr />
            <h4>Total: <span>${total.toFixed(2)}</span></h4>
          </div>
          <button className="btn clear-btn" onClick={() => dispatch(openModal())}>Clear Cart</button>
        </footer>
    </section>
  )

}