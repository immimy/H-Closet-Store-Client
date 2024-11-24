import { Link } from 'react-router-dom';

const NavLinks = ({ links }) => {
  const handleMouseLeavingProductsMenu = (e) => {
    // select element
    const products = document.getElementById('navProducts');
    const productsMenu = document.getElementById('navProductsMenu');

    // menu position relative to viewport
    const client = productsMenu.getBoundingClientRect();
    const menuCoordinationLeft = client.left;
    const menuCoordinationBottom = client.bottom;
    const menuCoordinationRight = client.right;

    // mouse position relative to viewport
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (
      clientX <= menuCoordinationLeft ||
      clientX >= menuCoordinationRight ||
      clientY >= menuCoordinationBottom
    ) {
      return products.removeAttribute('open');
    }
  };

  return (
    <>
      {links.map((link) => {
        const { id, name, path, subLinks } = link;

        // WITH DROPDOWN
        if (subLinks) {
          return (
            <li key={id}>
              <details id='navProducts'>
                <summary>
                  <Link to={path} className='focus:text-secondary-content'>
                    {name}
                  </Link>
                </summary>
                <ul
                  id='navProductsMenu'
                  className='bg-base-100 rounded-t-none p-4 text-black capitalize font-normal'
                  onMouseLeave={handleMouseLeavingProductsMenu}
                >
                  {subLinks.map((link) => {
                    const { id, name, path } = link;
                    return (
                      <li key={id}>
                        <Link to={path}>{name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          );
        }

        // NO DROPDOWN
        if (name === 'promotion') {
          return (
            <li key={id}>
              <div className='indicator'>
                <span className='indicator-item indicator-start badge badge-sm badge-warning'>
                  sale!
                </span>
                <Link to={path} className='focus:text-secondary-content'>
                  {name}
                </Link>
              </div>
            </li>
          );
        }
        return (
          <li key={id}>
            <Link to={path} className='focus:text-secondary-content'>
              {name}
            </Link>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
