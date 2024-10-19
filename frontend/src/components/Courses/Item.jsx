import { useContext, memo } from 'react'
import { context } from "../../store"
import CoursesJSON from "../../db/Courses.json"

function Item(props) {
    const { state, dispatch } = useContext(context)

    // function addToWishlist(e) {
    //     e.stopPropagation()
    //     if (state.selectedProducts.includes(props.id)) {
    //         dispatch({ type: "REMOVE_FROM_WISHLIST", payload: props.id })
    //     } else {
    //         dispatch({ type: "ADD_TO_WISHLIST", payload: props.id })
    //     }
    // }
    // function addToBasket(e) {
    //     e.stopPropagation()

    //     let product = FProductsJSON.find(p => p.id == props.id)

    //     if (state.basket.map(p => p.id).includes(props.id)) {
    //         dispatch({ type: "REMOVE_FROM_BASKET", payload: props.id })
    //     } else {
    //         dispatch({ type: "ADD_TO_BASKET", payload: { id: props.id, count: 1, price: product.price } })
    //     }
    // }

    return (
        <div className="product-item">
            <div className="img-wrapper">
                <img src={props.img} alt={props.title} onClick={(e) => e.target.requestFullscreen()} />
            </div>
            <h4>{props.title}</h4>
            <p className="desc">{props.desc}</p>
            <p className="price">{props.price}</p>
        </div>
    )
}

export default memo(Item)