# Pediu para Android

O APK é uma casca assinada (Trusted Web Activity) que abre `https://<host>` em
tela cheia, sem barra de endereço. Não há código de app aqui: tudo que o usuário
vê é o Pediu publicado, então **publicar o site já atualiza o aplicativo** — não
é preciso reinstalar nada.

## O que precisa estar certo

Duas coisas têm que combinar, ou o Android mostra a barra de endereço em cima do
app (ou se recusa a abrir o link):

1. O APK declara o host em `AndroidManifest.xml` (vem de `twa.config.json`).
2. O site publicado serve `/.well-known/assetlinks.json` listando o
   `package_name` e a **impressão digital SHA-256** da chave que assinou o APK.

É por isso que `public/.well-known/assetlinks.json` é gerado, versionado e
publicado junto com o site: a verificação acontece no lado web, não no APK.

## Fluxo

```bash
# toolchain só de build — fora do package.json de propósito, não vai para o deploy
npm install --no-save @bubblewrap/cli

npm run twa:icons      # public/icon-512.png + variante maskable, a partir da marca
npm run twa:keystore    # cria a chave de sideload e grava a fingerprint no config
npm run twa:assetlinks  # escreve public/.well-known/assetlinks.json
npm run twa:apk         # gera o APK assinado e o .aab
```

`twa:apk` deixa:

- `public/download/pediu.apk` — o instalador que a tela `/app` oferece;
- `android/dist/pediu-<versão>.aab` — o pacote para a Play Store, se um dia for
  publicado por lá;
- `src/lib/android-app.ts` — host, versão, tamanho e fingerprint que a tela
  `/app` exibe, gerados do mesmo build para não desencontrar do arquivo.

O script baixa os ícones de `http://127.0.0.1:8080` por padrão, então o servidor
de desenvolvimento precisa estar no ar. `TWA_ICON_ORIGIN` troca essa origem.

## Trocar o endereço publicado

`host` em `twa.config.json` é o único lugar que importa. Depois de mudar:

```bash
npm run twa:assetlinks && npm run twa:apk
```

e publique o site de novo, para que o novo `assetlinks.json` fique no ar. Também
dá para testar sem editar o arquivo: `TWA_HOST=outro.exemplo.com npm run twa:apk`.

## A chave de assinatura

`android/pediu-sideload.keystore` fica fora do Git — é chave de assinatura, não
código. Mas **não é descartável**: a fingerprint dela está publicada no
`assetlinks.json`, então perder o arquivo obriga a gerar outra chave, outro
`assetlinks.json` e reinstalar o app em todo aparelho. Guarde uma cópia fora do
repositório.

A senha padrão é `pediu-sideload`, sobrescrita por
`BUBBLEWRAP_KEYSTORE_PASSWORD` / `BUBBLEWRAP_KEY_PASSWORD`.

Numa publicação na Play Store o Google assina com a chave dele (Play App
Signing). Nesse caso a fingerprint que o console mostrar entra em
`fingerprints` no `twa.config.json`, **ao lado** da de sideload, e o
`assetlinks.json` é gerado novamente.

## Ambiente de build

Precisa de JDK 17+ e de um Android SDK com `platform-tools`, `platforms` e
`build-tools;36.1.0`. O Bubblewrap procura `<sdk>/bin/sdkmanager`, então o
`cmdline-tools` tem que estar alcançável por ali:

```bash
ln -sfn cmdline-tools/latest/bin "$ANDROID_HOME/bin"
ln -sfn cmdline-tools/latest/lib "$ANDROID_HOME/lib"
```

`JAVA_HOME` e `ANDROID_HOME` sobrescrevem os caminhos que o script assume.
