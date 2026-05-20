import stockin from '../models/stockin.js'

export const createStockIn = async (req, res) => {
    try {
        await stockin.create(req.body);
        res.status(201).json({ message: "StockIn created successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getStockIns = async (req, res) => {
    try {
        const records = await stockin.find().populate('spareparts_id').sort({ createdAt: -1 });
        res.status(200).json(records)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}