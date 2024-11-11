import express from 'express';
import { verifyPayment } from '../controllers/stripeWebhookController.js';

const stripeWebhookRouter = express.Router();

stripeWebhookRouter.post('/verifyPayment', express.raw({type: 'application/json'}), verifyPayment);

export default stripeWebhookRouter;