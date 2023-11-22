// rotas da API
const router = require("express").Router();

const Person = require("../models/Person");

//CREATE -> REGISTER
router.post("/", async (req, res) => {
  //req.body
  const { name, email, password, phone } = req.body;

  if (!name) {
    res.status(422).json({ error: "O Nome é obtigatório!" });
  }

  if (!email) {
    res.status(422).json({ error: "O Email é obtigatório!" });
  }

  if (!password) {
    res.status(422).json({ error: "A senha é obtigatório!" });
  }

  if (!phone) {
    res.status(422).json({ error: "O Telefone é obtigatório!" });
  }

  const person = {
    name,
    email,
    password,
    phone,
  };

  //Varifica Usuário
  //email
  const emailExist = await Person.findOne({ email: email });

  if (emailExist) {
    return res.status(422).json({ msg: "E-mail já cadastrado!" });
  }

  //nome
  const nameExist = await Person.findOne({ name: name });

  if (nameExist) {
    return res.status(422).json({ msg: "Nome de usuário já cadastrado!" });
  }

  //telefone
  const phoneExist = await Person.findOne({ phone: phone });

  if (phoneExist) {
    return res.status(422).json({ msg: "Telefone já cadastrado!" });
  }

  try {
    //criando dados
    await Person.create(person);

    res.status(201).json({ message: "pessoa criada" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//READ
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ message: "O usuário não foi encontrado!" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
    const person = { email, password } = req.body;
  
    if (!email) {
      return res.status(422).json({ error: "O Email é obtigatório!" });
    }
  
    if (!password) {
      return res.status(422).json({ error: "A senha é obtigatório!" });
    }
  
    const user = await Person.findOne({ email: email });
  
    if (!user) {
      return res.status(422).json({ msg: "Usuário não encontrado!" });
    }
  
    const passwordExist = await Person.compare(password, person.password);
  
    if (!passwordExist) {
      return res.status(422).json({ msg: "Senha incorreta!" });
    }
  
    try {
     res.status(200).json('Usuário Logado!')
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

//Update
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, email, password, phone } = req.body;

  const person = {
    name,
    email,
    password,
    phone,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: "O usuário não foi encontrado!" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});



router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({ message: "O usuário não foi encontrado!" });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: "Usuário Removido!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
