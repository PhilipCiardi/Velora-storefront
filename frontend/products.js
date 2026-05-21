const products = [
    {
        id: 1,
        shopifyId: '15742625120630',
        name: "LED FACE MASK",
        description: "Professional-grade red & infrared light therapy at home. Fight acne, reduce fine lines, boost collagen.",
        price: 119,
        label: "NEW",
        image: "images/First_pick_mask.jpg",
        images: ["images/First_pick_mask.jpg","images/last_pick.jpg","images/Sleep.jpg","images/details.jpg"],
        variants: null
    },
    {
        id: 2,
        shopifyId: '15730092310902',
        name: "FROST TUMBLER",
        description: "40oz insulated stainless steel tumbler. Keeps drinks cold for 24h, hot for 12h.",
        price: 39,
        label: "BESTSELLER",
        image: "images/red.jpg",
        images: ["images/red.jpg","images/pink.jpg","images/Blue.jpg"],
        variants: [
            { name: "Red",  variantId: "57920208929142", image: "images/red.jpg" },
            { name: "Pink", variantId: "57920208961910", image: "images/pink.jpg" },
            { name: "Blue", variantId: "57920208994678", image: "images/Blue.jpg" }
        ]
    },
    {
        id: 3,
        shopifyId: '15730075500918',
        name: "NECK FAN",
        description: "Bladeless hands-free neck fan. Ultra-quiet, 3 speed settings. USB rechargeable.",
        price: 34,
        label: "NEW",
        image: "images/Pink_with_wind.jpg",
        images: ["images/White.jpg","images/Pink_with_wind.jpg","images/Green.jpg"],
        variants: [
            { name: "White", variantId: "57920295829878", image: "images/White.jpg" },
            { name: "Pink",  variantId: "57920295862646", image: "images/Pink_with_wind.jpg" },
            { name: "Green", variantId: "57920295895414", image: "images/Green.jpg" }
        ]
    },
    {
        id: 4,
        shopifyId: '15730089591158',
        name: "PULSE GUN",
        description: "Compact percussion massage gun. 30 speed settings, multiple attachments. Perfect for recovery.",
        price: 69,
        label: "TRENDING",
        image: "images/first_pick.jpg",
        images: ["images/first_pick.jpg","images/Black_pulse_gun.jpg"],
        variants: [
            { name: "Green", variantId: "57920150929782", image: "images/first_pick.jpg" },
            { name: "Black", variantId: "57920150995318", image: "images/Black_pulse_gun.jpg" }
        ]
    },
    {
        id: 5,
        shopifyId: '15729937219958',
        name: "RAIN CLOUD DIFFUSER",
        description: "Simulates falling raindrops while diffusing aromatherapy oils. 7 LED colors, 2/4/8h timer.",
        price: 49,
        label: "VIRAL",
        image: "images/Yoga_girl.jpg",
        images: ["images/White_background.jpg","images/Yoga_girl.jpg","images/Purple_one.jpg","images/Bedroom.jpg"],
        variants: [
            { name: "White",  variantId: "57920175636854", image: "images/White_background.jpg" },
            { name: "Pink",   variantId: "57920175669622", image: "images/Yoga_girl.jpg" },
            { name: "Purple", variantId: "57920175702390", image: "images/Purple_one.jpg" },
            { name: "Green",  variantId: "57920175735158", image: "images/Bedroom.jpg" }
        ]
    },
    {
        id: 6,
        shopifyId: '15730087100790',
        name: "SUNSET PROJECTOR LAMP",
        description: "Create a stunning golden hour glow on any wall. RGB color modes, remote & app control.",
        price: 59,
        label: "BESTSELLER",
        image: "images/Orange.jpg",
        images: ["images/Orange.jpg","images/Purple.jpg","images/Yellow.jpg"],
        variants: null
    }
];
window.veloraProducts = products;