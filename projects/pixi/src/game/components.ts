import { Application, Spritesheet } from "pixi.js"

// Components
export const Components = {
  position: { x: 0, y: 0, rotation: 0 },
  velocity: { speed: 0 },
  sprite: { spritesheet: "", name: "", frames: [] as string[] },
  input: { throttle: 0, break: 0, turn: 0 },
}

// World Types
export interface WorldContext {
  app: Application
  spritesheets: Record<string, Spritesheet>
}

export type WorldComponents = typeof Components
