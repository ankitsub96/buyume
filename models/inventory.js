const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const InventorySchema = new Schema({
  productId: {type:String, required:true,},
  quantity: {type: Number, required:true, default:0},
  act: {type: Boolean, required: true},//to soft-delete records
},{
  timestamps:true
});
InventorySchema.statics={
  OPERATION_TYPES:{
    ADD:'add',
    SUBTRACT:'subtract',
  }
}
InventorySchema.index({ productId: 1 }, {
  unique: true,
  partialFilterExpression: {
    'act':true
  }
});//needs to be unique, only when act:true. Multiple deleted records can still exist with same productId
module.exports = mongoose.model('Inventory', InventorySchema);