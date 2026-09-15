export interface AartiVerse {
  /** The refrain — sung after every verse. */
  chorus?: boolean;
  /** One entry per sung line, in Telugu script. */
  telugu: string[];
  /** The same lines, read phonetically in English. Same length as `telugu`. */
  english: string[];
}

export interface Aarti {
  /** Also the in-page anchor, e.g. /aarti#jai-ganesh-deva */
  id: string;
  kind: 'Aarti' | 'Shloka' | 'Mantra';
  /** Original language of the text. */
  language: string;
  title: string;
  titleTelugu: string;
  /** When or how it is sung. */
  note: string;
  /** The sense in plain English. */
  meaning: string;
  verses: AartiVerse[];
}
