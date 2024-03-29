import mongoose, {Schema} from 'mongoose';

const NoteSchema = new Schema({
    createdBy:{type: Schema.Types.ObjectId,ref:'User' ,required: true},
    title: {type: String, default: false},
    content: {type: String, default: true},
    tag: {type: String, default: false},
    label: {type: String, default: false}
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

})

NoteSchema.set('toJSON', {virtuals: true})

const NoteModel = mongoose.model('Notes', NoteSchema)

module.exports = {
    NoteModel
}