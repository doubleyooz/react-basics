import Card from './Card';
const List = ({ title, colour, label }) => {
    return (
        <div>
            <header
                className="flex justify-between items-center p-2 border-t-2 w-52 bg-white rounded"
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
                        class="bi bi-plus"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                </button>
            </header>
            <div className="flex flex-col gap-3">
                <Card></Card>
                <Card label={2}></Card>
            </div>
        </div>
    );
};

export default List;
