import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../utils/baseurl";
import { useDispatch } from "react-redux";
import { setFreeGreetingsProducts, setSelectedProduct } from "../redux/productsSlice";

const useGetSingleProduct = ({ productId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleProduct = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/v1/products/products/${productId}`);
                if (res.data.success) {
                    console.log(res.data.product);
                    dispatch(setSelectedProduct(res.data.product))
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (productId) fetchSingleProduct();
    }, [productId]);

    return null;
};

export default useGetSingleProduct;
