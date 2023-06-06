import express from 'express';
import validateEnv from './utils/validateEnv';
import dotenv from 'dotenv';
import morgan from 'morgan';
import accessLogger from './middlewares/accessLogger';
import router from './router/router';
import { engine } from 'express-handlebars';
import sassMiddleware from 'node-sass-middleware'; // Alterei o nome do pacote aqui

dotenv.config();
validateEnv();

const PORT = process.env.PORT || 3333; // Substituí o operador ?? pelo operador ||
const app = express();
const rootPath = process.cwd();

app.engine('handlebars', engine({ helpers: require('./views/helpers/helpers') }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.use(
  sassMiddleware({
    src: `${rootPath}/public/scss`,
    dest: `${rootPath}/public/css`,
    outputStyle: 'compressed',
    prefix: `/css`,
  }),
);

app.use('/css', express.static(`${__dirname}/../public/css`));

app.use('/js', [
  express.static(`${__dirname}/../public/js`),
  express.static(`${__dirname}/../node_modules/bootstrap/dist/js/`),
]);

app.use(
  '/webfonts',
  express.static(`${__dirname}/../node_modules/@fortawesome/fontawesome-free/webfonts`),
);

app.use(morgan('combined'));
app.use(accessLogger('simples'));
app.use(accessLogger('completo'));
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
