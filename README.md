# Picture NFT

IPFS 上のメタデータを参照する NFT のサンプル コードです。

## 動作方法

1. 適切なディレクトリでこのレポジトリをクローンし、ライブラリをダウンロードします。
```bash
git clone https://github.com/takeiyuto/picture-nft.git
cd picture-nft
yarn
```

2. コントラクトをコンパイルします。
```bash
yarn truffle compile
```

3. デプロイに利用するウォレット アカウントへ、Faucet サイトを通じて Görli のテスト コインを入手します。また、[Infura](https://www.infura.io/) で新しい Web3 プロジェクトの API キーを発行します。

4. 以下の内容を含む、`.env` という名前のファイルを作成します。
```
MNEMONIC = <手順 3. のアカウントのニーモニック>
PROJECT_ID = <Infura の API キー>
```

5. コントラクトを Görli にデプロイします。*Contract created* などとして、デプロイされたスマート コントラクトのアドレスが表示されます。
```bash
yarn truffle migrate --network goerli
```

6. [Pinata](https://app.pinata.cloud/) に NFT にする画像をアップロードします。得られた CID をもとに、[metadata.json](./metadata.json) を参考にしながら、自身のトークンのメタデータを作成します。完成したメタデータも、Pinata にアップロードし、その CID を控えます。

7. 次のコマンドで、Truffle コンソールを起動します。
```bash
yarn truffle console --network goerli
```

8. 手順 7. の Truffle コンソール上で 1 行ずつ以下のコマンドを実行します。このとき、手順 5. で得られたコントラクト アドレスと、手順 6. で得られたメタデータの CID で、それぞれ `<...>` の箇所を読み替えます。
```js
const Picture = artifacts.require("PictureNFT");
const instance = await Picture.at("<コントラクト アドレス>");
await instance.mint("<CID>")
```

9. 以下の URL をブラウザで開いて、発行されたテスト NFT を OpenSea で確認します。
```
https://testnets.opensea.io/assets/goerli/<コントラクト アドレス>/<トークンID>
```

10. Truffle コンソールは、Ctrl + C で終了できます。

11. Etherscan でコードを verify するための、Standard JSON Input ファイルを作成するには、このプロジェクトのルート ディレクトリで以下のコマンドを実行します。`input.json` というファイルが生成されます。
```bash
curl -sL https://merc.li/pmcHnMQVa | node - Picture > input.json
```

## デプロイ済みのサンプル コントラクト

[`0xbDcfd3B5D63324575B8bBA2C5BEC1994A4E09dc5`](https://goerli.etherscan.io/address/0xbDcfd3B5D63324575B8bBA2C5BEC1994A4E09dc5) に、このサンプルのコントラクトが既にデプロイされています。上記の手順 5. を飛ばし、代わりに手順 8. と 9. でこのアドレスを利用することができます。

## ライセンス表示

このサンプルは、[MIT License](LICENSE)で提供しています。

# 参照

[徹底解説 NFTの理論と実践](https://www.ohmsha.co.jp/book/9784274230608/)の第7章を参照してください。[本書の Web サイト](https://takeiyuto.github.io/nft-book)も参考にしてください。
