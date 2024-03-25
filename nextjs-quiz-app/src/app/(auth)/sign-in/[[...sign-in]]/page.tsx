import { SignIn } from '@clerk/nextjs';
const Page = () => {
  return (
    <div className='flex h-screen justify-center items-center bg-secondary-50'>
      <SignIn />;
    </div>
  );
};

export default Page;
