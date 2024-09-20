import { Provider, ErrorBoundary } from '@rollbar/react';

const RollBarProvider = ({ children }) => {
  const rollbarConfig = {
    accessToken: 'd8fce038bffd45a9bbd2b80897b3b32d',
    environment: 'prodaction',
  };

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Provider>
  );
};

export default RollBarProvider;
