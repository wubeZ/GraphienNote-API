import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    middleName: {type: String, required: false},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

})

UserSchema.set('toJSON', { virtuals: true })

const userModel = mongoose.model('User', UserSchema)

module.exports = {
    userModel
}