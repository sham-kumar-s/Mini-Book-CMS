import express from "express";
import cors from "cors";
import initDB from "./utils/db.js";

//Routes
import bookRoutes from "./routes/bookRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import pageRoutes from "./routes/pagesRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/books",bookRoutes);
app.use("/chapters",chapterRoutes);
app.use("/pages",pageRoutes);

initDB().then( () => {
    app.listen(3000, () => {
        console.log("Server running on port 3000")
    })
})