// import * as React from "react"
// import useEmblaCarousel from "embla-carousel-react";
// import { ArrowLeft, ArrowRight } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"

// const CarouselContext = React.createContext(null)

// function useCarousel() {
//   const context = React.useContext(CarouselContext)

//   if (!context) {
//     throw new Error("useCarousel must be used within a <Carousel />")
//   }

//   return context
// }

// const Carousel = React.forwardRef((
//   {
//     orientation = "horizontal",
//     opts,
//     setApi,
//     plugins,
//     className,
//     children,
//     ...props
//   },
//   ref
// ) => {
//   const [carouselRef, api] = useEmblaCarousel({
//     ...opts,
//     axis: orientation === "horizontal" ? "x" : "y",
//   }, plugins)
//   const [canScrollPrev, setCanScrollPrev] = React.useState(false)
//   const [canScrollNext, setCanScrollNext] = React.useState(false)

//   const onSelect = React.useCallback((api) => {
//     if (!api) {
//       return
//     }

//     setCanScrollPrev(api.canScrollPrev())
//     setCanScrollNext(api.canScrollNext())
//   }, [])

//   const scrollPrev = React.useCallback(() => {
//     api?.scrollPrev()
//   }, [api])

//   const scrollNext = React.useCallback(() => {
//     api?.scrollNext()
//   }, [api])

//   const handleKeyDown = React.useCallback((event) => {
//     if (event.key === "ArrowLeft") {
//       event.preventDefault()
//       scrollPrev()
//     } else if (event.key === "ArrowRight") {
//       event.preventDefault()
//       scrollNext()
//     }
//   }, [scrollPrev, scrollNext])

//   React.useEffect(() => {
//     if (!api || !setApi) {
//       return 
//     }

//     setApi(api)
//   }, [api, setApi])

//   React.useEffect(() => {
//     if (!api) {
//       return
//     }

//     onSelect(api)
//     api.on("reInit", onSelect)
//     api.on("select", onSelect)

//     return () => {
//       api?.off("select", onSelect)
//     };
//   }, [api, onSelect])

//   return (
//     (<CarouselContext.Provider
//       value={{
//         carouselRef,
//         api: api,
//         opts,
//         orientation:
//           orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
//         scrollPrev,
//         scrollNext,
//         canScrollPrev,
//         canScrollNext,
//       }}>
//       <div
//         ref={ref}
//         onKeyDownCapture={handleKeyDown}
//         className={cn("relative", className)}
//         role="region"
//         aria-roledescription="carousel"
//         {...props}>
//         {children}
//       </div>
//     </CarouselContext.Provider>)
//   );
// })
// Carousel.displayName = "Carousel"

// const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
//   const { carouselRef, orientation } = useCarousel()

//   return (
//     (<div ref={carouselRef} className="overflow-hidden">
//       <div
//         ref={ref}
//         className={cn(
//           "flex",
//           orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
//           className
//         )}
//         {...props} />
//     </div>)
//   );
// })
// CarouselContent.displayName = "CarouselContent"

// const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
//   const { orientation } = useCarousel()

//   return (
//     (<div
//       ref={ref}
//       role="group"
//       aria-roledescription="slide"
//       className={cn(
//         "min-w-0 shrink-0 grow-0 basis-full",
//         orientation === "horizontal" ? "pl-4" : "pt-4",
//         className
//       )}
//       {...props} />)
//   );
// })
// CarouselItem.displayName = "CarouselItem"

// const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
//   const { orientation, scrollPrev, canScrollPrev } = useCarousel()

//   return (
//     (<Button
//       ref={ref}
//       variant={variant}
//       size={size}
//       className={cn("absolute  h-8 w-8 rounded-full", orientation === "horizontal"
//         ? "-left-12 top-1/2 -translate-y-1/2"
//         : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className)}
//       disabled={!canScrollPrev}
//       onClick={scrollPrev}
//       {...props}>
//       <ArrowLeft className="h-4 w-4" />
//       <span className="sr-only">Previous slide</span>
//     </Button>)
//   );
// })
// CarouselPrevious.displayName = "CarouselPrevious"

// const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
//   const { orientation, scrollNext, canScrollNext } = useCarousel()

//   return (
//     (<Button
//       ref={ref}
//       variant={variant}
//       size={size}
//       className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal"
//         ? "-right-12 top-1/2 -translate-y-1/2"
//         : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className)}
//       disabled={!canScrollNext}
//       onClick={scrollNext}
//       {...props}>
//       <ArrowRight className="h-4 w-4" />
//       <span className="sr-only">Next slide</span>
//     </Button>)
//   );
// })
// CarouselNext.displayName = "CarouselNext"

// export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };


import * as React from "react";
import { useState, useEffect, useCallback, useContext } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef(({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  autoSlide = false,
  autoSlideInterval = 3000,
  children,
  ...props
}, ref) => {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
  }, plugins);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(React.Children.count(children));

  const onSelect = useCallback((api) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    setSlideCount(api.scrollSnapList().length);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(scrollNext, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, scrollNext]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={ref}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
        <Dots slideCount={slideCount} selectedIndex={selectedIndex} />
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-9" : "pt-9",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full bg-white z-10",
        orientation === "horizontal"
          ? "left-4 top-1/2 -translate-y-1/2"
          : "top-4 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full bg-white z-10",
        orientation === "horizontal"
          ? "right-12 top-1/2 -translate-y-1/2"
          : "bottom-4 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

const Dots = ({ slideCount, selectedIndex }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {Array.from({ length: slideCount }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "h-2 w-2 rounded-full",
            selectedIndex === index ? "bg-gray-800" : "bg-gray-400"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
