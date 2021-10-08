import {Fragment} from 'react';
import Link from 'next/link';


function NewsPage() {
    return (
        <Fragment>
            <h1>News</h1>
            <ul>
                <li><Link href="/news/1"> first news </Link></li>
                <li><Link href="/news/2"> second news </Link></li>
            </ul>
        </Fragment>
    );
}

export default NewsPage;