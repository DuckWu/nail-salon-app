'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface HeroSlide {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  image: {
    url: string;
    alt: string;
  };
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

export default function HeroSlider({ 
  slides, 
  autoplay = true, 
  autoplayInterval = 5000 
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(nextSlide, autoplayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoplayInterval, slides.length]);

  const handleSlideInteraction = () => {
    setIsAutoPlaying(false);
    // Re-enable autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="relative h-screen overflow-hidden mt-20">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={clsx(
            'absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out',
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="flex items-center h-full">
            {/* Content */}
            <div className="flex-1 px-8 md:px-16 lg:px-20 z-10">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-light-text mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <Link
                  href={slide.buttonHref}
                  className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:-translate-y-1 transition-transform duration-300 shadow-lg hover:shadow-xl"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 relative h-full">
              <Image
                src={slide.image.url}
                alt={slide.image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <button
            onClick={() => {
              prevSlide();
              handleSlideInteraction();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-colors duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={() => {
              nextSlide();
              handleSlideInteraction();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-colors duration-300"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index);
                  handleSlideInteraction();
                }}
                className={clsx(
                  'w-3 h-3 rounded-full transition-colors duration-300',
                  index === currentSlide 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/75'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Mobile Responsive Adjustments */}
      <div className="absolute inset-0 md:hidden">
        {slides.map((slide, index) => (
          <div
            key={`mobile-${slide.id}`}
            className={clsx(
              'absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out',
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            )}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image.url}
                alt={slide.image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
              <div className="max-w-lg">
                <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg text-white/90 mb-6 leading-relaxed">
                  {slide.description}
                </p>
                <Link
                  href={slide.buttonHref}
                  className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:-translate-y-1 transition-transform duration-300 shadow-lg hover:shadow-xl"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}