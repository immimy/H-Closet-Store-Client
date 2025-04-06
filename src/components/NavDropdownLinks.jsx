import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavDropdownLinks = ({ links }) => {
  const { user } = useSelector((store) => store.user);
  const displayWhenLoginRoutes = ['/orders'];

  return (
    <>
      {links.map((link) => {
        const { id, name, path, subLinks } = link;

        // Display only when user already log in
        if (!user && displayWhenLoginRoutes.includes(path)) return;

        // WITH SUB LINKS
        if (subLinks) {
          return (
            <li key={id}>
              <Link to={path}>{name}</Link>
              <ul className='font-normal p-2'>
                {subLinks.map((link) => {
                  const { id, name, path } = link;
                  return (
                    <li key={id}>
                      <Link to={path}>{name}</Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        }

        // NO SUB LINKS
        if (name === 'promotion') {
          return (
            <li key={id}>
              <div className='indicator'>
                <span className='indicator-item badge badge-sm badge-warning'>
                  sale!
                </span>
                <Link to={path}>{name}</Link>
              </div>
            </li>
          );
        }

        return (
          <li key={id}>
            <Link to={path}>{name}</Link>
          </li>
        );
      })}
    </>
  );
};
export default NavDropdownLinks;
