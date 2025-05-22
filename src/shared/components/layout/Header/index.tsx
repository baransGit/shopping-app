import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
