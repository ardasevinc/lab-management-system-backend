import 'dotenv/config';
import express, {
  Request,
  Response,
  json,
  NextFunction,
  urlencoded,
} from 'express';
import cors from 'cors';

const app = express();

app.use(cors(), json(), urlencoded({ extended: true }));

// app.use(express.json());

app.get('/computers/:name', (req: Request, res: Response): Response => {
  return res.send(`GET ${req.url}`);
});

app.use((req: Request, res: Response): Response => {
  return res.status(404).send({
    error: true,
    message: 'oopsie woopsie, what were you searching for?',
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .send({ error: true, message: "it's not your fault, really." });
});

const start = async (): Promise<void> => {
  try {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
