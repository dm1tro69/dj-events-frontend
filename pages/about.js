import Link from "next/link";
import Layout from "../components/Layout";

const AboutPage = () => {
    return (
        <Layout title={'About DJ Events'}>
            <h1>About Page</h1>
            <p>This is an app to find the latest DJ and other musical events</p>
            <p>Version: 1.0.0</p>
            <Link href={'/'}>Home</Link>
        </Layout>
    );
};

export default AboutPage;
