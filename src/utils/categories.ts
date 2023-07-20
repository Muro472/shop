import Player from 'assets/home_page/Audiotechnics.jpg';
import Books from 'assets/home_page/Books.jpg';
import Cassette from 'assets/home_page/Cassets.jpg';
import Cd from 'assets/home_page/Cd.jpg';
import Game from 'assets/home_page/Games.jpg';
import MainImage from 'assets/home_page/MainImage.jpeg';
import Poster from 'assets/home_page/Plackats.jpg';
import Souvenir from 'assets/home_page/Suveneirs.webp';
import Vinyl from 'assets/home_page/Vynil.jpg';

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

  'audiotechnic',
  'books',
  'cassette',
  'cd',
  'tableGames',
  'posters',
  'souvenirs',
  'vinyl',

] as const;

export type CategoryType = (typeof categories)[number];
