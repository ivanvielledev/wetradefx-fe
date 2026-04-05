// _root
import RootLayout from "../../layouts/_root/RootLayout";

// _public
import PublicLayout from "../../layouts/_public/PublicLayout";
import LoginPage from "../../pages/_public/login/LoginPage";
import RegisterPage from "../../pages/_public/register/RegisterPage";
import TermsOfServicePage from "../../pages/_public/termsOfService/TermsOfServicePage";
import PrivacyPolicyPage from "../../pages/_public/privacyPolicy/PrivacyPolicyPage";
import ForgotPasswordPage from "../../pages/_public/forgotPassword/ForgotPasswordPage";

// _protected
import ProtectedLayout from "../../layouts/_protected/ProtectedLayout";

// dashboard
import DashboardHomePage from "../../pages/_protected/dashboard/DashboardHomePage";

// signals
import SignalsHomePage from "../../pages/_protected/signals/SignalsHomePage";

// copy trades
import CopyTradesHomePage from "../../pages/_protected/copyTrades/CopyTradesHomePage";

// mt5
import MT5Page from "../../pages/_protected/dashboard/mt5/MT5Page";

// members
import MembersHomePage from "../../pages/_protected/members/MembersHomePage";

// profile
import ProfilePage from "../../pages/_protected/profile/ProfilePage";
import UpdateProfilePage from "../../pages/_protected/profile/UpdateProfilePage";

// about
import AboutPage from "../../pages/_protected/about/AboutPage";

const routes = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            // public
            {
                element: <PublicLayout />,
                children: [
                    {
                        index: true,
                        element: <LoginPage />,
                    },
                    {
                        path: "register",
                        element: <RegisterPage />,
                    },
                    {
                        path: "terms-of-service",
                        element: <TermsOfServicePage />,
                    },
                    {
                        path: "privacy-policy",
                        element: <PrivacyPolicyPage />,
                    },
                    {
                        path: "forgot-password",
                        element: <ForgotPasswordPage />,
                    },
                ],
            },
            // protected
            {
                element: <ProtectedLayout />,
                children: [
                    // dashboard
                    {
                        path: "d",
                        children: [
                            {
                                index: true,
                                element: <DashboardHomePage />,
                            },
                            {
                                path: "signals",
                                element: <SignalsHomePage />,
                            },
                            {
                                path: "copy-trades",
                                element: <CopyTradesHomePage />,
                            },
                            {
                                path: "mt5",
                                element: <MT5Page />,
                            },
                            {
                                path: "members",
                                element: <MembersHomePage />,
                            },
                            {
                                path: "about",
                                element: <AboutPage />,
                            },
                        ],
                    },
                    // user
                    {
                        path: "u",
                        children: [
                            {
                                path: ":userId",
                                element: <ProfilePage />,
                            },
                            {
                                path: ":userId/update",
                                element: <UpdateProfilePage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export default routes;
