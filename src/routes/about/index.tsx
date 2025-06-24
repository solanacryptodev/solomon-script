function About() {
  return (
    <div class="max-w-4xl p-8 mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-navy mb-2">About Solomon's Web</h1>
        <p class="text-gray-700">Exploring scripture with wisdom and AI-powered insights.</p>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 class="text-2xl font-bold text-teal mb-4">Our Mission</h2>
        <p class="text-gray-700 mb-4">
          Solomon's Web combines ancient wisdom with modern technology to help you explore and understand the Bible.
          Named after King Solomon, known for his wisdom and discernment, our platform aims to provide insights into scripture
          through topical exploration and AI-powered analysis.
        </p>
        
        <h2 class="text-2xl font-bold text-teal mb-4 mt-8">How It Works</h2>
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="bg-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
            <div>
              <h3 class="font-bold text-navy">Search for a Topic</h3>
              <p class="text-gray-700">Enter any biblical topic, concept, person, or place in the search bar.</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="bg-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
            <div>
              <h3 class="font-bold text-navy">Explore Relevant Verses</h3>
              <p class="text-gray-700">Review scripture passages that address your topic from your chosen translation.</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="bg-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
            <div>
              <h3 class="font-bold text-navy">Gain AI-Powered Insights</h3>
              <p class="text-gray-700">Our Deepseek V3 AI engine analyzes the verses to provide deeper understanding and connections.</p>
            </div>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-teal mb-4 mt-8">About the Technology</h2>
        <p class="text-gray-700 mb-4">
          Solomon's Web is built using modern web technologies including SolidJS for a responsive interface and
          the Deepseek V3 large language model for scripture analysis. We prioritize accuracy, accessibility, and
          thoughtful interpretation.
        </p>
        <p class="text-gray-700">
          Our AI analysis is meant to complement, not replace, personal study and reflection on God's word.
          We encourage you to use these insights as a starting point for deeper exploration and prayer.
        </p>
      </div>
    </div>
  );
}

export default About;
