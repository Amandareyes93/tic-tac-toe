export default function Square({ children, onClick, isSelected }){
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

