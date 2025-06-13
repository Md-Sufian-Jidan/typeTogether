import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
});

const Document = mongoose.model('document', schema);

export default Document;