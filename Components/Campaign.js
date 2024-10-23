import express from 'express';
import Campaign from '../models/Care.js'; 
import sendEmailAlert from '../Alerts/Email.js' 
const router = express.Router();

router.post('/campaign', async (req, res) => {
    try {
        const newCampaign = new Campaign({
            name: req.body.name || 'General Campaign',
            startDate: req.body.startDate || new Date(),
            endDate: req.body.endDate || new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), 
            budget: req.body.budget || 15000,
            channel: req.body.channel || 'Social Channel',
        });
         
         if (newCampaign.budget > 10000) {
            await sendEmailAlert(newCampaign);
        }
        await newCampaign.save();
        res.status(201).send(newCampaign); 
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).send({ error: 'Failed to save campaign' }); 
    }
});

export default router;
