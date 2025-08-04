import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "../../../hooks/useNavigation";
import { setDrawerOpen } from "../../../../features/cart/slice";
import { CartDrawer } from "../../../../features/cart";
import { useCart } from "../../../../features/cart/hooks/useCart";
import { useAuth } from "../../../../features/auth/hooks/useAuth";
import styles from "./styles.module.css";

export const Header = () => {
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigation();

  return (
    <>
      <header className={styles.header}>
        <button onClick={() => navigate.goToHome()} className={styles.logo}>
          Shopping App
        </button>
        <nav>
          {isAuthenticated && (
            <>
              <button
                onClick={() => dispatch(setDrawerOpen(true))}
                className={styles.cartButton}
              >
                My Cart ({itemCount})
              </button>
              <span
                onClick={() => navigate.goToAccount()}
                className={styles.logoutButton}
              >
                Hello {user?.firstName}
              </span>
            </>
          )}
        </nav>
      </header>
      {isAuthenticated && <CartDrawer />}
    </>
  );
};
