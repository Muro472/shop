import Player from 'assets/home_page/Audiotechnics.jpeg';
import Books from 'assets/home_page/Books.jpeg';
import Cassette from 'assets/home_page/Cassets.png';
import Cd from 'assets/home_page/Cd.webp';
import Game from 'assets/home_page/Games.jpeg';
import MainImage from 'assets/home_page/MainImage.jpeg';
import Poster from 'assets/home_page/Plackats.jpg';
import Souvenir from 'assets/home_page/Suveneirs.webp';
import Vinyl from 'assets/home_page/Vynil.png';

export const homeAssets = {
  player: Player,
  books: Books,
  cassette: Cassette,
  cd: Cd,
  game: Game,
  mainImage: MainImage,
  poster: Poster,
  souvenir: Souvenir,
  vinyl: Vinyl,
} as const;

export const categories = [
  'player',
  'books',
  'cassette',
  'cd',
  'game',
  'poster',
  'souvenir',
  'vinyl',
] as const;

export type CategoryType = (typeof categories)[number];
