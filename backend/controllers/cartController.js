import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {

        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            res.json({ success: false, message: "Only 1 item available for purchase" })
            return;
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Added To Cart" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}
const updateCart = async (req, res) => {
    try {

        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;
        if (quantity === 0) {
            delete cartData[itemId];
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}
const getUserCart = async (req, res) => {
    try {

        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

export { addToCart, updateCart, getUserCart }