export default function ContactInfo() {
    return (
      <div className=" rounded-2xl px-8 lg:px-16 py-4 lg:py-10 bg-[url('/contact.png')] bg-cover bg-center bg-no-repeat">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-[#000000] text-lg font-medium mb-8">Contact Info</h1>
          </div>
  
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Main Heading */}
            <div>
              <h2 className="text-[#000000] text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                We are always happy to assist you
              </h2>
            </div>
  
            {/* Right Column - Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Email Address Section */}
              <div>
                <h3 className="text-[#000000] text-lg font-semibold mb-4">Email Address</h3>
                <div className="w-8 h-0.5 bg-[#000000] mb-6"></div>
                <div className="space-y-4">
                  <p className="text-[#000000] text-base font-medium">help@info.com</p>
                  <div className="text-[#000000] text-sm">
                    <p className="font-medium mb-1">Assistance hours:</p>
                    <p>Monday - Friday 6 am to</p>
                    <p>8 pm EST</p>
                  </div>
                </div>
              </div>
  
              {/* Number Section */}
              <div>
                <h3 className="text-[#000000] text-lg font-semibold mb-4">Number</h3>
                <div className="w-8 h-0.5 bg-[#000000] mb-6"></div>
                <div className="space-y-4">
                  <p className="text-[#000000] text-base font-medium">(808) 998-34256</p>
                  <div className="text-[#000000] text-sm">
                    <p className="font-medium mb-1">Assistance hours:</p>
                    <p>Monday - Friday 6 am to</p>
                    <p>8 pm EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  