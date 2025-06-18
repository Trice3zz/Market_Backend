import client from "./client.js";
import { createProduct } from "./queries/products.js";
import { createUser } from "./queries/users.js";
import { createReview } from "./queries/reviews.js";
import { createOrder } from "./queries/orders.js";

await client.connect()
await seed()
await client.end()
console.log("Database seeded")

async function seed() {
    await createProduct("Classic Rubber Duck", "The classic rubber ducky", "https://www.shipducky.com/cdn/shop/products/Instagrampost-1a.jpg?v=1660097941&width=1445", 1.99)
    await createProduct("Dapper Duck", "This distinguished little gentleman is dressed for every occasion", "https://cdn11.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/261/10460/Wedding-Set-Rubber-Duck-Ad-Line-3__62602.1634666040.jpg?c=2", 9.99)
    await createProduct("Frankenduck", "Frankenduck is the name of the doctor, not the Duck", "https://www.merchoid.com/media/catalog/product/cache/c596ba1c06493c5e4c894f7b91dd98c9/f/r/frankenstien_s-monster_horror__fetubbz_wb_1.jpg", 2.99)
    await createProduct("Sir Ducklington", "A duck in shining armor, ready to slay the mighty Dragon!", "https://cdn11.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/2000/17791/lilalu-quietscheente-ritter-knight-rubber-duck-HL__68897.1650572464.png?c=2", 8.99)
    await createProduct("Bat Duck", "DUNANANANANANANANANANANA BAT DUUUUCK!", "https://m.media-amazon.com/images/I/91qZMeKOe6L.jpg", 3.99)
    await createProduct("Real Duck", "Literally just a real duck. How'd this get in here?", "https://media.istockphoto.com/id/464988959/photo/mallard-duck-on-white-background.jpg?s=612x612&w=0&k=20&c=S1jcDuyXuoCVUaTobTrZ5f6SlscukkyheqKDHAeflW8=", 0.00)
    await createProduct("Cowboy Duck", "YEEEEE HAAAAW!", "https://cdn.shoplightspeed.com/shops/605879/files/29450535/1024x1024x2/schylling-associates-cowboy-rubber-duck.jpg", 6.99)
    await createProduct("Unicorn Duck", "The most magical of all the ducks", "https://i5.walmartimages.com/asr/5b3d3e5f-933d-45d2-8f86-d25d340457ed.31af46bdc97e8348696137d351018994.jpeg", 7.99)
    await createProduct("Rubber Duck?", "I don't like this one", "https://static.wikia.nocookie.net/dark-deception-game/images/f/fa/Dread_Ducky.png/revision/latest?cb=20211023202719", 6.66)
    await createProduct("Rainbow Duck", "So colorful that it hurts my eyes", "https://api.totallypromotional.com/Data/Media/e30f9893-bcb0-458d-b985-6ab385e8dd59LL031-Rainbow-Duck.jpg", 1.99)

    await createReview(5, "Great quality! This will make an excellent addition to my collection", 2)
    await createReview(1, "Terrible product, it's constantly falling apart", 1)
    await createReview(5, "I will make great use of these", 9)
    await createReview(3, "It's Okay", 7)
    await createReview(2, "It's not even made of rubber", 6)

    await createUser("I_Love_Ducks", "ducks123")
    await createUser("Jonny333", "cj%#heQ#JFlfb@")
    await createUser("Zargothrax", "AngusSucks")
    await createUser("BenDover", "08242009")

    await createOrder("2015-03-17", "1 Dapper Duck, 1 Sir Ducklington, 1 Bat Duck", 1)
    await createOrder("2017-12-25", "2 Frankenducks, 1 Unicorn Duck", 2)
    await createOrder("2024-06-13", "1,000 Rubber Ducks?", 3)
    await createOrder("2015-05-06", "1 Cowboy Duck, 1 Unicorn Duck, 1 Rainbow Duck", 1)
    await createOrder("2020-07-02", "3 Classic Rubber Ducks, 1 Real Duck", 4)
    
}

