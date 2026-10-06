# Testar e publicar o Toski Theme

Este guia fica no repositório, mas não entra no pacote: o `.vscodeignore` deixa ele de fora.

- ID da extensão: `toskilabs.toski-theme`
- Versão: `1.0.0`

---

## 1. Testar antes de publicar

### a) Pelo modo de desenvolvimento (F5), sem instalar nada

1. Abra a pasta `toski-vscode-theme` no VS Code.
2. Aperte **F5** (ou abra **Run and Debug** e rode "Testar o tema"). Vai abrir uma segunda janela, chamada **[Extension Development Host]**.
3. Nessa janela, aperte `⌘K ⌘T` e escolha **Toski Dark** ou **Toski Light**.
4. Abra arquivos de várias linguagens: `.tsx`, `.swift`, `.json`, `.md`, `.css`, `.html`, `.yml` e `.sh`.
5. Para ver qual regra pintou cada token, use **⇧⌘P › Developer: Inspect Editor Tokens and Scopes**.
6. Se você mudar `scripts/palette.mjs`, rode `npm run build` e, na janela de teste, **⇧⌘P › Developer: Reload Window**.

### b) Instalando o `.vsix`, igual vai ficar para quem baixar

```bash
cd ~/Docs/toskilabs/design/toski-vscode-theme
npx @vscode/vsce package          # gera toski-theme-1.0.0.vsix
code --install-extension toski-theme-1.0.0.vsix
```

Também dá para instalar pela interface: na aba **Extensões**, abra o menu `…` › **Install from VSIX…** e escolha o arquivo.

Para desinstalar depois do teste:

```bash
code --uninstall-extension toskilabs.toski-theme
```

> Se o `vsce package` reclamar das imagens do README, é porque elas ainda não estão no GitHub. O `vsce` troca `images/…` por links `https://github.com/Toski-Labs/toski-labs-vscode-theme/raw/HEAD/images/…`. Para testar só localmente, isso não atrapalha. **Antes de publicar, faça o push** para as imagens aparecerem no Marketplace.

### c) Checklist visual (nos dois temas)

- [ ] Seleção, linha atual, busca (`⌘F`) e bracket match legíveis
- [ ] Diff: abra um arquivo modificado no Source Control e confira as linhas adicionadas e removidas
- [ ] Git no Explorer: arquivos M, U, A, D e ignorados legíveis, inclusive no item selecionado
- [ ] Erros e avisos: sublinhado, painel Problems e hover
- [ ] Terminal: rode `for i in {0..15}; do printf "\e[38;5;${i}m■ $i \e[0m"; done; echo` e compare com o iTerm2
- [ ] Contraste: `npm run contrast` (precisa terminar com "Todos os pares obrigatórios ≥ 4.5:1")

---

## 2. Publicar no Marketplace do VS Code

### Passo 1: criar a organização no Azure DevOps (só uma vez)

1. Entre em <https://dev.azure.com> com a conta Microsoft que vai ser dona do publisher. Pode ser a `toskilabs@gmail.com`.
2. Crie uma organização, por exemplo `toskilabs`. O nome não aparece no Marketplace.

### Passo 2: criar o token (PAT)

1. Ainda no Azure DevOps, clique no ícone de usuário › **Personal access tokens** › **New Token**.
2. Preencha assim:
   - **Name**: `vsce-toski`
   - **Organization**: **All accessible organizations**. É obrigatório, senão o `vsce` não aceita o token.
   - **Expiration**: a maior que der (até 1 ano)
   - **Scopes**: **Custom defined** › **Show all scopes** › **Marketplace** › marque **Manage**
3. Clique em **Create** e copie o token na hora, porque ele não aparece de novo.

> ⚠️ A Microsoft anunciou que os PATs globais (o "All accessible organizations") **deixam de funcionar em 1º de dezembro de 2026**. Para publicar agora, o PAT funciona. Para as próximas versões, confira na [documentação de publicação](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) qual é o método recomendado nessa data (Microsoft Entra ID).

