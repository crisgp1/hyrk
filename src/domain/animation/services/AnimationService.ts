import { AnimationConfig } from '../entities/AnimationConfig';
import { gsap } from 'gsap';

export class AnimationService {
  private animations: Map<string, AnimationConfig> = new Map();

  registerAnimation(config: AnimationConfig): void {
    this.animations.set(config.id, config);
  }

  getAnimation(id: string): AnimationConfig | undefined {
    return this.animations.get(id);
  }

  createFadeInAnimation(
    id: string, 
    duration: number = 0.8, 
    ease: string = 'power3.out'
  ): AnimationConfig {
    return AnimationConfig.create(id, 'fadeIn', duration, ease);
  }

  createSlideUpAnimation(
    id: string, 
    duration: number = 0.8, 
    ease: string = 'power3.out',
    delay?: number
  ): AnimationConfig {
    return AnimationConfig.create(id, 'slideUp', duration, ease, delay);
  }

  createFloatAnimation(
    id: string, 
    duration: number = 3, 
    ease: string = 'power1.out'
  ): AnimationConfig {
    return AnimationConfig.create(id, 'float', duration, ease);
  }

  applyGSAPAnimation(
    element: HTMLElement | HTMLElement[], 
    config: AnimationConfig
  ): gsap.core.Timeline {
    const tl = gsap.timeline();
    
    switch (config.getType()) {
      case 'fadeIn':
        gsap.set(element, { opacity: 0 });
        tl.to(element, {
          opacity: 1,
          duration: config.getDuration(),
          ease: config.getEase(),
          delay: config.getDelay() || 0
        });
        break;
        
      case 'slideUp':
        gsap.set(element, { opacity: 0, y: 60 });
        tl.to(element, {
          opacity: 1,
          y: 0,
          duration: config.getDuration(),
          ease: config.getEase(),
          delay: config.getDelay() || 0
        });
        break;
        
      case 'float':
        tl.to(element, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          duration: config.getDuration(),
          repeat: -1,
          yoyo: true,
          ease: config.getEase()
        });
        break;
        
      case 'scale':
        gsap.set(element, { scale: 0 });
        tl.to(element, {
          scale: 1,
          duration: config.getDuration(),
          ease: config.getEase(),
          delay: config.getDelay() || 0
        });
        break;
    }
    
    return tl;
  }
}