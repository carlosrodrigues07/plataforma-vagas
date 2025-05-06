const express = require('express');
const path = require('path');
const app = express();

const { Candidatura, Usuario, sequelize } = require('./db.js');

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado com sucesso');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/api/candidaturas', async (req, res) => {
  try {
    const candidaturas = await Candidatura.findAll();

    res.status(200).json(candidaturas);
  } catch (error) {
    console.error('Erro ao buscar candidaturas:', error);

    res.status(500).send('Erro ao carregar candidaturas');
  }
});

app.post('/api/candidatar', async (req, res) => {
  const { titulo, descricao, requisitos } = req.body;

  try {
    const novaCandidatura = await Candidatura.create({
      titulo,
      descricao,
      requisitos
    });

    console.log('Candidatura salva:', novaCandidatura.toJSON());

    res.redirect('/')
  } catch (error) {
    console.error('Erro ao salvar candidatura:', error);

    res.status(500).send('Erro ao salvar a candidatura');
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