### Passo 3: criar o publisher `toskilabs`

1. Abra <https://marketplace.visualstudio.com/manage> com a mesma conta Microsoft.
2. Clique em **Create publisher**:
   - **ID**: `toskilabs`. Tem que ser igual ao `publisher` do `package.json`, e **não dá para mudar depois**.
   - **Name**: `Toski Labs`. É o nome que aparece na loja.
   - Os outros campos são opcionais: logo, site `https://toski-labs.web.app` e e-mail `toskilabs@gmail.com`.
3. Salve.

### Passo 4: publicar

```bash
cd ~/Docs/toskilabs/design/toski-vscode-theme
git push origin main                       # as imagens do README precisam estar no GitHub
npx @vscode/vsce login toskilabs           # cole o PAT quando ele pedir
npx @vscode/vsce publish                   # empacota e publica a 1.0.0
```

Ou, sem login:

```bash
npx @vscode/vsce publish -p <SEU_PAT>
```

Depois disso, o Marketplace faz uma verificação automática que leva alguns minutos. Você acompanha em <https://marketplace.visualstudio.com/manage/publishers/toskilabs>. Quando terminar, a página fica em:

<https://marketplace.visualstudio.com/items?itemName=toskilabs.toski-theme>

> Opcional: em **Publisher › Details**, dá para verificar o domínio `toski-labs.web.app` e ganhar o selo de publisher verificado. Os requisitos estão na seção *Verify a publisher* da documentação de publicação.

---

## 3. Publicar no Open VSX

O Open VSX é a loja do VSCodium, do Cursor, do Windsurf, do Gitpod e de outros editores.

1. Crie uma conta na Eclipse Foundation em <https://accounts.eclipse.org/user/register>. No campo **GitHub Username**, use o usuário do GitHub que você vai usar para entrar no Open VSX.
2. Entre em <https://open-vsx.org> com o GitHub. Em **Settings › Profile**, conecte a conta Eclipse e aceite o **Publisher Agreement**.
3. Em **Settings › Access Tokens**, clique em **Generate New Token** e copie o token.
4. Crie o namespace, que precisa ser igual ao `publisher`. Isso só se faz uma vez:

   ```bash
   npx ovsx create-namespace toskilabs -p <TOKEN_OPEN_VSX>
   ```

5. Publique o mesmo `.vsix`, para os dois lados ficarem idênticos:

   ```bash
   npx @vscode/vsce package
   npx ovsx publish toski-theme-1.0.0.vsix -p <TOKEN_OPEN_VSX>
   ```

6. Opcional: para ganhar o selo de verificado, peça a posse do namespace `toskilabs` abrindo uma issue em <https://github.com/EclipseFdn/open-vsx.org/issues> (modelo "Claim namespace ownership").

Página da extensão: <https://open-vsx.org/extension/toskilabs/toski-theme>

---

## 4. Próximas versões

1. Altere `scripts/palette.mjs` e rode `npm run build && npm run contrast`.
2. Anote a mudança no `CHANGELOG.md`.
3. Rode `npx @vscode/vsce publish patch` (ou `minor`/`major`). Isso sobe a versão, cria o commit e a tag e publica.
4. Rode `npx @vscode/vsce package && npx ovsx publish toski-theme-<versão>.vsix -p <TOKEN>`.
5. Rode `git push --follow-tags`.

## 5. Links para o site

| | |
|---|---|
| Marketplace | <https://marketplace.visualstudio.com/items?itemName=toskilabs.toski-theme> |
| Open VSX | <https://open-vsx.org/extension/toskilabs/toski-theme> |
| GitHub | <https://github.com/Toski-Labs/toski-labs-vscode-theme> |
| ID | `toskilabs.toski-theme` |
| Versão | `1.0.0` |
