import mongoose,{Document}  from "mongoose";

interface IUSER extends Document{
    name: string;
    email: string;
    password: string;
    role: "user" | "admin" | "super-admin" | "demo-admin";
    profilePicture?: string;
    bio?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    socialLinks?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;

}

const userSchema = new mongoose.Schema<IUSER>({
    name: {
        type: String,
        required: [true,"name is required"],
        trim:true,
        maxLength: [20, "name can not be more than 20 characters"],
        minLength: [3, "name can not be less than 3 characters"]
        
    },
    email: {
        type: String,
        required: true,
        
        unique:true,
        lowercase:true,
        trim:true
        
    },
    password: {
        type: String,
        required:true
      

    },
    role:{
        type:String,
        default:'user'

    },
    profilePicture: {
        type: String, 
        default: "",  
    },
    bio: {
        type: String,
        maxLength: [500, "Bio must be less than 500 characters"], // Optional, with max length validation
    },
    address: {
        street: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        postalCode: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
    },
    socialLinks: {
        twitter: {
            type: String,
            trim: true,
            match: [/^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+$/, "Please use a valid Twitter URL"],
        },
        linkedin: {
            type: String,
            trim: true,
            match: [/^https?:\/\/(www\.)?linkedin\.com\/.*$/, "Please use a valid LinkedIn URL"],
        },
        github: {
            type: String,
            trim: true,
            match: [/^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/, "Please use a valid GitHub URL"],
        },
    },
    isActive: {
        type: Boolean,
        default: true, 
    }

},{timestamps:true})

const User = mongoose.model<IUSER>('User', userSchema)
export default User