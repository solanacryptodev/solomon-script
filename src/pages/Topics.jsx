import { createSignal } from 'solid-js';

function Topics() {
  const topicCategories = [
    {
      name: "Faith & Belief",
      topics: ["Faith", "Belief", "Trust", "Doubt", "Confidence"]
    },
    {
      name: "Virtues & Character",
      topics: ["Love", "Joy", "Peace", "Patience", "Kindness", "Goodness", "Faithfulness", "Gentleness", "Self-control"]
    },
    {
      name: "Life Challenges",
      topics: ["Suffering", "Trials", "Persecution", "Sickness", "Death", "Fear", "Anxiety", "Depression"]
    },
    {
      name: "Spiritual Growth",
      topics: ["Prayer", "Worship", "Fasting", "Meditation", "Discipleship", "Holiness", "Sanctification"]
    },
    {
      name: "Relationships",
      topics: ["Marriage", "Family", "Children", "Friendship", "Community", "Church", "Leadership"]
    }
  ];
  
  return (
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-navy mb-2">Bible Topics</h1>
        <p class="text-gray-700">Explore these biblical topics to deepen your understanding of scripture.</p>
      </div>
      
      <div class="space-y-8">
        {topicCategories.map(category => (
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold text-teal mb-4">{category.name}</h2>
            <div class="flex flex-wrap gap-2">
              {category.topics.map(topic => (
                <a 
                  href={`/?topic=${topic.toLowerCase()}`}
                  class="px-4 py-2 bg-teal-light text-teal rounded-md hover:bg-teal hover:text-white transition-colors"
                >
                  {topic}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topics;
