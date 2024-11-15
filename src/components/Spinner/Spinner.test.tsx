/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';

import { CoreStoreProvider } from 'stores';
import { globalStoreMock } from 'utils/Mocks';
require('utils/Mocks/HooksMocks');
require('utils/Mocks/navigation');
require('utils/Mocks/TranslationMocks');
import { Spinner } from './';

jest.mock('app/App', () => ({
  useAppContext: () => ({
    store: globalStoreMock,
  }),
}));

describe('Spinner component', () => {
  const imageElement = 'img';
  const altAttribute = 'alt';
  const altText = 'React-MobX-Starter';
  const spinnerClassName = 'spinner-border';

  const Component = (
    <CoreStoreProvider.Provider value={ globalStoreMock.coreStore }>
      <Spinner />
    </CoreStoreProvider.Provider>
  );

  it('Render the Image', () => {
    const renderer = render(Component);

    //Expect to render alt attribute
    expect(
      renderer.container.getElementsByTagName(imageElement)[0],
    ).toHaveAttribute(altAttribute, altText);
  });

  it('Render Spinner', () => {
    //Expect to render spinner
    expect(
      render(Component).container.getElementsByClassName(spinnerClassName),
    ).toHaveLength(1);
  });

  it('Render to match snapshot', () => {
    //Expect to match snapshot
    expect(
      render(Component).container,
    ).toMatchSnapshot();
  });
});