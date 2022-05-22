<div id="top"></div>


<br />
<div align="center">
  <a style="text-decoration: none;" href="https://blaze.com/r/KOGDR9">
    <img src="./assets/blaze.png" alt="Logo" width="auto" height="80">
  </a>

  <h2 align="center">Blaze Double</h2>
</div>




## 🤖 Bot Blaze
 
A [Blaze][blaze] apostas é um cassino online que recentemente se tornou popular nas redes sociais. 

Esse bot tem como objetivo enviar mensagem em grupo/canal no telegram, indicando uma possível cor para apostar.

* __O bot não faz a coleta da útima cor que saiu na blaze, isso você vai ter que fazer.__
* __Não existe um padrão programado, você tem que programar ele neste arquivo `MetricDouble.ts`.__
 
  Caminho:
  ```
  ./src/helpers/botMetrics/MetricDouble.ts
  ```



<p align="right"><a href="#top">top</a></p>




## ✨ Instalação

_Para executar o bot, precisa seguir os passos a seguir._

1. Clone o repositório
   ```sh
   git clone https://github.com/jocimarjsc/blazebot
   ```
2. Instalar as dependências
   ```sh
   npm install
   ```
   ou
   ```sh
   yarn
   ```
3. Trocar o nome do arquivo `.env.exemple` para `.env`

4. Coloque os valores das variavés de ambiente no arquivo `.env`
   ```js
   PORT = 3000
   
   TOKEN_TELEGRAM = your bot token
   
   CHANNEL_NAME = your ID channel

   DATABASE_URL="mysql://userDatabase:password@localhost:port/nameDatabase"
   ```

<p align="right"><a href="#top">top</a></p>




### 🗃️ Banco de dados

Para esse projeto é necessário ter um banco de dados, optei por usar o [MySql][mysql].

1. Instale o [MySql][mysql]

2. Crie um banco de dados com o seguinte nome `tips_blaze`

<p align="right"><a href="#top">top</a></p>




## 📝 Como Usar

1. Deve-se executar

   ```
   npx prisma migrate dev --name add_tables
   ```
   ou
   ```
   yarn prisma migrate dev --name add_tables
   ```

2. Executar como desenvolvimento
   ```
   npm run dev
   ```
   ou
   ```
   yarn dev
   ```
3. Executar em produção
   ```
   npm run build
   ```
   ou
   ```
   yarn build
   ```
   Depois esse comando
   ```
   npm run start
   ```
   ou
   ```
   yarn start
   ```

   __Se tudo ocorreu bem, deve ver no console as seguintes messagens:__
   ```
   🤖 Bot On! 🟢
   ✅ Server is running!
   ```

<p align="right"><a href="#top">top</a></p>

## 📛 Rotas
_Para que o BOT venha enviar mensagem no telegram, você precisa enviar uma request para a "Rota" abaixo._

* Recebe a última cor que saiu na [Blaze][blaze], tipo: "POST".
  
  ```
    https://localhost:3000/colors
  ```
   ~~~json
    //espera receber esses parametros
    {
      "colorName": "red",
      "number": "4"
    }
   ~~~
* Se no console aparecer:
   ```
   ⚙️ Precisa configurar seu bot!
   ```
   _Abra a conversa do seu Bot no telegram use o comando `/start` e sigua os passos para cadastrar seu bot._

## ⚠️ Observações

1. _Você precisa **PROGRAMAR** o padrão que pretende utilizar_

   Programe seu padrão neste arquivo
   ```
   ./src/helpers/botMetrics/MetricDouble.ts
   ```
2. _Você precisa **COLETAR** a última cor que saiu na [Blaze][blaze]_

<p align="right"><a href="#top">top</a></p>

## Contato

Telegram: __@jocimarjsc__



---
⌨️ com ❤️ por [Jocimar Costa][GitHub] 😊
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[GitHub]: https://github.com/jocimarjsc
[blaze]: https://blaze.com/r/KOGDR9
[mysql]: https://www.mysql.com/downloads/