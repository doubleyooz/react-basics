import Card from './Card';
const Header = ({ title, colour }) => {
    return (
        <header
            className="flex justify-between items-center p-2 mb-2 min-h-11 border-t-2 bg-white rounded"
            style={{ borderColor: colour }}
        >
            <div className="flex gap-3 items-center ">
                <span
                    className="font-semibold text-base"
                    style={{ color: colour }}
                >
                    {title}
                </span>
                <span
                    className="text-sm font-normal"
                    style={{ color: '#48626f' }}
                >
                    (1)
                </span>
            </div>
            <button
                className="rounded-full"
                style={{ backgroundColor: colour }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    className="bi bi-plus"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </button>
        </header>
    );
};

const List = ({ title, description, colour, label }) => {
    return (
        <div
            className="w-fit ml-6 rounded-sm"
            style={{ backgroundColor: '#f2f2f2' }}
        >
            <Header title={title} colour={colour}/>
            <div className="justify-center p-3 h-96 overflow-auto scrollbar-hide">
                <Card title="Unstable internet connection"></Card>
                <Card
                    title="My telephone is not working properly"
                    label={2}
                ></Card>
                <Card title="Unstable internet connection"></Card>
                <Card
                    title="My telephone is not working properly"
                    label={1}
                ></Card>
                <div className="text-xs text-center font-medium text-gray-400">
                    {description}
                </div>
            </div>
        </div>
    );
};

export default List;
