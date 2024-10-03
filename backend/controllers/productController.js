import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// function for adding product
const addProduct = async (req, res) => {

    try {

        const { name, description, price, size } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];

        const images = [image1, image2].filter((item) => item != undefined)

        let imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            size,
            image: imagesURL,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save();


        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// function for listing products
const listProducts = async (req, res) => {

    try {

        const products = await productModel.find({});
        res.json({ success: true, products })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// function for product details
const productDetails = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, productDetails }