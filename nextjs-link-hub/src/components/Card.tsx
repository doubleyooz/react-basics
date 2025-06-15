
export type CardProps = {
    title: string;
    content: string;
};



const Card = ({ title, content }: CardProps) => {
    return (
        <div className="opacity-95 bg-white rounded-2xl p-5 text-center shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-white border-opacity-20">
            <div className="text-3xl font-bold text-[#667eea] mb-1" id="totalLinks">{content}</div>
            <div className="text-gray-600 text-sm uppercase font-medium">{title}</div>
        </div>
    );
};

export default Card;
