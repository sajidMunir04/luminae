import { MongoClient } from "mongodb";
import { Product } from "../src/model/productModel.mjs";
import fs from 'fs';
import csvParser from 'csv-parser';
import { colors, model, productSizes, styles } from "./producttypes.mjs";

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
        fs.createReadStream('databaseutilities\\womens.csv')
        .pipe(csvParser())
        .on('start', () => {
            console.log('started parsing');
            return ;
        })
        .on('data', (item) => {
            /*  
            item.images = item.images.substring(2, item.images.length - 1).split(','); 
            item.images = item.images.map((element,index) => {
                if (index === 0)
                    return element.substring(0,element.length - 1)
                else if (index === element.length - 1)
                    return element;
                else 
                    return element.substring(2,element.length - 1)
            });
            */
            const article = new Product({
                name: item.name,
                description: item.description,
                price: item.price,
                images: item.images,
                discount: Math.random() * 50,
                inventoryCount: 50,
                brandName: item.brand,
                category: item.terms,
                section: item.section,
                sizes: productSizes,
                color: colors[Math.floor((Math.random()) * colors.length - 1)],
                style: styles[Math.floor((Math.random()) * styles.length - 1)],
                model: model[Math.floor((Math.random()) * model.length - 1)]
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
