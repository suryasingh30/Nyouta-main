import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../utils/baseurl";
import { useDispatch } from "react-redux";
import { setAllProduct } from "../redux/productsSlice";

const GetAllProducts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/v1/products/products`);
                console.log(res.data)
                dispatch(setAllProduct(res.data.products));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchAllProducts();
    }, []);

    return null; 
};

export default GetAllProducts;
