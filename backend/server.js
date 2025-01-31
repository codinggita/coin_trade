const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect("mongodb+srv://garvittrivedi:787707@cluster0.s364v.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Virtual Stock Market API!");
});

app.use("/users", require("./routes/users"));
app.use("/stocks", require("./routes/stocks"));
app.use("/trade", require("./routes/trade"));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
