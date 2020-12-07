const Turma = require('../models/Turma')

const controller = {}

//Operação CREATE
controller.novo = async (req, res) => {
    //usa os dados que chegam dentro do body da aquisição
    //e os envia o BD para criação de um novo objeto
    try {
        await Turma.create(req.body)
        // HTTP 201: Created
        res.status(201).end()
    }
    catch(erro) {
        console.log(erro)
        // HTTP 500: Internal Server Error
        res.status(500).send(erro)
    }
}

//Operação RETRIEVE(all)
controller.listar = async (req, res) => {
    try{
    //Tras todos os cursos cadastrados
    let dados = await Turma.find()
        .populate('curso', "nome nivel")
        .populate('professor')
        .populate('sala_aula', "nome capacidade")
    res.send(dados) // Vai com status HTTP 200: OK
    }
    catch(erro){
        console.log(erro)
        res.status(500).send
    }
}

//Operação RETRIEVE(one)
controller.obterUm = async (req, res) => {
    try{
        const id = req.params.id
        let obj = await Turma.findById(id)

        if(obj) res.send(obj)
        else res.status(404).end()
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

//Operação UPDATE
controller.atualizar = async (req, res) =>{
    try{
        const id = req.body._id
        let ret = await Turma.findByIdAndUpdate(id, req.body)
        
        if(ret) res.status(204).end()
        else res.status(404).end()
    }  
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }  
}

//Operação DELETE
controller.excluir = async (req, res) =>{
    try{
        const id = req.body._id
        let ret = await Turma.findByIdAndDelete(id, req.body)
        
        if(ret) res.status(204).end()
        else res.status(404).end()
    }  
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }  
}
module.exports = controller