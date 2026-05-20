import spareparts from "../models/spareparts.js";

export const createSparepart = async (req, res) => {
    try {
        const part = await spareparts.create(req.body);
        res.status(201).json({ message: "Spare part created successfully", part })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getSpareparts = async (req, res) => {
    try {
        const parts = await spareparts.find().sort({ createdAt: -1 });
        res.status(200).json(parts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteSparepart = async (req, res) => {
    try {
        const { id } = req.params;
        await spareparts.findByIdAndDelete(id);
        res.status(200).json({ message: "Spare part deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}