function Sidebar()  {
    return (
      <div
        style={{
          width: '240px',
          backgroundColor: 'transparent',
          overflowY: 'auto',
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ padding: '12px' }}>Menu Item 1</li>
          <li style={{ padding: '12px' }}>Menu Item 2</li>
          <li style={{ padding: '12px' }}>Menu Item 3</li>
        </ul>
      </div>
    );
  }
  
  export default Sidebar;