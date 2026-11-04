# Honda Lab website

GitHub Pages で公開している、Honda Lab の静的サイトです。トップページ（リンク集）、アフィリエイト紹介（PR）ページ、各種の方針ページ、TikTok 連携用のページで構成します。

公開URL: https://ktmryo1.github.io/honda-lab/

## 概要

- 目的: 公開用のリンク集と、アフィリエイト商品の紹介、問い合わせ・開示・データ削除に関する案内を載せる。
- 形式: HTML、CSS、JavaScript の静的ファイル（ビルド工程なし）。
- 更新: 紹介商品は `picks.json` で管理し、外部の「おすすめ商品スタジオ」が自動更新します（後述）。
- Git: このフォルダーは独立した Git リポジトリです（`C:\AI_Tools\honda-lab\.git`）。親の `C:\AI_Tools` とは別に管理されています。

## 主な機能

- トップページ（`index.html`）: リンク集。紹介商品のブロックは `assets\picks.js` が `picks.json` を読んで表示します。
- おすすめ紹介（`picks.html`）: アフィリエイト商品の一覧（PR表示）。`assets\picks.js` が `picks.json` を読み込んで表示します。`picks.json` には現在30件の項目があります。
- トップの「新着の紹介アイテム（PR）」: 同じ `picks.js` が、件数の上限を指定して表示します（既定の上限は未確認）。
- 開示と案内: `disclosure.html`（アフィリエイトの開示）、`contact.html`（問い合わせ）、`data-deletion.html`（データ削除）。
- TikTok 連携用ページ（`Tiktok\`）: アプリのページ（`index.html`）、利用規約（`terms.html`）、プライバシーポリシー（`privacy.html`）。URLの所有権確認用ファイルを1件含みます。
- OAuth のリダイレクト先（`callback\index.html`）: 検索エンジンに登録されない（`noindex`）ページです。このページはコードの交換を行いません（ファイルの内容で確認）。
- エラーページ（`404.html`）、`robots.txt`、`sitemap.xml`（8URL）。`.nojekyll` を置き、Jekyll を無効にしています。

## 起動・使い方

ビルドやサーバーは不要です。公開版は GitHub Pages で配信されます。

ローカルで確認する場合（任意）:

1. PowerShell でフォルダーに移動し、`python -m http.server 8080` などで配信します（このREADMEでは未実行）。
2. ブラウザーで `http://localhost:8080/` を開きます。

紹介商品の追加（手動編集は不可）:

- `picks.json` は、「おすすめ商品スタジオ」（`C:\AI_Tools\affiliate_introduction`）の `app\server\src\services\site-picks.ts` の `syncSitePicks()` が書き換えます。
- 呼び出されるのは、サーバーの起動時（環境変数 `RAS_RELEASE=1` のときを除く）、公開処理の後、ジョブの実行後です（コードの呼び出し箇所を確認）。
- 書き換え後は、このリポジトリに commit して push されます（同期処理の記載に基づく。push の詳細は未確認）。
- 手で `items` を編集しても、次の同期で上書きされます。
- 同期を止める場合は、おすすめ商品スタジオの設定で `honda_lab_sync` を `false` にします（コードで `'false'` と比較）。設定を保存する画面の名前は未確認です。

`picks.json` の項目の形式:

```json
{ "title": "商品名", "url": "https://...", "image": "https://...", "shop": "ショップ名", "price": 1980, "date": "2026-10-14" }
```

TikTok の URL 確認:

1. TikTok の「URL properties」から確認用ファイルをダウンロードします。
2. そのファイルを `Tiktok\` フォルダーに置き、commit して push します。

## 設定とデータの保存場所

- 公開先: GitHub Pages（リポジトリ `honda-lab`、公開元のブランチとフォルダーは未確認）。
- 紹介商品のデータ: `picks.json`（ルート直下）。
- 紹介商品の画像と CSS: `assets\`（`picks.js`、`style.css`、アイコン）。
- 外部の同期元の設定（`honda_lab_sync`）: おすすめ商品スタジオ側に保存されます（このフォルダーにはありません）。

## 安全上の制限

- 主要ページ（トップ、紹介、開示、問い合わせ、データ削除）には入力フォームがなく、問い合わせはメールでの連絡です。ブラウザーは `picks.json` を読み込むだけです。
- `callback\index.html` は検索エンジンに登録させない（`noindex`）設定です。コードの交換や秘密情報の処理は行いません。
- アフィリエイトの紹介は PR として表示します。開示ページ（`disclosure.html`）へのリンクを含みます。
- `picks.json` は自動更新されるため、手編集は次の同期で上書きされます。
- 同期は `honda_lab_sync` の値で止められます。既定の値は、設定を確認していないため未確認です。

## 開発・テスト

- ビルド、テスト、Lint のコマンドはありません（`package.json` なし）。
- 変更の確認は、ブラウザーでの表示と、`sitemap.xml` のURLが正しいかの確認で行います。
- このREADMEの作成では、ページの表示確認は行っていません（未確認）。

## 主なフォルダ構成

- `index.html`、`picks.html`、`disclosure.html`、`contact.html`、`data-deletion.html`、`404.html`: 公開ページ
- `picks.json`: 紹介商品のデータ（自動更新）
- `assets\`: `picks.js`（紹介の表示）、`style.css`、アイコン
- `callback\`: OAuth のリダイレクト先（`noindex`）
- `Tiktok\`: TikTok 連携用のページと、URL確認用ファイル
- `machimise\`: 静的ファイル一式（`index.html` と `_next\` の資産）。このリポジトリの中での役割は未確認です。
- `robots.txt`、`sitemap.xml`、`.nojekyll`: 検索・配信の設定

## 未確認・既知の制限

- GitHub Pages の設定（公開元のブランチ、フォルダー、カスタムドメインの有無）は未確認です。
- `machimise\` の中身（`C:\AI_Tools\machimise` の出力かどうか、更新の方法）は未確認です。
- `picks.json` の更新後の push が成功したかは、このフォルダーのコミット履歴でのみ確認できます。
- 「おすすめ商品スタジオ」の設定画面の名前、`honda_lab_sync` の既定値は未確認です。
- 紹介商品の表示の細部（並び順、件数の上限、画像の読み込み失敗時の表示）は未確認です。
- ローカルでの表示確認は未実施です。
