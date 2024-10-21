import React, { useState } from "react";
import "./style.scss";
import { useTranslation } from "react-i18next"
function CreateProduct({ addProduct }) {
    const [newProduct, setNewProduct] = useState({
        img: "",
        title: "",
        desc: "",
        price: ""
    });
    const { t, i18n: { changeLanguage } } = useTranslation();
    // Обработчик изменения данных в форме
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = Date.now(); // Генерируем уникальный ID для нового продукта
        const newProductData = { ...newProduct, id };

        // Добавляем продукт в LocalStorage
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        localStorage.setItem("products", JSON.stringify([...storedProducts, newProductData]));

        addProduct(newProductData); // Передаем новый продукт в функцию addProduct
        setNewProduct({ img: "", title: "", desc: "", price: "" }); // Очищаем форму
    };

    return (
        <div className="create-product-wrapper">
            <section className="create-product-section">
                <h2>{t("createProduct.createProduct")}</h2>
                <form onSubmit={handleSubmit} className="create-product-form">
                    <input
                        type="text"
                        name="img"
                        placeholder={t("createProduct.img")}
                        value={newProduct.img}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder={t("createProduct.title")}
                        value={newProduct.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="desc"
                        placeholder={t("createProduct.desc")}
                        maxLength={500}
                        value={newProduct.desc}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder={t("createProduct.price")}
                        value={newProduct.price}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">{t("createProduct.add")}</button>
                </form>
            </section>
        </div>
    );
}

export default CreateProduct;
