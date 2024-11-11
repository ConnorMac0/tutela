const endpointSecret = process.env.WEB_HOOK_SECRET;

const verifyPayment = () => {
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
            case 'payment_intent.succeeded':
                const paymentIntentSucceeded = event.data.object;
                console.log(`PaymentIntent for ${paymentIntentSucceeded.amount} was successful!`);
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded(paymentIntent);
                console.log(paymentIntentSucceeded);
    
                break;
            case 'payment_intent.payment_failed':
                const paymentIntentFailed = event.data.object;
                console.log(`PaymentIntent for ${paymentIntentFailed.amount} failed!`);
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded(paymentIntent);
                console.log(paymentIntentFailed);
    
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

export {verifyPayment}