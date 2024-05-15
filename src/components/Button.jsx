import className from 'classnames';
import { twMerge } from 'tailwind-merge';

export default function Button({ children, slate, blue, gray, green, yellow, red, rose, purple, fuchsia, lime, amber, disabled, outline, rounded, ...rest }) {
  const classes = twMerge(
    className(rest.className,
      'flex items-center px-3 py-2 border rounded-md cursor-pointer', {
      'border-slate-500 bg-slate-500 text-white': slate,
      'border-blue-500 bg-blue-500 text-white': blue,
      'border-gray-900 bg-gray-900 text-white': gray,
      'border-green-500 bg-green-500 text-white': green,
      'border-yellow-400 bg-yellow-400 text-white': yellow,
      'border-red-500 bg-red-500 text-white': red,
      'border-rose-500 bg-rose-500 text-white': rose,
      'border-purple-500 bg-purple-500 text-white': purple,
      'border-fuchsia-500 bg-fuchsia-500 text-white': fuchsia,
      'border-lime-500 bg-lime-500 text-white': lime,
      'border-amber-500 bg-amber-500 text-white': amber,
      'border-gray-300 bg-gray-300 text-gray-500': disabled,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && blue,
      'text-gray-900': outline && gray,
      'text-green-500': outline && green,
      'text-yellow-400': outline && yellow,
      'text-red-500': outline && red
    })
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
	checkVariationValue: ({ blue, gray, green, yellow, red}) => {
		const count = Number(!!blue) +
			Number(!!gray) +
			Number(!!green) +
			Number(!!yellow) +
			Number(!!red);

		if (count > 1) {
			return new Error('Only one of blue, gray, green, yellow, red can be true');
		}
	}
};