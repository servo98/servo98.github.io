import Scene from './Scene';
import Time from '../utils/Time';
import Control from './Controls';

enum GAME_STATES {
  'LOADING',
  'MAIN_MANU',
  'PAUSE',
  'INGAME',
}

type GameArgsType = {
  canvasId: string;
  control: Control;
  initialScene: Scene;
};

export default class Game {
  state: GAME_STATES;
  scene: Scene;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  requestAnimationFrameId: number = NaN;
  control: Control;

  constructor(args: GameArgsType) {
    this.state = GAME_STATES.LOADING;
    this.canvas = document.getElementById(args.canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.control = args.control;
    this.scene = args.initialScene;
  }

  async init() {
    this.control.load();
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.imageSmoothingEnabled = false;
    await this.scene.load();
    this.requestAnimationFrameId = requestAnimationFrame(this.loop.bind(this));
  }

  private input() {
    this.scene.input(this.control);
  }
  private update() {
    this.scene.update();
  }
  private render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.scene.render(ctx);
  }

  loop() {
    if (Time.shouldAnimate()) {
      this.input();
      this.update();
      this.render(this.ctx);
    }
    this.requestAnimationFrameId = requestAnimationFrame(this.loop.bind(this));
  }
}