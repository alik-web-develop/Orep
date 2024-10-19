import "./style.scss"
import Item from "./Item.jsx"
import CoursesJSON from "../../db/Courses.json"
import { useTranslation } from 'react-i18next';

function Courses() {
    const { t } = useTranslation();
    return (
        <section className="courses-products-wrapper">
            <h1>Courses</h1>

            <div className="products-content">
                {
                    CoursesJSON.map((product, index) => {
                        return (
                            <div key={index}>
                                <Item
                                    id={product.id}
                                    img={product.img}
                                    title={product.title}
                                    desc={product.desc}
                                    price={product.price}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default Courses;