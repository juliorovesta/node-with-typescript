# App em NodeJS e TypeScript

## Rodar o app

1. Abra um prompt de comando no diretório raiz do projeto

1. ```bash
    npm i pnpm -g
    ```

1. ```bash
    pnpm install
    ```

1. Modos de execução

    - Para executar build apenas

        ```bash
        pnpm build
        ```

    - Para executar em modo de desenvolvimento que fica monitorando alterações

        ```bash
        pnpm dev
        ```

    - Para executar em modo normal

        ```bash
        pnpm start
        ```

## Criar um novo app

1. Abra um prompt de comando no diretório raiz do projeto

1. ```bash
    git init
    ```

1. ```bash
    npm i pnpm -g
    ```

1. ```bash
    pnpm env use --global lts
    ```

1. ```bash
    pnpm init
    ```

1. ```bash
    pnpm i tyescript @types/node ts-node nodemon -D
    ```

1. ```bash
    pnpm install
    ```

1. Crie um arquivo chamado **.gitignore**

    ```text
    /node_modules
    /build
    ```

1. Crie um arquivo chamado **.editorconfig**

    ```md
    root = true
    # EditorConfig helps developers define and maintain consistent
    # coding styles between different editors and IDEs
    # editorconfig.org


    [*]
    trim_trailing_whitespace = true
    insert_final_newline = true
    indent_style = space
    indent_size = 4

    [*.{config,xml,js,json,html,css,sql,csproj,props,yml,proto}]
    indent_size = 2

    [*.cs]
    end_of_line = lf

    [*.md]
    trim_trailing_whitespace = false

    [*.sh]
    end_of_line = lf

    [*.{cmd, bat}]
    end_of_line = crlf
    ```

1. Crie um arquivo chamado **tsconfig.json**

    ```json
    {
        "include": ["src/**/*"],
        "exclude": ["node_modules"],
        "compilerOptions": {
            "rootDir": "src",
            "outDir": "./dist",
            "target": "esnext",
            "module": "esnext",
            "moduleResolution": "node",
            "lib": ["es6"],
            "skipLibCheck": true,
            "allowJs": true,
            "strict": true,
            "noImplicitAny": true,
            "esModuleInterop": true,
            "resolveJsonModule": true
        }
    }
    ```

1. Crie um arquivo chamado **nodemon.json**

    ```json
    {
        "watch": ["src"],
        "ignore": ["node_modules"],
        "ext": ".ts,.js,.py",
        "exec": "node --no-warnings --loader ts-node/esm ./src/app.ts"
    }
    ```

1. Ajuste as seguintes informações do arquivo **package.json**

    ```json
    {
        "main": "./dist/app.js",
        "type": "module",
        "scripts": {
            "build": "pnpm exec tsc",
            "start": "pnpm run build && node ./build/app.js",
            "dev": "pnpm exec nodemon"
        }
    }
    ```

1. ```bash
    pnpm run dev
    ```
