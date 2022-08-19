import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ReactComponent as Close } from '../assets/close.svg';
import { ReactComponent as Dots } from '../assets/dots.svg';
import { ReactComponent as Edit } from '../assets/edit.svg';
import { ReactComponent as Share } from '../assets/share.svg';
import { ReactComponent as Ticket } from '../assets/ticket.svg';

const Select = ({ options }) => {
    return (
        <select
            className="h-10 w-full rounded px-4 items-center cursor-pointer appearance-none text-xs border-none bg-gray-200 hover:bg-white"
            type="text"
            name="type"
            placeholder="Select an option"
        >
            {options.map((item) => (
                <option value={item}>{item}</option>
            ))}
        </select>
    );
};

const FormButton = ({ Icon, text, setTrigger, trigger }) => {
    return (
        <div>
            <div
                className="flex items-center px-4 py-2 gap-2"
                onClick={() => (setTrigger ? setTrigger(trigger) : {})}
            >
                {Icon}
                {text ? text : ''}
            </div>
        </div>
    );
};

const NewCard = ({ trigger, setTrigger }) => {
    const schema = yup.object().shape({
        requester: yup.string().required(),
        title: yup.string().required(),
        type: yup.string().required(),
        details: yup.string().min(5),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        console.log(data);
    };

    const typeOptions = [
        'User login (add / remove)',
        'Internet Connection issue',
        'Telecom Issue',
        'Software installation',
        'Equipment installation',
        'Equipment maintenance',
        'Software maintenance',
        'Reports',
        'Others',
    ];

    return trigger ? (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-10 m-auto">
            <div className="bg-white rounded-xl" style={{ width: '536px' }}>
                <header className="flex items-center justify-end border-b px-4 pt-3 pb-2">
                    <FormButton Icon={<Share />} text={'Share form'} />
                    <FormButton Icon={<Edit />} text={'Edit'} />

                    <div className="flex items-center">
                        <FormButton Icon={<Dots />} />
                        <FormButton
                            Icon={<Close />}
                            setTrigger={setTrigger}
                            trigger={false}
                        />
                    </div>
                </header>
                <form
                    className="flex flex-col w-full h-96 px-8 pt-8 overflow-auto"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="">
                        <div className="flex mb-6 items-center">
                            <div className="w-10 h-10 text-blue-700 bg-blue-100 mr-4 rounded-md">
                                <Ticket />
                            </div>

                            <span className="font-bold">New ticket</span>
                        </div>
                        <div className="flex flex-col border-t py-6">
                            <label className="pb-2 text-sm">
                                *What is your request?
                            </label>
                            <input
                                className="h-10 w-full rounded px-4 items-center bg-gray-200 border outline-none hover:bg-white hover:border-blue-600"
                                type="text"
                                {...register('title')}
                                placeholder="Type here..."
                            />
                            <p className="text-xs text-red-900">
                                {errors.title?.message}
                            </p>
                        </div>

                        <div className="flex flex-col border-t py-6">
                            <label className="pb-2 text-sm">
                                Requester info
                            </label>
                            <input
                                className="h-10 w-full rounded px-4 items-center bg-gray-200 border outline-none hover:bg-white hover:border-blue-600 "
                                type="text"
                                {...register('requester')}
                                placeholder="Type here..."
                            />
                            <p className="text-xs text-red-900">
                                {errors.requester?.message}
                            </p>
                        </div>

                        <div className="flex flex-col border-t py-6">
                            <label className="pb-2 text-sm">Type</label>
                            <div className="border rounded hover:border-blue-600">
                                <Select options={typeOptions} />
                            </div>
                            <p className="text-xs text-red-900">
                                {errors.type?.message}
                            </p>
                        </div>
                        <div className="flex flex-col border-t py-6">
                            <span className="pb-2 text-xs cursor-pointer underline-offset-2 decoration-gray-600 decoration-dotted hover:text-blue-300">
                                More information
                            </span>
                            <input
                                className="h-10 w-full rounded px-4 items-center  bg-gray-200 border outline-none hover:border-blue-600 hover:bg-white "
                                type="text"
                                name="details"
                                placeholder="Type here..."
                            />
                            <p className="text-xs text-red-900">
                                {errors.details?.message}
                            </p>
                        </div>
                    </div>

                    <input
                        type="submit"
                        className="py-4 mx-8 mb-8 rounded bg-blue-900 hover:bg-blue-400 text-gray-100 text-center"
                    />
                </form>
            </div>
        </div>
    ) : (
        ''
    );
};

export default NewCard;
