import mongoose from "mongoose";
const campaignSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    budget: { type: Number, required: true },
    channel: { type: String, required: true },
   
   
});
export default mongoose.model('Campaign', campaignSchema);
