import { PiShoppingCart, PiShoppingCartFill } from "react-icons/pi";
import styles from './style.module.scss';
import Item from "../Courses/Item.jsx";
import { useContext } from "react";
import { context } from "../../store";
import CoursesJSON from "../../db/Courses.json";

function Basket() {
    const { state, dispatch } = useContext(context);

    function getAllIDs() {
        return state.basket.map(p => p.id);
    }

    function getProductCount(p_id) {
        return state.basket.find(p => p.id == p_id).count;
    }

    function getProductPrice(p_id) {
        let product = state.basket.find(p => p.id == p_id);
        return product.price * product.count;
    }

    function getTotalPrice() {
        let total = 0;
        state.basket.forEach(p => {
            total += p.price * p.count;
        });
        return total;
    }

    function getTotalItems() {
        let total = 0;
        state.basket.forEach(p => {
            total += p.count;
        });
        return total;
    }

    function handleCountChange(e, p_id) {
        let updatedBasket = [...state.basket];
        if (e.target.name === "inc") {
            updatedBasket = updatedBasket.map(p => {
                if (p.id === p_id) {
                    p.count += 1;
                }
                return p;
            });
        } else if (e.target.name === "dec") {
            updatedBasket = updatedBasket.map(p => {
                if (p.id === p_id) {
                    if (p.count > 1) {
                        p.count -= 1;
                    }
                }
                return p;
            });
        }
        dispatch({ type: e.target.name, payload: updatedBasket });
    }

    return (
        <>
            <div className={styles.cartPageWrapper}>
                <div className={styles.productsContent}>
                    {
                        CoursesJSON.filter(p => getAllIDs().includes(p.id)).map((product, index) => {
                            return (
                                <div className={styles.productItemComponentWrapper} key={index}>
                                    <div className={styles.itemWrapper}>
                                        <Item
                                            id={product.id}
                                            img={product.img}
                                            title={product.title}
                                            price={product.price}
                                        />
                                    </div>
                                    <div className={styles.infoWrapper}>
                                        <div className={styles.productsCount}>
                                            <button name="dec" onClick={(e) => handleCountChange(e, product.id)}>➖</button>
                                            {getProductCount(product.id)}
                                            <button name="inc" onClick={(e) => handleCountChange(e, product.id)}>➕</button>
                                        </div>
                                        <div className={styles.productItemTotalPrice}>
                                            <span>${getProductPrice(product.id).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                {getTotalPrice() > 0 && (
                    <div className={styles.pricesWrapper}>
                        <h2>In total: <mark>${getTotalPrice()}</mark></h2>
                        <h4>Variety of items: <mark>{getAllIDs().length}</mark></h4>
                        <h4>Total items: <mark>{getTotalItems()}</mark></h4>
                    </div>
                )}
            </div>
        </>
    );
}

export default Basket;
