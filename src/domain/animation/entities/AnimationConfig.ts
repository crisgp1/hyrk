import { AnimationType } from '../value-objects/AnimationType';
import { Duration } from '../value-objects/Duration';
import { Ease } from '../value-objects/Ease';

export class AnimationConfig {
  constructor(
    public readonly id: string,
    public readonly type: AnimationType,
    public readonly duration: Duration,
    public readonly ease: Ease,
    public readonly delay?: Duration
  ) {}

  static create(
    id: string,
    type: string,
    duration: number,
    ease: string,
    delay?: number
  ): AnimationConfig {
    return new AnimationConfig(
      id,
      new AnimationType(type),
      new Duration(duration),
      new Ease(ease),
      delay ? new Duration(delay) : undefined
    );
  }

  public getType(): string {
    return this.type.value;
  }

  public getDuration(): number {
    return this.duration.value;
  }

  public getEase(): string {
    return this.ease.value;
  }

  public getDelay(): number | undefined {
    return this.delay?.value;
  }
}