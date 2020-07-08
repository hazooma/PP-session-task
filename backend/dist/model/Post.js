"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// grab the things we need
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
// create a schema
const postSchema = new mongoose_2.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
// the schema is useless so far
// we need to create a model using it
const Post = mongoose_1.default.model("Post", postSchema);
// make this available to our users in our Node applications
exports.default = Post;
//# sourceMappingURL=Post.js.map