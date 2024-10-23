import express from 'express';
import Lead from '../models/lead.js'; 

const router = express.Router();

router.post('/leads', async (req, res) => {
    try {
        const newLead = new Lead({
            
            name: req.body.name || 'BHANURI CHANDU',
            email: req.body.email || 'bhanurichandu@gmail.com',
            phone: req.body.phone || '9885465280',
            source: req.body.source || 'Website',
            assignedSalesperson: req.body.assignedSalesperson || 'Bobby'
        });

        await newLead.save();

        res.status(201).send(newLead); 
    } catch (error) {
        console.error('Error:', error);
        res.status(400).send({ error: 'Failed to save lead' });
    }
});

export default router;
