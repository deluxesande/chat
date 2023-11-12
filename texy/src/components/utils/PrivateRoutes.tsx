import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../store/app";

const PrivateRoutes = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    // Check if their is a user logged in
    return user.accessToken ? <Outlet /> : <Navigate to="/register" />;
};

export default PrivateRoutes;
