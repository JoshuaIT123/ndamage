import mongoose from 'mongoose';

const sparePartSchema = mongoose.Schema({
    name:String,
    category:String,
    quantity:Number,
    unitPrice:Number,
    totalPrice:Number
},{
    timestamps:true
})

export default mongoose.model('spareparts',sparePartSchema)