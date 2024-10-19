import React, { useContext, memo, useState } from 'react'
import { PiShoppingCart, PiShoppingCartFill } from "react-icons/pi";
import { context } from "../../store"
import CoursesJSON from "../../db/Courses.json"

function Item(props) {
    const { state, dispatch } = useContext(context)
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        console.log("Toggle show more clicked");
        setShowMore(!showMore);
    };
    function addToBasket(e) {
        e.stopPropagation()

        let product = CoursesJSON.find(p => p.id == props.id)

        if (state.basket.map(p => p.id).includes(props.id)) {
            dispatch({ type: "REMOVE_FROM_BASKET", payload: props.id })
        } else {
            dispatch({ type: "ADD_TO_BASKET", payload: { id: props.id, count: 1, price: product.price } })
        }
    }


    return (
        <div className="product-item">
            <div className="img-wrapper">
                {
                    state.basket.map(p => p.id).includes(props.id)
                        ?
                        <span className='manual-icon show-icon'>
                            <PiShoppingCartFill color='#fff' onClick={addToBasket} />
                        </span>
                        :
                        <span className='manual-icon'>
                            <PiShoppingCart onClick={addToBasket} color="#fff" />
                        </span>
                }
                <img src={props.img} alt={props.title} />
            </div>
            <h4>{props.title}</h4>
            <p className={`desc ${showMore ? 'show-full' : ''}`}>
                {props.desc}
            </p>
            <span className="show-more" onClick={toggleShowMore}>
                {showMore ? '...show less' : '...show more'}
            </span>
            <p className="price">${props.price}</p>
        </div>
    )
}

export default React.memo(Item)