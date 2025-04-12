// reactSelectStyles.ts
export const customStyles = {
    control: (base: any) => ({
      ...base,
      borderColor: '#e2e8f0',
      borderRadius: '8px',
      padding: '6px',
      fontSize:"0.8rem",
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#1E40AF',
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: '#4A90E2',
      padding: '6px',
      // fontSize:"0.8rem",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: '#ffffff',
      
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: '#ffffff',
      ':hover': {
        backgroundColor: '#ff0000',
      },
      
    }),
    placeholder: (base: any) => ({
      ...base,
      color: '#475569',
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      marginTop: '4px',
      backgroundColor: '#ffffff',
    }),
    menuList: (base: any) => ({
      ...base,
      padding: '0',
      maxHeight: '250px', // Adjust the height as needed
      overflowY: 'auto', // Make the list scrollable
    }),
    option: (base: any, state: any) => ({
      ...base,
      padding: '10px',
      cursor:"pointer",
      fontSize: '0.9rem',
      backgroundColor: state.isSelected ? '#4A90E2' : state.isFocused ? '#E0E7FF' : '#ffffff',
      color: state.isSelected ? '#ffffff' : '#333333',
      '&:hover': {
        backgroundColor: '#E0E7FF', // Highlight when hovered
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#333333',
      fontSize: '0.9rem',
    }),
  };
  