interface TopicTagsProps {
  onSelectTopic: (topic: string) => void;
}

function TopicTags(props: TopicTagsProps) {
  const topics = [
    'Trust', 'Faith', 'Love', 'Hope', 'Peace', 'Joy', 'Forgiveness', 
    'Prayer', 'Wisdom', 'Strength', 'Guidance', 'Healing', 'Grace', 'Salvation'
  ];

  return (
    <div class="mt-6">
      <h3 class="text-sm font-semibold text-black mb-3">POPULAR TOPICS:</h3>
      <div class="flex flex-wrap gap-2">
        {topics.map(topic => (
          <button
            onClick={() => props.onSelectTopic(topic)}
            class="bg-white text-navy px-3 py-1 rounded-full text-sm hover:bg-teal-light transition border border-gray-200"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TopicTags;