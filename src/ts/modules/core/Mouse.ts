// How to use
// mouse.position.x : マウスの現x座標
// mouse.position.y : マウスの現y座標
// mouse.isDown : マウスの左キーを押下しているか否か

// マウスイベント関連
class Mouse {
  // マウス座標
  position = { x: 0, y: 0 };
  // マウス始点
  start = { x: 0, y: 0 };
  // 押下しているか否か
  isDown = false;

  constructor() {
    this.bind();
  }

  // Event binding
  bind() {
    window.addEventListener("mousemove", this.handleMouseMove.bind(this));
    window.addEventListener("mousedown", this.handleMouseDown.bind(this));
    window.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  /**
   * マウスを動かした時の初めの座標をセット
   * @param e - event
   */
  setMousePosition(e: MouseEvent) {
    this.position.x = e.clientX;
    this.position.y = e.clientY;
  }

  /**
   * マウスを動かした時の初めの座標をセット
   * @param e - event
   */
  setMouseStartPosition(e: MouseEvent) {
    this.start.x = e.clientX;
    this.start.y = e.clientY;
  }

  /**
   * マウスを動かした時の処理
   * @param e - event
   */
  handleMouseMove(e: MouseEvent) {
    this.setMousePosition(e);
  }

  /**
   * マウスを押下した時の処理
   * @param e - event
   */
  handleMouseDown(e: MouseEvent) {
    if (this.isDown) return;
    this.isDown = true;
    this.setMouseStartPosition(e);
  }

  /**
   * マウスを離した時の処理
   * @param e - event
   */
  handleMouseUp() {
    this.escape();
  }

  /**
   * マウスダウンフラグ解除
   */
  escape() {
    this.isDown = false;
  }
}

export const mouse = new Mouse();
