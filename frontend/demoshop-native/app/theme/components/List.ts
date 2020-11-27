// @flow

import variable from '../variables/platform';

export default (variables /* : * */ = variable) => {
  const ListTheme = {
    marginVertical: variables.getSize(1),
  };

  return ListTheme;
};
