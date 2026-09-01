const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();





require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
    .catch(err => console.log(err));




