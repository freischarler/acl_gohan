import express from 'express';
import { MercadoPagoConfig, Preference } from "mercadopago";
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const   router = express.Router();
router.post('/create_preference', async (req, res) => {
    //console.log(req.body)
    try{
        const body = {
            items: [
                {
                    title: req.body.title, 
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS",
                },
            ],
                back_urls: {
                    success: "http://www.youtube.com",
                    failure: "http://www.google.com",
                    pending: "http://www.facebook.com",
                },
                notification_url: "https:localhost:3000/mp/webhook",
                auto_return: "approved",     
        }

        const preference = new Preference(client);
        const result = await preference.create({body});
        res.json({
            id: result.id,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
});

router.post('/webhook', (req, res) => {
    console.log(req.body)
    res.status(200).end();}
);

export default router;
