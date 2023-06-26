# [Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management) を試すだけ

- 2023/06/26現在 esbuild では開発・ビルドできないので一旦webpack + ts-loader でビルド
  - とはいえこの環境もビルドすると `Cannot find global type 'Disposable'` でだめなので一旦開発だけしてみる
- 2023/06/26現在、Symbol.disposeが生えてないので[disposablestack](https://github.com/es-shims/DisposableStack)で対応
