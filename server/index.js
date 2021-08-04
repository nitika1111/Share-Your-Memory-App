import express from 'express';
//import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// CORS
app.use(cors());

// Routes
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Hello to Memories API');
});

const PORT = process.env.PORT || 5000;

// Database Connection
const CONNECTION_URL =
  'mongodb+srv://admin:admin@cluster0.xq7rf.mongodb.net/memoriesDatabase?retryWrites=true&w=majority';
mongoose
  //.connect(process.env.CONNECTION_URL, {
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port=${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
