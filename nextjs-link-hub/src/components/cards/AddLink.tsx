import { useForm } from "react-hook-form";
import Card from "../Card";
import TextField from "../TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { addLinkSchema, AddLinkSchema } from "@/utils/rules";

const AddLink = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<AddLinkSchema>({
        resolver: zodResolver(addLinkSchema),
    });

    const onSubmit = async (email: string, password: string) => {
        try {
            await handleSignIn(email, password);
            router.navigate("/");
        } catch (err: any) {
            console.log({ err });
            console.log({ err: err.response.data.message });
        }
    };

    return (
        <Card title="Add New Link" contentBody={
            <div className="flex flex-col gap-1">
                <TextField title="URL" register={{}} error={{}} required />
                <TextField title="Title" register={{}} error={{}} required />
                <TextField title="Category" register={{}} error={{}} required />
                <TextField title="Description" register={{}} error={{}} required multiline />
            </div>
        } />
    );
}

export default AddLink;

