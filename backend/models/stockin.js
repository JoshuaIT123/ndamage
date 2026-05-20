import mongoose from "mongoose";

const stockInSchema = mongoose.Schema({
    stockInQuantity: Number,
    stockInDate: {
        type: Date,
        default: Date.now,
        set: (val) => {
            if (typeof val === 'string') {
                const parts = val.split('-');
                // Handle DD-M-YYYY format
                if (parts.length === 3 && parts[0].length !== 4) {
                    const [day, month, year] = parts;
                    return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
                }
            }
            return val;
        }
    },
    spareparts_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spareparts'
    }
}, {
    timestamps: true
})

export default mongoose.model('stockin', stockInSchema)