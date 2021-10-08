import MeetUpList from '../components/meetups/MeetupList'; 
import {userState, useEffect, useState, Fragment} from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

const DUMMY_MEETUPS = [
    {
        id:'id1',
        title:'first meet title',
        image:'https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk',
        address:'lahore pakistan',
        description:'this is firts meetup in lahore'
    },
    {
        id:'id2',
        title:'second meet title',
        image:'https://i.picsum.photos/id/1012/3973/2639.jpg?hmac=s2eybz51lnKy2ZHkE2wsgc6S81fVD1W2NKYOSh8bzDc',
        address:'karachi pakistan',
        description:'this is firts meetup in lahore'
    }
];

function HomePage(props) {

    // const [loadedMeetups, setLoadedMeetups] = useState([]);

    // useEffect(()=>{
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // });

    // return  <MeetUpList meetups={loadedMeetups}/>;

    //PRE RENDRING
    return(
        <Fragment>
            <Head>
                <title>React meetups</title>
                <meta name="description" content="Meetups app meta desc"/>
                <meta name="title" content="Meetups app meta title"/>
            </Head>
            <MeetUpList meetups={props.meetups}/>;
        </Fragment>
    );
}

//SERVER SIDE RENDRING
// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
//     return{
//         props:{
//             meetups:DUMMY_MEETUPS
//         }
//     }
// }

//PRE RENDRING
export async function getStaticProps(){

    const db_url = 'mongodb://root:root@cluster0-shard-00-00.nvaww.mongodb.net:27017,cluster0-shard-00-01.nvaww.mongodb.net:27017,cluster0-shard-00-02.nvaww.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-dn6pvl-shard-0&authSource=admin&retryWrites=true&w=majority';
    const client = await MongoClient.connect(db_url);
    const db = client.db();

    const meetup_collections = db.collection('meetups');
    const result = await meetup_collections.find().toArray();

    client.close();

    return{
        props:{
            meetups:result.map(meetup=>({
                title:meetup.title,
                image:meetup.image,
                address:meetup.address,
                description:meetup.description,
                id:meetup._id.toString()
            }))
        },
        revalidate:1
    }
}

export default HomePage;