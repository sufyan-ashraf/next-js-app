import {useRouter} from 'next/router';

function NewsDetailsPage() {
    const router = useRouter();
    const id = router.query.id;

    return <h1>News Details</h1>
}

export default NewsDetailsPage;