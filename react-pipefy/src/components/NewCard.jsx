import { ReactComponent as Close } from '../assets/close.svg';
import { ReactComponent as Dots } from '../assets/dots.svg';
import { ReactComponent as Edit } from '../assets/edit.svg';
import { ReactComponent as Share } from '../assets/share.svg';

const FormButton = ({ Icon, text, setTrigger, trigger }) => {
    return (
        <div>
            <div
                className="flex items-center px-4 py-2 gap-2"
                onClick={() => (setTrigger ? setTrigger(trigger) : {})}
            >
                {Icon}
                {text}
            </div>
        </div>
    );
};

const NewCard = ({ trigger, setTrigger }) => {
    return trigger ? (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-5 rounded-xl m-auto">
            <div className="bg-white" style={{ width: '536px' }}>
                <header className="flex items-center justify-end border-b px-4 pt-3 pb-2">
                    <FormButton Icon={<Share />} text={'Share form'} />
                    <FormButton Icon={<Edit />} text={'Edit'} />

                    <div className="flex items-center">
                        <FormButton Icon={<Dots />} text={''} />
                        <FormButton
                            Icon={<Close />}
                            text={''}
                            setTrigger={setTrigger}
                            trigger={false}
                        />
                    </div>
                </header>
            </div>
        </div>
    ) : (
        ''
    );
};

export default NewCard;
