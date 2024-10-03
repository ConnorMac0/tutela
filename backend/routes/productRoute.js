import express from 'express';
import { addProduct, listProducts, removeProduct, productDetails } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), addProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.get('/list', listProducts);
productRouter.get('/details', productDetails);


export default productRouter;