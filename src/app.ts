/* Configuration of express */

import express, { Application, Request, Response } from 'express';
import { AuthRouter } from './routes/Auth.routes';
import { PatientRouter } from './routes/Patient.routes';
import { AdminRouter } from './routes/Admin.routes';
import { DoctorRouter } from './routes/Doctor.routes';
const app: Application = express();

app.use(express.json());
//Firebase router
app.use('/auth', AuthRouter);
// Local routers
app.use('/patient', PatientRouter);
app.use('/doctor', DoctorRouter);
app.use('/admin', AdminRouter);

// Home
app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEE!');
})

export default app;