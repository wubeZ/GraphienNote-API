import mongoose, {Schema} from "mongoose";

const RemainderSchema = new Schema({
    createdBy: {type: Schema.Types.ObjectId, reqired: true},
    content: {type: String, required: true},
    setTime: {type: Number, required: true},
    isCompleted: {type: Boolean, default: false, required: false},
    completedTime: {type: Number, default: -1 }
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

RemainderSchema.set('toJSON',{virtuals: true})

const RemainderModel = mongoose.model('Remainders', RemainderSchema)

module.exports = {
    RemainderModel
}