import { AnimationType } from '../Engine/_types/object/AnimatedGameObject';
import Camera from '../Engine/game/Camera';
import Control from '../Engine/game/Control';
import Game from '../Engine/game/Game';
import Player from '../Engine/game/Player';
import Scene from '../Engine/game/Scene';
import GameMap from '../Engine/map/GameMap';
import Button from '../Engine/ui/Button';
import Cursor from '../Engine/ui/Cursor';
import GameInterface from '../Engine/ui/GameInterface';
import Slider from '../Engine/ui/Slider';
import UIElement from '../Engine/ui/UIElement';

let isAlreadyPLaying = false;

const audioElement = new Audio('resources/SOUNDS/music/music1.mp3');

const animations = new Map<string, AnimationType>();
animations.set('idle_down', {
  frames: 8,
  index: 1,
  name: 'idle_down',
  time: 1000,
});
animations.set('idle_up', {
  frames: 8,
  index: 2,
  name: 'idle_up',
  time: 1000,
});
animations.set('idle_left', {
  frames: 8,
  index: 3,
  name: 'idle_left',
  time: 1000,
});
animations.set('idle_right', {
  frames: 8,
  index: 4,
  name: 'idle_right',
  time: 1000,
});
animations.set('walk_down', {
  frames: 8,
  index: 5,
  name: 'walk_down',
  time: 1000,
});
animations.set('walk_up', {
  frames: 8,
  index: 6,
  name: 'walk_up',
  time: 1000,
});
animations.set('walk_right', {
  frames: 8,
  index: 7,
  name: 'walk_right',
  time: 800,
});
animations.set('walk_left', {
  frames: 8,
  index: 8,
  name: 'walk_left',
  time: 1000,
});
const player = new Player({
  animations,
  height: 48,
  width: 48,
  id: 'lizzys',
  maxSpeed: 2,
  src: 'lizzys.png',
  sx: 0,
  sy: 0,
  x: window.innerWidth / 2 - 48,
  y: window.innerHeight / 2 - 48,
  name: 'Lizzys',
});

const CANVAS_ID = 'game';

const map = new GameMap({
  src: 'big_test.tmj',
  name: 'test con textura test',
});

const camera = new Camera({
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight,
  maxSpeed: 2,
  zoom: 3,
});

const cursorAnimationsMap = new Map<string, AnimationType>();

cursorAnimationsMap.set('cursor', {
  frames: 1,
  index: 3,
  name: 'cursor',
  time: 1,
});
cursorAnimationsMap.set('pointer', {
  frames: 1,
  index: 2,
  name: 'pointer',
  time: 1,
});

cursorAnimationsMap.set('click', {
  frames: 1,
  index: 1,
  name: 'click',
  time: 1,
});

const elements = new Map<string, UIElement>();

const buttonTest = new Button({
  id: 'button1',
  sWidth: 7 * 16,
  sHeight: 48,
  src: 'button.png',
  text: 'PLAY',
  x: 100,
  y: 100,
  dHeight: 48 * 3,
  dWidth: 7 * 16 * 2,
});

buttonTest.addEventListener('click', (_e) => {
  if (isAlreadyPLaying) return;
  playMusic();
});

elements.set(buttonTest.uuid, buttonTest);

const buttonTest2 = new Button({
  id: 'button2',
  sWidth: 7 * 16,
  sHeight: 48,
  src: 'button.png',
  text: 'PAUSE',
  x: 100,
  y: 100 * 3,
  dHeight: 48 * 3,
  dWidth: 7 * 16 * 2,
});

buttonTest2.addEventListener('click', (_e) => {
  pauseMusic();
});

elements.set(buttonTest2.uuid, buttonTest2);

for (let i = 0; i <= 0; i++) {
  const slider1 = new Slider({
    grabberOptions: {
      height: 16,
      width: 16,
    },
    id: 'slider1',
    lenght: 10,
    sWidth: 176,
    sHeight: 16,
    src: 'slider.png',
    x: 100,
    y: 16 * 2 * i + 100,
    value: i * 10,
    dHeight: 16 * 2,
    dWidth: 16 * 11 * 2,
  });

  elements.set(slider1.uuid, slider1);
}

const cursor = new Cursor({
  id: 'cursor_paw',
  sHeight: 32,
  src: 'paw_cursor.png',
  sWidth: 32,
});

const gameInterface = new GameInterface({
  name: 'interface 1',
  cursor,
  elements,
});

const scene = new Scene({
  map,
  name: 'SCENE_TEST',
  player,
  camera,
  gameInterface,
});

const control = new Control();

const game = new Game({
  canvasId: CANVAS_ID,
  control,
  initialScene: scene,
});

function playMusic() {
  try {
    isAlreadyPLaying = true;
    const audioContext = new AudioContext();
    audioElement.volume = 0.2;
    audioElement.loop = true;
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);
    audioElement.play();
    console.log('play');
  } catch (error) {
    console.error('Error al cargar o reproducir la música:', error);
  }
}

function pauseMusic() {
  try {
    isAlreadyPLaying = false;
    audioElement.pause();
  } catch (error) {
    console.error('Error al cargar o reproducir la música:', error);
  }
}

export const start = async () => {
  // Crear un contexto de audio

  await game.init();
  console.log(game);
};
