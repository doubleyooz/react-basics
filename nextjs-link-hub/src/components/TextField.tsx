export type TextFieldProps = {
    title: string;
    register: object;
    error: object;
}
const TextField: React.FC<TextFieldProps> = ({ title, register, error }) => {
    return (
        <div className="flex flex-col-reverse w-60 bg-white ">
            <input
                className="w-full px-4 py-3 text-base rounded-xl border-2 border-gray-300 transition-all duration-300 ease-in-out peer focus:border-[#667eea] focus:outline-none focus:ring-0 focus:shadow-lg"
                type="text"
                {...register}
                required={true}

            />
            <span
                className={`${error
                    ? 'text-red-500'
                    : 'text-black peer-focus:text-blue-400 peer-valid:text-blue-400'
                    }  left-0 p-2 text-xs duration-500 pointer-events-none
                           
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

export default TextField;