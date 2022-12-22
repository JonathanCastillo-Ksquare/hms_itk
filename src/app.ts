// configuracion de express en su propio archivo
import express, { Application, Request, Response } from 'express';
import { AuthRouter } from './routes/Auth.routes';
import { PatientRouter } from './routes/Patient.routes';
import { AdminRouter } from './routes/Admin.routes';
const app: Application = express();

app.use(express.json());
//Firebase
app.use('/auth', AuthRouter);
app.use('/patient', PatientRouter);
app.use('/admin', AdminRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEE!');
})

export default app;