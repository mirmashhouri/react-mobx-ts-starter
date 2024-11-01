import { useUnmount } from 'react-use';

import { useAppContext } from 'app/App';

/**
 * Handle App dispose
 * 
 * Functionality:
 * 1. Takes methods to dispose when App component is disposed.
 * 2. Used to detached specific events.
 * 
 * Example:
 * ```js
 * useDisposer();
 * ```
 */
export const useDisposer = () => {
  const { store: { disposeAllEvents } } = useAppContext();

  useUnmount(() => {
    disposeAllEvents();
  });
};