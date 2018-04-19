import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EndPointSchema = new Schema({
    url: String,
    name: String,
    userAgent: String
});

export const EndPointModel = mongoose.model('endpoints', EndPointSchema);