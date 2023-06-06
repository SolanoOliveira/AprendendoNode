import { Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';
const loremIpsum = new LoremIpsum();

const log = function (req: Request, res: Response) {
  res.send('Gravando os logs no arquivo access.log');
};

const lorem = async function (req: Request, res: Response) {
  const numParagraphs = parseInt(req.query.numParagraphs as string);
  const loremTexts = loremIpsum.generateParagraphs(numParagraphs);
  const paragraphs = loremTexts.split('\n');
  console.log('paragraphs >', paragraphs);
  // Passa um objeto JSON paragraphs contendo o array de parágrafos
  res.json(paragraphs);
};

const hb1 = function (req: Request, res: Response) {
  res.render('main/hb1', {
    uf: 'Universidade Federal do Amazonas',
  });
};

const hb2 = function (req: Request, res: Response) {
  res.render('main/hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
  });
};

const hb3 = function (req: Request, res: Response) {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ];
  res.render('main/hb3', { profes });
};

const hb4 = function (req: Request, res: Response) {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ];
  res.render('main/hb4', { profes });
};

const hb5 = function (req: Request, res: Response) {
  const technos = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];
  res.render('main/hb5', { technos });
};

export default { log, hb1, hb2, hb3, hb4, hb5, lorem };
