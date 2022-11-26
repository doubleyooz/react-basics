const Field: React.FC<{
    title: string;
    register: object;
    error: any;
}> = ({ title, register, error }) => {
    return (
        <div className="relative w-60 bg-white ">
            <input
                className="w-full p-2 text-xs outline-none border peer"
                type="text"
                {...register}
                required={true}
            />
            <span
                className={`${
                    error
                        ? 'text-red-500'
                        : 'text-black peer-focus:text-blue-400 peer-valid:text-blue-400'
                } absolute left-0 p-2 text-xs duration-500 pointer-events-none
                           
                             peer-focus:translate-x-3
                             peer-focus:bg-blue-200
                             peer-focus:-translate-y-3
                             peer-focus:text-sm
                             peer-focus:px-2
                             peer-focus:py-0
                           
                             peer-valid:translate-x-1
                             peer-valid:bg-blue-200
                             peer-valid:-translate-y-3
                             peer-valid:text-sm
                             peer-valid:px-2
                             peer-valid:py-0`}
            >
                {error ? error.message : title}
            </span>
        </div>
    );
};

export default Field;
