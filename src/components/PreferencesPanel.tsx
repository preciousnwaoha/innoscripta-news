// src/components/PreferencesPanel.tsx
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateSources, updateAuthors, updateCategories } from '../store/userSlice';



const PreferencesPanel: React.FC = () => {
  const dispatch = useDispatch();
  const { sources, categories, authors } = useSelector((state: RootState) => state.user);

  // Hard-coded available options; these could come from a config or API
  const availableSources = ["NewsAPI.org", "The Guardian", "NewsCred", "New York Times", "BBC News"];
  const availableCategories = ["Politics", "Sports", "Technology", "Entertainment", "Business"];
  const availableAuthors = ["Author A", "Author B", "Author C", "Author D"];

  const toggleSelection = (item: string, selected: string[]): string[] => {
    return selected.includes(item)
      ? selected.filter((i) => i !== item)
      : [...selected, item];
  };

  return (
    <div className="preferences-panel">
      <h2>Customize Your News Feed</h2>
      
      <div>
        <h3>Preferred Sources</h3>
        {availableSources.map((source) => (
          <label key={source}>
            <input
              type="checkbox"
              checked={sources.includes(source)}
              onChange={() => dispatch(updateSources(toggleSelection(source, sources)))}
            />
            {source}
          </label>
        ))}
      </div>
      
      <div>
        <h3>Preferred Categories</h3>
        {availableCategories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={categories.includes(category)}
              onChange={() => dispatch(updateCategories(toggleSelection(category, categories)))}
            />
            {category}
          </label>
        ))}
      </div>
      
      <div>
        <h3>Preferred Authors</h3>
        {availableAuthors.map((author) => (
          <label key={author}>
            <input
              type="checkbox"
              checked={authors.includes(author)}
              onChange={() => dispatch(updateAuthors(toggleSelection(author, authors)))}
            />
            {author}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PreferencesPanel;
