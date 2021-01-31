import Navbar from './navbar';

const Layout = ({ children, session, seo }) => (
  <>
    <Navbar session={session} />
    {children}
  </>
);

export default Layout;
