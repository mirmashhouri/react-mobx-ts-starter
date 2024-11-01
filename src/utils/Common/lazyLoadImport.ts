import { lazy } from 'react';

interface ILazyOptions {
  delay?: number
  isPage?: boolean
}

/**
 * Method for lazy loading components
 * 
 * Functionality:
 * 1. By default it lazy() a component.
 * 2. If there are no options lazy() the component.
 * 3. If there is isPage and delay it will delay loading.
 * 4. If there is isPage only it lazy a Page component.
 * 
 * Examples:
 * ```js
 * const Layout = lazyLoadModule('path/to/component', { delay: 100 })
 * 
 * // usage
 * 
 * ```
 * @param path - string
 * @param options - Optional - Lazy options
 *   @param options.delay - Optional - number
 *   @param options.isPage - Optional - boolean
 */
export const lazyLoadModule = (path: string, options?: ILazyOptions) => {
  // If there is options
  if (options) {
    // If there is isPage and delay
    if (options.isPage && options.delay) {
      return lazy(() => Promise.all([
        import(`pages/${path}`),
        new Promise(resolve => setTimeout(resolve, options.delay)),
      ]).then(([moduleExports]) => moduleExports));
    } else if (options.isPage && !options.delay) {
      // If there is isPage only
      lazy(() => import(`pages/${path}`));
    } else if (!options.isPage && options.delay) {
      // If there is delay only
      return lazy(() => Promise.all([
        import(`components/${path}`),
        new Promise(resolve => setTimeout(resolve, options.delay)),
      ]).then(([moduleExports]) => moduleExports));
    } else if (!options.isPage && !options.delay) {
      // If there are no options
      return lazy(() => import(`components/${path}`));
    }
  }

  // Default
  return lazy(() => import(`components/${path}`));
};
