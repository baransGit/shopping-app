import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../app/store/rootReducer";
import { setDrawerOpen } from "../../../../features/cart/slice";
import { CartDrawer } from "../../../../features/cart";
import { useCart } from "../../../../features/cart/hooks/useCart";
import { useAuth } from "../../../../features/auth/hooks/useAuth";
import styles from "./styles.module.css";

export const Header = () => {
  const { itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <>
      <header className={styles.header}>
        <button onClick={() => navigate("/")} className={styles.logo}>
          Shopping App
        </button>
        <nav>
          {isAuthenticated && (
            <button
              onClick={() => dispatch(setDrawerOpen(true))}
              className={styles.cartButton}
            >
              My Cart ({itemCount})
            </button>
          )}
        </nav>
      </header>
      {isAuthenticated && <CartDrawer />}
    </>
  );
};
