function TopicTags(props) {
  // Common Bible topics for quick access
  const commonTopics = [
    'LOVE', 'FAITH', 'HOPE', 'FORGIVENESS', 'SALVATION'
  ];
  
  return (
    <div class="flex flex-wrap gap-2 my-4 justify-center">
      {commonTopics.map(topic => (
        <button
          onClick={() => props.onSelectTopic(topic.toLowerCase())}
          class="px-4 py-2 text-navy hover:bg-teal hover:text-white transition-colors rounded-md text-sm"
        >
          {topic}
        </button>
      ))}
    </div>
  );
}

export default TopicTags;
