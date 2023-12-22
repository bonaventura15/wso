import PropTypes from 'prop-types';

export const Layout = (props) => {
  const { children } = props;

  return (
    <main>
      {children}
    </main>
  );
};


Layout.prototypes = {
  children: PropTypes.node
};