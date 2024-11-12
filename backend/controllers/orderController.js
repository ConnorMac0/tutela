import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js'
import Stripe from 'stripe'

const currency = 'usd';
const shippingFee = 10;

// stripe checkout gateway
//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SANDBOX_KEY);

// Placing order using Stripe
const placeOrderStripe = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Fees'
                },
                unit_amount: shippingFee * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            metadata: {
                userId: userId,
                orderId: newOrder._id,
            },
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url, message: 'Order Placed' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// const verifyPayment = async (req, res) => {
//     const { orderId, success, userId } = req.body;

//     try {

//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             await userModel.findByIdAndUpdate(userId, { cartData: {} });

//             res.json({ success: true });
//         } else {
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({ success: false });
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// Orders data for admin panel
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Orders data for users on frontend
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body;

        const orders = await orderModel.find({ userId });

        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Update order status on admin panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({ success: true, message: "Status Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export { placeOrderStripe, allOrders, userOrders, updateStatus };