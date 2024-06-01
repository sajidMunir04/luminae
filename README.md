What is the project ? 

This is a full stack ecommerce website, developed using Next.js utilizing its frontend and also its serverless backend. This website uses MongoDB as its database.


Why Next.js ?

The main goal was to gain exposure in the full stack development and what's better than developing and using solutions. So it was the main deciding factor and I saw few teams using it as a full stack solution, although their scale was rather scoped. 


What is the main goal ?
This project's goal is to demonstrate my problem solving and work skills, and my understanding of the modern tech stacks being adopted by the industry.


How did you plan out the whole project ?

The main systems I considered were: 

-Frontend
-Backend
-Database
-Media CDN service (Cloudinary)

As I had choosed Next.js so it would mean that the backend would also live with the frontend, and considering the dynamic nature of data for an ecommerce website, I chose MongoDB without any confusion. Because it offers BASE transactions which were crucial for this specific project, unlike the ACID transactions of the Relational databases like PostgreSQL.

I planned to start developing the front-end first, so I browsed some figma designs and eventually finalized one which had design screens for all pages which I had initially planned. Although later I found that it has many UX issues, and few things didn't make sense at all according to design. Like it had placed too much or too litte info for users.

So I started developing front-end and then I need some data to actually use and present data to the potential users (not customers "-"), and the I came around few fake-apis website, offering ecommerce data. 

But the data was very limited, and well it would also have served the purpose, but, if I had used that, I would not be gaining any exposure to databases, so I decided to gather my own data and handle all the database design and management myself. 

And that was a very good decision that I made, because it introduced me to important database concepts like how I can manage and store and divide the data, so that the absolute minimum data is transferred through database transactions, while also how I can later optimize or scale the database according to my needs so the whole system remains scalable.

So, I browsed kaggle, and got some datasets, and analyzed them for my needs, and one was good so I finalized it and began to work with it.
I developed some of my tools to cleanup that data and upload it into the database, while being completely decoupled from the whole project.

Then I started consuming that data, and started working on adding backend logic to start front-end interaction with the database eventually. 

What are the features of this project ? What works in it and what does not ?

The whole websites works as you would expect any ecommerce website(though this website does not have a good designer :) ), so I would like you to go to this link and check some of its features . <>link</link>

The main features are:

- For users/customers:

1- Search Products.
2- Add Products to cart.
3- Increase the product's quantity while checking.
4- Add products to favorites.
5- Place Orders. 
6- Get a list of all previous orders.
7- View any previous order with complete details, like the quantity of products, their picture, and all the billing and shipping details.
8- User profile creation using Clerk authentication.

- For Admins:

(Please use these credentials to sign in as admin)
--
--

1- Can view specific recent orders.
2- Can add a new product to database.
3- Can manage the current products on the website, like delete existing products, update the inventory, and update the prices as well.


What could be improved in this project ?

1- The design and user experience could be improved for sure. 
2- There are no unit tests as of now, so everything is manually tested by me, so it would be beneficial to use unit tests. Which I have plans for.
3- The mobile responsiveness for mobiles is bit shaky for users, and for admins there is no screen responsiveness at all on phones, as I am still figuring out how to fit that much information in one place.

How did you manage this whole project ? 

Well, I categorized the tasks according to my development plan (Frontend -> Database -> Backend), so I managed the tasks on my own, and I use JIRA for managment of this whole project.

What is the potential scalability of this project ? 

1- The backend is serverless, so it's definitely scalable. The database design is versatile for expansion, however on the front-end, it would be a bottle-neck if I try to expand this, like for example the current two main product sections are MAN and WOMAN, which are included in the header component for now, so if I wanted to add Kids product section,then maybe it would be fine and I can include that, however,if I was to include more sections like Kitchen, Home, and Electronices then I would have to redo the whole design for the header component and categories display component.

How did the overall progress go, any references ?![Screenshot 2024-05-26 204710](https://github.com/stuckrabbit/luminae/assets/165798996/17685113-b098-46bb-865f-54d786e491ca)
![Screenshot 2024-05-28 163821](https://github.com/stuckrabbit/luminae/assets/165798996/24f2f748-3389-44b5-8bb1-f9cc8e165042)
![Screenshot 2024-05-27 085110](https://github.com/stuckrabbit/luminae/assets/165798996/a7ee0ed2-b50a-48b9-a319-6c9370a0d5e3)
![Screenshot 2024-05-27 081229](https://github.com/stuckrabbit/luminae/assets/165798996/b7836179-57af-4081-8793-4cf190505f05)
![Screenshot 2024-05-26 204747](https://github.com/stuckrabbit/luminae/assets/165798996/b0735924-5cdd-40ec-bfc8-6a800277aa28)
![Screenshot 2024-05-26 204732](https://github.com/stuckrabbit/luminae/assets/165798996/51c5a381-99b7-49e3-8494-cbe3b9e15c97)

