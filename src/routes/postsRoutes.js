import express from "express";
import { listarPosts, postarPost , uploadImagem, actualizarNuevoPost} from "../controllers/postsController.js";
import multer from "multer";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Habilita el procesamiento de JSON en las solicitudes
    app.use(express.json());
    app.use(cors(corsOptions));
    //Esta ruta trae todos los posts
    app.get("/posts", listarPosts);
    //Esta ruta crea un post nuevo
    app.post("/posts", postarPost); 

    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", actualizarNuevoPost);
}

export default routes;

