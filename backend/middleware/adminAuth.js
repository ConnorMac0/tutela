import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {

    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized, Try Again" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.role !== "admin") {
            res.json({ success: false, message: "Not Authorized, Try Again Bitch" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

export default adminAuth;