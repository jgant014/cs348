import mongoose from "mongoose";

const { Schema } = mongoose;

const topicSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        journalId: { type: Schema.Types.ObjectId, ref: 'Journal', required: true },
        author: { type: String, required: true },
        publishDate: { type: Date, default: Date.now },
        pdf: { type: String, required: true },  
    },
    {
        timestamps: true,  
    }
);

// Index for sorting/filtering by publish date
topicSchema.index({ publishDate: -1 }); 

// Compound index for filtering by title, description, and author
topicSchema.index({ title: 1, description: 1, author: 1 }); 

// Text index for full-text search on description
topicSchema.index({ description: 'text' }); // Optimized for keyword searches in long descriptions

// Single-field index for title
topicSchema.index({ title: 1 }); 

// Single-field index for author
topicSchema.index({ author: 1 }); 



const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;