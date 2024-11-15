// eslint-disable-next-line import/no-extraneous-dependencies
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { GlobalStore, LanguageStore } from 'stores';
import i18n from 'utils/Common/i18n';

require('utils/Mocks/navigation');

describe('LanguageStore', () => {
  const langMock = 'en';

  const globalStore = new GlobalStore();
  const store = new LanguageStore(globalStore.coreStore);

  it('Changes language', () => {
    // Change language to bg and expect both store and i18n to be set to bg language
    act(() => store.changeLanguage(langMock));
    expect(store.language).toBe(langMock);
    waitFor(() => {
      expect(i18n.language).toBe(langMock);
    }, { timeout: 3000 });
  });
});