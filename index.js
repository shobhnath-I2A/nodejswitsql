const express = require('express');
const app = express();
const cors = require('cors');
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}));
app.use(express.json());

const userRouter = require('./router/userRoutes');
const categoryRouter = require('./router/blogCategory');
const blogRouter = require('./router/blogsRoute');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/blog', blogRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});
