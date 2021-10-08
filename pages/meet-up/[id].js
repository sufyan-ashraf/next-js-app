import MeetupDetails from '../../components/meetups/MeetupDetails';
import {MongoClient, ObjectId} from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

function meetupDetails(props) {
    return(
        <Fragment>
            <Head>
                <title>Meetup details</title>
                <meta name="description" content={props.meetup_detail.description}/>
                <meta name="title" content={props.meetup_detail.title}/>
            </Head>
            <MeetupDetails {...props.meetup_detail} />
        </Fragment>
    );
}

export async function getStaticPaths(){

    const db_url = 'mongodb://root:root@cluster0-shard-00-00.nvaww.mongodb.net:27017,cluster0-shard-00-01.nvaww.mongodb.net:27017,cluster0-shard-00-02.nvaww.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-dn6pvl-shard-0&authSource=admin&retryWrites=true&w=majority';
    const client = await MongoClient.connect(db_url);
    const db = client.db();

    const meetup_collections = db.collection('meetups');
    const result = await meetup_collections.find({},{_id:1}).toArray();

    client.close();

    return {
        fallback:'blocking',
        // fallback:false,
        paths: result.map(meetup=>({params: {id:meetup._id.toString()}}))        
    }
}

export async function getStaticProps(context){
    //get data for a single meetup
    const id = context.params.id

    const db_url = 'mongodb://root:root@cluster0-shard-00-00.nvaww.mongodb.net:27017,cluster0-shard-00-01.nvaww.mongodb.net:27017,cluster0-shard-00-02.nvaww.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-dn6pvl-shard-0&authSource=admin&retryWrites=true&w=majority';
    const client = await MongoClient.connect(db_url);
    const db = client.db();

    const meetup_collections = db.collection('meetups');
    const result = await meetup_collections.findOne({_id:ObjectId(id)});

    client.close();

    console.log(id);
    return {
        props:{
            meetup_detail:{
                title:result.title,
                image:result.image,
                address:result.address,
                description:result.description,
                id:result._id.toString()
            }
        }
    }
}

export default meetupDetails;