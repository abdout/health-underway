import Image from 'next/image';

export function MeshScaleSection() {
    const features = [
      {
        title: "Document volume and size",
        description: "Tiptap's suite of tools is designed to handle tens to hundreds of millions of documents from kilobytes to megabytes per editor document, both in the cloud and on-premises."
      },
      {
        title: "Users and connections", 
        description: "Tiptap effortlessly supports real-time collaboration with tens of thousands of concurrent users and connections for global and peak usage."
      },
      {
        title: "High availability (HA)",
        description: "Whether your services are globally distributed or facing heavy traffic, the HA Mode ensures smooth, real-time collaboration without downtime."
      },
      {
        title: "Editor performance",
        description: "Tiptap deals with long texts exceeding 200,000 words without performance drops, ensuring a strong editor user experience in extreme situations."
      }
    ]
  
    return (
      <section id="scale" className="tt-section bg-black gap-4 p-12 relative">
        {/* Gradient Background Container */}
        <div className="tt-gradient-container absolute inset-0 overflow-hidden -z-10">
          <div className="tt-gradient-panel opacity-80">
            <Image 
              className="tt-gradient-image w-full h-full object-cover" 
              src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/6580a563d237ee85c9237ccb_gradient-noise-purple-azure.png" 
              alt="Mesh gradient background"
              layout="fill"
              loading="lazy"
            />
          </div>
        </div>
  
        <div className="tt-heading-content center relative z-10">
          <div className="tt-heading-group">
            <h2 className="heading-xlarge text-white">
              Tiptap is built <strong className="headline-decoration">for scale in every aspect</strong>
            </h2>
          </div>
          <div className="intro-text max-w-3xl mx-auto">
            <p className="text-gray-300">
              Engineered for enterprises managing massive content workloads, Tiptap delivers best-in-class performance 
              no matter how complex or large your operations grow.
            </p>
          </div>
        </div>
  
        {/* Feature Accordion */}
        <section className="tt-feature-accordion media-left relative z-10 mt-16">
          <div className="tt-accordion-content-slider splide">
            <div className="splide__track">
              <div className="splide__list splide-vertical">
                {features.map((feature, index) => (
                  <div key={index} className="splide__slide">
                    <div className="accordion-content-wrap">
                      <h3 className="heading-default text-white">{feature.title}</h3>
                      <div className="accordion-text-wrap">
                        <p className="text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  }