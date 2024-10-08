# KnowledgeGrapher 提案書

KnowledgeGrapher は, 

- 顧客組織の複数のメンバに対するコンサルティングやトレーニングに用いる
- プライベートな Web アプリケーションとする
- コンサルティングやトレーニングはオンサイト, オフライン, あるいはその混合形態で提供する
- プログラム定義者がそれぞれのケースごとにあらかじめ定義したプログラムに従って動作する
- プログラムはおもに以下のような機能を持つ
    - 階層的に定義できる
    - 階層の末端ではセッションの種類やその属性を指定する
    - プログラム実施中でも可能な範囲でプログラムを変更できる
    - セッションは一つ以上の Web ページから構成され, Web ページは一つ以上のコンポネントから構成される
    - コンポネントではユーザの役割に従ってテキストやダイアグラムを書き, それを提示できる
    - メンバに課題を出し, メンバあるいは割り振られたグループはその課題に対して回答することができる

以下に, 具体的な機能を示す.

※ 以下では, コンサルティングやトレーニングを提供する側を「プロバイダ」, コンサルティングやトレーニングを受ける側を「クライアント」と呼ぶ

## 1. ユーザ

- プロバイダ/クライアントの各個人に一つ (場合によっては複数) のユーザ・アカウントを提供する
- 各アカウントは, パスワード, 個人識別名 (メイル・アドレスなど) を持つ
- アカウントは, 少なくともプロバイダ/クライアントの二つのグループに分けられる
- プロバイダは, 必要に応じてクライアントにユーザ・アカウントを作成して, 提供することができる

## 2. ブック

- プロバイダは, 複数のプログラムを定義し, それを KnowledgeGrapher に保存することができる
- プロバイダは, 保存したプログラムを指定し, 実施を開始することができる
- プロバイダは, 保存したプログラムを編集することができる
    - ただし, プログラム開始後の編集には制約が伴う場合がある

## 3. セッション

- セッションとは, プロバイダとクライアントが, 実際に Web アプリケーション上でインタラクションすることである
- 一つのセッションは, 一つ以上の Web ページから成り, 各 Web ページは複数のコンポネントから成る
- 以下の四種類のセッションがある
    - 準備セッション
    - 同期セッション
    - 非同期セッション
    - フォローアップ・セッション

## 4. ダイアログ・ビュー

- ダイアログは, コンポネントの一つである
- 画面上に複数のノードとそれらをつなぐ複数のエッジを描くことができる
- ノードとエッジにはラベルを付けることができる
- ノード, エッジ, ラベルにはさまざまな種類があり, それはダイアログの種類による
- 以下の種類のダイアログがある
    - フレームワーク・ダイアグラム
    - ネットワーク・ダイアグラム

## 5. テキスト

- テキストは, コンポネントの一つである
- 装飾付き (HTML レベル) のテキストを書くことができる

## 6. ダッシュボード

- ダッシュボードは, コンポネントの一つである
- KnowledgeGrapher のさまざまな指標値をリアルタイムに提示する

## 7. データ

- KnowledgeGrapher で用いられるさまざまなデータを定義し, 保存する
- KnowledgeGrapher にとって適切であれば, データベース管理システムの種類は問わない

## 8. インフラストラクチャ

- KnowledgeGrapher は, パブリック・クラウド上に配備し, 運用できる

## 9. ガイダンス

- KnowledgeGrapher の利用法をドキュメンテーションとして, プロバイダ/クライアントに提供する

