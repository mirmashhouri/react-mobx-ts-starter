
import {
  LazyStoreRegistry,
} from 'stores';

/**
 * Env agnostic stores can be re-used in any environment
 */
export declare interface IEnvAgnosticCoreStores {
  lazyStoreRegistry: LazyStoreRegistry
}

/**
 * Stores whose implementation cannot be shared
 */
declare interface IEnvSpecificCoreStores {
}


/**
 * CoreStore adds onto IEnvAgnosticStores, extending it with stores that must have a specific implementation for their environment
 */
export declare interface ICoreStore
  extends IEnvAgnosticCoreStores, IEnvSpecificCoreStores {}