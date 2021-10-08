import {MongoClient} from 'mongodb';
import { useRouter } from 'next/dist/client/router';


async function handler(req, res){
    if(req.method === 'POST'){
        
        const data = req.body;
        const db_url = 'mongodb://root:root@cluster0-shard-00-00.nvaww.mongodb.net:27017,cluster0-shard-00-01.nvaww.mongodb.net:27017,cluster0-shard-00-02.nvaww.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-dn6pvl-shard-0&authSource=admin&retryWrites=true&w=majority';
        const client = await MongoClient.connect(db_url);
        const db = client.db();

        const meetup_collections = db.collection('meetups');
        const result = await meetup_collections.insertOne(data);

        console.log('result in new meetup api: ', result);

        client.close();

        res.status(201).json({message:"Meetup inserted."});
    }
    // res.status(200).json({
    //     id:req.body.id,
    //     title:'second meet title',
    //     url:'https://i.picsum.photos/id/1012/3973/2639.jpg?hmac=s2eybz51lnKy2ZHkE2wsgc6S81fVD1W2NKYOSh8bzDc',
    //     address:'karachi pakistan',
    //     description:'this is firts meetup in lahore'
    // });
}

export default handler;