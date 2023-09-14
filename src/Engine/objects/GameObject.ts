import { v4 as uuid } from 'uuid';
import Camera from '../game/Camera';
import {
  GameObjectTypes,
  GameObjectArgs,
  DrawProperitesType,
} from '../_types/object/GameObject';
import { file } from '../utils';

export default class GameObject {
  id: string;
  x: number;
  y: number;
  sx: number;
  sy: number;
  width: number;
  height: number;
  src: string;
  uuid: string;
  type: GameObjectTypes = GameObjectTypes.GAME_OBJECT;
  image?: HTMLImageElement;

  constructor(args: GameObjectArgs) {
    this.id = args.id;
    this.height = args.height;
    this.width = args.width;
    this.x = args.x;
    this.y = args.y;
    this.sx = args.sx;
    this.sy = args.sy;
    this.src = args.src;
    this.type = args.type;
    this.image = args.image;
    this.uuid = uuid();
  }

  async load(): Promise<void> {
    try {
      const img = await file.loadImage(`resources/${this.type}/${this.src}`);
      this.image = img;
    } catch (error) {
      console.error(
        `Error loading GameObject[${this.type}] ${this.id} image with src: ${this.src}`,
      );
    }
  }

  getDrawProperties(_camera?: Camera): DrawProperitesType {
    return {
      dHeight: this.height,
      dWidth: this.width,
      dx: this.x,
      dy: this.y,
      sheight: this.height,
      swidth: this.width,
      sx: this.x,
      sy: this.y,
    };
  }

  render(ctx: CanvasRenderingContext2D, camera?: Camera) {
    const drawProperties = this.getDrawProperties(camera);
    if (!this.image) return;
    ctx.drawImage(
      this.image,
      drawProperties.sx,
      drawProperties.sy,
      drawProperties.swidth,
      drawProperties.sheight,
      drawProperties.dx,
      drawProperties.dy,
      drawProperties.dWidth,
      drawProperties.dHeight,
    );
  }
}
