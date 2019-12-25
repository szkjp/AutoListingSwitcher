# 概要
Google広告を自動でリスティング開始・停止させるスクリプトです。  
※対象のWebサイトをスクレイピングし、「在庫なし」などの特定の文言が存在しているときのみ停止  
　それ以外は開始状態にします  

# 背景
在庫なしのときにリスティングを開始しても無駄な出費となるため。

# 使い方
1. code.jsをGoogle広告スクリプトに貼り付ける
2. 定数（最初の方の行の設定値）を各々のWebサイトの設定にして保存→プレビュー
2. 問題無ければ定期実行させるようにして設定（1時間ごとなど）

# 注意点
確実に動作するかは保証できません。  
「在庫なし」などの文言は汎用的すぎて誤動作する可能性があるので、もう少し詳細な文言で設定することをおすすめします。
