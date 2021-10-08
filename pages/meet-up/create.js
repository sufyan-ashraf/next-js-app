import NewMeetUpForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';

function NewMeetUp() {

    const router = useRouter();

    async function addMeetUpHandler(data) {
        
        const response = await fetch('/api/new-meetup', {
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        });

        const response_data = await response.json();

        console.log(response_data);

        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>Create React meetups</title>
                <meta name="description" content="Create Meetups app meta desc"/>
                <meta name="title" content="Create Meetups app meta title"/>
            </Head>
            <NewMeetUpForm onAddMeetup={addMeetUpHandler}/>
        </Fragment>
    );
}

export default NewMeetUp;