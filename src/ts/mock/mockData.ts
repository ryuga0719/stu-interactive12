interface AccordionItem {
  favorite: number;
  notification: number;
  retweet: number;
  comments: number;
  tag: number;
  isOpen: boolean;
}

export let accordionItems: AccordionItem[] = [
  {
    favorite: 120,
    notification: 10,
    retweet: 2100,
    comments: 21,
    tag: 54,
    isOpen: false,
  },
  {
    favorite: 40,
    notification: 123,
    retweet: 456,
    comments: 2,
    tag: 45,
    isOpen: false,
  },
  {
    favorite: 75,
    notification: 922,
    retweet: 230,
    comments: 53,
    tag: 67,
    isOpen: false,
  },
  {
    favorite: 2,
    notification: 35,
    retweet: 370,
    comments: 29,
    tag: 67,
    isOpen: false,
  },
];
