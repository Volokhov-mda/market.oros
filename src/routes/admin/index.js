import { useAtom } from "jotai";
import { route } from "preact-router";

import { userAtom } from "../../data/atoms";

import Header from "../../components/Header/Header";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";

const Clients = () => {
    const [currentUser] = useAtom(userAtom);

    if (currentUser && !currentUser.isAdmin) {
        return route("/", true);
    }

    return (
        <>
            <Header />

            <PageWrapper title="Admin">
                <AdminDashboard />
            </PageWrapper>
        </>
    );
};

export default Clients;
