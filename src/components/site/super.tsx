import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function SuperchargeSection() {
  const products = [
    {
      href: "/product/editor",
      icon: "https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa412e8e00dbb65c3e145_editor-signet.svg",
      title: "Editor",
      badge: { text: "Open source", variant: "primary" },
      description: "Build custom editors that align perfectly with your user's needs, offering flexibility and ease of use. Ideal for creating user-centric interfaces with minimal fuss."
    },
    {
      href: "/product/collaboration",
      icon: "https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc67b063a50545c95d_collaboration-signet.svg",
      title: "Collaboration",
      badges: [
        { text: "Cloud", variant: "default" },
        { text: "Try for free", variant: "default" }
      ],
      description: "Allow your users to collaborate in any document and media. Integrate live carets and cursors to show who is typing, support offline editing and sync content."
    },
    {
      href: "/product/content-ai",
      icon: "https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc3f58a040b8249857_content-ai-signet.svg",
      title: "Content AI",
      badges: [
        { text: "Cloud", variant: "primary" },
        { text: "Paid feature", variant: "default" }
      ],
      description: "Help your users perfecting their tone and crossing language barriers, Tiptap's Content AI transforms words into wonders. Write, refine, and captivate with ease."
    },
    {
      href: "/product/comments",
      icon: "https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc5d0a67adb5b7b76f_comments-signet.svg",
      title: "Comments",
      badges: [
        { text: "Cloud", variant: "primary" },
        { text: "Paid feature", variant: "default" }
      ],
      description: "Integrate inline and document comments directly in your editor with Tiptap Comments. Ideal for collaboration, enabling real-time discussion and suggestions within the content."
    },
    {
      href: "/product/documents",
      icon: "https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65baa3dc276ae556f0a6f4a9_documents-signet.svg",
      title: "Documents",
      badges: [
        { text: "Cloud", variant: "primary" },
        { text: "Try for free", variant: "default" }
      ],
      description: "Self-host your documents for full control, or opt for our secure, scalable cloud. Create and manipulate your documents any way you want, whether you're flying solo or on Cloud 9."
    }
  ]

  return (
    <section className="tt-section section-overflow">
      <div className="tt-heading-content center">
        <p className="intro-text mb-0-5">Tiptap Suite</p>
        <div className="tt-heading-group">
          <h2 className="heading-xlarge">
            Supercharge your
            <strong className="headline-decoration">content experience</strong>
          </h2>
        </div>
        <div className="intro-text">
          <p>
            Essentially a headless open source editor, Tiptap has a wide range of paid features that give developers exactly the kind of experience they&apos;re looking for - fully customizable to build their product needs.
          </p>
        </div>
      </div>

      <div className="tt-product-slider splide splide--slide splide--ltr splide--draggable is-active is-overflow is-initialized">
        <div className="tt-gradient-container">
          <div className="tt-gradient-panel">
            <Image 
              src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/65679a388e1f446dcbfbf0c6_gradient_placeholder-editor.png"
              loading="lazy"
              sizes="100vw"
              alt=""
              layout="fill"
              className="tt-gradient-image gradient-default"
            />
          </div>
        </div>
        
        <div className="splide__track splide__track--slide splide__track--ltr splide__track--draggable">
          <div className="splide__list" role="presentation">
            {products.map((product, index) => (
              <div 
                key={product.href}
                className={`splide__slide product__slide ${index === 0 ? 'is-active is-visible' : index === 1 ? 'is-visible is-next' : index === 2 ? 'is-visible' : ''}`}
              >
                <Link href={product.href} className="tt-product-card w-inline-block">
                  <div className="tt-product-card-media-wrap">
                    <Image 
                      src={product.icon}
                      loading="lazy"
                      alt=""
                      width={64}
                      height={64}
                      className="product-card-media"
                    />
                  </div>
                  
                  <div className="tt-product-card-content">
                    <div className="tt-heading-batch-wrap">
                      <h3 className="heading-medium">{product.title}</h3>
                      <div className="tt-batch-group">
                        {product.badge && (
                          <Badge variant={product.badge.variant === 'primary' ? 'default' : 'secondary'} className="tt-batch batch-primary">
                            {product.badge.text}
                          </Badge>
                        )}
                        {product.badges && (
                          <div className="tt-batch-subgroup">
                            {product.badges.map((badge, i) => (
                              <Badge 
                                key={i} 
                                variant={badge.variant === 'primary' ? 'default' : 'secondary'}
                                className={`tt-batch ${badge.variant === 'primary' ? 'batch-primary' : ''}`}
                              >
                                {badge.text}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-small">{product.description}</p>
                  </div>
                  
                  <div className="tt-button btn-text btn-arrow small">
                    <div className="btn-content">Learn more</div>
                    <div className="btn-primary-arrow w-embed">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7.38197L15.4495 7.10674L15.4484 7.10617L15.4455 7.10464L15.4188 7.09062C15.393 7.07688 15.3516 7.05438 15.2965 7.02295C15.1862 6.96006 15.0213 6.86173 14.8166 6.72686C14.4066 6.45661 13.8417 6.0427 13.2383 5.47699C12.029 4.34323 10.6931 2.62752 10.1006 0.257465L8.16032 0.742531C8.87215 3.58987 10.4711 5.62416 11.8704 6.93606C11.8933 6.95756 11.9162 6.97887 11.9391 7H0V9H11.9391C11.9162 9.02112 11.8933 9.04244 11.8704 9.06394C10.4711 10.3758 8.87215 12.4101 8.16032 15.2575L10.1006 15.7425C10.6931 13.3725 12.029 11.6568 13.2383 10.523C13.8417 9.9573 14.4066 9.54339 14.8166 9.27313C15.0213 9.13826 15.1862 9.03994 15.2965 8.97705C15.3516 8.94562 15.393 8.92311 15.4188 8.90937L15.4455 8.89535L15.4484 8.89383L15.4495 8.89326L16 8.61803V7.38197Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}