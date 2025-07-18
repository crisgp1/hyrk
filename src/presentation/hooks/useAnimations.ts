'use client';

import { useEffect, useRef } from 'react';
import { DIContainer } from '../../infrastructure/services/DIContainer';
import { AnimationConfig } from '../../domain/animation/entities/AnimationConfig';

export const useAnimations = () => {
  const animationService = DIContainer.getInstance().getAnimationService();

  const useFadeInAnimation = (
    duration: number = 0.8,
    ease: string = 'power3.out',
    delay?: number
  ) => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (elementRef.current) {
        const config = AnimationConfig.create(
          `fadeIn-${Date.now()}`,
          'fadeIn',
          duration,
          ease,
          delay
        );
        animationService.applyGSAPAnimation(elementRef.current, config);
      }
    }, [duration, ease, delay]);

    return elementRef;
  };

  const useSlideUpAnimation = (
    duration: number = 0.8,
    ease: string = 'power3.out',
    delay?: number
  ) => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (elementRef.current) {
        const config = AnimationConfig.create(
          `slideUp-${Date.now()}`,
          'slideUp',
          duration,
          ease,
          delay
        );
        animationService.applyGSAPAnimation(elementRef.current, config);
      }
    }, [duration, ease, delay]);

    return elementRef;
  };

  const useFloatAnimation = (
    duration: number = 3,
    ease: string = 'power1.out'
  ) => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (elementRef.current) {
        const config = AnimationConfig.create(
          `float-${Date.now()}`,
          'float',
          duration,
          ease
        );
        animationService.applyGSAPAnimation(elementRef.current, config);
      }
    }, [duration, ease]);

    return elementRef;
  };

  const applyCustomAnimation = (
    element: HTMLElement,
    type: string,
    duration: number,
    ease: string,
    delay?: number
  ) => {
    try {
      const config = AnimationConfig.create(
        `custom-${Date.now()}`,
        type,
        duration,
        ease,
        delay
      );
      return animationService.applyGSAPAnimation(element, config);
    } catch (error) {
      console.error('Failed to apply animation:', error);
      return null;
    }
  };

  return {
    useFadeInAnimation,
    useSlideUpAnimation,
    useFloatAnimation,
    applyCustomAnimation,
    animationService
  };
};