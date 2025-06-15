import Card, { CardProps } from "@/components/Card";
import Header from "@/components/Header";


const mockData: CardProps[] = [
  { title: "Total Links", content: "250" },
  { title: "Articles", content: "100" },
  { title: "Categories", content: "50" },
  { title: "Videos", content: "30" },
]

export default function Home() {



  return (

    <main className="font-sans min-h-screen text-[#333] bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)]">
      <Header title="LinkVault" content="Save, organize, and categorize your favorite articles and videos" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mb-7">
        {
          mockData.map((item, index) => (
            <Card key={index} title={item.title} content={item.content} />
          ))
        }
      </div>

    </main>

  );
}
