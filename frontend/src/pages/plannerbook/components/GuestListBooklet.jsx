import React from 'react'
// import '../style/PlanBook.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct } from '../../../redux/productsSlice';

function GuestListBooklet() {
    const productCategories = ["Wedding", "Management", "Guest Management"]
    const navigate = useNavigate();

    const { freeGreetingsProducts } = useSelector(store => store.product)
    const dispatch = useDispatch();

    // console.log(photoBooksProducts)

    return (
        <div className="planner-book">
            <h2 className="planner-title">Guest List Book</h2>

            <div className="categories">
                {productCategories.map((category, index) => (
                    <span key={index} className="category-item">
                        {category}
                        {index < productCategories.length - 1 && <span className="divider">|</span>}
                    </span>
                ))}
                view all
            </div>

            <div className="product-grid">
                {freeGreetingsProducts?.slice(0, 5).map((c, index) => (
                    // <ProductCard key={index} />
                    <div className="product-card" onClick={() => {
                        navigate(`/product/view/${c._id}`);
                        dispatch(setSelectedProduct(c));
                    }} key={index} >
                        <div className="pc_card_container">
                            <div className="product-design">
                                <img src={c?.image[0]} alt="" />
                            </div>
                        </div>
                        <div className="product-title">"{c?.name}"</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GuestListBooklet
