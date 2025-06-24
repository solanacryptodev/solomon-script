import { createSignal } from 'solid-js';
import { HomeViewModel } from '../viewmodels/HomeViewModel';
import { translations } from '../utils/interfaces';

interface SearchBarProps {
  homeViewModel: HomeViewModel;
}

function SearchBar(props: SearchBarProps) {
  const [localTopic, setLocalTopic] = createSignal('');
  const [localVersion, setLocalVersion] = createSignal('NLT');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const topic = localTopic().trim();
    const version = localVersion();
    
    if (topic) {
      console.log('Submitting search:', { topic, version });
      props.homeViewModel.updateBibleTopic(topic, version);
      console.log('translation:', version)
    }
  };

  return (
    <form onSubmit={handleSubmit} class="mt-4">
      <div class="flex gap-2">
        <input
          type="text"
          placeholder="e.g. Trust, Faith, Holy Spirit..."
          value={localTopic()}
          onInput={(e) => setLocalTopic(e.currentTarget.value)}
          class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal text-base"
        />
        <select
          value={localVersion()}
          onChange={(e) => setLocalVersion(e.currentTarget.value)}
          class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal bg-white text-base min-w-[120px]"
        >
          {translations.map((translation) => (
            <option value={translation.id}>{translation.id}</option>
          ))}
        </select>
        <button
          type="submit"
          class="px-6 py-3 bg-teal text-white rounded-lg hover:bg-teal-dark transition font-medium"
          disabled={props.homeViewModel.isLoading()}
        >
          {props.homeViewModel.isLoading() ? 'SEARCHING...' : 'SEARCH'}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;