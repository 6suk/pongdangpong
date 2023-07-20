/**
 *
 * Redux Setting Test component
 *
 */

import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment } from '@stores/counterSlice';
import { RootState } from '@stores/store';


export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          type="button"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          type="button"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
