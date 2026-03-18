import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("DB connected");
        });

        let mongodbURI = process.env.MONGODB_URI;
        const projName = "kanicv";

        if (!mongodbURI) {
            throw new Error("MongoDB URI not set");
        }
        if (mongodbURI.endsWith("/")) {
            mongodbURI = mongodbURI.slice(0, -1);
        }

        await mongoose.connect(`${mongodbURI}/${projName}`);
    } catch (error) {
        console.error("error connecting:", error);
    }
};

export default connectDB;
