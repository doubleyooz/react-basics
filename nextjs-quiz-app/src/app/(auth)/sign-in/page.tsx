import { SignIn } from '@clerk/nextjs';
const Page = () => {
     return (
          <div className='flex h-screen justify-center items-center bg-secondary'>
               <SignIn />;
          </div>
     );
};

export default Page;
