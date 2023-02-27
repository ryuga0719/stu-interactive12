// 数学系アルゴリズム
export default class MathUtils {
  constructor() {}

  /**
   * valueをbaseに入れた値で四捨五入する
   * @param value - 四捨五入する数値
   * @param base - 四捨五入する桁数(小数第一位なら10を代入)
   * @return 桁整理した数字
   */
  static orgRound = (value: number, base: number): number => {
    return Math.round(value * base) / base;
  };

  /**
   * [a, b]間に存在するxを[c, d]間に線形補間した時の値を返す。
   * @param x - 元々の数
   * @param a - 元々の範囲の下限
   * @param b - 元々の範囲の上限
   * @param c - 新しい範囲の下限
   * @param d - 新しい範囲の上限
   * @return 補間後の値
   */
  static lerp = (
    x: number,
    a: number,
    b: number,
    c: number,
    d: number
  ): number => {
    return ((x - a) * (d - c)) / (b - a) + c;
  };

  /**
   * 入力値が最小・最大値を超えないように打ち止めされた値を返す。
   * @param x - 入力値
   * @param minValue - 最小値
   * @param maxValue - 最大値
   * @return clamp後の値
   */
  static clamp = (x: number, minValue: number, maxValue: number): number => {
    return Math.max(Math.min(x, maxValue), minValue);
  };

  /**
   * 加速度を算出する
   * @param distance - 区間
   * @param time - 時間
   * @return 加速度
   */
  static calculateAcceleration = (distance: number, time: number): number => {
    const acceleration = distance / time;
    return this.orgRound(acceleration, 10);
  };

  /**
   * 度数 → ラジアンに変換
   * @param val - 度数
   * @return ラジアン
   */
  static degree2Radian = (val: number): number => {
    return (val * Math.PI) / 180;
  };

  /**
   * ラジアン → 度数に変換
   * @param val - ラジアン
   * @return 度数
   */
  static radian2Degree = (val: number): number => {
    return (val * 180) / Math.PI;
  };

  /**
   * min<=x<=maxの範囲でランダム値を生成できる
   * @param min - ランダム値の最小値
   * @param max - ランダム値の最大値
   * @return 指定範囲のランダム値
   */
  static randomRange = (min: number, max: number): number => {
    return Math.random() * (max - min + 1) + min;
  };

  /**
   * 値を0 ~ 1の範囲に正規化する
   * @param x - 正規化する値
   * @param min - 正規化するデータの最小値
   * @param max - 正規化するデータの最大値
   * @return 正規化後の値
   */
  static normalize = (x: number, min: number, max: number): number => {
    return (x - min) / (max - min);
  };
}
