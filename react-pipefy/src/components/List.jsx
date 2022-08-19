import { useState } from 'react';
import Card from './Card';
import Popup from './NewCard';

import { ReactComponent as Add } from '../assets/add.svg';

const List = ({ title, description, colour, label }) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="w-fit ml-6 rounded-sm">
            <Popup trigger={showPopup} setTrigger={setShowPopup} />
            <header
                className="flex justify-between items-center p-2 mb-2 min-h-11 border-t-2 bg-white rounded"
                style={{ borderColor: colour }}
            >
                <div className="flex gap-3 items-center">
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
                    onClick={() => setShowPopup(!showPopup)}
                >
                    <Add />
                </button>
            </header>
            <div className="pt-3" style={{ backgroundColor: '#f2f2f2' }}>
                <div className="justify-center px-3 pb-3 h-96 overflow-auto scrollbar-hide">
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
        </div>
    );
};

export default List;
