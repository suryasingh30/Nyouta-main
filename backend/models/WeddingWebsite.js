import mongoose from "mongoose";

const weddingWebsiteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    home: {
        name: { type: String, required: false },
        partnerName: { type: String, required: false },
        images: [{ type: String }],
        weddingDate: { type: Date, required: false },
        weddingLocation: { type: String, required: false },
        text:{ type: String, required: false },
    },
    about: {
        bride:{
            image: { type: String, required: false },
            description: { type: String, required: false },
        },
        groom:{
            image: { type: String, required: false },
            description: { type: String, required: false },
        },
    },
    ourStory: {
        description: { type: String, required: false },
        images: [{ type: String }],
    },
    eventInfo:[{
        description: { type: String, required: false },
        time:{ type: String, required: false },
        venue:{
            name: { type: String, required: false },
            address: { type: String, required: false },
            location: { type: String, required: false },
        },
    }],
    socialLinks:{
        facebook: { type: String, required: false },
        instagram: { type: String, required: false },
        twitter: { type: String, required: false },
    },
    tags:{
        type: [String],
        required: false,
    },
    gallery:{
        photos:[String]
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const WeddingWebsite = mongoose.model("WeddingWebsite", weddingWebsiteSchema);

export default WeddingWebsite;
