import { getTodosPosts, criarPost, actualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";


export async function listarPosts (req, res) {
    // Obtiene todos los posts
    const posts = await getTodosPosts();
    // Envía los posts como respuesta JSON con código de estado 200 (OK)
    res.status(200).json(posts);
}

export async function postarPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Error": "Se hizo pija el servidor"});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemActualizada =  `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemActualizada);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Error": "Se hizo pija el servidor"});
    }
}

export async function actualizarNuevoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png` 
    try {
        
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt,
        }
        const postCriado = await actualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Error": "Se hizo pija el servidor"});
    }
}