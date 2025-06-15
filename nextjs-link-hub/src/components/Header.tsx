export type HeadProps = {
    title: string;
    content: string;
};


const Header = ({ title, content }: HeadProps) => {
    return (
        <header className="">
            <div className="text-center mb-10 text-white">
                <h1 className="text-5xl font-bold text-white">{title}</h1>
                <p className="text-lg opacity-90">{content}</p>
            </div>
        </header>
    );
};

export default Header;
