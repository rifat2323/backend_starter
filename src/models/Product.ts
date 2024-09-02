import mongoose, { Document, Schema } from 'mongoose';
import User from './User';
export interface IReview {
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    date: Date;
}

export interface IImage {
    url: string;
    alt: string;
}

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    discountPrice?: number; 
    brand?: string;
    categories: string[];
    stock: number;
    sold?: number;
    images: IImage[];
    reviews: IReview[];
    ratingAverage?: number;
    dateAdded: Date;
    dateUpdated: Date;
    id:Schema.Types.UUID,
}

const ReviewSchema: Schema = new Schema<IReview>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const ImageSchema: Schema = new Schema<IImage>({
    url: { type: String, required: true },
    alt: { type: String, required: true },
});

const ProductSchema: Schema = new Schema<IProduct>({
    id:Schema.Types.UUID,
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    brand: { type: String },
    categories: [{ type: String, required: true }],
    stock: { type: Number, required: true, default: 0 },
    sold: { type: Number, default: 0 },
    images: [ImageSchema],
    reviews: [ReviewSchema],
    ratingAverage: { type: Number, min: 1, max: 5 },
    dateAdded: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
}, {
    timestamps: true, 
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
