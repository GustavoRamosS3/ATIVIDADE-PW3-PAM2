import express from 'express';
import cors from 'cors'; 
import * as perfumes from './routes/perfumes';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.status(200).json("{'result':'ok'}");
})

app.get('/perfumes', async (req, res) => {
    try {
        let nome = req.query.nome;
        let result;

        // Consultar o banco de dados
        if (nome) {
            result = await perfumes.consultar(nome);
        } else {
            result = await perfumes.consultar();
        }

        // Verificar se há resultados
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            // Se nenhum resultado for encontrado, retornar 404
            res.status(404).json({ erro: 'Nenhum recurso encontrado' });
        }
    } catch (error) {
        // Lidar com erros de forma adequada, por exemplo, retornando um status 500
        console.error('Erro na consulta:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.post('/perfumes',async(req,res)=>{
    try {
        const { nome, marca } = req.body; // Supondo que os dados enviados tenham campos 'nome' e 'marcaDeMercado'

        // Chamar a função cadastrar com os dados recebidos
        const novaperfumes = await perfumes.cadastrar(nome, marca);

        // Enviar uma resposta com os dados da nova celulares cadastrada
        res.status(201).json(novaperfumes);
    } catch (error) {
        // Lidar com erros, se houver algum
        console.error('Erro ao cadastrar perfume:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
})



app.get('/user', async (req, res) => {
    try {
        let nome = req.query.nome;
        let result;

        // Consultar o banco de dados
        if (nome) {
            result = await perfumes.consultarUser(nome);
        } else {
            result = await perfumes.consultarUser();
        }

        // Verificar se há resultados
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            // Se nenhum resultado for encontrado, retornar 404
            res.status(404).json({ erro: 'Nenhum recurso encontrado' });
        }
    } catch (error) {
        // Lidar com erros de forma adequada, por exemplo, retornando um status 500
        console.error('Erro na consulta:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});


app.post('/cadastrar',async(req,res)=>{
    try {
        const { nome, senha, gmail } = req.body; // Supondo que os dados enviados tenham campos 'nome' e 'marcaDeMercado'

        // Chamar a função cadastrar com os dados recebidos
        const novouser = await celulares.cadastrarUser(nome, senha, gmail);

        // Enviar uma resposta com os dados da nova celulares cadastrada
        res.status(201).json(novouser);
    } catch (error) {
        // Lidar com erros, se houver algum
        console.error('Erro ao cadastrar celulares:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
})

app.listen(3000,()=>{
    let data = new Date();
    console.log(`Sistema inicializado: \nInf:${data}`);
    console.log('http://localhost:3000/');
})
