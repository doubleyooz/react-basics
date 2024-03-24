import { SignUp } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className='flex h-screen justify-center items-center bg-secondary-default'>
      <SignUp />;
    </div>
  );
};

export default Page;
