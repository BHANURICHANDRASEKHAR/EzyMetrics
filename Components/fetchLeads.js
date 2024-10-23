import express from 'express';
import Leads from '../models/lead.js';  
const router = express.Router();


export default router.get('/getLeadsData', async (req, res) => {
    try {
        const Leads = await Leads.find();  
        res.status(200).json(Leads);  
    } catch (error) {
        console.error('Error fetching Leads Data:', error);
        res.status(500).json({ error: 'Failed to fetch Leads Data' });
    }
});
