import Link from 'next/link';
import { useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';

interface LinkProps {
  name: string;
  path: string;
}

const links: LinkProps[] = [
  { name: 'Stats', path: '/stats' },
  { name: 'Leaderboards', path: '/leaderboards' },
];

const UserMenuLink: React.FC<{
  link: LinkProps;
  setOpenUserMenu: (open: boolean) => void;
}> = ({ link, setOpenUserMenu }) => {
  return (
    <Link href={link.path} onClick={() => setOpenUserMenu(false)}>
      <li className='p-3 rounded-md bg-primary-600 hover:bg-primary-700'>
        {link.name}
      </li>
    </Link>
  );
};

const UserMenu = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const useMenuHandler = () => {
    setOpenUserMenu(!openUserMenu);
  };

  return (
    <div
      className='text-xl mt-1 cursor-pointer p-2'
      onMouseEnter={() => setOpenUserMenu(true)}
      onMouseLeave={() => setOpenUserMenu(false)}
    >
      <div className='relative'>
        <CgMenuGridO />
        {openUserMenu && (
          <ul className='absolute bg-primary-600 z-[99] top-7 sm:left-[-60px] left-[-80px] text-white rounded-md text-center'>
            {links.map((link, index) => (
              <UserMenuLink
                link={link}
                key={index}
                setOpenUserMenu={setOpenUserMenu}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
