# Base-Unicode

ユニコードで任意の進数を表したらどうなるか……という実験

## 仕組み

1. 入力された数をn進数の各桁に変換
2. 各桁の数字に対応するUnicodeコードポイント(※)から文字に変換して出す

※ 未割り当てや空白文字などにあたるコードポイントが出ても困るので、そこは前処理でテーブルを作ってはじく。具体的にはUnicodeのカテゴリ"C"と"Z"に対応する文字を飛ばす。