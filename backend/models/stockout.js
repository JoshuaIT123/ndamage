import mongoose from "mongoose";


const stockOutSchema = mongoose.Schema({
    stockOutQuantity:Number,
    stockOutUnitPrice:Number,
    stockOutTotalPrice:Number,
    stockOutDate:Date,
    spareparts_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'spareparts'
    }

},{
    timestamps:true
})

export default mongoose.model('stockout',stockOutSchema)