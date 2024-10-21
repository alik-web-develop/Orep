import React, { useState, useEffect } from "react";
import "./style.scss";
import Item from "./Item.jsx";
import CoursesJSON from "../../db/Courses.json";
import CreateProduct from "../../components/CreateProduct";

function Courses() {
    const [products, setProducts] = useState([]);
    const [showCreateProduct, setShowCreateProduct] = useState(false); // Состояние для переключения

    useEffect(() => {
        // Получаем продукты из LocalStorage
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts([...CoursesJSON, ...storedProducts]); // Объединяем данные из JSON и LocalStorage
    }, []);

    const addProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]); // Добавляем новый продукт в список
    };

    return (
        <section className="courses-products-wrapper">
            <h1>{showCreateProduct ? "Create Product" : "Products"}</h1>

            <div className="main-div-buttons">
                <div className="toggle-buttons">

                    {
                        showCreateProduct
                            ? <button onClick={() => setShowCreateProduct(false)}>Show Products</button>
                            : <button onClick={() => setShowCreateProduct(true)}>Create Product</button>
                    }
                    {/* <button onClick={() => setShowCreateProduct(false)}>
                        Show Products
                    </button>
                    <button onClick={() => setShowCreateProduct(true)}>
                        Create Product
                    </button> */}
                </div>
            </div>


            {/* Рендерим список продуктов или форму в зависимости от состояния */}
            {showCreateProduct ? (
                <CreateProduct addProduct={addProduct} />
            ) : (
                <div className="products-content">
                    {products.map((product, index) => (
                        <Item
                            key={index}
                            id={product.id}
                            img={product.img}
                            title={product.title}
                            desc={product.desc}
                            price={product.price}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Courses;
