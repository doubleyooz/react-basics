const Label = ({ type }) => {
    let colour = '',
        text = '';
    switch (type) {
        case 0:
            colour = ' bg-green-500';
            text = 'Trivial';

        case 1:
            colour = ' bg-yellow-500';
            text = 'Average';

        default:
            colour = ' bg-red-600';
            text = 'High';
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

const Card = ({label}) => {
    console.log(label);
    return <div>{label && <Label type={label} />}</div>;
};

export default Card;
