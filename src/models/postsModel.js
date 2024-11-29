import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";


// Conecta a la base de datos utilizando la cadena de conexión del entorno
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);


// Función asíncrona para obtener todos los posts de la colección "posts"
export async function getTodosPosts() {
    // Selecciona la base de datos "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Selecciona la colección "posts"
    const colecao = db.collection("posts");
    // Encuentra todos los documentos de la colección y los devuelve como un array
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost);
}

export async function actualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id)
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}