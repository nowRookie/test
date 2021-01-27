import React from 'react';
const Layout = (props: any) => {
  console.log('layouts props===', props);
  return (
    <div className="row">
      <div>layouts:</div>
      <div className="ml10">{props.children}</div>
    </div>
  );
};
export default Layout;
