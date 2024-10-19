import { PiShoppingCart, PiShoppingCartFill } from "react-icons/pi";
import "./style.scss"
import Item from "../Courses/Item.jsx";
import { useContext } from "react";
import { context } from "../../store";
import CoursesJSON from "../../db/Courses.json"

function Basket() {
    const { state, dispatch } = useContext(context)

    function getAllIDs() {
        return state.basket.map(p => p.id)
    }
    function getProductCount(p_id) {
        return state.basket.find(p => p.id == p_id).count
    }
    function getProductPrice(p_id) {
        let product = state.basket.find(p => p.id == p_id)
        return product.price * product.count
    }

    function getTotalPrice() {
        let total = 0
        state.basket.forEach(p => {
            total += p.price * p.count
        })
        return total
    }

    function getTotalItems() {
        let total = 0
        state.basket.forEach(p => {
            total += p.count
        })
        return total
    }

    function handleCountChange(e, p_id) {
        let updatedBasket = [...state.basket]
        if (e.target.name == "inc") {
            updatedBasket = updatedBasket.map(p => {
                if (p.id == p_id) {
                    p.count += 1
                }
                return p
            })
        } else if (e.target.name == "dec") {
            updatedBasket = updatedBasket.map(p => {
                if (p.id == p_id) {
                    if (p.count > 1) {
                        p.count -= 1
                    }
                }
                return p
            })
        }
        dispatch({ type: e.target.name, payload: updatedBasket })
    }

    return (
        <>
            <div className="cart-page-wrapper">

                <div className="products-content">
                    {
                        CoursesJSON.filter(p =>
                            getAllIDs().includes(p.id)
                        ).map((product, index) => {
                            return (
                                <div className="product-item-component-wrapper" key={index}>
                                    <div className="item-wrapper">
                                        <Item
                                            id={product.id}
                                            img={product.img}
                                            title={product.title}
                                            code={product.code}
                                            price={product.price}
                                        />
                                    </div>

                                    <div className="info-wrapper">

                                        <div className="products-count">
                                            <button name="dec"
                                                onClick={(e) => handleCountChange(e, product.id)}
                                            >➖</button>
                                            {getProductCount(product.id)}
                                            <button name="inc"
                                                onClick={(e) => handleCountChange(e, product.id)}
                                            >➕</button>
                                        </div>

                                        <div className="product-item-total-price">
                                            <span>${getProductPrice(product.id).toFixed(2)}</span>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    getTotalPrice() > 0 &&
                    <div className="prices-wrapper">
                        <h2>In total: <mark>${getTotalPrice()}</mark></h2>
                        <h4>Veriety of items: <mark>{getAllIDs().length}</mark></h4>
                        <h4>Total items: <mark>{getTotalItems()}</mark></h4>
                    </div>
                }


            </div>
        </>
    );
}

export default Basket;