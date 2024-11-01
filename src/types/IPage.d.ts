import type { FC } from 'react';

export type IPage<T extends {}> = FC<{} & T>;
