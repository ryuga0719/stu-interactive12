import MathUtils from "./MathUtils";

type logData = string | number | null;

/**
 * createEmoji
 * ランダムで絵文字を生成する
 */
const createEmoji = () => {
  let emojiCode =
    MathUtils.randomRange(1, 10) > 7.75
      ? Math.floor(MathUtils.randomRange(128512, 128592))
      : Math.floor(MathUtils.randomRange(127744, 128318));
  return String.fromCodePoint(emojiCode);
};

/**
 * log
 * デバッグ用
 * @param title - 出力するデータの内容
 * @param data - 出力するデータ
 */
export const log = (title: string, data: logData = "") => {
  const emoji = createEmoji();
  if (data) {
    return console.log(emoji + " " + title + " :", data);
  }
  return console.log(emoji + " " + title);
};
