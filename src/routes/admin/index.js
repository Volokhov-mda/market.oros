import Header from "../../components/Header/Header";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";

const Clients = () => {
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
