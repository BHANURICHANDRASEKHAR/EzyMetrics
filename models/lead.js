import  mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
  
    source: { type: String, required: true },
    assignedSalesperson: { type: String },
   
});

const dATA = mongoose.model('Lead', leadSchema);
export default dATA;
