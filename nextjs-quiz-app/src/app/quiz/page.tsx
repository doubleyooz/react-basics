import Quiz from '@/components/Quiz';
import { client } from '../../../sanity/lib/client';
import { fetchUsers } from '../(auth)/actions/fetchUsers';
import { shuffleArray } from '@/utils/array';

export const dynamic = 'force-dynamic';

async function getData() {
  const query = `*[_type == "questions"]{
    question,
    answers,
    correctAnswer
  }`;

  const data = await client.fetch(query);

  return data;
}

const page = async () => {
  const questions = await getData();
  shuffleArray(questions);
  const user = await fetchUsers();
  const userId = user?.data?.user?.id;
  return (
    <>
      {userId ? (
        <Quiz questions={questions} userId={userId} />
      ) : (
        <span>No user</span>
      )}
    </>
  );
};

export default page;
