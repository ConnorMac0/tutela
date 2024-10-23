import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js'


// Placing order using Paypal
const placeOrderPaypal = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Paypal",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Order Placed' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

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

        res.json({success:true, message: "Status Updated"});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export { placeOrderPaypal, allOrders, userOrders, updateStatus };