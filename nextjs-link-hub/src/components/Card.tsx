import Button from "./Button";

export type CardProps = {
    title: string;
    contentBody: React.ReactNode;
    hideFooter?: boolean;
};



const Card = ({ title, contentBody: Component, hideFooter = false }: CardProps) => {
    return (
        <div className="opacity-95 bg-white max-w-sm rounded-2xl p-5 text-center shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-white border-opacity-20">

            <div className="text-2xl mb-5 text-gray-700 flex items-center gap-[10px]">{title}</div>
            <div className="mt-2">{Component}</div>
            {
                !hideFooter &&
                <div className="flex justify-end items-center mt-5 gap-2">
                    <Button variant="outline">Submit</Button>
                    <Button variant="secondary">Cancel</Button>
                </div>
            }

        </div>
    );
};

export default Card;
