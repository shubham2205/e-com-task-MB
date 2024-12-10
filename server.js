import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import { MongoClient } from "mongodb";
import cors from "cors";

dotenv.config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const mongoClient = new MongoClient(process.env.MONGODB_URI);

app.use(cors({ origin: process.env.DOMAIN }));

app.use(express.json());

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook Error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id
        );
        await mongoClient.connect();
        const db = mongoClient.db("ecommerce");
        const ordersCollection = db.collection("orders");

        await ordersCollection.insertOne({
          email: session.customer_email,
          paymentIntentId: session.payment_intent,
          amount: session.amount_total / 100,
          status: "success",
          items: lineItems.data,
          createdAt: new Date(),
        });

        console.log("Order saved successfully");
      } catch (error) {
        console.error("Error saving order:", error);
      } finally {
        await mongoClient.close();
      }
    }

    res.json({ received: true });
  }
);

app.post("/api/create-checkout-session", async (req, res) => {
  const { email, items } = req.body;

  if (!email || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.DOMAIN}/thank-you`,
      cancel_url: `${process.env.DOMAIN}/payment-failed`,
      customer_email: email,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while creating the checkout session.",
      });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
