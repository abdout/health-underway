// import React from 'react';
// import Link from 'next/link';
// import { cn } from '@/lib/utils';
// import { buttonVariants } from '@/components/ui/button';

// export default function TiptapHero() {
//   return (
//     <div className="relative min-h-screen">
//       {/* Gradient Container with Background Image - Now outside header */}
//       <div className="tt-gradient-container absolute top-0 right-0 z-0 h-[150vh]">
//         <div className="tt-gradient-panel">
//           <img 
//             className="tt-gradient-image gradient-accordion-square w-screen h-auto md:w-[744px] block"
//             src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/6580b17f35510ffc21541053_gradient-noise-green-red.png"
//             alt="decorative background"
//             draggable={false}
//             sizes="(max-width: 767px) 100vw, 744px"
//             srcSet="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/6580b17f35510ffc21541053_gradient-noise-green-red-p-500.png 500w,
//                    https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/6580b17f35510ffc21541053_gradient-noise-green-red.png 744w"
//             loading="lazy"
//           />
//         </div>
//       </div>

//       <header className="tt-hero gradient-top-right min-h-screen relative overflow-hidden">
//         {/* Hero Content */}
//         <div className="relative z-10 flex items-center justify-center min-h-screen px-6 sm:px-8 lg:px-12">
//           <div className="max-w-7xl mx-auto text-center">
//             <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-[80px]">
//               Healing starts here <br />
//               Where right answers
//             </h1>
            
//             {/* Subtitle text */}
//             <div className="mt-8 sm:mt-12">
//               <p className="max-w-2xl mx-auto leading-normal text-muted-foreground sm:text-xl sm:leading-8">
//                 Effective treatment depends on getting the right diagnosis. Our experts diagnose and treat the toughest medical challenges.
//               </p>
//             </div>
            
//             {/* Action buttons */}
//             <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <Link href="/appointment" className={cn(buttonVariants({ size: "lg" }), "px-8 py-4 font-semibold text-lg")}>
//                 Book Appointment
//               </Link>
//               <Link href="/services" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-8 py-4 font-semibold text-lg")}>
//                 Our Services
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* You can add more sections here and the gradient will fade properly */}
//       {/* Example: */}
//       {/* <section className="relative z-10 py-24">
//         <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
//           Your additional content here
//         </div>
//       </section> */}
//     </div>
//   );
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page