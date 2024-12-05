import mongoose from "mongoose";

const { Schema } = mongoose;

const journalSchema = new Schema(
    {
        title: { type: String, required: true },
        publishDate: { type: Date, required: true },
        description: { type: String, required: true },
        topics: [{ type: Schema.Types.ObjectId, ref: 'Topic', index: true }]  // Array of references to Topic documents
    },
    {
        timestamps: true,  // Automatically adds createdAt and updatedAt timestamps
    }
);

journalSchema.index({ topics: 1 });

const Journal = mongoose.models.Journal || mongoose.model("Journal", journalSchema);

export default Journal;