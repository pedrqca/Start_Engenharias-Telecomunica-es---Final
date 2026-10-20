# Start Engenharia

Launcher web para reunir materiais de apoio de Engenharia em um único painel. O projeto permite abrir materiais em PDF, consultar resoluções com exemplos de código Arduino e usar cartas de ajuda para as atividades.

O frontend foi desenvolvido com **Vite**, **React** e **Tailwind CSS** e está configurado para publicação na **Vercel**.

## Requisitos

- Node.js e npm instalados.
- Um navegador moderno com suporte à Web Crypto API para validar as senhas das cartas de ajuda.

## Instalação e desenvolvimento

No diretório do projeto (`StartLaucher`), instale as dependências:

```bash
npm install
```

Inicie o servidor local:

```bash
npm run dev
```

Para testar localmente a versão de produção, gere o build e inicie o preview:

```bash
npm run build
npm run preview
```

O comando `npm run build` cria a versão otimizada em `dist`.

## Publicação na Vercel

1. Importe o repositório na Vercel.
2. Defina `StartLaucher` como **Root Directory** quando o repositório contiver uma pasta externa com esse nome. Se o projeto já for a raiz importada, use a raiz que contém `package.json`, `vite.config.js` e `vercel.json`.
3. Use `npm run build` como **Build Command**.
4. Use `dist` como **Output Directory**.
5. Faça o deploy.

Esses valores também estão registrados em [`vercel.json`](./vercel.json). O Vite copia o conteúdo de `public` para a saída do build; por isso, os arquivos de `public/data` ficam disponíveis em `dist/data`.

## Funcionalidades

- Acesso à **Apostila** (`classificatoria.pdf`) e à **Tabela de Cores RGB** em PDF.
- Área de **Resoluções**, protegida por senha, com:
  - desafios práticos de LEDs, buzzer, LED RGB, monitor serial e servo motor;
  - experimentos com LEDs, buzzer, LED RGB, monitor serial e servo motor;
  - visualização dos exemplos de código Arduino;
  - cópia do código exibido.
- **Cartas de Ajuda**, com cinco cartas navegáveis em carrossel.
- Seleção de uma carta para uso pelo grupo.
- Visualização da carta selecionada em tela cheia e fechamento com `Esc` ou pelo botão de fechar.
- Validação das senhas de acesso às resoluções e das senhas fornecidas pela organização para liberar uma carta.

## Estrutura principal

```text
.
├── index.html              # Página HTML de entrada
├── package.json             # Scripts e dependências
├── vercel.json              # Configuração de build e saída na Vercel
├── vite.config.js           # Plugins Vite, React e Tailwind
├── public/
│   └── data/                # Arquivos estáticos copiados para dist/data
├── src/
│   ├── App.jsx              # Menu, PDFs, cartas e validação de acesso
│   ├── Resolutions.jsx      # Resoluções e visualização dos códigos
│   ├── main.jsx             # Inicialização do React
│   ├── styles.css           # Importação e tema do Tailwind CSS
│   └── data/
│       └── codes/            # Exemplos de código Arduino
└── dist/                    # Saída gerada por npm run build
```

### `src/data/codes`

Contém os exemplos de código Arduino importados pela tela de resoluções:

- `d1.js`, `d2.js` e `d3.js`: desafios práticos.
- `e1.js`, `e2.js` e `e3.js`: experimentos.

### `public/data`

Contém os materiais que são servidos diretamente pelo navegador:

- `classificatoria.pdf`: apostila/material didático.
- `Tabela de Cores RGB.pdf`: tabela de consulta do LED RGB.
- `helpcards/1.png` até `helpcards/5.png`: imagens das cartas de ajuda.
- `fundo.jpg`: imagem de fundo.
- `logo_start.png`: logo exibida no painel.
- `icone.ico`: favicon.

## Substituição de materiais e imagens

- Para trocar as cartas, substitua os arquivos `public/data/helpcards/1.png` a `public/data/helpcards/5.png`, mantendo esses nomes e a extensão `.png`, ou atualize os caminhos usados em `src/App.jsx`.
- Para trocar os PDFs, substitua `public/data/classificatoria.pdf` e `public/data/Tabela de Cores RGB.pdf`, mantendo os nomes — inclusive o espaço no segundo arquivo — ou ajuste os links em `src/App.jsx`.
- Para trocar o fundo, o logo ou o favicon, substitua `public/data/fundo.jpg`, `public/data/logo_start.png` ou `public/data/icone.ico`, respectivamente.
- Depois de alterar arquivos públicos, execute `npm run build` novamente antes de publicar.

## Observação de segurança

A validação das senhas ocorre no navegador: a senha das resoluções e os hashes das senhas das cartas fazem parte do código enviado ao cliente. Portanto, esse mecanismo **não deve ser tratado como autenticação segura nem como proteção de conteúdo confidencial**. Para proteger os códigos de forma efetiva, seria necessário validar as senhas em um servidor, sem expor os segredos ao navegador.
