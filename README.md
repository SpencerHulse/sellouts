# sellouts

![license badge](https://img.shields.io/badge/license-MIT-brightgreen)

## Description

Sellouts is an e-commerce project that is meant to be adaptable to a wide range of store types. On the user-side of things, there is a main page with all of the products. It is currently set to have five products per page, but that can be changes via variable within the code to suit any size of store. The products can also be sorted on the main page by category, price, rating, and whether they are on sale.

Once a product is clicked on, users are presented with an in-depth page for that product, which includes descriptions, details, and reviews, which can be left by users. The reviews show five at a time and can be sorted by newest, oldest, highest rated, and lowest rated.

All items can be added to the cart, where and once a user has all the items they want, they can go through checkout, which utilizes Stripe. The Stripe checkout process goes to a completion page upon successful purchase, where the order is created. Once that is done, the order will show up in the user's order history.

There is also an admin side to the site, which allows admin accounts to add, update, and delete categories, products, and promotions. They can also delete users, update orders (status), and check out some statistics about the site.

All of this is powered by Redux for global state, React for the frontend, Bootstrap, JWT, and a few other helpful packages.

On the backend, Mongoose (MongoDB) and GraphQL take care of the heavy lifting. It also uses AWS for images, luxon for time and dates, and jsonwebtokens for authentication.

**The site also features an admin side, where only admin accounts (which must be created manually) have access. If you are on the Heroku site, the email and password to access that account are admin@sellouts.com and admin.**

![alt text](./assets/nsense.png)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

To run the project locally, clone or download the repo and run npm install in the root directory. After installing all packages, create a .env file in the server directory and give it a variable called MY_JWT_SECRET. Set that to anything you like. Add STRIPE_SK=sk_test_4eC39HqLyjWDarjtT1zdp7dc as well. It will also need an AWS s3 Bucket with all the required setup for that if you want to upload new images outside of those in the seed file. However, you can get full functionality minus images without that.

## Usage

Once you have everything set up and ready to go, you can run npm run develop from the root directory. From there, the server will connect and React will start.

Additionally, you can use it without installing the code locally by going to the [Sellouts Heroku Page](https://sellouts.herokuapp.com/).

## License

This project is covered under the following license:

[MIT](https://www.mit.edu/~amini/LICENSE.md)

## Contributing

The project is not accepting any contributions at this time.

## Questions

If you have any questions, you can contact those involved through their GitHub accounts. Thanks!

[Spencer Hulse's GitHub](https://github.com/SpencerHulse)

[Benjamin Molini Vilhunen's GitHub](https://github.com/D1sl)
