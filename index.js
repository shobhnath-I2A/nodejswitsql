const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const userRouter = require('./router/userRoutes');
const categoryRouter = require('./router/blogCategory');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});
