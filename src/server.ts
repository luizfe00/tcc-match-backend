require('dotenv').config();
import app from '@configs/app';
import { makeSchedulerJob } from './factories/services/make-scheduler-job';

const PORT = process.env.PORT || 8080;

makeSchedulerJob().scheduleJob();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
