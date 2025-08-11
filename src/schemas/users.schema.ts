import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true  },
    email: { type: String, required: true  },
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false}
    },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUsersByEmail = (email: string) => UserModel.findOne({email});
export const getUsersBySeasonToken = (seasonToken: string) => UserModel.findOne({
    'authentication.sessionToken': seasonToken,
});

export const getUsersById = (id: string) => UserModel.findById({id});
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user)=>{ user.toObject()});
export const deleteUsersById = (id: string) => UserModel.findOneAndDelete({ _id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
