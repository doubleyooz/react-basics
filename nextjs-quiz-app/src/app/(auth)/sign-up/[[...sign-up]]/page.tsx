import { SignUp } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className='flex h-screen justify-center items-center bg-secondary-50'>
      <SignUp />;
    </div>
  );
};

export default Page;
