// Tabs.tsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Tabs.css";

export interface TabItemType {
  label: string;
  component: React.FC;
  // Optional query value used to update the URL.
  query?: string;
}

interface TabsProps {
  items: TabItemType[];
  // The key to use in the query string (default is "tab")
  queryParamKey?: string;
}

const Tabs = ({ items, queryParamKey = "tab" }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  // On mount, check for an existing query param to set the active tab.
  useEffect(() => {
    const tabQuery = searchParams.get(queryParamKey);
    if (tabQuery) {
      // Look for a matching tab (if a tab doesn't have a query, you might default to index)
      const index = items.findIndex((item) => item.query === tabQuery);
      if (index !== -1) {
        setActiveTab(index);
      }
    }
  }, [items, searchParams, queryParamKey]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const queryValue = items[index].query || index.toString();
    // Update the query parameter using either setSearchParams or navigate.
    searchParams.set(queryParamKey, queryValue);
    setSearchParams(searchParams);
    // Alternatively, using navigate:
    // navigate(`?${queryParamKey}=${queryValue}`);
  };

  const ActiveComponent = items[activeTab].component;

  return (
    <div className="tabs">
      <ul className="tabs-labels">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => handleTabClick(index)}
            className={`tabs-label ${index === activeTab ? "active" : ""}`}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div className="tabs-content">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default Tabs;
