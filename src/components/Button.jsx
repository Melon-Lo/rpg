import className from 'classnames';

export default function Button({ children, primary, secondary, success, warning, danger, outline, rounded, ...rest }) {
  const classes = className()

  return (
    <button className=''>
      {children}
    </button>
  );
}