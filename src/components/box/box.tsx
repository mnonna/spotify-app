export default function Box({ children, className = '' }) {
  let classes = [
    'box',
    'w-full'
  ];

  let classesStr = classes.join(' ');
  if (className && className !== '') classesStr = `${classesStr} ${className}`;

  return (
    <div className={classesStr}>
      { children }
    </div> 
  )
}