import orderModel from '../models/orderModel.js'
import Stripe from 'stripe'

// stripe checkout gateway
//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SANDBOX_KEY);
const endpointSecret = process.env.WEB_HOOK_SECRET;

const verifyPayment = async (req, res) => {
    try {
        
        let event = req.body;
        // Only verify the event if you have an endpoint secret defined.
        // Otherwise use the basic event deserialized with JSON.parse
        if (endpointSecret) {
            // Get the signature sent by Stripe
            const signature = req.headers['stripe-signature'];
            try {
                event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                endpointSecret
                );
            } catch (err) {
                console.log(`⚠️  Webhook signature verification failed.`, err.message);
                return res.sendStatus(400);
            }
        }
    
        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                const sessionCompleted = event.data.object;

                handleOrder(sessionCompleted);
                break;
            case 'checkout.session.expired':
                const sessionExpired = event.data.object;

                handleOrder(sessionExpired);
                break;
            default:
                // Unexpected event type
                console.log(`Unhandled event type ${event.type}.`);
        }
    
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const handleOrder = async (session) => {
    if (session.payment_status === 'paid') {
        console.log(`Order ${session.metadata.orderId} successfully paid`);
        await orderModel.findByIdAndUpdate(session.metadata.orderId, { payment: true });
        await userModel.findByIdAndUpdate(session.metadata.userId, { cartData: {} });
    } else {
        console.log(`Order ${session.metadata.orderId} failed`);
        await orderModel.findByIdAndDelete(session.metadata.orderId);
    }
}

export {verifyPayment}