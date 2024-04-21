'use client';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { MdQuiz } from 'react-icons/md';
import UserMenu from './UserMenu';

const Navbar: React.FC = () => {
  return (
    <div className='pt-5 w-100'>
      <div className='max-w-[1500px] mx-auto w-[90%] flex justify-between items-center border-b pb-5'>
        <div>
          <Link href={'/'} className='flex gap-1 items-center text-2xl'>
            <h1 className='text-dark-950 font-bold'>CodeQuiz</h1>
            <MdQuiz className='text-primary-600' />
          </Link>
        </div>
        <div className='md:block hidden text-nowrap'>
          <span className='bg-primary-600 px-5 py-1 rounded-md text-white'>
            Today's Category: Javascript
          </span>
        </div>
        <div className='flex items-center gap-3 justify-end'>
          <UserMenu /> <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
