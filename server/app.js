const express = require('express');
const app = express();
const cors = require('cors');


const userRouter = require('./routes/usersRouter');
const authRouter = require("./routes/authRouter");
const mealRouter = require("./routes/mealRouter")
const { default: mongoose } = require('mongoose');


app.use(cors());
app.use(express.json());


app.use('/users', userRouter);
app.use("/login", authRouter);
app.use("/meals", mealRouter);

app.use((req,res,next) => {
    res.status(404).send('API NOT SUPPORTED');
});

app.use((err, req, res, nect) => {
    res.status(500).send({error: err.message});
});

mongoose.connect('mongodb://localhost:27017/cs568sep')
    .then(() => {
    app.listen(8080, () => console.log('Connected to database...on 8080 post'));
}).catch(err => console.error(err.message));
