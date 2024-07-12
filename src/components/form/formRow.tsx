export default function FormRow({ children, className = '' }) {
  let classes = [
    'formRow',
    'flex',
    'flex-wrap',
    'gap-2'
  ];

  let classesStr = classes.join(' ');
  if (className && className !== '') classesStr = `${classesStr} ${className}`;

  return (
    <div className={classesStr}>
      { children }
    </div>
  )
}