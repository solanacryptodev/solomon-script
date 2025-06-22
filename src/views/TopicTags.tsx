interface TopicTagsProps {
  onSelectTopic: (topic: string) => void;
}

function TopicTags(props: TopicTagsProps) {
  const topics = ['LOVE', 'FAITH', 'HOPE', 'FORGIVENESS', 'SALVATION'];

  return (
    <div class="flex flex-wrap gap-3 mt-4">
      {topics.map(topic => (
        <button
          onClick={() => props.onSelectTopic(topic)}
          class="px-4 py-2 bg-gray-100 text-navy rounded-lg hover:bg-teal hover:text-white transition text-sm font-medium"
        >
          {topic}
        </button>
      ))}
    </div>
  );
}

export default TopicTags;