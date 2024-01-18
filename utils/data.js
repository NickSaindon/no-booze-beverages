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
            slug: 'sour-apple-kratom-soda-12oz-6pack',
            category: 'kratom-soda',
            imageOne: '/images/sour-apple-soda.jpg',
            imageTwo: '/images/sour-apple-soda-6-pack.jpg',
            imageThree: '/images/sour-apple-soda.jpg',
            imageFour: '/images/sour-apple-soda-6-pack.jpg',
            size: '12oz',
            color: '',
            priceSizes: [
                {
                  packSize: '4 Pack',
                  price: 24.00,
                  countInStock: 9,
                },
                {
                  packSize: '6 Pack',
                  price: 36.00,
                  countInStock: 10,
                },
                {
                  packSize: '8 Pack',
                  price: 48.00,
                  countInStock: 12,
                },
                {
                  packSize: '12 Pack',
                  price: 72.00,
                  countInStock: 8,
                },
                {
                  packSize: '24 Pack',
                  price: 144.00,
                  countInStock: 5,
                }
              ],
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: "Step into a world of tantalizing taste with No Booze Beverages Sour Apple Kratom Soda, a sensational blend of crisp apple flavor and the natural benefits of high-quality kratom. Elevating your beverage experience, this soda delivers a bold and refreshing profile that seamlessly marries the tartness of sour apples with the distinctive earthy notes of kratom. Crafted with precision and care, each bottle of Sour Apple Kratom Soda is a testament to the commitment to quality upheld by No Booze Beverages. The infusion of premium-grade kratom, sourced from the finest leaves of the Mitragyna speciosa plant, guarantees a clean and authentic product that caters to both flavor enthusiasts and wellness seekers. This unique soda not only captivates your taste buds with its vibrant apple tang but also introduces you to the potential benefits associated with kratom, such as a boost in energy, improved mood, and a heightened sense of relaxation. Whether you're in search of a non-alcoholic alternative that stands out or a flavorful beverage that combines indulgence with well-being, No Booze Beverages' Sour Apple Kratom Soda is the perfect choice. Indulge in the perfect balance of sweetness and tartness, and experience a new dimension in beverage enjoyment with every effervescent sip.",
            featuredImage: '/images/header-apple.jpg',
            featured: false
        },
        {
            name: 'Kratom Soda',
            flavor: 'Creamy Peach',
            slug: 'peachy-cream-kratom-soda-12oz-6pack',
            category: 'kratom-soda',
            imageOne: '/images/creamy-peach-soda.jpg',
            imageTwo: '/images/creamy-peach-soda-6-pack.jpg',
            imageThree: '/images/creamy-peach-soda.jpg',
            imageFour: '/images/creamy-peach-soda-6-pack.jpg',
            size: '12oz',
            color: '',
            priceSizes: [
                {
                  packSize: '4 Pack',
                  price: 24.00,
                  countInStock: 8,
                },
                {
                  packSize: '6 Pack',
                  price: 36.00,
                  countInStock: 15,
                },
                {
                  packSize: '8 Pack',
                  price: 48.00,
                  countInStock: 20,
                },
                {
                  packSize: '12 Pack',
                  price: 72.00,
                  countInStock: 5,
                },
                {
                  packSize: '24 Pack',
                  price: 144.00,
                  countInStock: 10,
                }
              ],
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: "Introducing No Booze Beverages Creamy Peach Kratom Soda, a luscious fusion of velvety peach goodness and the natural benefits of premium-grade kratom. Crafted with meticulous attention to detail, this unique soda offers an exquisite balance between the rich creaminess of peaches and the subtle earthy tones of kratom, resulting in a beverage that delights the palate and nurtures the body. Immerse yourself in the velvety sweetness of ripe peaches with every sip, as the smooth creaminess enhances the overall indulgence of this soda experience. No Booze Beverages takes pride in sourcing only the finest kratom leaves from the Mitragyna speciosa plant, ensuring a product of unmatched quality and authenticity. Beyond its delectable taste, Creamy Peach Kratom Soda also presents the potential benefits associated with kratom, including a gentle energy boost, mood enhancement, and a calming influence. Whether you're seeking a flavorful alternative to traditional sodas or a beverage that harmoniously combines taste and well-being, No Booze Beverages Creamy Peach Kratom Soda is the ideal choice. Indulge in the sumptuous marriage of creamy peach perfection and natural goodness, as you sip your way to a new level of refreshment and satisfaction.",
            featuredImage: '/images/header-peach-cream.jpg',
            featured: false
        },
        {
            name: 'Kratom Soda',
            flavor: 'Cherry Pop',
            slug: 'cherry-pop-kratom-soda-12oz-6pack',
            category: 'kratom-soda',
            imageOne: '/images/cherry-pop-soda.jpg',
            imageTwo: '/images/cherry-pop-soda-6-pack.jpg',
            imageThree: '/images/cherry-pop-soda.jpg',
            imageFour: '/images/cherry-pop-soda-6-pack.jpg',
            size: '12oz',
            color: '',
            priceSizes: [
                {
                  packSize: '4 Pack',
                  price: 24.00,
                  countInStock: 10,
                },
                {
                  packSize: '6 Pack',
                  price: 36.00,
                  countInStock: 15,
                },
                {
                  packSize: '8 Pack',
                  price: 48.00,
                  countInStock: 20,
                },
                {
                  packSize: '12 Pack',
                  price: 72.00,
                  countInStock: 5,
                },
                {
                  packSize: '24 Pack',
                  price: 144.00,
                  countInStock: 10,
                }
              ],
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: "Introducing No Booze Beverages Cherry Pop Kratom Soda, a refreshing and unique beverage that combines the bold and fruity flavor of cherries with the natural benefits of premium-grade kratom. This one-of-a-kind soda offers a delightful alternative for those seeking a non-alcoholic and all-natural beverage with a twist. Crafted with care, each bottle of Cherry Pop Kratom Soda contains the perfect blend of cherry essence and the distinctive taste of kratom, resulting in a harmonious fusion of flavors that tantalize the taste buds. The infusion of kratom, derived from the Mitragyna speciosa plant, brings a subtle earthy undertone that complements the sweetness of the cherries, creating a beverage that is both invigorating and satisfying. No Booze Beverages prioritizes quality and purity, sourcing only the finest kratom leaves to ensure a clean and authentic product. Beyond its delicious taste, this soda also offers the potential benefits associated with kratom, such as increased energy, enhanced mood, and a sense of relaxation. Whether you're looking for a flavorful and health-conscious beverage for everyday enjoyment or a unique alternative to traditional sodas, Cherry Pop Kratom Soda from No Booze Beverages is the perfect choice. Embrace the fusion of flavor and wellness with every sip of this thoughtfully crafted beverage.",
            featuredImage: '/images/header-cherries.jpg',
            featured: false
        },
        {
            name: 'Kratom Soda',
            flavor: 'Sunshine',
            slug: 'sunshine-kratom-soda-12oz-6pack',
            category: 'kratom-soda',
            imageOne: '/images/sunshine-soda.jpg',
            imageTwo: '/images/sunshine-soda-6-pack.jpg',
            imageThree: '/images/sunshine-soda.jpg',
            imageFour: '/images/sunshine-soda-6-pack.jpg',
            size: '12oz',
            color: '',
            priceSizes: [
                {
                  packSize: '4 Pack',
                  price: 24.00,
                  countInStock: 10,
                },
                {
                  packSize: '6 Pack',
                  price: 36.00,
                  countInStock: 15,
                },
                {
                  packSize: '8 Pack',
                  price: 48.00,
                  countInStock: 20,
                },
                {
                  packSize: '12 Pack',
                  price: 72.00,
                  countInStock: 5,
                },
                {
                  packSize: '24 Pack',
                  price: 144.00,
                  countInStock: 10,
                }
              ],
            rating: 4.5,
            numReviews: 8,
            description: "Step into a world of radiant flavor with No Booze Beverages Sunshine Kratom Soda, a bright and invigorating concoction that blends the uplifting essence of citrus with the natural benefits of premium-grade kratom. Crafted with precision and a commitment to excellence, this unique soda promises a burst of sunshine in every sip. Immerse yourself in the zesty fusion of citrus notes, as the refreshing tang of oranges and lemons harmonizes with the distinct earthy undertones of kratom. No Booze Beverages takes pride in sourcing the finest kratom leaves from the Mitragyna speciosa plant, ensuring a beverage that not only tantalizes the taste buds but also offers potential wellness benefits. Embrace the uplifting energy, improved mood, and a sense of relaxation that Sunshine Kratom Soda can provide. This non-alcoholic alternative is perfect for those seeking a delightful and health-conscious beverage that stands out from the crowd. Whether you're unwinding on a sunny day or looking for a pick-me-up during a busy afternoon, Sunshine Kratom Soda from No Booze Beverages is the ideal companion for those who crave the perfect balance of refreshment and natural goodness. Allow the radiance of Sunshine Kratom Soda to brighten your beverage experience and elevate your enjoyment to new heights.",
            featuredImage: '/images/header-cherries.jpg',
            featured: false
        }
    ],
    blogs: [
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
            headerImage: '/images/wholesale-header.jpg',
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
            headerImage: '/images/wholesale-header.jpg',
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
            headerImage: '/images/wholesale-header.jpg',
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
            headerImage: '/images/wholesale-header.jpg',
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
            headerImage: '/images/wholesale-header.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            author: 'Nick Saindon',
            article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet. Malesuada bibendum arcu vitae elementum. Pharetra diam sit amet nisl. Non arcu risus quis varius quam quisque. Faucibus nisl tincidunt eget nullam non nisi est sit. Aliquet eget sit amet tellus. Risus in hendrerit gravida rutrum quisque non tellus. Vestibulum sed arcu non odio euismod lacinia at. Non quam lacus suspendisse faucibus interdum. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Egestas integer eget aliquet nibh. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu non odio euismod lacinia at quis. Facilisis volutpat est velit egestas. Sed libero enim sed faucibus turpis in eu. Cursus mattis molestie a iaculis. Amet nisl purus in mollis nunc. Amet consectetur adipiscing elit duis. Elementum eu facilisis sed odio morbi quis. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Facilisis magna etiam tempor orci eu. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Mauris vitae ultricies leo integer malesuada. Malesuada pellentesque elit eget gravida cum sociis. At ultrices mi tempus imperdiet. Tincidunt lobortis feugiat vivamus at augue. Dis parturient montes nascetur ridiculus mus. Suspendisse faucibus interdum posuere lorem. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Tincidunt id aliquet risus feugiat. Laoreet sit amet cursus sit amet. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Lacinia quis vel eros donec ac odio. Ornare aenean euismod elementum nisi quis eleifend. Curabitur gravida arcu ac tortor dignissim convallis.',
            published: true,
            slug: 'news-article10',
        }
    ],
};

export default data;