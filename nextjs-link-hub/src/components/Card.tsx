
export type CardProps = {
    title: string;
    contentBody: React.ReactNode;
};



const Card = ({ title, contentBody: Component }: CardProps) => {
    return (
        <div className="opacity-95 bg-white rounded-2xl p-5 text-center shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-white border-opacity-20">

            <div className="text-2xl mb-5 text-gray-700 flex items-center gap-[10px]">{title}</div>
            <div className="mt-2">{Component}</div>
        </div>
    );
};

export default Card;
