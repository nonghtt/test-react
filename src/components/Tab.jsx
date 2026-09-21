export default function Tab({ tabs, activeTabId, handleTabBtnClick }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => {
        return (
          <button
            className={`tab ${tab.id === activeTabId ? "active" : ""}`}
            type="button"
            key={tab.id}
            onClick={() => {
              handleTabBtnClick(tab.id);
            }}
          >
            {tab.label} {tab.count}
          </button>
        );
      })}
    </div>
  );
}
