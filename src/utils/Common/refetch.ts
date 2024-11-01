/* eslint-disable no-restricted-globals */

import { NetworkStore } from 'stores';

/**
 * Method for re-executing a function after a delay.
 * If networksStore is provided, then it block calls when network store has: !isOnline and !retry properties
 * 
 * Example:
 * ```js
 * refetch(() => {}, 10000);
 * ```
 * @param request - Fucntion
 * @param interval - number - in ms
 * @param networkStore - _(optional)_ NetworkStore to limit the calls
 */
export const refetch = (func: Function, interval: number, networkStore?: NetworkStore) => window.setInterval(() => {
  if (networkStore && !networkStore.isOnline && !networkStore.retry)
    return;
  func();
}, interval);

/**
 * Stops a refetch
 * @param refetchId The ID returned from ```refetch()``` method
 */
export const stopRefetch = (refetchId: number) => {
  window.clearInterval(refetchId);
};