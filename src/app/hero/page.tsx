import { LovableHero } from '@/components/LovableHero';

export default function HeroPage() {
  return (
    <div className="min-h-screen">
      <LovableHero />
      
      {/* Additional content to show background continuation */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              From the Community
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              See what amazing apps people are building with Lovable
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {['Bill splitter', 'Task manager', 'Recipe finder'].map((app, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <h3 className="text-xl font-semibold text-white mb-2">{app}</h3>
                  <p className="text-gray-400">Built in minutes with Lovable's AI-powered development platform.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* More content to demonstrate scrolling */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to build?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of developers who are building faster with AI
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 