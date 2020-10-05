import React from 'react';

import { render } from '../../test-utils';

// Component
import { WelcomePage } from '../../Views/Welcome';

describe('Welcome View', () => {

  const { getByText } = render(<WelcomePage />);

  test('Should render Correctly', () => {
    const el = getByText('Hello friend, tell me your name...');
    expect(el).toBeInTheDocument();
  });

  test('onClick ready button', () => {
    // const el2 = getByTestId(`letsBtn`);
    // console.log('48 el2 >>> ', el2);
  });
});
