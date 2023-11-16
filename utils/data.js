import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Chris Jones',
            email: 'user@example.com',
            birthDate: '03/1976',
            password: bcrypt.hashSync('user12345'),
            isAdmin: false,
            isVendor: false
        },
        {
            name: 'Test Admin',
            email: 'admin@example.com',
            password: bcrypt.hashSync('adminUser12345'),
            isAdmin: true,
            isVendor: false
        },
        {
            name: 'John Smith',
            email: 'vendor@example.com',
            phone: '(555) 555-5555',
            companyName: 'Smoke It If You Got It',
            streetName: '119 Rural Road 3009',
            city: 'Panama Beach',
            province: 'Florida',
            postalCode: '30022',
            country: 'United States',
            password: bcrypt.hashSync('venUser12345'),
            isAdmin: false,
            isVendor: true
        }
    ],
    categories: [
        {
            name: 'Kratom Soda',
            slug: 'kratom-soda',
            categoryImage: '/images/kratom-soda.jpg',
            categoryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
            name: 'Teas & Coffee',
            slug: 'teas-and-coffee',
            categoryImage: '/images/do-raw-powder-bags.jpg',
            categoryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        }
    ],
    products: [
        {
            name: 'Kratom Soda',
            flavor: 'Sour Apple',
            slug: 'sour-apple-kratom-soda',
            category: 'kratom-soda',
            imageOne: '/images/sour-apple-soda.jpg',
            imageTwo: '/images/sour-apple-soda-6-pack.jpg',
            imageThree: '/images/sour-apple-soda.jpg',
            imageFour: '/images/sour-apple-soda-6-pack.jpg',
            color: '',
            priceSize: [
                {
                    size: '6 Pack',
                    price: 34.95
                },
                {
                    size: '24 Pack',
                    price: 65.95
                },
            ],
            size: '6 pack',
            price: 34.95,
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            featuredImage: '/images/header-apple.jpg',
            featured: false
        },
        {
            name: 'Kratom Soda',
            flavor: 'Peachy Cream',
            slug: 'peachy-cream-kratom-soda',
            category: 'kratom-soda',
            imageOne: '/images/creamy-peach-soda.jpg',
            imageTwo: '/images/creamy-peach-soda-6-pack.jpg',
            imageThree: '/images/creamy-peach-soda.jpg',
            imageFour: '/images/creamy-peach-soda-6-pack.jpg',
            color: '',
            priceSize: [
                {
                    size: '6 Pack',
                    price: 34.95
                },
                {
                    size: '24 Pack',
                    price: 65.95
                },
            ],
            size: '6 pack',
            price: 34.95,
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            featuredImage: '/images/header-peach-cream.jpg',
            featured: false
        },
        {
            name: 'Kratom Soda',
            flavor: 'Cherry Pop',
            slug: 'cherry-pop-kratom-soda',
            category: 'kratom-soda',
            imageOne: '/images/cherry-pop-soda.jpg',
            imageTwo: '/images/cherry-pop-soda-6-pack.jpg',
            imageThree: '/images/cherry-pop-soda.jpg',
            imageFour: '/images/cherry-pop-soda-6-pack.jpg',
            color: '',
            priceSize: [
                {
                    size: '6 Pack',
                    price: 34.95
                },
                {
                    size: '24 Pack',
                    price: 65.95
                },
            ],
            size: '6 pack',
            price: 34.95,
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            featuredImage: '/images/header-cherries.jpg',
            featured: false
        },
        {
            name: 'Kratom Soda',
            flavor: 'Sunshine',
            slug: 'sunshine-kratom-soda',
            category: 'kratom-soda',
            imageOne: '/images/sunshine-soda.jpg',
            imageTwo: '/images/sunshine-soda-6-pack.jpg',
            imageThree: '/images/sunshine-soda.jpg',
            imageFour: '/images/sunshine-soda-6-pack.jpg',
            color: '',
            priceSize: [
                {
                    size: '6 Pack',
                    price: 34.95
                },
                {
                    size: '24 Pack',
                    price: 65.95
                },
            ],
            size: '6 pack',
            price: 34.95,
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            featured: true
        }
    ],
    news: [
        {
            title: 'No Booze Beverages Article 1',
            headerImage: '/images/contact-header.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            author: 'Nick Saindon',
            article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet. Malesuada bibendum arcu vitae elementum. Pharetra diam sit amet nisl. Non arcu risus quis varius quam quisque. Faucibus nisl tincidunt eget nullam non nisi est sit. Aliquet eget sit amet tellus. Risus in hendrerit gravida rutrum quisque non tellus. Vestibulum sed arcu non odio euismod lacinia at. Non quam lacus suspendisse faucibus interdum. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Egestas integer eget aliquet nibh. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu non odio euismod lacinia at quis. Facilisis volutpat est velit egestas. Sed libero enim sed faucibus turpis in eu. Cursus mattis molestie a iaculis. Amet nisl purus in mollis nunc. Amet consectetur adipiscing elit duis. Elementum eu facilisis sed odio morbi quis. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Facilisis magna etiam tempor orci eu. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Mauris vitae ultricies leo integer malesuada. Malesuada pellentesque elit eget gravida cum sociis. At ultrices mi tempus imperdiet. Tincidunt lobortis feugiat vivamus at augue. Dis parturient montes nascetur ridiculus mus. Suspendisse faucibus interdum posuere lorem. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Tincidunt id aliquet risus feugiat. Laoreet sit amet cursus sit amet. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Lacinia quis vel eros donec ac odio. Ornare aenean euismod elementum nisi quis eleifend. Curabitur gravida arcu ac tortor dignissim convallis.',
            published: true,
            slug: 'news-article1',
        },
        {
            title: 'No Booze Beverages Article 2',
            headerImage: '/images/contact-header.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            author: 'Nick Saindon',
            article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet. Malesuada bibendum arcu vitae elementum. Pharetra diam sit amet nisl. Non arcu risus quis varius quam quisque. Faucibus nisl tincidunt eget nullam non nisi est sit. Aliquet eget sit amet tellus. Risus in hendrerit gravida rutrum quisque non tellus. Vestibulum sed arcu non odio euismod lacinia at. Non quam lacus suspendisse faucibus interdum. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Egestas integer eget aliquet nibh. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu non odio euismod lacinia at quis. Facilisis volutpat est velit egestas. Sed libero enim sed faucibus turpis in eu. Cursus mattis molestie a iaculis. Amet nisl purus in mollis nunc. Amet consectetur adipiscing elit duis. Elementum eu facilisis sed odio morbi quis. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Facilisis magna etiam tempor orci eu. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Mauris vitae ultricies leo integer malesuada. Malesuada pellentesque elit eget gravida cum sociis. At ultrices mi tempus imperdiet. Tincidunt lobortis feugiat vivamus at augue. Dis parturient montes nascetur ridiculus mus. Suspendisse faucibus interdum posuere lorem. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Tincidunt id aliquet risus feugiat. Laoreet sit amet cursus sit amet. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Lacinia quis vel eros donec ac odio. Ornare aenean euismod elementum nisi quis eleifend. Curabitur gravida arcu ac tortor dignissim convallis.',
            published: true,
            slug: 'news-article2',
        },
        {
            title: 'No Booze Beverages Article 3',
            headerImage: '/images/contact-header.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            author: 'Nick Saindon',
            article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet. Malesuada bibendum arcu vitae elementum. Pharetra diam sit amet nisl. Non arcu risus quis varius quam quisque. Faucibus nisl tincidunt eget nullam non nisi est sit. Aliquet eget sit amet tellus. Risus in hendrerit gravida rutrum quisque non tellus. Vestibulum sed arcu non odio euismod lacinia at. Non quam lacus suspendisse faucibus interdum. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Egestas integer eget aliquet nibh. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu non odio euismod lacinia at quis. Facilisis volutpat est velit egestas. Sed libero enim sed faucibus turpis in eu. Cursus mattis molestie a iaculis. Amet nisl purus in mollis nunc. Amet consectetur adipiscing elit duis. Elementum eu facilisis sed odio morbi quis. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Facilisis magna etiam tempor orci eu. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Mauris vitae ultricies leo integer malesuada. Malesuada pellentesque elit eget gravida cum sociis. At ultrices mi tempus imperdiet. Tincidunt lobortis feugiat vivamus at augue. Dis parturient montes nascetur ridiculus mus. Suspendisse faucibus interdum posuere lorem. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Tincidunt id aliquet risus feugiat. Laoreet sit amet cursus sit amet. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Lacinia quis vel eros donec ac odio. Ornare aenean euismod elementum nisi quis eleifend. Curabitur gravida arcu ac tortor dignissim convallis.',
            published: true,
            slug: 'news-article3',
        },
        {
            title: 'No Booze Beverages Article 4',
            headerImage: '/images/contact-header.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            author: 'Nick Saindon',
            article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet. Malesuada bibendum arcu vitae elementum. Pharetra diam sit amet nisl. Non arcu risus quis varius quam quisque. Faucibus nisl tincidunt eget nullam non nisi est sit. Aliquet eget sit amet tellus. Risus in hendrerit gravida rutrum quisque non tellus. Vestibulum sed arcu non odio euismod lacinia at. Non quam lacus suspendisse faucibus interdum. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Egestas integer eget aliquet nibh. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu non odio euismod lacinia at quis. Facilisis volutpat est velit egestas. Sed libero enim sed faucibus turpis in eu. Cursus mattis molestie a iaculis. Amet nisl purus in mollis nunc. Amet consectetur adipiscing elit duis. Elementum eu facilisis sed odio morbi quis. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Facilisis magna etiam tempor orci eu. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Mauris vitae ultricies leo integer malesuada. Malesuada pellentesque elit eget gravida cum sociis. At ultrices mi tempus imperdiet. Tincidunt lobortis feugiat vivamus at augue. Dis parturient montes nascetur ridiculus mus. Suspendisse faucibus interdum posuere lorem. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Tincidunt id aliquet risus feugiat. Laoreet sit amet cursus sit amet. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Lacinia quis vel eros donec ac odio. Ornare aenean euismod elementum nisi quis eleifend. Curabitur gravida arcu ac tortor dignissim convallis.',
            published: true,
            slug: 'news-article4',
        },
        {
            title: 'No Booze Beverages Article 5',
            headerImage: '/images/contact-header.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            author: 'Nick Saindon',
            article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet. Malesuada bibendum arcu vitae elementum. Pharetra diam sit amet nisl. Non arcu risus quis varius quam quisque. Faucibus nisl tincidunt eget nullam non nisi est sit. Aliquet eget sit amet tellus. Risus in hendrerit gravida rutrum quisque non tellus. Vestibulum sed arcu non odio euismod lacinia at. Non quam lacus suspendisse faucibus interdum. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Egestas integer eget aliquet nibh. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu non odio euismod lacinia at quis. Facilisis volutpat est velit egestas. Sed libero enim sed faucibus turpis in eu. Cursus mattis molestie a iaculis. Amet nisl purus in mollis nunc. Amet consectetur adipiscing elit duis. Elementum eu facilisis sed odio morbi quis. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Facilisis magna etiam tempor orci eu. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Mauris vitae ultricies leo integer malesuada. Malesuada pellentesque elit eget gravida cum sociis. At ultrices mi tempus imperdiet. Tincidunt lobortis feugiat vivamus at augue. Dis parturient montes nascetur ridiculus mus. Suspendisse faucibus interdum posuere lorem. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Tincidunt id aliquet risus feugiat. Laoreet sit amet cursus sit amet. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Lacinia quis vel eros donec ac odio. Ornare aenean euismod elementum nisi quis eleifend. Curabitur gravida arcu ac tortor dignissim convallis.',
            published: true,
            slug: 'news-article5',
        },
        {
            title: 'No Booze Beverages Article 6',
            headerImage: '/images/contact-header.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            author: 'Nick Saindon',
            article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet. Malesuada bibendum arcu vitae elementum. Pharetra diam sit amet nisl. Non arcu risus quis varius quam quisque. Faucibus nisl tincidunt eget nullam non nisi est sit. Aliquet eget sit amet tellus. Risus in hendrerit gravida rutrum quisque non tellus. Vestibulum sed arcu non odio euismod lacinia at. Non quam lacus suspendisse faucibus interdum. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Egestas integer eget aliquet nibh. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu non odio euismod lacinia at quis. Facilisis volutpat est velit egestas. Sed libero enim sed faucibus turpis in eu. Cursus mattis molestie a iaculis. Amet nisl purus in mollis nunc. Amet consectetur adipiscing elit duis. Elementum eu facilisis sed odio morbi quis. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Facilisis magna etiam tempor orci eu. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Mauris vitae ultricies leo integer malesuada. Malesuada pellentesque elit eget gravida cum sociis. At ultrices mi tempus imperdiet. Tincidunt lobortis feugiat vivamus at augue. Dis parturient montes nascetur ridiculus mus. Suspendisse faucibus interdum posuere lorem. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Tincidunt id aliquet risus feugiat. Laoreet sit amet cursus sit amet. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Lacinia quis vel eros donec ac odio. Ornare aenean euismod elementum nisi quis eleifend. Curabitur gravida arcu ac tortor dignissim convallis.',
            published: true,
            slug: 'news-article6',
        },
        {
            title: 'No Booze Beverages Article 7',
            headerImage: '/images/contact-header.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            author: 'Nick Saindon',
            article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet. Malesuada bibendum arcu vitae elementum. Pharetra diam sit amet nisl. Non arcu risus quis varius quam quisque. Faucibus nisl tincidunt eget nullam non nisi est sit. Aliquet eget sit amet tellus. Risus in hendrerit gravida rutrum quisque non tellus. Vestibulum sed arcu non odio euismod lacinia at. Non quam lacus suspendisse faucibus interdum. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Egestas integer eget aliquet nibh. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu non odio euismod lacinia at quis. Facilisis volutpat est velit egestas. Sed libero enim sed faucibus turpis in eu. Cursus mattis molestie a iaculis. Amet nisl purus in mollis nunc. Amet consectetur adipiscing elit duis. Elementum eu facilisis sed odio morbi quis. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Facilisis magna etiam tempor orci eu. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Mauris vitae ultricies leo integer malesuada. Malesuada pellentesque elit eget gravida cum sociis. At ultrices mi tempus imperdiet. Tincidunt lobortis feugiat vivamus at augue. Dis parturient montes nascetur ridiculus mus. Suspendisse faucibus interdum posuere lorem. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Tincidunt id aliquet risus feugiat. Laoreet sit amet cursus sit amet. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Lacinia quis vel eros donec ac odio. Ornare aenean euismod elementum nisi quis eleifend. Curabitur gravida arcu ac tortor dignissim convallis.',
            published: true,
            slug: 'news-article7',
        },
        {
            title: 'No Booze Beverages Article 8',
            headerImage: '/images/contact-header.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            author: 'Nick Saindon',
            article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet. Malesuada bibendum arcu vitae elementum. Pharetra diam sit amet nisl. Non arcu risus quis varius quam quisque. Faucibus nisl tincidunt eget nullam non nisi est sit. Aliquet eget sit amet tellus. Risus in hendrerit gravida rutrum quisque non tellus. Vestibulum sed arcu non odio euismod lacinia at. Non quam lacus suspendisse faucibus interdum. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Egestas integer eget aliquet nibh. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu non odio euismod lacinia at quis. Facilisis volutpat est velit egestas. Sed libero enim sed faucibus turpis in eu. Cursus mattis molestie a iaculis. Amet nisl purus in mollis nunc. Amet consectetur adipiscing elit duis. Elementum eu facilisis sed odio morbi quis. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Facilisis magna etiam tempor orci eu. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Mauris vitae ultricies leo integer malesuada. Malesuada pellentesque elit eget gravida cum sociis. At ultrices mi tempus imperdiet. Tincidunt lobortis feugiat vivamus at augue. Dis parturient montes nascetur ridiculus mus. Suspendisse faucibus interdum posuere lorem. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Tincidunt id aliquet risus feugiat. Laoreet sit amet cursus sit amet. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Lacinia quis vel eros donec ac odio. Ornare aenean euismod elementum nisi quis eleifend. Curabitur gravida arcu ac tortor dignissim convallis.',
            published: true,
            slug: 'news-article8',
        },
        {
            title: 'No Booze Beverages Article 9',
            headerImage: '/images/contact-header.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            author: 'Nick Saindon',
            article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet. Malesuada bibendum arcu vitae elementum. Pharetra diam sit amet nisl. Non arcu risus quis varius quam quisque. Faucibus nisl tincidunt eget nullam non nisi est sit. Aliquet eget sit amet tellus. Risus in hendrerit gravida rutrum quisque non tellus. Vestibulum sed arcu non odio euismod lacinia at. Non quam lacus suspendisse faucibus interdum. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Egestas integer eget aliquet nibh. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu non odio euismod lacinia at quis. Facilisis volutpat est velit egestas. Sed libero enim sed faucibus turpis in eu. Cursus mattis molestie a iaculis. Amet nisl purus in mollis nunc. Amet consectetur adipiscing elit duis. Elementum eu facilisis sed odio morbi quis. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Facilisis magna etiam tempor orci eu. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Mauris vitae ultricies leo integer malesuada. Malesuada pellentesque elit eget gravida cum sociis. At ultrices mi tempus imperdiet. Tincidunt lobortis feugiat vivamus at augue. Dis parturient montes nascetur ridiculus mus. Suspendisse faucibus interdum posuere lorem. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Tincidunt id aliquet risus feugiat. Laoreet sit amet cursus sit amet. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Lacinia quis vel eros donec ac odio. Ornare aenean euismod elementum nisi quis eleifend. Curabitur gravida arcu ac tortor dignissim convallis.',
            published: true,
            slug: 'news-article9',
        },
        {
            title: 'No Booze Beverages Article 10',
            headerImage: '/images/contact-header.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            author: 'Nick Saindon',
            article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet. Malesuada bibendum arcu vitae elementum. Pharetra diam sit amet nisl. Non arcu risus quis varius quam quisque. Faucibus nisl tincidunt eget nullam non nisi est sit. Aliquet eget sit amet tellus. Risus in hendrerit gravida rutrum quisque non tellus. Vestibulum sed arcu non odio euismod lacinia at. Non quam lacus suspendisse faucibus interdum. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Egestas integer eget aliquet nibh. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu non odio euismod lacinia at quis. Facilisis volutpat est velit egestas. Sed libero enim sed faucibus turpis in eu. Cursus mattis molestie a iaculis. Amet nisl purus in mollis nunc. Amet consectetur adipiscing elit duis. Elementum eu facilisis sed odio morbi quis. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Facilisis magna etiam tempor orci eu. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Mauris vitae ultricies leo integer malesuada. Malesuada pellentesque elit eget gravida cum sociis. At ultrices mi tempus imperdiet. Tincidunt lobortis feugiat vivamus at augue. Dis parturient montes nascetur ridiculus mus. Suspendisse faucibus interdum posuere lorem. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Tincidunt id aliquet risus feugiat. Laoreet sit amet cursus sit amet. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Lacinia quis vel eros donec ac odio. Ornare aenean euismod elementum nisi quis eleifend. Curabitur gravida arcu ac tortor dignissim convallis.',
            published: true,
            slug: 'news-article10',
        }
    ],
};

export default data;