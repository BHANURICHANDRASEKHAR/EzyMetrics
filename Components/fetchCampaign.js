import express from 'express';
import Campaign from '../models/Care.js';  
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const campaigns = await Campaign.find();  
        res.status(200).json(campaigns);  
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);  

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        res.status(200).json(campaign);  
    } catch (error) {
        console.error('Error fetching campaign:', error);
        res.status(500).json({ error: 'Failed to fetch campaign' });
    }
});

export default router;
