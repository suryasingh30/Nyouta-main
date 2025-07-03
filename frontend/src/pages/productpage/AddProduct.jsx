


import React, { useRef, useState, useEffect } from 'react';
import './style/AddProduct.scss';
import axios from 'axios';
import { baseUrl } from '../../utils/baseurl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedProduct } from '../../redux/productsSlice';

function AddProduct() {
    const fileInputRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedProduct } = useSelector(store => store.product);

    // Initialize state with selectedProduct data if available
    const [images, setImages] = useState(selectedProduct?.image || []);
    const [tags, setTags] = useState(selectedProduct?.tags || []);
    const [apiMessage, setApiMessage] = useState('');
    const [formFillingLoading, setFormFillingLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: selectedProduct?.name || '',
        price: selectedProduct?.price || '',
        marketPrice: selectedProduct?.marketPrice || '',
        category: selectedProduct?.category || '',
        subCategory: selectedProduct?.subCategory || '',
        subSubCategory: selectedProduct?.subSubCategory || '',
        type: selectedProduct?.type || '',
        color: selectedProduct?.color || '',
        size: selectedProduct?.size || '',
        description: selectedProduct?.description || ''
    });

    // Reset form when selectedProduct changes
    useEffect(() => {
        if (selectedProduct) {
            setImages(selectedProduct.image || []);
            setTags(selectedProduct.tags || []);
            setFormData({
                name: selectedProduct.name || '',
                price: selectedProduct.price || '',
                marketPrice: selectedProduct.marketPrice || '',
                category: selectedProduct.category || '',
                subCategory: selectedProduct.subCategory || '',
                subSubCategory: selectedProduct.subSubCategory || '',
                type: selectedProduct.type || '',
                color: selectedProduct.color || '',
                size: selectedProduct.size || '',
                description: selectedProduct.description || ''
            });
        } else {
            // Reset for new product creation
            setImages([]);
            setTags([]);
            setFormData({
                name: '',
                price: '',
                marketPrice: '',
                category: '',
                subCategory: '',
                subSubCategory: '',
                type: '',
                color: '',
                size: '',
                description: ''
            });
        }
    }, [selectedProduct]);

    const handleAddImageClick = () => {
        if (images.length < 5) {
            fileInputRef.current.click();
        } else {
            alert('You can only upload up to 5 images.');
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 5) {
            alert('Maximum 5 images allowed.');
            return;
        }

        const imagePreviews = files.map((file) => ({
            file, // Store the actual file object
            preview: URL.createObjectURL(file)
        }));
        setImages((prev) => [...prev, ...imagePreviews]);
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            e.preventDefault();
            const newTag = e.target.value.trim();
            if (!tags.includes(newTag)) {
                setTags((prev) => [...prev, newTag]);
            }
            e.target.value = '';
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const productSubmitHandle = async (e) => {
        e.preventDefault();
        setFormFillingLoading(true);

        try {
            // Validate required fields
            if (!formData.name || !formData.price || !formData.category || !formData.description) {
                throw new Error('Please fill all required fields');
            }

            // Generate SKU
            const namePrefix = formData.name.slice(0, 3).toUpperCase().replace(/\s/g, '');
            const randomDigits = Math.floor(10000 + Math.random() * 90000);
            const sku = `${namePrefix}-${randomDigits}`;

            const dataToSend = new FormData();
            dataToSend.append('name', formData.name);
            dataToSend.append('price', formData.price);
            dataToSend.append('marketPrice', formData.marketPrice || '');
            dataToSend.append('sku', sku);
            dataToSend.append('id', Date.now().toString());
            dataToSend.append('category', formData.category);
            dataToSend.append('subCategory', formData.subCategory || '');
            dataToSend.append('subSubCategory', formData.subSubCategory || '');
            dataToSend.append('type', formData.type || '');
            dataToSend.append('color', formData.color || '');
            dataToSend.append('size', formData.size || '');
            dataToSend.append('description', formData.description);
            dataToSend.append('tags', JSON.stringify(tags));

            // Append only new images (files)
            const newImages = images.filter(img => img.file);
            if (newImages.length > 0) {
                newImages.forEach(({ file }) => {
                    dataToSend.append('images', file);
                });
            } else {
                throw new Error('Please upload at least one image');
            }

            const res = await axios.post(`${baseUrl}/api/v1/products/create`, dataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                setApiMessage('✔ ' + res.data.message);
                // Reset form
                dispatch(setSelectedProduct(null));
                setImages([]);
                setTags([]);
                setFormData({
                    name: '',
                    price: '',
                    marketPrice: '',
                    category: '',
                    subCategory: '',
                    subSubCategory: '',
                    type: '',
                    color: '',
                    size: '',
                    description: ''
                });
                fileInputRef.current.value = '';
            } else {
                setApiMessage('✖ ' + (res.data.message || 'Failed to create product'));
            }
        } catch (error) {
            setApiMessage('✖ ' + (error.response?.data?.message || error.message || 'Something went wrong'));
        } finally {
            setFormFillingLoading(false);
        }
    };

    const productUpdateHandle = async (e) => {
        e.preventDefault();
        setFormFillingLoading(true);

        try {
            // Validate required fields
            if (!formData.name || !formData.price || !formData.category || !formData.description) {
                throw new Error('Please fill all required fields');
            }

            const dataToSend = new FormData();

            // Append all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== undefined) dataToSend.append(key, value);
            });

            // Handle tags
            dataToSend.append('tags', JSON.stringify(tags));

            // Separate existing images (strings) and new images (file objects)
            const existingImages = images.filter(img => typeof img === 'string');
            const newImages = images.filter(img => img.file);

            // Append existing images to keep
            if (existingImages.length > 0) {
                dataToSend.append('existingImages', JSON.stringify(existingImages));
            }

            // Append new images to upload
            if (newImages.length > 0) {
                newImages.forEach(({ file }) => {
                    dataToSend.append('images', file);
                });
            }

            const res = await axios.put(
                `${baseUrl}/api/v1/products/update/${selectedProduct._id}`,
                dataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                setApiMessage('✔ ' + res.data.message);
                dispatch(setSelectedProduct(null));
                // Optionally navigate away or refresh data
            } else {
                setApiMessage('✖ ' + (res.data.message || 'Failed to update product'));
            }
        } catch (error) {
            console.error('Update error:', error);
            setApiMessage('✖ ' + (error.response?.data?.message || error.message || 'Failed to update product'));
        } finally {
            setFormFillingLoading(false);
        }
    };

    const cancelHandler = (e) => {
        e.preventDefault();
        dispatch(setSelectedProduct(null));
    };

    // Clean up image preview URLs
    useEffect(() => {
        return () => {
            images.forEach(image => {
                if (image.preview) URL.revokeObjectURL(image.preview);
            });
        };
    }, [images]);

    // Clear message after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => setApiMessage(''), 3000);
        return () => clearTimeout(timer);
    }, [apiMessage]);

    return (
        <div className="add_product_page">
            <div className="add_container">
                <div className="form_section image_section">
                    {apiMessage && (
                        <div className={`api-message ${apiMessage.includes('✔') ? 'success' : 'error'}`}>
                            {apiMessage}
                        </div>
                    )}
                    <h2 className="section_title">Product Images</h2>
                    <div className="image_upload_container">
                        <div className="image_preview_grid">
                            {images.map((img, index) => (
                                <div key={index} className="image_preview_wrapper">
                                    <img
                                        src={typeof img === 'string' ? img : img.preview}
                                        alt={`product-${index}`}
                                    />
                                    <button
                                        className="remove_image_btn"
                                        onClick={() => removeImage(index)}
                                        aria-label="Remove image"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            {images.length < 5 && (
                                <div className="image_upload_placeholder" onClick={handleAddImageClick}>
                                    <span>+</span>
                                    <p>Add Image</p>
                                </div>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            multiple
                            onChange={handleImageChange}
                        />
                        <div className="upload_hint">
                            <p>Upload up to 5 images (JPEG, PNG)</p>
                            <p>First image will be used as the main display</p>
                        </div>
                    </div>
                </div>

                <div className="form_section details_section">
                    <h2 className="section_title">Product Details</h2>
                    <div className="form_grid">
                        {/* Row 1 */}
                        <div className="form_group">
                            <label htmlFor="name">Product Name*</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter product name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form_group">
                            <label htmlFor="price">Price*</label>
                            <input
                                id="price"
                                type="number"
                                placeholder="Enter price"
                                required
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Row 2 */}
                        <div className="form_group">
                            <label htmlFor="marketPrice">Market Price</label>
                            <input
                                id="marketPrice"
                                type="number"
                                placeholder="Enter market price"
                                min="0"
                                step="0.01"
                                value={formData.marketPrice}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form_group">
                            <label htmlFor="category">Category*</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="Enter category"
                                required
                                value={formData.category}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Row 3 */}
                        <div className="form_group">
                            <label htmlFor="subCategory">Sub Category</label>
                            <input
                                id="subCategory"
                                type="text"
                                placeholder="Enter sub-category"
                                value={formData.subCategory}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form_group">
                            <label htmlFor="subSubCategory">Sub Sub Category</label>
                            <input
                                id="subSubCategory"
                                type="text"
                                placeholder="Enter sub-sub-category"
                                value={formData.subSubCategory}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Row 4 */}
                        <div className="form_group">
                            <label htmlFor="type">Type</label>
                            <input
                                id="type"
                                type="text"
                                placeholder="Enter product type"
                                value={formData.type}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Row 5 */}
                        <div className="form_group">
                            <label htmlFor="color">Color</label>
                            <input
                                id="color"
                                type="text"
                                placeholder="Enter color"
                                value={formData.color}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form_group">
                            <label htmlFor="size">Size</label>
                            <input
                                id="size"
                                type="text"
                                placeholder="Enter size"
                                value={formData.size}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="form_group">
                        <label htmlFor="tags">Tags</label>
                        <div className="tag_input_container">
                            <input
                                id="tags"
                                type="text"
                                placeholder="Type and press Enter to add a tag"
                                onKeyDown={handleTagKeyDown}
                            />
                            <div className="tags_container">
                                {tags.map((tag, index) => (
                                    <div className="tag_item" key={index}>
                                        {tag}
                                        <button
                                            onClick={() => removeTag(tag)}
                                            className="tag_remove"
                                            aria-label={`Remove tag ${tag}`}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="form_group">
                        <label htmlFor="description">Description*</label>
                        <textarea
                            id="description"
                            placeholder="Enter detailed product description..."
                            rows="5"
                            required
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form_actions">
                        <button type="button" className="cancel_btn" onClick={cancelHandler}>
                            Cancel
                        </button>
                        {selectedProduct ? (
                            <button
                                type="submit"
                                className="submit_btn"
                                onClick={productUpdateHandle}
                                disabled={formFillingLoading}
                            >
                                {formFillingLoading ? 'Updating...' : 'Update Product'}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="submit_btn"
                                onClick={productSubmitHandle}
                                disabled={formFillingLoading}
                            >
                                {formFillingLoading ? 'Creating...' : 'Add Product'}
                            </button>
                        )}
                        {apiMessage && (
                            <div className={`action-message ${apiMessage.includes('✔') ? 'success' : 'error'}`}>
                                {apiMessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;