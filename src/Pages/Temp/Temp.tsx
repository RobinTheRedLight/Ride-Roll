import { useState } from "react";



const tabStyle = {
  padding: '10px 20px',
  cursor: 'pointer',
  borderBottom: '2px solid transparent',
};
const activeTabStyle = {
  ...tabStyle,
  borderBottom: '2px solid blue',
};

const Temp = () => {

  const [activeTab, setActiveTab] = useState<'Paid' | 'Unpaid'>('Unpaid');

  // Handler for tab click
  const handleTabClick = (tab: 'Paid' | 'Unpaid') => {
    setActiveTab(tab);
  }


  return  <div>
  <h1>My Rentals</h1>
  <div style={{ display: 'flex' }}>
    {/* Tabs */}
    <div
      style={activeTab === 'Unpaid' ? activeTabStyle : tabStyle}
      onClick={() => handleTabClick('Unpaid')}
    >
      Unpaid
    </div>
    <div
      style={activeTab === 'Paid' ? activeTabStyle : tabStyle}
      onClick={() => handleTabClick('Paid')}
    >
      Paid
    </div>
  </div>

  {/* Content based on active tab */}
  <div style={{ marginTop: '20px' }}>
    {activeTab === 'Unpaid' && (
      <div>
        {/* Unpaid content goes here */}
        <h2>Unpaid Rentals</h2>
        <p>List of unpaid rentals will be displayed here.</p>
      </div>
    )}

    {activeTab === 'Paid' && (
      <div>
        {/* Paid content goes here */}
        <h2>Paid Rentals</h2>
        <p>List of paid rentals will be displayed here.</p>
      </div>
    )}
  </div>
</div>
    
 
};

export default Temp;
