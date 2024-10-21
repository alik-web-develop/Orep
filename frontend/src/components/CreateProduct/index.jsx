import React, { useState } from "react";
import CoursesJSON from "../../db/Courses.json"; 
import Item from "../../components/Courses/Item.jsx";
import "./style.scss";

function CreateProduct() {
    const [products, setProducts] = useState(CoursesJSON);
    const [newProduct, setNewProduct] = useState({
        img: "",
        title: "",
        desc: "",
        price: ""
    });

    // Обработчик изменения данных в форме
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = products.length + 1; // Уникальный ID для нового продукта
        setProducts([...products, { ...newProduct, id }]); // Добавляем новый продукт в массив
        setNewProduct({ img: "", title: "", desc: "", price: "" }); // Очищаем форму
    };

    return (
        <section className="create-product-section">
            <h2>Create New Product</h2>
            <form onSubmit={handleSubmit} className="create-product-form">
                <input
                    type="text"
                    name="img"
                    placeholder="Image URL"
                    value={newProduct.img}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newProduct.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="desc"
                    placeholder="Description"
                    value={newProduct.desc}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Product</button>
            </form>

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
        </section>
    );
}

export default CreateProduct;
