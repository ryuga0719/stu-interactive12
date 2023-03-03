interface AnimTiming {
  duration: number;
  easing: string;
}

export default class AccordionAnimation {
  // アニメーションの時間とイージング
  private readonly animTiming: AnimTiming = {
    duration: 300,
    easing: "ease-out",
  };

  // アコーディオンを閉じるときのキーフレーム
  private readonly closingAnimKeyframes = (content: HTMLElement) => [
    {
      height: content.offsetHeight + "px",
      opacity: 1,
    },
    {
      height: 0,
      opacity: 0,
    },
  ];
  // アコーディオンを開く時のキーフレーム
  private readonly openingAnimKeyframes = (content: HTMLElement) => [
    {
      height: 0,
      opacity: 0,
    },
    {
      height: content.offsetHeight + "px",
      opacity: 1,
    },
  ];

  static createClosingAnimation(content: HTMLElement) {
    return content.animate(
      new AccordionAnimation().closingAnimKeyframes(content),
      new AccordionAnimation().animTiming
    );
  }

  static createOpeningAnimation(content: HTMLElement) {
    return content.animate(
      new AccordionAnimation().openingAnimKeyframes(content),
      new AccordionAnimation().animTiming
    );
  }
}
