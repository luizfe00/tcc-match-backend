require('dotenv').config();
import app from '@configs/app';
import { makeSchedulerJob } from './factories/services/make-scheduler-job';
import { makeSystemConfiguration } from './factories/model/system-configuration';

const PORT = process.env.PORT || 8080;

makeSchedulerJob().scheduleJob();
makeSystemConfiguration();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
