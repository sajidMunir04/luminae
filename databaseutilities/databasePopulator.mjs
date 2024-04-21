import { MongoClient } from "mongodb";
import { Product } from "../src/model/productModel.mjs";
import fs from 'fs';
import csvParser from 'csv-parser';

async function handler() {
    const client = new 
    MongoClient('mongodb+srv://sajidmunir4428:AwGi4hV0pyBQHSjs@luminae.hyuwgh2.mongodb.net/?retryWrites=true&w=majority&appName=Luminae');
    try {
        await client.connect();
        const db = client.db('Products');
        const collection = db.collection('products');
        console.log('Client Connected');
        let data = [];
        // Read the CSV file
        fs.createReadStream('databaseutilities\\store_mango.csv')
        .pipe(csvParser())
        .on('start', () => {
            console.log('started parsing');
            return ;
        })
        .on('data', (item) => {         
            const article = new Product({
                name: item.name,
                description: item.description,
                price: item.price,
                images: item.images,
                discount: Math.random() * 50,
                inventoryCount: 50,
                brandName: item.brand,
                category: item.category,
                section: item.section
            });
            data.push(article);
            console.log(item,typeof(item.images));
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            //putTheData();
        });

        const putTheData = async() => {
            const result = await collection.insertMany(data);
            console.log(result);
            await client.close();
        }
        
    } catch (err) {
        console.error(err);
    } finally {
        //await client.close();
    }
}

handler();