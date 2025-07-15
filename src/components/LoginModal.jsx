import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUserStore } from "../stores/userStore";
import { loginSchema } from "../utils/validators";
import { useEffect } from "react";

function LoginModal({ resetForm }) {
    const { handleSubmit, register, formState: { isSubmitting, errors }, reset } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const login = useUserStore(state => state.login);

    useEffect(() => {
        reset();
    }, [resetForm])

    const onSubmit = async ({ username, password }) => {
        try {
            // await new Promise((resolve) => setTimeout(resolve, 2000));
            const resp = await login(username, password);
            console.log(resp);
            toast.success(resp.data?.message);
            document.getElementById('lobby_modal').close();

        } catch (error) {
            const errMsg = error.response?.data?.error || error.message
            toast.error(errMsg);
            console.error(errMsg);
        }
    }

    const hdlClose = () => {
        document.getElementById('lobby_modal').close();
        reset();
    }


    return (
        <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isSubmitting} className="fieldset">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">Username</label>
                <input type="email" className="input w-full  bg-gray-800 text-white" placeholder="Email" {...register('username')} />

                <label className="label">Password</label>
                <input type="password" className="input w-full bg-gray-800 text-white" placeholder="Password" {...register('password')} />

            </fieldset>
            <div className="modal-action">
                <div className="flex w-full gap-2">
                    <button type="button" onClick={hdlClose} className="btn text-white grow-2 bg-gray-800 border-gray-800 shadow shadow-gray-900 hover:bg-gray-700">CLOSE</button>
                    {!isSubmitting && <button type="submit" className="btn text-white grow-8 bg-noirRed-600 border-noirRed-600 shadow shadow-noirRed-600 hover:bg-noirRed-700">SUBMIT</button>}
                    {isSubmitting &&
                        <button disabled={isSubmitting} className="relative btn text-white grow-8 bg-noirRed-600 border-noirRed-600 shadow shadow-noirRed-600 hover:bg-noirRed-700">LOGIN
                            <span className="loading loading-spinner absolute right-2/6 text-noirRed-600"></span>
                        </button>
                    }
                </div>
            </div>
        </form>
    )
}

export default LoginModal