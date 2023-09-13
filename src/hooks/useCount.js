import { useState } from 'react';

export function useCount(initialValue, max, min = 0, step = 1) {
	const [count, setCount] = useState(initialValue);

	const increment = () =>
		setCount((current) => (current + step > max ? max : current + step));

	const decrement = () =>
		setCount((current) => (current - step < min ? min : current - step));

	const safeSetCount = (value) => {
		if (value > max || value < min) {
			throw new Error(
				`${value} ist außerhalb des erlaubten Bereiches von ${min} bis ${max}!`
			);
		}

		setCount(value);
	};

	const reset = () => setCount(initialValue);

	const isMax = count === max;
	const isMin = count === min;

	return {
		count,
		setCount: safeSetCount,
		increment,
		decrement,
		reset,
		isMax,
		isMin,
	};
}
