const Label = ({ type }) => {
    let colour = '',
        text = '';
    
    switch (type) {
        case 0:
            colour = ' bg-green-500';
            text = 'Trivial';
            break;

        case 1:
            colour = ' bg-yellow-500';
            text = 'Average';
            break;
        default:
            colour = ' bg-red-600';
            text = 'High';
            break;
    }
    
    return (
        <div
            className={
                'flex py-1 px-1.5 mr-1 items-center h-4 w-fit rounded-md' +
                colour
            }
            style={{ fontSize: '10px' }}
        >
            <span className="font-semibold text-white">{text}</span>
        </div>
    );
};

const Property = ({ title, description, marker}) => {
    console.log(marker)
    return (
        <div className="flex gap-2">
            <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                data-src="https://pipestyle.staticpipefy.com/icons/interface/drop-down-sm.svg"
            >
                <path d="M10.65 6.65c.09-.1.22-.15.35-.15.13 0 .26.05.35.15.1.09.15.22.15.35 0 .13-.05.26-.15.35l-3 3a.47.47 0 0 1-.35.15.47.47 0 0 1-.35-.15l-3-3A.47.47 0 0 1 4.5 7c0-.13.05-.26.15-.35.09-.1.22-.15.35-.15.13 0 .26.05.35.15l2.3 2.29.35.35.35-.35 2.3-2.29Z"></path>
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 1h8c1.65 0 3 1.35 3 3v8c0 1.65-1.35 3-3 3H4c-1.65 0-3-1.35-3-3V4c0-1.65 1.35-3 3-3Zm8 13c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8Z"
                ></path>
            </svg>
            <div className="flex flex-col py-0.5">
                <span
                    className="font-semibold text-gray-600"
                    style={{ fontSize: '10px' }}
                >
                    {title.toUpperCase()}
                </span>
                <span className={`font-normal text-sm text-gray-600 ${marker ? "bg-gray-200 px-1" : ""}`}>
                    {description}
                </span>
            </div>
        </div>
    );
};

const Card = ({ label, title, type, requester }) => {
    return (
        <div className="p-3 pl-2 bg-white">
            {label && <Label type={label} />}
            <span className="font-bold text-sm mr-5">{title}</span>
            <div className="flex flex-col gap-2 mt-2">
                <Property
                    title="type"
                    description="Internet Connection Issue"
                    marker="d"
                />
                <Property title="Requester info" description="Lala Lambeth" />
            </div>
        </div>
    );
};

export default Card;
