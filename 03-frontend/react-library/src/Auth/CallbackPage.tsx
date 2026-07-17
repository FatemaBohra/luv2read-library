import { useAuth0 } from "@auth0/auth0-react";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";

const CallbackPage = () => {
    const { error } = useAuth0();

    if (error) {
        return (
            <div className="container mt-5 text-center">
                <h2>Sign In Failed</h2>
                <p className="text-danger mt-3">{error.message}</p>
                <a href="/home" className="btn btn-primary mt-3">Return to Home</a>
            </div>
        );
    }

    return <SpinnerLoading />;
};

export default CallbackPage;
