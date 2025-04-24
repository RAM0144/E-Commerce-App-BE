import express from "express";
import { Order } from "../DB-utilis/models.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", async (req, res) => {
    try {

       const id = Date.now().toString(); 
       const { products, totalQty } = req.body;
       const body = {
        products,
        totalQty,
        orderId: id,
        orderTotal: products.reduce((p, c) => p + c.qty * c.price, 0),
       };
     
       const order = new Order(body);

       await order.save();
       res.json({ msg: `OrderNo: ${id} Placed Successfully!!` });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong", error});
    }
});

export default orderRouter;