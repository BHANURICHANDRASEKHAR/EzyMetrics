import express from 'express';
import DatabaseConnection from './models/db.js'
import ADDLEAD from './Components/Lead.js'
import AddCampaign from './Components/Campaign.js'
import GetCampaignDetails from './Components/fetchCampaign.js'
import GetLeadsData from './Components/fetchLeads.js'
import GenerateResults from './Alerts/pdf.js'
import bodyParser from 'body-parser';
const app = express();  
DatabaseConnection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    console.log('GET request received');
    res.send('Hello World!');
})
app.use(AddCampaign);
app.use(ADDLEAD);
app.use('/campaign',GetCampaignDetails);
app.use(GetLeadsData);
app.use('/reports',GenerateResults);

app.listen(process.env.port || 3000,()=>{
    console.log(`Server is running on port ${process.env.port || 3000}`);
})