import express from 'express';
import Campaign from '../models/Care.js';  
import PDFDocument from 'pdfkit';
import Leads from '../models/lead.js' 
import { Parser as Json2csvParser } from 'json2csv';

const router = express.Router();

router.get('/pdf_for_campaign', async (req, res) => {
    try {
        const campaigns = await Campaign.find(); 

       
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=campaign_report.pdf');

        doc.pipe(res); 

        
        doc.fontSize(20).text('Campaign Report', { align: 'center' });

        campaigns.forEach(campaign => {
            doc.moveDown();
            doc.fontSize(12).text(`Campaign ID: ${campaign._id}`);
            doc.text(`Name: ${campaign.name}`);
            doc.text(`Start Date: ${campaign.startDate.toString().slice(0,10)}`);
            doc.text(`End Date: ${campaign.endDate.toString().slice(0,10)}`);
            doc.text(`Budget: ${campaign.budget}`);
            doc.text(`Channel: ${campaign.channel}`);
            doc.moveDown();
        });

        doc.end();  
    } catch (error) {
        console.error('Error generating PDF report:', error);
        res.status(500).json({ error: 'Failed to generate PDF report' });
    }
});

// Generate CSV Report
router.get('/csv', async (req, res) => {
    try {
        const campaigns = await Campaign.find();  

        
        const fields = ['campaignId', 'name', 'startDate', 'endDate', 'budget', 'channel'];
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(campaigns);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=campaign_report.csv');
        res.status(200).end(csv);  
    } catch (error) {
        console.error('Error generating CSV report:', error);
        res.status(500).json({ error: 'Failed to generate CSV report' });
    }
});
router.get('/pdf_for_leads', async (req, res) => {
    try {
        const leads = await Leads.find(); 

       
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Leads_report.pdf');

        doc.pipe(res); 

        
        doc.fontSize(20).text('Leads Report', { align: 'center' });

        leads.forEach(campaign => {
            doc.moveDown();
            doc.fontSize(12).text(`Lead ID: ${campaign._id}`);
            doc.text(`Name: ${campaign.name}`);
            doc.text(`Start Date: ${campaign.email}`);
            doc.text(`End Date: ${campaign.phone}`);
            doc.text(`Source:${campaign.source}`);
            doc.text(`Assigned Salesperson: ${campaign.assignedSalesperson}`);
           
            doc.moveDown();
        });

        doc.end();  
    } catch (error) {
        console.error('Error generating PDF report:', error);
        res.status(500).json({ error: 'Failed to generate PDF report' });
    }
});

export default router;
