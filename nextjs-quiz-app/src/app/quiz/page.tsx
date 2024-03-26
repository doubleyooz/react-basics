import Quiz from '@/components/Quiz';

import { client } from '../../../sanity/lib/client';
import { fetchUsers } from '../(auth)/actions/fetchUsers';

export const dynamic = 'force-dynamic';

async function getData() {
  const query = `*[_type == "question"] {
    question, answers, correctAnswer
  }`;

  return await client.fetch(query);
}

const page = async () => {
  const questions = await getData();
  const user = await fetchUsers();
  const userId = user?.data.user.id;
  return (
    <>
      <Quiz questions={questions} userId={userId} />
    </>
  );
};

export default page;
