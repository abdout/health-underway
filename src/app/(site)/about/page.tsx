import Image from "next/image"

export default function Component() {
  return (
    <div className="min-h-screen px-8">
      <div className="max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 mb-20">
          {/* Who We Are Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="text-[#e8563f] text-sm font-medium tracking-[0.3em] uppercase">W h o W e A r e</div>
              <h2 className="text-[#444444] text-5xl font-bold leading-tight">Who We Are</h2>
              <p className="text-[#6c6c6c] text-base leading-relaxed">
                We are a dedicated community of Sudanese Paediatric Doctors united by our shared heritage and commitment
                to child healthcare excellence. From the pioneering doctors before Sudan's independence to today's
                specialists serving globally, we represent generations of medical professionals devoted to advancing
                pediatric care and preserving our rich medical legacy.
              </p>
            </div>
            <div className="mt-8">
              <Image
                src="/hospital.jpg"
                alt="Khartoum Teaching Hospital, a historic center for paediatric care in Sudan"
                width={500}
                height={400}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Why Us Section */}
          <div className="space-y-8 mt-24">
            <div className="space-y-6">
              <div className="text-[#e8563f] text-sm font-medium tracking-[0.3em] uppercase">W h y U s</div>
              <h2 className="text-[#444444] text-5xl font-bold leading-tight">Why Us</h2>
              <p className="text-[#6c6c6c] text-base leading-relaxed">
                Our platform bridges generations of Sudanese pediatric expertise, connecting current practitioners with
                pioneering predecessors and emerging professionals. We provide a comprehensive hub for professional
                development, research collaboration, and knowledge sharing that honors our medical heritage while
                advancing modern pediatric practice across Sudan and the diaspora.
              </p>
            </div>
            <div className="mt-8">
              <Image
                src="/baby.jpg"
                alt="Sudanese baby, symbolizing the future and focus of paediatric care"
                width={500}
                height={400}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Mission Section - Full Width */}
        <div className="bg-[#f8f9fa] rounded-4xl p-12">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <div className="text-[#e8563f] text-sm font-medium tracking-[0.3em] uppercase">O u r M i s s i o n</div>
              <h2 className="text-[#444444] text-5xl font-bold leading-tight">Our Mission</h2>
              <p className="text-[#6c6c6c] text-lg leading-relaxed max-w-3xl mx-auto">
                To strengthen the global network of Sudanese Paediatric Doctors through knowledge sharing, professional
                development, and collaborative research. We are committed to preserving our medical heritage, advancing
                pediatric care standards, and fostering mentorship between established practitioners and emerging
                professionals across all subspecialties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#e8563f] rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-[#444444] text-xl font-semibold">Knowledge Sharing</h3>
                <p className="text-[#6c6c6c] text-sm">
                  Facilitating the exchange of medical knowledge, research findings, and clinical experiences among
                  Sudanese pediatricians worldwide.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#e8563f] rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-[#444444] text-xl font-semibold">Professional Development</h3>
                <p className="text-[#6c6c6c] text-sm">
                  Supporting continuous medical education, career advancement, and subspecialty training opportunities
                  for our community members.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#e8563f] rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                    />
                  </svg>
                </div>
                <h3 className="text-[#444444] text-xl font-semibold">Global Network</h3>
                <p className="text-[#6c6c6c] text-sm">
                  Connecting Sudanese pediatricians across continents, fostering collaboration between local
                  practitioners and the diaspora community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
