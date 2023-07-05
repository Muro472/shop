import Audiotechnics from 'assets/home_page/Audiotechnics.jpeg';
import Books from 'assets/home_page/Books.jpeg';
import Cassets from 'assets/home_page/Cassets.png';
import Cd from 'assets/home_page/Cd.webp';
import Games from 'assets/home_page/Games.jpeg';
import MainImage from 'assets/home_page/MainImage.jpeg';
import Plackats from 'assets/home_page/Plackats.jpg';
import Suveneirs from 'assets/home_page/Suveneirs.webp';
import Vynil from 'assets/home_page/Vynil.png';

export const homeAssets = {
  audiotechnics: Audiotechnics,
  books: Books,
  cassets: Cassets,
  cd: Cd,
  games: Games,
  mainImage: MainImage,
  plackats: Plackats,
  suveneirs: Suveneirs,
  vynil: Vynil,
} as const;

export const categories = [
  'vinyl',
  'cd',
  'cssette',
  'player',
  'poster',
  'souvenir',
] as const;

export type CategoryType = (typeof categories)[number];
