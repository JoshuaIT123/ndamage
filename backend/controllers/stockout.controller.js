import stockout from "../models/stockout.js";

export const addStockOut = async (req, res) => {
    try {
        await stockout.create(req.body);
        res.status(201).json({ message: "Stock Out Added Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getStockOuts = async (req,res) =>{
    try {
        const Stock_Outs = await stockout.find().populate('spareparts_id');
        res.status(200).json(Stock_Outs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateStockOuts = async (req,res) =>{
    try {
        const {id} = req.params;
        const Stock_Outs = await stockout.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(Stock_Outs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteStockOuts = async (req,res) =>{
    try {
        const {id} = req.params;
        const Stock_Outs = await stockout.findByIdAndDelete(id);
        res.status(200).json(Stock_Outs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}